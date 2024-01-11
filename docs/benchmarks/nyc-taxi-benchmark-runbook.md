# Benchmark Against ClickHouse
## Common setup
Setup a server to run the benchmarks.
I used an AWS im4gn.2xlarge running Ubuntu 22.04.
This instance has 8 vCPUs, 32 GB of RAM, and 3.5 TB of storage, but you have to mount the storage with the following steps:
1. ssh into your server
2. Run `lsblk` and you should see something like the following, with the `nvme1n1` item having 3.4 TB of storage.
```
NAME         MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0          7:0    0  21.3M  1 loop /snap/amazon-ssm-agent/7529
loop1          7:1    0  49.1M  1 loop /snap/core18/2794
loop2          7:2    0  59.3M  1 loop /snap/core20/2019
loop3          7:3    0 109.6M  1 loop /snap/lxd/24326
loop4          7:4    0  35.5M  1 loop /snap/snapd/20102
nvme0n1      259:0    0     8G  0 disk
├─nvme0n1p1  259:2    0   7.9G  0 part /
└─nvme0n1p15 259:3    0    99M  0 part /boot/efi
nvme1n1      259:1    0   3.4T  0 disk
```
3. Mount the storage
```bash
sudo mkfs.xfs /dev/nvme1n1
sudo mkdir /mnt/nvme1n1
sudo mount /dev/nvme1n1 /mnt/nvme1n1
```
4. You can check that it's mounted by running `df -h` and you should see something like this:
```
Filesystem       Size  Used Avail Use% Mounted on
/dev/root        7.6G  1.5G  6.2G  20% /
tmpfs             16G     0   16G   0% /dev/shm
tmpfs            6.2G  948K  6.2G   1% /run
tmpfs            5.0M     0  5.0M   0% /run/lock
/dev/nvme0n1p15   98M  6.3M   92M   7% /boot/efi
tmpfs            3.1G  4.0K  3.1G   1% /run/user/1000
/dev/nvme1n1     3.5T   25G  3.4T   1% /mnt/nvme1n1
```
5. Update permissions
```bash
cd /mnt/nvme1n1
sudo chmod 777 .
```
6. Configure AWS CLI
```bash
sudo apt-get install awscli -y
aws configure
```

## Making the dataset
Make a `data/` directory to store the data, then go to https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page and download the data.
I used the 2011-2017 yellow taxi trip parquet files.
Next, you need to convert the parquet files to TSV.
```
cd data
python -m venv taxis
source taxis/bin/activate
pip install pandas pyarrow
```
Make a file `parquet_to_tsv.py` with the following content.
```
import pandas as pd
import glob
import os
import sys

def convert_parquet_to_tsv(input_directory, output_directory):
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for parquet_file in glob.glob(os.path.join(input_directory, '*.parquet')):
        df = pd.read_parquet(parquet_file)
        base_name = os.path.basename(parquet_file)
        tsv_file = os.path.join(output_directory, base_name.replace('.parquet', '.tsv'))
        df.to_csv(tsv_file, sep='\t', index=False)
        print(f"Converted {parquet_file} to {tsv_file}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <input_directory> <output_directory>")
        sys.exit(1)

    input_dir = sys.argv[1]
    output_dir = sys.argv[2]
    convert_parquet_to_tsv(input_dir, output_dir)
```
Now run the conversion with
```
python parquet_to_tsv.py . .
```
ClickHouse will use the TSV files, but for SigLens we'll use JSON.
```
for year in {2011..2017}; do
    for month in {01..12}; do
        basefile="yellow_tripdata_$year-$month"
        go run siglens/tools/sigclient/cmd/utils/converter.go --input "$basefile.tsv" --output "$basefile.json" &
    done
done
wait
```
Finally, compress the TSV and JSON files with gzip and upload them to your AWS S3 bucket.
I ingested the TSV and JSON files into separte directories to make it easier to download all of one type.

## Benchmark SigLens
You'll want three terminals. Terminal 1 will run SigLens, Terminal 2 will do some setup and view the logs, and Terminal 3 will send the queries. Terminal 3 can run in your local machine if you setup the server to accept HTTP traffic, but Terminals 1 and 2 should be on the server. Start with Terminal 1.

### Install Go
```bash
sudo apt update
sudo apt install golang -y
```
If prompted to restart some daemons, you can restart the recommended daemons.

### Clone SigLens
```bash
git clone https://github.com/siglens/siglens.git
cd siglens
```

### Enable AgileAggs
Open `server.yaml` and add these settings:
```yaml
agileAggsEnabled: true
pqsEnabled: true
```

### Start SigLens
```bash
sudo go run cmd/siglens/main.go --config server.yaml
```

Wait until SigLens is running. You'll see these lines in the terminal once it's up:
```
INFO[2023-12-06 18:10:38] Extracting config from configFile: server.yaml
INFO[2023-12-06 18:10:38] Defaulting to 2160hrs (90 days) of retention...
INFO[2023-12-06 18:10:38] ----- Siglens server type SingleNode starting up -----
INFO[2023-12-06 18:10:38] ----- Siglens Ingestion server starting on 0.0.0.0:8081 -----
INFO[2023-12-06 18:10:38] ----- Siglens Query server starting on 0.0.0.0:5122 -----
INFO[2023-12-06 18:10:38] ----- Siglens UI starting on 0.0.0.0:5122 -----
```

### Setup PQS
Switch to Terminal 2 and run the following:
```bash
curl -X POST -d '{
    "tableName": "trips",
    "groupByColumns": ["airport_fee", "passenger_count", "PULocationID", "trip_distance"],
    "measureColumns": ["total_amount"]
}' http://localhost:5122/api/pqs/aggs
echo ""
```
You should get this response:
```json
{"message":"All OK","status":200}
```

### Setup an ingestion script
In Terminal 2 run `cd /mnt/nvme1n1/siglens/tools/sigclient` and then save the following into ingester.py
```python
import subprocess
import sys


def ingest(filename, batch_size=100):
    # Determine the total number of lines in the file
    total_lines = sum(1 for _ in open(filename, "r"))

    lines = []
    with open(filename, 'r') as f:
        for i, line in enumerate(f):
            lines.append(line)

            if len(lines) >= batch_size:
                print(f"\rProcessing... {((i + 1) / total_lines) * 100:.2f}%", end='')
                ingest_lines(lines)
                lines = []
    if lines:
        ingest_lines(lines)
        print(f"\rProcessing... 100.00%")


def ingest_lines(lines):
    index_data = '{"index": {"_index": "trips", "_type": "_doc"}}'
    data = ''
    for line in lines:
        data += index_data + '\n' + line

    # Prepare the curl command
    curl_command = [
        "curl",
        "-s",
        "-o", "/dev/null",
        "http://localhost:8081/elastic/_bulk",
        "-X", "POST",
        "-H", "Authorization: Bearer ",
        "-H", "Content-Type: application/json",
        "--data-binary", data
    ]

    # Execute the curl command
    process = subprocess.run(curl_command, capture_output=False, text=False)
    if process.stderr:
        print("Error:", process.stderr)


if __name__ == "__main__":
    ingest(sys.argv[1])
```

### Ingest the data into SigLens
Make a dataset directory inside sigclient.
```bash
mkdir dataset
```
Run the following script to download, decompress, and ingest the data into SigLens.
```bash
for year in {2011..2017}; do
    for month in {01..12}; do
        {
            basefile="yellow_tripdata_$year-$month"

            aws s3 cp s3://your-bucket/nyc-taxi-benchmark-data/json/$basefile.json.gz dataset/
            gunzip dataset/$basefile.json.gz
            python3 ingester.py dataset/$basefile.json
        } &
    done
    wait
done
```

### Restart SigLens
This step is to ensure that SigLens flushes all the ingested data. Simply Ctrl-C the process in Terminal 1 and restart it with
```bash
sudo go run cmd/siglens/main.go --config server.yaml
```

### View Logs
In terminal 2, run:
```bash
cd /mnt/nvme1n1/siglens
sudo tail -f siglens.log
```

### Run the Queries in SigLens
Run the following in Terminal 3.
If Terminal 3 is on your local machine, make sure to replace `localhost` with the IP of the server.
You can remove the ` | python3 -m json.tool` if you want, it just formats the JSON response.
Check the log file `siglens/siglens.log` for the query times.
```bash
curl -X POST -d '{
    "searchText": "SELECT airport_fee, count(*) FROM trips GROUP BY airport_fee",
    "index": "trips",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost:5122/api/search | python3 -m json.tool

curl -X POST -d '{
    "searchText": "SELECT passenger_count, avg(total_amount) FROM trips GROUP BY passenger_count",
    "index": "trips",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost:5122/api/search | python3 -m json.tool

curl -X POST -d '{
    "searchText": "SELECT passenger_count, PULocationID, count(*) FROM trips GROUP BY passenger_count, PULocationID",
    "index": "trips",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost:5122/api/search | python3 -m json.tool

curl -X POST -d '{
    "searchText": "SELECT passenger_count, PULocationID, trip_distance, count(*) FROM trips GROUP BY passenger_count, PULocationID, trip_distance",
    "index": "trips",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost:5122/api/search | python3 -m json.tool
```

## Benchmark ClickHouse
### Install ClickHouse
```bash
# Prepare to install ClickHouse
sudo apt-get install -y apt-transport-https ca-certificates dirmngr
GNUPGHOME=$(mktemp -d)
sudo GNUPGHOME="$GNUPGHOME" gpg --no-default-keyring --keyring /usr/share/keyrings/clickhouse-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 8919F6BD2B48D754
sudo rm -r "$GNUPGHOME"
sudo chmod +r /usr/share/keyrings/clickhouse-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/clickhouse-keyring.gpg] https://packages.clickhouse.com/deb stable main" | sudo tee \
    /etc/apt/sources.list.d/clickhouse.list
sudo apt-get update

# Install ClickHouse server and client
sudo apt-get install -y clickhouse-server clickhouse-client
```
You should get the prompt `Enter password for default user:`.
Either create a pasword or just press enter to have no password.

### Configure the ClickHouse data folder
This is an optional step to specify where ClickHouse should store its data.
I did this during my testing so that both ClickHouse and SigLens would use the 3.5 TB storage space.

Use `sudo vim /etc/clickhouse-server/config.xml` to change the line
`<path>/var/lib/clickhouse/</path>` to `<path>/mnt/nvme1n1/clickhouse/</path>`

### Run ClickHouse
```bash
sudo service clickhouse-server start
clickhouse-client
```

### Make the ClickHouse Table
```
CREATE TABLE trips (
    VendorID Int32,
    tpep_pickup_datetime DateTime,
    tpep_dropoff_datetime DateTime,
    passenger_count Int32,
    trip_distance Float32,
    RatecodeID Int32,
    store_and_fwd_flag FixedString(1),
    PULocationID Int32,
    DOLocationID Int32,
    payment_type FixedString(3),
    fare_amount Float32,
    extra Float32,
    mta_tax Float32,
    tip_amount Float32,
    tolls_amount Float32,
    improvement_surcharge Float32,
    total_amount Float32,
    congestion_surcharge Float32,
    airport_fee Float32)
ENGINE = MergeTree()
ORDER BY (tpep_pickup_datetime)
SETTINGS index_granularity=8192
```

### Ingest the Data
```
INSERT INTO trips
SELECT
    VendorID,
    tpep_pickup_datetime,
    tpep_dropoff_datetime,
    passenger_count,
    trip_distance,
    RatecodeID,
    store_and_fwd_flag,
    PULocationID,
    DOLocationID,
    payment_type,
    fare_amount,
    extra,
    mta_tax,
    tip_amount,
    tolls_amount,
    improvement_surcharge,
    total_amount,
    congestion_surcharge,
    airport_fee
FROM s3(
    's3://your-bucket/nyc-taxi-benchmark-data/tsv/yellow_tripdata_{2011..2017}-{01..12}.tsv.gz',
    'your_aws_access_key_id',
    'your_aws_secret_access_key',
    'TabSeparatedWithNames'
);
```

### Run the Queries in ClickHouse
```sql
# Query 1
SELECT airport_fee, count(*) FROM trips GROUP BY airport_fee

# Query 2
SELECT passenger_count, avg(total_amount) FROM trips GROUP BY passenger_count

# Query 3
SELECT passenger_count, PULocationID, count(*) FROM trips GROUP BY passenger_count, PULocationID

# Query 4
SELECT passenger_count, PULocationID, trip_distance, count(*)
FROM trips
GROUP BY passenger_count, PULocationID, trip_distance
```

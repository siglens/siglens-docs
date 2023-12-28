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
git clone https://github.com/sigscalr/sigscalr-client.git

cd siglens
```

### Enable AgileAggs
Append this to the `server.yaml` config file:
```yaml
agileAggsEnabled: true
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
    "tableName": "benchmark",
    "groupByColumns": ["cab_type", "passenger_count", "pickup_date", "trip_distance"],
    "measureColumns": ["total_amount"]
}' http://localhost/api/pqs/aggs
```
You should get this response:
```json
{"message":"All OK","status":200}
```

### Setup an ingestion script
In Terminal 2 run `cd /mnt/nvme1n1` and then save the following into ingester.py
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
    index_data = '{"index": {"_index": "benchmark", "_type": "_doc"}}'
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
Run the following script to download, decompress, and ingest the data into SigLens.
```bash
export NUM_FILES=20

cd sigscalr-client
mkdir benchmark_data
cd benchmark_data

# Download compressed data.
echo "Downloading $NUM_FILES of 20 files..."
for i in $(seq 0 $(($NUM_FILES - 1))); do
	wget "https://datasets-documentation.s3.eu-west-3.amazonaws.com/nyc-taxi/trips_$i.gz" &
done
wait

# Decompress.
gunzip trips_*gz

# Go back to the sigscalr-client base directory.
cd ..

# Convert to JSON.
for i in $(seq 0 $(($NUM_FILES - 1))); do
	go run cmd/utils/converter.go --input "benchmark_data/trips_$i" --output "benchmark_data/trips_$i.json" &
done
wait

# Ingest into SigLens.
for i in $(seq 0 $(($NUM_FILES - 1))); do
    python3 ../ingester.py benchmark_data/trips_$i.json &
done
wait
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
You can also append ` | python3 -m json.tool` to each curl request to format the responses nicely.
Check the log file `siglens/siglens.log` for the query times.
```bash
curl -X POST -d '{
    "searchText": "SELECT cab_type, count(*) FROM trips GROUP BY cab_type",
    "index": "benchmark",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost/api/search

curl -X POST -d '{
    "searchText": "SELECT passenger_count, avg(total_amount) FROM trips GROUP BY passenger_count",
    "index": "benchmark",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost/api/search

curl -X POST -d '{
    "searchText": "SELECT passenger_count, pickup_date, count(*) FROM trips GROUP BY passenger_count, pickup_date",
    "index": "benchmark",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost/api/search

curl -X POST -d '{
    "searchText": "SELECT passenger_count, pickup_date, trip_distance, count(*) FROM trips GROUP BY passenger_count, pickup_date, trip_distance",
    "index": "benchmark",
    "startEpoch": "now-24h",
    "endEpoch": "now",
    "queryLanguage": "SQL"
}' http://localhost/api/search
```

## Benchmark ClickHouse
### Ingest the data into ClickHouse

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

### Run ClickHouse
```bash
sudo service clickhouse-server start
clickhouse-client
```

### Make the ClickHouse Table
```
CREATE TABLE trips (
    trip_id UInt32,
    vendor_id Enum8('1' = 1, '2' = 2, 'CMT' = 3, 'VTS' = 4, 'DDS' = 5, 'B02512' = 10, 'B02598' = 11, 'B02617' = 12, 'B02682' = 13, 'B02764' = 14),
    pickup_date Date,
    pickup_datetime DateTime,
    dropoff_date Date,
    dropoff_datetime DateTime,
    store_and_fwd_flag UInt8,
    rate_code_id UInt8,
    pickup_longitude Float64,
    pickup_latitude Float64,
    dropoff_longitude Float64,
    dropoff_latitude Float64,
    passenger_count UInt8,
    trip_distance Float64,
    fare_amount Float32,
    extra Float32,
    mta_tax Float32,
    tip_amount Float32,
    tolls_amount Float32,
    ehail_fee Float32,
    improvement_surcharge Float32,
    total_amount Float32,
    payment_type_ Enum8('UNK' = 0, 'CSH' = 1, 'CRE' = 2, 'NOC' = 3, 'DIS' = 4),
    trip_type UInt8,
    pickup FixedString(25),
    dropoff FixedString(25),
    cab_type Enum8('yellow' = 1, 'green' = 2, 'uber' = 3),
    pickup_nyct2010_gid Int8,
    pickup_ctlabel Float32,
    pickup_borocode UInt8,
    pickup_boroname Enum8('' = 0, 'Manhattan' = 1, 'Bronx' = 2, 'Brooklyn' = 3, 'Queens' = 4, 'Staten Island' = 5),
    pickup_ct2010 FixedString(16),
    pickup_boroct2010 FixedString(7),
    pickup_cdeligibil Enum8(' ' = 0, 'E' = 1, 'I' = 2),
    pickup_ntacode FixedString(4),
    pickup_ntaname String,
    pickup_puma UInt16,
    dropoff_nyct2010_gid UInt8,
    dropoff_ctlabel Float32,
    dropoff_borocode UInt8,
    dropoff_boroname Enum8('' = 0, 'Manhattan' = 1, 'Bronx' = 2, 'Brooklyn' = 3, 'Queens' = 4, 'Staten Island' = 5),
    dropoff_ct2010 FixedString(16),
    dropoff_boroct2010 FixedString(7),
    dropoff_cdeligibil Enum8(' ' = 0, 'E' = 1, 'I' = 2),
    dropoff_ntacode FixedString(4),
    dropoff_ntaname String,
    dropoff_puma UInt16)
ENGINE = MergeTree()
ORDER BY (pickup_date, pickup_datetime)
SETTINGS index_granularity=8192
```

### Ingest the Data
```
INSERT INTO trips
SELECT
    trip_id,
    vendor_id,
    pickup_date,
    pickup_datetime,
    dropoff_date,
    dropoff_datetime,
    store_and_fwd_flag,
    rate_code_id,
    pickup_longitude,
    pickup_latitude,
    dropoff_longitude,
    dropoff_latitude,
    passenger_count,
    trip_distance,
    fare_amount,
    extra,
    mta_tax,
    tip_amount,
    tolls_amount,
    ehail_fee,
    improvement_surcharge,
    total_amount,
    payment_type_,
    trip_type,
    pickup,
    dropoff,
    cab_type,
    pickup_nyct2010_gid,
    pickup_ctlabel,
    pickup_borocode,
    pickup_boroname,
    pickup_ct2010,
    pickup_boroct2010,
    pickup_cdeligibil,
    pickup_ntacode,
    pickup_ntaname,
    pickup_puma,
    dropoff_nyct2010_gid,
    dropoff_ctlabel,
    dropoff_borocode,
    dropoff_boroname,
    dropoff_ct2010,
    dropoff_boroct2010,
    dropoff_cdeligibil,
    dropoff_ntacode,
    dropoff_ntaname,
    dropoff_puma
FROM s3(
    'https://datasets-documentation.s3.eu-west-3.amazonaws.com/nyc-taxi/trips_{0..19}.gz',
    'TabSeparatedWithNames'
);
```

### Run the Queries in ClickHouse
```sql
# Query 1
SELECT cab_type, count(*) FROM trips GROUP BY cab_type

# Query 2
SELECT passenger_count, avg(total_amount) FROM trips GROUP BY passenger_count

# Query 3
SELECT passenger_count, pickup_date, count(*) FROM trips GROUP BY passenger_count, pickup_date

# Query 4
SELECT passenger_count, pickup_date, trip_distance, count(*)
FROM trips
GROUP BY passenger_count, pickup_date, trip_distance
```


# Filebeat
*Ingesting logs into Siglens using Filebeat*

Filebeat is a lightweight, open-source log shipper from Elastic that forwards and centralizes log data. Installed as an agent on your servers, Filebeat monitors the log files or locations that you specify, collects log events, and forwards them to either Elasticsearch or Logstash for indexing.

In this guide, we will walk through the process of using Filebeat to send logs to Siglens.

> :warning: **Note:** For Linux Systems, the Filebeat might not work due to the Go version used in the specific Filebeat version, which prevents the creation of a new thread on Linux OS. The related issue can be found [here](https://github.com/docker-library/golang/issues/467).

## 1. Install Filebeat

Download the [`filebeat-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/filebeat-oss-7-9-3) version and extract it to the appropriate directory based on your OS.

### Linux based Systems

The installation method depends on the type of Linux distribution you are using.

For Debian-based systems (like Ubuntu), you can use the `.deb` package with the following command:

```bash
sudo dpkg -i filebeat-oss-7.9.3-amd64.deb
```

For Red Hat-based systems (like CentOS or Fedora), you would use the `.rpm` package.
```bash 
sudo rpm -ivh filebeat-oss-7.9.3-x86_64.rpm
```
For other Linux based systems, you would use the `.tar.gz` file.

```bash
tar xzvf filebeat-oss-7.9.3-linux-x86_64.tar.gz
```

### Windows

- Download the Zip version, extract the contents into ```C:\Program Files```, rename the directory to Filebeat, and run the following commands as an Administrator to install Filebeat as a Windows service:

```bash
PS > cd 'C:\Program Files\Filebeat'
PS C:\Program Files\Filebeat> .\install-service-filebeat.ps1
```

- More details about the installation process can be found [here](https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-installation-configuration.html)

## 2. Configure Filebeat
- Create a Filebeat config file with the below [sample configuration](#sample-configuration-file).
- If you are looking for a sample log dataset you can download it from [here](https://github.com/siglens/pub-datasets/releases/download/v1.0.0/2kevents.json.tar.gz) and untar it.

### Sample Configuration File

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - C:\Program Files\Filebeat\2kevents.json # Ensure this is the correct path

output.elasticsearch:
  # Custom Elasticsearch endpoint
  hosts: ['http://localhost:8081/elastic/']
  index: 'filebeat-ind-0' # Custom index name

# Template settings (adjust if you're managing templates externally)
# setup.template.name: "filebeat"
# setup.template.pattern: "filebeat-ind-*"

# Disable template management
setup.template.enabled: false

# Disable ilm
setup.ilm.enabled: false
# Set log level as debug for more detailed logging.
# logging.level: debug
```

## 3. Run Filebeat

For Linux, navigate to the Filebeat directory and run 
```bash
sudo filebeat -e -c /home/filebeat-config/filebeat.yaml
```
If you've installed Filebeat by extracting it from a `.tar.gz` file, or if filebeat is not in your PATH for any other reason, you might need to provide the full path to the filebeat binary, like this:

```bash
sudo ./filebeat-oss-7.9.3-linux-x86_64/filebeat -e -c /home/filebeat-config/filebeat.yaml
```

For Windows, open a PowerShell prompt as an Administrator, navigate to `C:\Program Files\Filebeat`, and run 
```bash
.\filebeat.exe -e -c D:\Siglens\filebeat_elasticsearch.yml
```

The `-e` argument is optional and is used for logging.

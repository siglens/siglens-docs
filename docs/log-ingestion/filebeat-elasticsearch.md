# Filebeat

> :warning: **Note:** For Linux Systems, the Filebeat will not work due to the Go version used in the specific Filebeat version, which prevents the creation of a new thread on Linux OS. The related issue can be found [here](https://github.com/docker-library/golang/issues/467).

## 1. Installation

Download the [`filebeat-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/filebeat-oss-7-9-3) version and extract it to the appropriate directory based on your OS.

### Linux based Systems
Run either of the following commands:

```bash
sudo dpkg -i filebeat-oss-7.9.3-amd64.deb
```
OR

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

## 2. Configuration

### Sample Configuration File

```yaml
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - C:\Program Files\Filebeat\SplunkExport.json # Ensure this is the correct path

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

## 3. Run Filebeat Config

For Linux, navigate to the Filebeat directory and run 
```bash
sudo filebeat -e -c /home/filebeat-config/filebeat.yaml
```

For Windows, open a PowerShell prompt as an Administrator, navigate to `C:\Program Files\Filebeat`, and run 
```bash
.\filebeat.exe -e -c D:\Siglens\filebeat_elasticsearch.yml
```

The `-e` argument is optional and is used for logging.

# Metricbeat

*Ingesting metrics into Siglens using Metricbeat*

> :warning: **Note:** For Linux Systems, the Metricbeat will not work due to the Go version used in the specific Metricbeat version, which prevents the creation of a new thread on Linux OS. The related issue can be found [here](https://github.com/docker-library/golang/issues/467).

## 1. Install Metricbeat

Download the [`metricbeat-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/metricbeat-oss-7-9-3) version and extract it to the appropriate directory based on your OS.

### Linux based Systems
Run either of the following commands:
```bash
sudo dpkg -i metricbeat-oss-7.9.3-amd64.deb
```
OR

```bash
tar xzvf metricbeat-oss-7.9.3-linux-x86_64.tar.gz
```

### Windows
- Download the Zip version, extract the contents into ```C:\Program Files```, rename the directory to Metricbeat, and run the following commands as an Administrator to install Metricbeat as a Windows service:

```bash
PS > cd 'C:\Program Files\Metricbeat'
PS C:\Program Files\Metricbeat> .\install-service-metricbeat.ps1
```

- More details about the installation process can be found [here](https://www.elastic.co/guide/en/beats/metricbeat/7.9/metricbeat-installation-configuration.html)

## 2. Configure Metricbeat

### Sample Configuration

```yaml
metricbeat.modules:
  - module: nginx
    metricsets: ['stubstatus']
    enabled: true
    # The interval in seconds to poll each endpoint.
    period: 10s

    # Nginx hosts
    hosts: ['http://127.0.0.1']

    # Path to server status. Default nginx_status
    server_status_path: 'nginx_status'

output.elasticsearch:
  # Replace with your custom Elasticsearch endpoint
  hosts: ['http://localhost:8081/elastic/']
  index: 'metricbeat-ind-0' # Custom index name

# Disable template management
setup.template.enabled: false

# Disable ilm
setup.ilm.enabled: false
# logging.level: debug
```

## 3. Run Metricbeat

For Linux, navigate to the Metricbeat directory and run 
```bash
sudo metricbeat -e -c /home/metricbeat-config/metricbeat.yaml
```

For Windows, open a PowerShell prompt as an Administrator, navigate to `C:\Program Files\Metricbeat`, and run 

```bash
.\metricbeat.exe -e -c D:\Siglens\metricbeat_elasticsearch.yml
```

The `-e` argument is optional and is used for logging.

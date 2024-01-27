# Metricbeat

Metricbeat can be used to ingest logs into Elasticsearch from various servers like Nginx, apache, etc. Read more about [metricbeat here](https://www.elastic.co/guide/en/beats/metricbeat/7.9/metricbeat-overview.html).

- SigLens can be ingested data in Elasticsearch format through Metricbeat. Install Metricbeat. Learn more about [installation here](#install-metricbeat).
- Make sure that the `endpoints` in the configuration has the `/elastic` suffix.
- Create a metricbeat config file with the below [sample configuration](#sample-configuartion). Read more about [Metricbeat Config file](#metricbeat-configuartion) below.
- Run the command: `metricbeat -c filebeat_config.yaml`. Read more about [running metricbeat config](#run-metricbeat-config) below.

**Note:** For Linux Systems, Please read the [NOTICE section](#metricbeat-notice) below before proceeding with installation.

## Install Metricbeat

- Download this exact version of Metricbeat: [`metricbeat-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/metricbeat-oss-7-9-3). It is important to download this version, as this is the version that is compatible with Siglens Elasticsearch version: `7.9.3`.
- The Metricbeat has multiple options to choose from for different OS-based systems.
- Once the Metricbeat version is downloaded. Use the below commands to install on depending on the OS.

### Linux based Systems

```bash
sudo dpkg -i metricbeat-oss-7.9.3-amd64.deb
# OR
tar xzvf metricbeat-oss-7.9.3-linux-x86_64.tar.gz
```

### Windows

- Download the Zip version.
- Extract the contents of the zip file into C:\Program Files.
- Rename the metricbeat-oss-7.9.3-windows-x86_64 directory to Metricbeat.
- Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select **Run As Administrator**).
- From the PowerShell prompt, run the following commands to install Metricbeat as a Windows service:

```bash
PS > cd 'C:\Program Files\Metricbeat'
PS C:\Program Files\Metricbeat> .\install-service-metricbeat.ps1
```

- Read more about the installation process [here](https://www.elastic.co/guide/en/beats/metricbeat/7.9/metricbeat-installation-configuration.html)
- But Remember to use the version mentioned above.

## Metricbeat Configuartion

- The input for a Metricbeat is a list of modules of servers from where the Metricbeat will poll and ingest data.
- The hosts endpoints should be: [http://localhost:8081/elastic/]
- Read different supported modules by Metricbeat [here](https://www.elastic.co/guide/en/beats/metricbeat/7.9/metricbeat-modules.html)
- The below example shows the setup of collecting Nginx metrics from a Nginx server and ingesting the metrics to Siglens.

## Sample Configuartion

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
  index: 'filebeat-ind-0' # Custom index name

# Disable template management
setup.template.enabled: false

# Disable ilm
setup.ilm.enabled: false
# logging.level: debug
```

## Run Metricbeat Config

- ### Linux based systems

  - `sudo metricbeat -e -c <<path-of-metricbeat-config>>`
  - -e is an optional argument that is used for logging.
  - The example below assumes that your Metricbeat config file is at /home/metricbeat-config/metricbeat.yaml

  ```bash
  sudo metricbeat -e -c /home/metricbeat-config/metricbeat.yaml
  ```

- ### Windows

  - Navigate to the Path where Metricbeat is.
  - As per the above setup, it is at `C:\Program Files\Metricbeat`
  - Then run command: `.\metricbeat.exe -e -c <<path-of-metricbeat-config>>`
  - -e is an optional argument that is used for logging.
  - The example below assumes that your Metricbeat config file is at D:\Siglens\filebeat_elasticsearch.yml
  - Note: Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select **Run As Administrator**).

  ```bash
  PS > cd 'C:\Program Files\Metricbeat'
  PS C:\Program Files\Metricbeat>.\metricbeat.exe -e -c D:\Siglens\filebeat_elasticsearch.yml
  ```

## Metricbeat NOTICE

- The Metricbeat will not work on Linux-based systems because of the go version that is being used in that specific Metricbeat version, which the Linux OS is not allowing the creation of a new thread.
- The image shows the error. The related issue of this can be found here: https://github.com/docker-library/golang/issues/467

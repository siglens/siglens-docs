# Filebeat

Filebeat can be used to ingest logs into Elasticsearch from a file. Read more about [filebeat here](https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-overview.html).

- SigLens can be ingested data in Elasticsearch format through Filebeat. Install Filebeat. Learn more about [installation here](#install-filebeat).
- Make sure that the `endpoints` in the configuration has the `/elastic` suffix.
- Create a filebeat config file with the below [sample configuration](#sample-configuration). Read more about [Filebeat Config file](#filebeat-configuartion) below.
- Run the command: `filebeat -c filebeat_config.yaml`. Read more about [running filebeat config](#run-filebeat-config) below.

**Note:** For Linux Systems, please read the [NOTICE section](#filebeat-notice) below before proceeding with installation.

## Install Filebeat

- Download this exact version of Filebeat: [`filebeat-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/filebeat-oss-7-9-3). It is important to download this version, as this is the version that is compatible with Siglens Elasticsearch version: `7.9.3`.
- The Filebeat has multiple options to choose from for different OS-based systems.
- Once the Filebeat version is downloaded. Use the below commands to install on depending on the OS.

### Linux based Systems

```bash
sudo dpkg -i filebeat-oss-7.9.3-amd64.deb
# OR
tar xzvf filebeat-oss-7.9.3-linux-x86_64.tar.gz
```

### Windows

- Download the Zip version.
- Extract the contents of the zip file into C:\Program Files.
- Rename the filebeat-oss-7.9.3-windows-x86_64 directory to Filebeat.
- Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select **Run As Administrator**).
- From the PowerShell prompt, run the following commands to install Filebeat as a Windows service:

```bash
PS > cd 'C:\Program Files\Filebeat'
PS C:\Program Files\Filebeat> .\install-service-filebeat.ps1
```

- Read more about the installation process [here](https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-installation-configuration.html)
- But Remember to use the version mentioned above.

## Filebeat Configuartion

- The input for a Filebeat is a list of file paths.
- Filebeat will track those files and will ingest data into the output.
- The hosts endpoints should be: [http://localhost:8081/elastic/]
- Read more about Filebeat Inputs and configuration from [here](https://www.elastic.co/guide/en/beats/filebeat/7.9/configuration-filebeat-options.html)

## Sample Configuartion

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

## Run Filebeat Config

- ### Linux based systems

  - `sudo filebeat -e -c <<path-of-filebeat-config>>`
  - -e is an optional argument that is used for logging.
  - The example below assumes that your Filebeat config file is at /home/filebeat-config/filebeat.yaml

  ```bash
  sudo filebeat -e -c /home/filebeat-config/filebeat.yaml
  ```

- ### Windows

  - Navigate to the Path where Filebeat is.
  - As per the above setup, it is at `C:\Program Files\Filebeat`
  - Then run command: `.\filebeat.exe -e -c <<path-of-filebeat-config>>`
  - -e is an optional argument that is used for logging.
  - The example below assumes that your Filebeat config file is at D:\Siglens\filebeat_elasticsearch.yml
  - Note: Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select **Run As Administrator**).

  ```bash
  PS > cd 'C:\Program Files\Filebeat'
  PS C:\Program Files\Filebeat>.\filebeat.exe -e -c D:\Siglens\filebeat_elasticsearch.yml
  ```

## Filebeat NOTICE

- The Filebeat will not work on Linux-based systems because of the go version that is being used in that specific Filebeat version, which the Linux OS is not allowing the creation of a new thread.
- The image shows the error. The related issue of this can be found here: https://github.com/docker-library/golang/issues/467

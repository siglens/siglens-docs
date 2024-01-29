# Elasticsearch

- Siglens can be ingested data in Elasticsearch format using Logstash. Install Logstash. Read more about installation [here](#install-logstash).
- Make sure that the `hosts` in the configuration has the `/elastic` suffix.
- Create a logstash config file with the below [sample configuration](#sample-configuration). Read more about [Logstash Config file](#logstash-configuration) below.
- Run the command: `logstash -c logstah_config.conf`. Read more about [running logstash config](#run-logstash-config) below.

## Install Logstash

- Download this exact version of [Logstash: `logstash-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/logstash-oss-7-9-3). It is important to download this version, as this is the version that is compatible with Siglens Elasticsearch version: `7.9.3`.
- Logstash has multiple options to choose from for different OS-based systems.
- Once the Logstash is downloaded. Use the below commands to install on depending on the OS.
- Read more about installation from official docs [here](https://www.elastic.co/guide/en/logstash/7.9/configuration.html).

### Linux based Systems

```bash
sudo dpkg -i logstash-oss-7.9.3-amd64.deb
# OR
tar xzvf logstash-oss-7.9.3-linux-x86_64.tar.gz
```

### Windows

- Download the Zip version.
- Extract the contents of the zip file into C drive.
- Rename the directory to Logstash.
- Open a PowerShell prompt as an Administrator (right-click the PowerShell icon and select **Run As Administrator**).
- From the PowerShell prompt, run the following commands to install Filebeat as a Windows service:

```bash
PS > cd 'C:\Logstash'
PS C:\Logstash> bin/logstash --version
```

- The above command should print the logstash version.

### JVM Options

- In the Logstash directory, there is a config directory containing the file `jvm.options`.
- The below lines may need to be appened to the `jvm.options` for the logstash to work properly.

#### Append at the end of Logstash/config/jvm.options

```options
--add-opens java.base/sun.nio.ch=ALL-UNNAMED
--add-opens java.base/java.io=ALL-UNNAMED

--add-opens java.base/sun.nio.ch=ALL-UNNAMED
--add-opens java.base/java.io=ALL-UNNAMED
--add-opens java.base/java.security=ALL-UNNAMED
```

## Logstash Configuration

- Logstash can take input from various sources. The sample configuration below is configured to take the input from a file. Read more about Logstash [input plugins here](https://www.elastic.co/guide/en/logstash/7.9/input-plugins.html).
- Filter plugins can be used to mutate the input data. Read more about it [here](https://www.elastic.co/guide/en/logstash/7.9/filter-plugins.html).
- The output plugin is configured to elasticsearch and the hosts should have the suffix `/elastic`. So `hosts => ["http://127.0.0.1:8081/elastic/"]`. Read more about elasticsearch and other [output plugins here](https://www.elastic.co/guide/en/logstash/7.9/plugins-outputs-elasticsearch.html).

## Sample Configuration

```conf
input {
  file {
    path => "D:/Siglens/SplunkExport.json"
    start_position => "beginning"
  }
}

output {
  elasticsearch {
    hosts => ["http://127.0.0.1:8081/elastic/"]
    index => "logstash-logs-%{+YYYY.MM.dd}"
    ilm_enabled => false
    manage_template => false
  }
}
```

## Run Logstash Config

- Navigate to Logstash folder.
- Then run the command: `bin/logstash -f <<path-of-logstash-config>>`
- On Linux systems, use `sudo` before the command.
- Windows should open or run the command prompt or power shell as an **Administrator**.
- The example below assume the config is in the Logstash directory.

- ### Linux based systems

  ```bash
  sudo bin/logstash -f ./logstash_config.conf
  ```

- ### Windows

  - Open the command prompt or power shell as an **Administrator** and navigate to the Logstash directory.

  ```bash
  bin/logstash -f ./logstash_config.conf
  ```

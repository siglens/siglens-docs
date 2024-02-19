# Splunk

- Siglens can ingest data in Splunk format using Logstash through the http plugin. Read more about installation [here](#install-logstash).
- The `hosts` in the configuration should be the Splunk HEC event collector endpoint: `/splunk/services/collector/event`.
- Create a logstash config file with the below [sample configuration](#sample-configuration). Read more about [Logstash Config file](#logstash-configuration) below.
- Run the command: `logstash -c logstash_config.conf`. Read more about [running logstash config](#run-logstash-config) below.

## Install Logstash

- Download Logstash-OSS version from [here](https://www.elastic.co/downloads/logstash-oss) or check [official docs](https://www.elastic.co/guide/en/logstash/current/index.html) to know more on installing Logstash.
- Logstash has multiple options to choose from for different OS-based systems.
- Once the Logstash is downloaded. Use the below commands to install on depending on the OS.
- The below procedure assumes that the logstash-oss version is 7.9.3.

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
- The below lines _may need to be appened to the `jvm.options` for the logstash_ to work properly.

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
- The output plugin is configured to http since Logstash do not directly have a Splunk output plugin.
  - The url must be set to `http://localhost:8081/splunk/services/collector/event`.
  - The http method is `post`.
  - The headers will have the default Splunk Token.
- Read more about http and other [output plugins here](https://www.elastic.co/guide/en/logstash/7.9/plugins-outputs-elasticsearch.html).

## Sample Configuration

```conf
input {
  file {
    path => "D:/Siglens/SplunkExport3.json"
    start_position => "beginning"
  }
}

filter {
  mutate {
    add_field => {
      "index" => "logstash3_splunk_access_logs"
      "source" => "logstash3_source"
    }
  }
  date {
    match => [ "logdate", "ISO8601" ]
    target => "@timestamp"
  }
}

output {
  http {
    format => "json"
    content_type => "application/json"
    http_method => "post"
    url => "http://localhost:8081/splunk/services/collector/event"
    headers => ['Authorization', 'A94A8FE5CCB19BA61C4C08']
  }
}
```

## Run Logstash

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

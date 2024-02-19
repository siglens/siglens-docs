# Logstash
*Ingesting logs into Siglens using Logstash*

## 1. Install Logstash

- Download Logstash-OSS version from [here](https://www.elastic.co/downloads/logstash-oss) and install using the procedure below
### Linux based Systems

```bash
sudo dpkg -i logstash-oss-7.9.3-amd64.deb
# OR
tar xzvf logstash-oss-7.9.3-linux-x86_64.tar.gz
```

### Windows

- Download the Zip version of Logstash, extract its contents into the C drive, rename the directory to "Logstash", then open a PowerShell prompt as an Administrator and run the below commands to install Logstash as a Windows service

```bash
PS > cd 'C:\Logstash'
PS C:\Logstash> bin/logstash --version
```

### JVM Options

#### Append at the end of Logstash/config/jvm.options

```options
--add-opens java.base/sun.nio.ch=ALL-UNNAMED
--add-opens java.base/java.io=ALL-UNNAMED

--add-opens java.base/sun.nio.ch=ALL-UNNAMED
--add-opens java.base/java.io=ALL-UNNAMED
--add-opens java.base/java.security=ALL-UNNAMED
```

## 2. Configure Logstash

- Create a logstash config file with the below [sample configuration](#sample-configuration-file). 
- If you are looking for a sample log dataset you can download it from [here](https://github.com/siglens/pub-datasets/releases/download/v1.0.0/2kevents.json.tar.gz) and untar it.

### Sample Configuration file

```conf
input {
  file {
    path => "D:/Siglens/2kevents.json"
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

## 3. Run Logstash

- Run `bin/logstash -f <<path-of-logstash-config>>` in the logstash directory (prepend with sudo on Linux, or run as Administrator on Windows).

- ### Linux based systems

  ```bash
  # Assuming the config is in the Logstash directory
  sudo bin/logstash -f ./logstash_config.conf
  ```

- ### Windows

  ```bash
  # Assuming the config is in the Logstash directory
  bin/logstash -f ./logstash_config.conf
  ```

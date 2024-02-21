# Logstash

*Migrating from Elastic Search to Siglens using Logstash*

## 1. Install Logstash

## Install Logstash

- Download this exact version of [Logstash: `logstash-oss-7.9.3`](https://www.elastic.co/downloads/past-releases/logstash-oss-7-9-3).

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

### Sample Configuration file

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

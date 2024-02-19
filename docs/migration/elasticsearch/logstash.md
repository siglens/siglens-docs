# Logstash

*Migrating from Elastic Search to Siglens using Logstash*

## 1. Installation

Begin by installing Logstash using the instructions provided [here](../../log-ingestion/logstash-splunk.md#1-installation). Once installed, you can refer back to this guide for configuration and starting Logstash.

## 2. Configuration

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

## 3. Run Logstash Config

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

# Fluentd
*Ingesting logs into Siglens using Fluentd*

## 1. Install Fluentd

- Follow the instructions to install the Fluentd package from the [official docs](https://docs.fluentd.org/installation).

    - [Debian/Ubuntu](https://docs.fluentd.org/installation/install-by-deb#installing-fluent-package)
    - [macOS](https://docs.fluentd.org/installation/obsolete-installation/treasure-agent-v4-installation/install-by-dmg-td-agent-v4)
    - [Windows](https://docs.fluentd.org/installation/install-by-msi)

## 2. Configure Fluentd

- Create a Fluentd config file with the below [sample configuration](#sample-configuration-file). 

### Sample Configuration File

```conf
<source>
  @type tail
  path D:\Siglens\data\Android_2k.log
  pos_file D:\Siglens\fluentd_logs\Android_2k.log.pos
  tag my.logs
  read_from_head true
  <parse>
    @type regexp
    expression /^(?<Date>\d{2}-\d{2})\s(?<Time>\d{2}:\d{2}:\d{2}.\d{3})\s+(?<Pid>\d+)\s+(?<Tid>\d+)\s+(?<Level>\w+)\s(?<Component>[^:]+):\s(?<Content>.*)$/
    time_format %m-%d %H:%M:%S.%L
  </parse>
</source>

<filter my.logs>
  @type record_transformer
  <record>
    index "fluentd_http"
  </record>
</filter>

<match my.logs>
  @type http

  endpoint http://127.0.0.1:8081/splunk/services/collector/event?source=fluentd_source
  open_timeout 2
  <headers>
    Authorization "A94A8FE5CCB19BA61C4C08"
    Content-Type "application/json"
  </headers>
  <format>
    @type json
  </format>
  <buffer>
    chunk_limit_records 1
    flush_interval 10s
  </buffer>
</match>
```

## 3. Run Fluentd

Navigate to the Fluentd directory and run `fluentd -c <<path-of-fluentd-config>>`. On Linux, prepend the command with `sudo`. If using td-agent, replace `fluentd` with `td-agent`. On Windows, run the command as an Administrator.

- **Linux**: 
    ```bash
    sudo fluentd -c /home/fluentd_config.conf
    ```
- **Windows**: Open the fluentd command prompt as an Administrator and run 
  ```bash
  fluentd -c /home/fluentd_config.conf
  ```
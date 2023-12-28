# Fluentd/Fluentbit

### How to integrate Fluentd locally

 1. Append this to your `td-agent.conf `.
 2. You can send a sample log in json format like `{"hello2":"world"}`.
 3. You can run the command `tail -f /var/log/td-agent/td-agent.log`
 4. Make sure the ES Version in `server.yaml` matches the version of ES Fluentd plugin version.

 ```
 <source>
    @type sample
    sample {"hello2":"world"}
    tag "siglens"
  </source>
  <match siglens>
    @type elasticsearch
    host "localhost"
    port 8081
    path "/elastic"
    index_name "test"
    <buffer>
      flush_mode interval
      flush_interval 1s
    </buffer>
  </match>
 ```
 
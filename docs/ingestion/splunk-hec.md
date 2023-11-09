---
sidebar_position: 7
---

# Splunk HEC

- Make sure that the `endpoints` in the configuration has the `/splunk`suffix. 
- Create a vector.yaml file which will contain the configurations. Add the below configuration code to vector.yaml file
- Run the command: `vector --config vector.yaml`
```
data_dir: /opt/homebrew/var/lib/vector/
sources:
  my_source_id:
    type: demo_logs
    format: json
    count: 1
sinks:
  siglens:
    type: splunk_hec_logs
    inputs:
      - my_source_id
    endpoint: http://localhost:8081/splunk/
    host_key: hostname
    index: "ind-0"
    indexed_fields:
      - index
    timestamp_key: time
    compression: none
    encoding:
      codec: json
    default_token: "A94A8FE5CCB19BA61C4C08"

```
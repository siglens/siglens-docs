# Vector

*Migrating from Splunk to SigLens using Vector*

## 1. Install Vector

Begin by installing Vector using the instructions provided [here](../../log-ingestion/vector.md#1-installation). Once installed, you can refer back to this guide for configuration and starting Vector.

## 2. Configure Vector

Store the following example config in `vector.yaml`.

```yaml
data_dir: /var/lib/vector
sources:
  my_source_id:
    type: file
    include:
      - /mnt/d/Siglens/SplunkExport3.json
    read_from: beginning

  # The type: "demo_logs" will generate syslog logs
  generate_syslog:
    type: 'demo_logs'
    format: 'syslog'
    count: 2

# Transforms Reference: Transform the data from Sources into desired format
transforms:
  remap_file_log:
    inputs:
      - 'my_source_id'
    type: 'remap'
    # The path to the file containing the remap rules. Parsing the message which is the data read from the file.
    # The parsed json is stored in the structured variable. The structured variable is merged with the other data/fields.
    source: |
      structured = parse_json!(.message)
      ., err = merge(., structured)

sinks:
  siglens:
    type: splunk_hec_logs
    inputs:
      - generate_syslog
      - remap_file_log
    endpoint: http://localhost:8081
    host_key: hostname
    index: 'ind-0'
    indexed_fields:
      - index
    timestamp_key: time
    compression: none
    encoding:
      codec: json
    default_token: 'A94A8FE5CCB19BA61C4C08'
    batch:
      max_events: 1
```
For in-depth information on Vector configuration, visit the [official vector documentation](https://vector.dev/docs/reference/configuration/).


## 3. Run Vector

Vector needs to be started with the `--config` argument to specify the path to the configuration file. Run the following command:

```bash
vector --config vector.yaml

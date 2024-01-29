# Splunk-HEC-Logs

- SigLens is compatible with the Splunk-hec-logs plugin for vector. Install vector and start it. Learn more about [installation here](./vector-install).
- Make sure that the `endpoints` in the configuration has the `/splunk`suffix.
- Create a vector config file with the below [sample configuration](#sample-configuration). Read more about [Vector Config file](#vector-configuration) below.
- Run the command: `vector --config vector.yaml`.

## Vector Configuration

For in-depth information on Vector configuration, visit the [official Vector documentation](https://vector.dev/docs/reference/configuration/).

Vector supports configuration files in `YAML`, `TOML`, and `JSON` formats. Here we provide examples in `YAML`

- ### Sources

  The `sources` component in a Vector configuration specifies where Vector should collect data. This can be from files, servers, services, and other inputs. See the [supported source types](https://vector.dev/docs/reference/configuration/sources/) in Vector documentation.

  - #### Example Sources

    Since the output sink is `splunk_hec_logs`, we can only give the input sources related to logs. Below are some of the examples given in the sample configuration.

    - `demo_logs`: Generates sample logs in a specified format.
    - `file`: Reads and monitors data from a file system.

- ### Transforms

  Transforms allow you to parse and transform data into the desired format. For more details, visit [Vector transforms documentation](https://vector.dev/docs/reference/configuration/transforms/).

- ### Sinks

  The `sinks` component defines the destination for data processed by Vector. It's the final stage of the data pipeline.

  - #### Example Sink: Splunk HEC Logs

    - `type`: Specifies the sink type, for instance, `splunk_hec_logs`.
    - `inputs`: References the sources or transforms from which the sink should collect data.
    - `endpoint`: The ingestion endpoint for data. For Siglens' Splunk, the default ingestion port is `8081`, with the ingestion route being `/splunk`.

  Learn more about Splunk HEC Logs sink configuration in the [Vector sinks documentation](https://vector.dev/docs/reference/configuration/sinks/splunk_hec_logs/).

## Sample Configuration

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
    endpoint: http://localhost:8081/splunk/
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

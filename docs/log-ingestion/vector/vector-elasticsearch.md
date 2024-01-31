# Elasticsearch

- SigLens is compatible with the Elasticsearch plugin for vector. Install vector and start it. Learn more about [installation here](./vector-install).
- Make sure that the `endpoints` in the configuration has the `/elastic` suffix.
- Create a vector config file with the below [sample configuration](#sample-configuration). Read more about [Vector Config file](#vector-configuration) below.
- Run the command: `vector --config vector.yaml`.

## Vector Configuration

For in-depth information on Vector configuration, visit the [official Vector documentation](https://vector.dev/docs/reference/configuration/).

Vector supports configuration files in `YAML`, `TOML`, and `JSON` formats. Here we provide examples in `YAML` and `JSON`.

- ### Sources

  The `sources` component in a Vector configuration specifies where Vector should collect data. This can be from files, servers, services, and other inputs. See the [supported source types](https://vector.dev/docs/reference/configuration/sources/) in Vector documentation.

  - #### Example Sources

    The below config will contain the setup about these sources.

    - `demo_logs`: Generates sample logs in a specified format.
    - `nginx_metrics`: Collects data from a specified Nginx server endpoint.
    - `file`: Reads and monitors data from a file system.

- ### Transforms

  Transforms allow you to parse and transform data into the desired format. For more details, visit [Vector transforms documentation](https://vector.dev/docs/reference/configuration/transforms/).

- ### Sinks

  The `sinks` component defines the destination for data processed by Vector. It's the final stage of the data pipeline.

  - #### Example Sink: Elasticsearch

    - `type`: Specifies the sink type, for instance, `elasticsearch`.
    - `inputs`: References the sources or transforms from which the sink should collect data.
    - `endpoint`: The ingestion endpoint for data. For Siglens' Elasticsearch, the default ingestion port is `8081`, with the ingestion route being `/elastic`.

  Additional parameters for sinks, such as request parameters, are optional. Learn more about Elasticsearch sink configuration in the [Vector sinks documentation](https://vector.dev/docs/reference/configuration/sinks/elasticsearch/).

## Sample Configuration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<html>
<Tabs
  defaultValue="yaml"
  values=
  {
    [
      { label: 'YAML', value: 'yaml', },
      { label: 'JSON', value: 'json', },
    ]
  }
>
<TabItem value="yaml">

```yaml
# The directory used for persisting Vector state, such as on-disk buffers, file checkpoints, and more. Please make sure the Vector project has write permissions to this directory.
data_dir: /var/lib/vector

# Sources Reference
sources:
  # The type: "demo_logs" will generate apache_common logs
  generate_apache_common:
    type: 'demo_logs'
    format: 'apache_common'
    count: 50
    interval: 1
    lines:
      - line1

  # The type: "demo_logs" will generate syslog logs
  generate_syslog:
    type: 'demo_logs'
    format: 'syslog'
    count: 12

  nginx_metrics:
    type: 'nginx_metrics'
    # A list of NGINX instances to scrape metrics from.
    # Each endpoint must be a valid HTTP/HTTPS URI pointing to an NGINX instance that has the ngx_http_stub_status_module module enabled.
    endpoints:
      - 'http://127.0.0.1/nginx_status'
    namespace: 'nginx'
    # The interval in seconds to poll each endpoint.
    scrape_interval_secs: 5

  # The type: "file" will read the data from the file
  read_from_file:
    type: file
    include:
      - /mnt/d/Siglens/SplunkExport.json
    read_from: beginning

# Transforms Reference: Transform the data from Sources into desired format
transforms:
  remap_file_log:
    inputs:
      - 'read_from_file'
    type: 'remap'
    # The path to the file containing the remap rules. Parsing the message which is the data read from the file.
    # The parsed json is stored in the structured variable. The structured variable is merged with the other data/fields.
    source: |
      structured = parse_json!(.message)
      ., err = merge(., structured)

# Sinks Reference: Ingest the data from Sources to Siglens Sink
sinks:
  siglens:
    # The request parameters are optional.
    request:
      concurrency: 'adaptive'
      rate_limit_duration_secs: 1
      rate_limit_num: 10
      retry_attempts: 3
    type: 'elasticsearch'
    # The inputs sources name to ingest the data. This is a list of sources. You can add multiple sources.
    inputs:
      - 'remap_file_log'
      #- "nginx_metrics"
      - 'generate_apache_common'
      #- "generate_syslog"
    # The ingestion endpoint of Siglens
    endpoints:
      - http://localhost:8081/elastic/
    id_key: hostname
    compression: none
    mode: bulk
    query:
      X-Powered-By: Vector
    healthcheck:
      enabled: false
```

</TabItem>

<TabItem value="json">
```json
{
  "data_dir": "/var/lib/vector",
  "sources": {
      "generate_apache_common": {
          "type": "demo_logs",
          "format": "apache_common",
          "count": 50,
          "interval": 1,
          "lines": [
              "line1"
          ]
      },
      "generate_syslog": {
          "type": "demo_logs",
          "format": "syslog",
          "count": 12
      },
      "nginx_metrics": {
          "type": "nginx_metrics",
          "endpoints": [
              "http://3.139.99.91/nginx_status"
          ],
          "namespace": "nginx",
          "scrape_interval_secs": 5
      },
      "read_from_file": {
          "type": "file",
          "include": [
              "./migration1/SplunkExport.json"
          ],
          "read_from": "beginning"
      }
  },
  "transforms": {
      "remap_file_log": {
          "inputs": [
              "read_from_file"
          ],
          "type": "remap",
          "source": "structured = parse_json!(.message) ., err = merge(., structured)"
      }
  },
  "sinks": {
      "siglens": {
          "request": {
              "concurrency": "adaptive",
              "rate_limit_duration_secs": 1,
              "rate_limit_num": 10,
              "retry_attempts": 3
          },
          "type": "elasticsearch",
          "inputs": [
              "nginx_metrics"
          ],
          "endpoints": [
              "http://localhost:8081/elastic/"
          ],
          "id_key": "hostname",
          "compression": "none",
          "mode": "bulk",
          "query": {
              "X-Powered-By": "Vector"
          },
          "healthcheck": {
              "enabled": false
          }
      }
  }
}
```
</TabItem>
</Tabs>

</html>

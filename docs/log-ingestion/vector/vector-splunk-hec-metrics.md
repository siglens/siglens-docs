# Splunk-HEC-Metrics

- SigLens is compatible with the Splunk-hec-metrics plugin for vector. Install vector and start it. Learn more about [installation here](./vector-install).
- Make sure that the `endpoints` in the configuration has the `/splunk`suffix.
- Create a vector config file with the below [sample configuration](#sample-configuration). Read more about [Vector Config file](#vector-configuration) below.
- Run the command: `vector --config vector.yaml`.

## Vector Configuration

For in-depth information on Vector configuration, visit the [official Vector documentation](https://vector.dev/docs/reference/configuration/).

Vector supports configuration files in `YAML`, `TOML`, and `JSON` formats. Here we provide examples in `YAML`

- ### Sources

  The `sources` component in a Vector configuration specifies where Vector should collect data. This can be from files, servers, services, and other inputs. See the [supported source types](https://vector.dev/docs/reference/configuration/sources/) in Vector documentation.

  - #### Example Sources

    Since the output sink is `splunk_hec_metrics`, we can only give the input sources related to metrics. The sample configuration contains the source of nginx server.

    - `nginx_metrics`: Collects data from a specified Nginx server endpoint.

- ### Transforms

  Transforms allow you to parse and transform data into the desired format. For more details, visit [Vector transforms documentation](https://vector.dev/docs/reference/configuration/transforms/).

- ### Sinks

  The `sinks` component defines the destination for data processed by Vector. It's the final stage of the data pipeline.

  - #### Example Sink: Splunk HEC Logs

    - `type`: Specifies the sink type, for instance, `splunk_hec_metrics`.
    - `inputs`: References the sources or transforms from which the sink should collect data.
    - `endpoint`: The ingestion endpoint for data. For Siglens' Splunk, the default ingestion port is `8081`, with the ingestion route being `/splunk`.

  Learn more about Splunk HEC Logs sink configuration in the [Vector sinks documentation](https://vector.dev/docs/reference/configuration/sinks/splunk_hec_metrics/).

## Sample Configuration

```yaml
# The directory used for persisting Vector state, such as on-disk buffers, file checkpoints, and more. Please make sure the Vector project has write permissions to this directory.
data_dir: /var/lib/vector

# Sources Reference
sources:
  nginx_metrics:
    type: 'nginx_metrics'
    # A list of NGINX instances to scrape metrics from.
    # Each endpoint must be a valid HTTP/HTTPS URI pointing to an NGINX instance that has the ngx_http_stub_status_module module enabled.
    endpoints:
      - 'http://127.0.0.1/nginx_status'
    namespace: 'nginx'
    # The interval in seconds to poll each endpoint.
    scrape_interval_secs: 5

sinks:
  siglens:
    type: splunk_hec_metrics
    inputs:
      - nginx_metrics
    endpoint: http://localhost:8081/splunk/
    compression: none
    default_namespace: 'nginx' # Corrected spelling here
    default_token: 'A94A8FE5CCB19BA61C4C08'
    host_key: hostname
    index: 'ind-nginx'
    source: 'nginx_metrics'
    sourcetype: 'nginx_metrics'
    batch:
      max_events: 1
```

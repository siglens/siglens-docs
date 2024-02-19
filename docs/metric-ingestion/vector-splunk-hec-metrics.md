# Vector Metrics

*Ingesting metrics into Siglens using Vector*

## 1. Installation 

Begin by installing Vector using the instructions provided [here](../log-ingestion/vector-elasticsearch.md#1-installation). Once installed, you can refer back to this guide for configuration and starting Vector.

## 2. Configuration

### Sample Configuration file

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

For in-depth information on Vector configuration, visit the [official vector documentation](https://vector.dev/docs/reference/configuration/).


## 3. Start Vector

Vector needs to be started with the `--config` argument to specify the path to the configuration file. Run the following command:

```bash
vector --config vector.yaml

# Open Telemetry

#### MacOS Packaging
- Get the MacOS release using: `curl --proto '=https' --tlsv1.2 -fOL https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.80.0/otelcol_0.80.0_darwin_amd64.tar.gz`
- They are packaged as gzipped tarballs (.tar.gz) and will need to be unpacked with a tool that supports this compression format: `tar -xvf otelcol_0.80.0_darwin_amd64.tar.gz`.
- Every Collector release includes an otelcol executable that you can run after unpacking.
- Create a config.yaml file which will contain the configurations for the otelCol
- Run otelCol using: `./otelCol --config config.yaml`

The config file used: 
```
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'example'
          scrape_interval: 60s
          static_configs:
            - targets: ['localhost:2222']
processors:
  batch:

exporters:
  logging:
    loglevel: debug

  prometheusremotewrite:
    endpoint: 'http://localhost:8081/promql/api/v1/write'
    headers:
      Authorization: 'Bearer YOUR_TOKEN_HERE'  # Optional: Add any necessary headers

service:
  pipelines:
    metrics:
      receivers: [prometheus]
      processors: [batch]
      exporters: [prometheusremotewrite]
```

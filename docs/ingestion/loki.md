---
sidebar_position: 11
---
# Loki

### Download:
- curl -O -L "https://github.com/grafana/loki/releases/download/v2.8.2/promtail-darwin-amd64.zip"
- unzip promtail-darwin-amd64.zip

#### Add promtail-local-config.yaml with this configuration:
```server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://localhost:8081/loki/api/v1/push
scrape_configs:
- job_name: system
  static_configs:
  - targets:
      - localhost
    labels:
      job: varlogs
      __path__: /var/log/*log
```
#### Run the binary:
- ./promtail-darwin-amd64 -config.file=promtail-config.yaml



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

Promtail will start ingesting the logs from the /var/log folder and then push them to siglens

For promtail ingestion to work, we have added proto files in the siglens repo in loki pkg. These proto files are used to generate the go files which are used by promtail to push the logs to siglens. The source protos are `push.proto, stats.proto and logproto.proto`. The *.pb.go were generated using this pkg `google.golang.org/protobuf/cmd/protoc-gen-go`` and running command `protoc --go_out=. path/to/your/proto/file.proto.`



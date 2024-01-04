# Loki

Smoothly transition from your current Loki installation to SigLens with ease. SigLens seamlessly accommodates log ingestion in Loki format, making it a straightforward and hassle-free substitute for Loki.

To learn more about Loki, check out the [Loki website](https://grafana.com/oss/loki/)

## Ingesting logs from Loki:

To Ingest logs from Loki, we are going to use the **Promtail** tool.

Download the correct binary for Promtail and unzip it in your local system.

***The below process uses the MacOS binary files***. 

If you are on a Linux host, please download and use the correct Binary file from the [Loki releases](https://github.com/grafana/loki/releases/). The Linux binary for x86 architecture is called `promtail-linux-amd64.zip`

**Step 1**: Download and unzip the Promtail Binary
```
curl -O -L "https://github.com/grafana/loki/releases/download/v2.8.2/promtail-darwin-amd64.zip"

 unzip promtail-darwin-amd64.zip

```

**Step 2**: Create a new file called `promtail-local-config.yaml` and add the following configuration:
```
server:
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
**Step 3**: Run the binary with the `promtail-local-config.yaml` configuration file.
```
 ./promtail-darwin-amd64 -config.file=promtail-local-config.yaml
 ```

You should see an output similar to the one below if the logs are successfully ingested. 

![](../../static/tutorials/loki-ingestion.png)


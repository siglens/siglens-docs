# Promtail

*Ingesting logs into Siglens using Promtail*

Promtail is an open-source log collector that ships the logs from the local system to a Loki instance. It is part of the Loki log aggregation system and is typically deployed to every machine that has applications needed to be monitored.

In this guide, we will walk through the process of using Promtail to send logs to Siglens.

## 1. Install Promtail

- Download the correct binary for Promtail based on your operating system and unzip it in your local system. 

***The process below uses binary files for MacOS systems with Intel processors.***

    - If you are on a Linux host, download and use the correct Binary file from the [Loki releases](https://github.com/grafana/loki/releases/). The Linux binary for x86 architecture is called `promtail-linux-amd64.zip`.

-  Download and unzip the Promtail Binary
```
curl -O -L "https://github.com/grafana/loki/releases/download/v2.8.2/promtail-darwin-amd64.zip"

 unzip promtail-darwin-amd64.zip

```
## 2. Configure Promtail

- Create a promtail config file with the below [sample configuration](#sample-configuration-file). 
- If you are looking for a sample log dataset you can download it from [here](https://github.com/siglens/pub-datasets/releases/download/v1.0.0/2kevents.json.tar.gz), untar it and update the `_path_` accordinly in the config file.

### Sample Configuration file
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
## 3. Run Promtail

- Run the binary with the `promtail-local-config.yaml` configuration file.

```bash
./promtail-darwin-amd64 -config.file=promtail-local-config.yaml
```

You should see an output similar to the one below if the logs are successfully ingested. 

![](../../static/tutorials/loki-ingestion.png)


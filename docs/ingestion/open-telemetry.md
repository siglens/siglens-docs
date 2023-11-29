---
sidebar_position: 9
---

# Open Telemetry

- To ingest traces, you can run siglens and follow the below steps. 
- If Siglens is running with ingestPort: 8081 in the server.yaml file, you'll follow these steps:

1. git clone https://github.com/open-telemetry/opentelemetry-demo.git
2. cd opentelemetry-demo/
3. Update `src/otelcollector/otelcol-config-extras.yml` to be:

```
exporters:
otlphttp/siglens:
    endpoint: "http://host.docker.internal:8081/otlp"

service:
pipelines:
    traces:
    exporters: [spanmetrics, otlphttp/siglens]
```
4. Run the command `make start`.

    After the docker containers start and you wait a few seconds, you should see traces getting ingested into siglens.

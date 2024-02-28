# Vector

*Migrating from Datadog to Siglens using Vector*

## 1. Install Vector and Configure Datadog Agent

Prerequisites: 
- Datadog Agent (You can follow [this guide](https://docs.datadoghq.com/getting_started/agent/) to install the agent based on your OS)
- Vector (You can follow [this guide](../../log-ingestion/vector.md#1-installation) to get started with installing vector)

### Configure Datadog Agent

1. Navigate to the Datadog Agent's configuration file. By default, it's located at `/opt/datadog-agent/etc/datadog.yaml`.

2. Open the `datadog.yaml` file and set your Datadog API key. You can find your API key by following the instructions at [this link](https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token). Once you have your API key, you can set it in your Datadog Agent's configuration file.

```yaml
## @param api_key - string - required
## @env DD_API_KEY - string - required
## The Datadog API key used by your Agent to submit metrics and events to Datadog.
## Create a new API key here: https://app.datadoghq.com/organization-settings/api-keys .
## Read more about API keys here: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys .
api_key : <YOUR_DATADOG_API_KEY>
```

3. Configure Vector. Replace `<VECTOR_SOURCE_PORT>` with the host and port of your Vector source.

```yaml
## @param observability_pipelines_worker - custom object - optional
## Configuration for forwarding telemetry to an Observability Pipelines Worker instead of Datadog.
## https://www.datadoghq.com/product/observability-pipelines/
## Note: This config is interchangeable with `vector`
vector:
  logs.enabled: true
  logs.url: http://localhost:<VECTOR_SOURCE_PORT>
```

4. Enable log collection in the Datadog Agent's configuration file.

```yaml
## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Enable Datadog Agent log collection by setting logs_enabled to true.
logs_enabled: true
```

5. Start the Datadog Agent. The command to start the agent varies depending on your operating system. For example, on a Linux system, you would use:

```bash
sudo service datadog-agent start
```

- For MacOS, you would use:

```bash
sudo datadog-agent run
```

Remember to replace `<YOUR_DATADOG_API_KEY>` and `<VECTOR_SOURCE_PORT>` with your actual Datadog API key and Vector source host and port.


#### If you haven't configured the Datadog Agent to collect logs yet, follow the steps below to set it up:

<details>

<summary> Configure the datadog agent to collect logs </summary>

Here are the general steps to configure the Datadog Agent to collect logs from a file:

1. Navigate to the `conf.d` directory inside the Datadog Agent's directory. By default, it's located at `/etc/datadog-agent/conf.d/`.

2. Inside the `conf.d` directory, create a new `.yaml` configuration file for your service. The file name should be `<YOUR_SERVICE>.yaml`, where `<YOUR_SERVICE>` is the name of your service. For example, if your service is named `my_service`, the file name should be `my_service.yaml`.

3. Open the new configuration file and add the YAML configuration as required:

Below is a sample YAML Config: 

```yaml
logs:
  - type: file
    path: <PATH_TO_LOG_FILE>
    service: <SERVICE_NAME>
    source: <LOG_SOURCE>
  - type: tcp
    port: 10518 # Update this with the actual port number as required
    service: <SERVICE_NAME>
    source: <LOG_SOURCE>
```

Replace `<PATH_TO_LOG_FILE>`, `<SERVICE_NAME>`, and `<LOG_SOURCE>` with the actual path to your log file, the name of your service, and the source of your logs.

You can find more information about different types of log sources and how to configure them in the [Datadog Agent Log Collection documentation](https://docs.datadoghq.com/agent/logs).

4. Save and close the configuration file.

5. Restart the Datadog Agent for the changes to take effect. The command to restart the agent varies depending on your operating system.

For Linux, you would use:

```bash
sudo service datadog-agent restart
```

For MacOS, you would use:

```bash
sudo datadog-agent run
```

After following these steps, the Datadog Agent should start collecting logs from the specified file.

</details>

## 2. Configure Vector

Below is an example of a Vector configuration file that you can use. You'll need to replace the `<project_id>` and `<subscription_name>` fields with your own values. 

```yaml
data_dir: /var/lib/vector
sources:
  datadog_agent_logs:
    type: "datadog_agent"
    address: "0.0.0.0:9000" # Update this port number to match the one in your Datadog configuration

transforms:
  datadog_logs_remap:
    inputs:
      - datadog_agent_logs
    type: remap
    source: |
      structured = parse_json!(.message)
      ., err = merge(., structured)

sinks:
  elasticsearch_sink:
    type: elasticsearch
    inputs:
      - datadog_logs_remap
    endpoint: "http://localhost:8081/elastic/"
    id_key: hostname
    compression: none
    mode: bulk
    query:
      X-Powered-By: Vector
    healthcheck:
      enabled: false
    request:
      bulk:
        index:
          value: "dd-logs-es"
          action: "index"
```
1. When creating your Vector configuration file, ensure the endpoint has a `/elastic` suffix 
2. Remember to adjust the `transforms` section in the configuration to match the format of your data. For detailed information on how to configure transforms for your specific logs, refer to the [Transforms section](https://vector.dev/docs/reference/configuration/transforms/) in the official Vector documentation.

## 3. Start Vector

Vector needs to be started with the `--config` argument to specify the path to the configuration file. Run the following command:

```bash
vector --config vector.yaml
```

To ensure successful data ingestion, verify that Siglens, the Datadog Agent, and Vector are all running properly.


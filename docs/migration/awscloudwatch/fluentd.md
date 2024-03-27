import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fluentd

*Migrating/Stream Logs from AWS CloudWatch to SigLens through Fluentd.*


**Prerequisites**: AWS account with logs in CloudWatch Logs Group.


## 1. Fluentd Installation

Install [Fluentd](https://docs.fluentd.org/installation) on your server.

### 2. IAM Role Configuration

1. Create an IAM role with the below permissions.

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": [
                    "logs:GetLogEvents",
                    "logs:DescribeLogStreams"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
        ]
    }
    ```
2. Obtain IAM Role Access Key and Secret Key for authentication.
3. This is required for the Authentication purposes.

**Note**: For EC2 instances, use an *`IAM service role`* instead.

### 3. Environment Setup (skip if using EC2 IAM role)

#### Export AWS credentials and region:

    ```bash
    export AWS_REGION=us-east-1
    export AWS_ACCESS_KEY_ID="YOUR_ACCESS_KEY"
    export AWS_SECRET_ACCESS_KEY="YOUR_SECRET_ACCESS_KEY"
    ```

### 4. [CloudWatch Logs Plugin Installation](https://github.com/fluent-plugins-nursery/fluent-plugin-cloudwatch-logs)

#### For Fluentd

    ```bash
    gem install fluent-plugin-cloudwatch-logs
    ```

#### For td-agent

    ```bash
    td-agent-gem install fluent-plugin-cloudwatch-logs
    ```

### 5. Fluentd Configuration

- Read more about the [Fluentd CloudWatch source configuration from here](https://github.com/fluent-plugins-nursery/fluent-plugin-cloudwatch-logs?tab=readme-ov-file#in_cloudwatch_logs)

```xml title="fluentd.conf"
<source>
  @type cloudwatch_logs
  tag cloudwatch.your_tag
  region us-east-1
  log_group_name "/aws/lambda/siglensSaasOrgsStats"
  #use_log_group_name_prefix true
  log_stream_name "2024"
  use_log_stream_name_prefix true  # To Stream all the Logs from the log streams that start with name 2024.
  state_file /var/lib/fluent/group_stream.in.state1
  <parse>
    @type none
    #@type json   # if your cloudwatch logs are in json.
  </parse>
</source>

<match cloudwatch.*>
  @type http
  endpoint http://127.0.0.1:8081/services/collector/event
  open_timeout 2
  <format>
    @type json
  </format>
  <buffer>
    flush_interval 5s
  </buffer>
</match>
```

- For log record transformation or filtering, leverage Fluentd’s filter plugin. Detailed guidance can be found in the [Fluentd documentation](https://docs.fluentd.org/configuration).

### 3. Run Fluentd

<Tabs
  className="bg-light"
  defaultValue="unix"
  values={[
    {label: 'Linux', value: 'unix'}
  ]
}>

<TabItem value="unix">
Navigate to the Fluentd directory and run the following command. If using td-agent, replace `fluentd` with `td-agent`.

```bash
sudo fluentd -c /home/fluentd.conf
```
</TabItem>

</Tabs>

Make sure to set the correct path to Fluentd and its config file.
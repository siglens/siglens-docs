import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fluentd

*Migrating/Stream Logs from AWS CloudWatch to SigLens through Fluentd.*


**Prerequisites**: AWS account with logs in CloudWatch Logs Group.


## 1. Fluentd Installation

Install [Fluentd](https://docs.fluentd.org/installation) on your server.

### 2. IAM Role Configuration

1. Create an IAM role with the following permissions to allow Fluentd to access CloudWatch Logs:

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
2. For authentication purposes, Fluentd requires the IAM Role's Access Key ID and Secret Access Key:
- **For EC2 instances**: If Fluentd is running on an EC2 instance, instead of manually managing Access Keys, it's recommended to use an IAM role attached to the EC2 instance. This approach simplifies credential management and enhances security. 

    1. Navigate to the EC2 dashboard within the AWS Management Console.
    2. Select the instance you want to attach the IAM role to.
    3. In the `Actions` menu, choose `Security`, then `Modify IAM role`.
    4. Choose the IAM role that has the necessary permissions outlined above from the dropdown list.
    5. Click `Save` to attach the role to the instance.

    By attaching an IAM role, EC2 instances will automatically have access to AWS services based on the role's permissions without the need for Access Keys.
- **For non-EC2 setups**: If Fluentd is not running on an EC2 instance, you will need to manually manage and provide Access Keys for authentication.

    1. Navigate to the IAM console.
    2. Find the IAM role you created with the necessary permissions.
    3. Under the `Security credentials` tab, create a new Access Key.
    4. Securely store the Access Key ID and Secret Access Key presented to you.

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
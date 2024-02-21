# Vector

*Migrating from Google Cloud to Siglens using Vector*

## 1. Install Vector and setup Google Cloud CLI

Prerequisites: 
- Google Cloud CLI (Verify your Google Cloud CLI installation with `gcloud version` or you can install it from [here](https://cloud.google.com/sdk/docs/install-sdk))
- Vector (You can follow [this guide](../../log-ingestion/vector.md) to get started with installing vector)
<details>
<summary>Setup Google Cloud Pub/Sub</summary>

#### 1. Set or Create a Google Cloud Project

If you already have a Google Cloud project, set it as your current project:

```bash
gcloud config set project <project_id>
```

Replace `<project_id>` with your actual project ID.

If you don't have a project, create one:

```bash
gcloud projects create <project_id>
```

#### 2. Create a Pub/Sub Topic

Create a Pub/Sub topic where logs will be published:

```bash
gcloud pubsub topics create <topic_name>
```

#### 3. Create a Logging Sink

When you create a sink, Google Cloud automatically creates a new service account. This service account, known as the logging service account, is used by the sink to write logs.

```bash
gcloud logging sinks create <sink_name> pubsub.googleapis.com/projects/<project_id>/topics/<topic_name>
```
#### 4. Grant Permissions to the Logging Service Account

Grant the `pubsub.publisher` role to the logging service account:

```bash
gcloud projects add-iam-policy-binding <project_id> --member=serviceAccount:<logging_service_account> --role=roles/pubsub.publisher
```

Replace `<logging_service_account>` with the service account name displayed after creating the sink.

#### 5. Create a Service Account
> Skip this step if you have an existing service account

If you have a service account and a key from a different project, and you want to use it in your current project, you can skip to [Step 8](./vector#8-grant-pubsub-subscriber-role-to-an-existing-service-account-from-a-different-project)

If you don't have a service account, create one:

```bash
gcloud iam service-accounts create <service_account_name> --display-name "My Service Account"
```

#### 6. Grant Pub/Sub Editor Role to the New Service Account
> Skip this step if you have an existing service account.

Grant the `pubsub.editor` role to the service account:

```bash
gcloud projects add-iam-policy-binding <project_id> --member serviceAccount:<service_account_name>@<project_id>.iam.gserviceaccount.com --role roles/pubsub.editor
```

#### 7. Generate Key for the New Service Account(Skip if you have an existing one)
> Skip this step if you have an existing service account key.

If you don't have a service account key, create one:

```bash
gcloud iam service-accounts keys create ~/key.json --iam-account <service_account_name>@<project_id>.iam.gserviceaccount.com
```
#### 8. Grant Pub/Sub Subscriber Role to an Existing Service Account from a Different Project
> Skip this step if you're not using a service account from a different project

If you have a service account and a key from a different project, you need to add the necessary permissions to the service account in your current project like this: 

```bash
gcloud projects add-iam-policy-binding <project_id> --member=serviceAccount:<service_account_name>@<existing_project_id>.iam.gserviceaccount.com --role=roles/pubsub.subscriber
```
#### 9. Create a Pub/Sub Subscription

Create a Pub/Sub subscription to the topic:

```bash
gcloud pubsub subscriptions create <subscription_name> --topic <topic_name>
```

#### 10. Test the Subscription (Optional)

Pull messages from the subscription to test it:

```bash
gcloud pubsub subscriptions pull --auto-ack <subscription_name>
```
---

Remember to replace `<project_id>`, `<logging_service_account>`, `<service_account_name>` and `<existing_project_id>` with your actual project ID and service account names.
</details>

## 2. Configure Vector

1. When creating your Vector configuration file, ensure the endpoint has a `/splunk` suffix and replace the placeholders as needed.
2. The `<credentials_path>` should point to your service account key, which would be `key.json` if you followed the above setup steps.


###  Sample Configuration
```yaml
data_dir: /var/lib/vector
sources:
  gcp_pubsub_logs:
    type: gcp_pubsub
    project: <project_id>
    subscription: <subscription_name>
    credentials_path: key.json # Path to the service account key json
# Transforms Reference: Transform the data from Sources into desired format
transforms:
  remap_file_log:
    inputs:
      - 'gcp_pubsub_logs'
    type: 'remap'
    source: |
# The parsed json is stored in the structured variable. The structured variable is merged with the other data/fields.
      structured = parse_json!(.message)
      ., err = merge(., structured)
      if err != null {
        log("Failed to merge structured data into event: " + to_string(err), level: "error")
      }
sinks:
  splunk_hec:
    type: splunk_hec_logs
    inputs:
      - gcp_pubsub_logs
    endpoint: http://localhost:8081/splunk/ # Ensure your endpoint has /splunk suffix
    host_key: hostname
    index: 'siglens-gcloud' # Replace with desired index
    indexed_fields:
      - index
    timestamp_key: time
    compression: none
    encoding:
      codec: json
    default_token: 'A94A8FE5CCB19BA61C4C08'
    batch:
      max_events: 1
```

## 3. Start Vector

Vector needs to be started with the `--config` argument to specify the path to the configuration file. Run the following command:

```bash
vector --config vector.yaml
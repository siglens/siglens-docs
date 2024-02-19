# Elasticsearch

- Siglens can be ingested data in Elasticsearch format using fluentd. Install fluentd. Read more about installation [here](#install-fluentd).
- Make sure that the `host` in the configuration has the `/elastic` suffix.
- Create a fluentd config file with the below [sample configuration](#sample-configuration). Read more about [Fluentd Config file](#fluentd-configuration) below.
- Run the command: `fluentd -c fluentd_config.conf`. Read more about [running fluentd config](#run-fluentd-config) below.
- Read more about Fluentd from the [official docs here](https://docs.fluentd.org/).

## Install Fluentd

- Install the Fluent-package from the [official docs](https://docs.fluentd.org/installation).
  - For Debian/Ubuntu: https://docs.fluentd.org/installation/install-by-deb#installing-fluent-package
  - For macOS: https://docs.fluentd.org/installation/obsolete-installation/treasure-agent-v4-installation/install-by-dmg-td-agent-v4
  - For Windows: https://docs.fluentd.org/installation/install-by-msi
- Follow the installation steps from the docs and install fluentd.

### Setup for Elasticsearch version 7.9.3

- Fluentd by default comes with various plugins along with a plugin for Elasticsearch called `fluent-plugin-elasticsearch`.
- But the default plugin version is not compatible with Siglens Elasticsearch version.
- Uninstall the default Elasticsearch plugin by running the below command. But before running make sure you are either fluentd-command-promt (on windows) or the path variables setup or in the fluentd directory.
- ```bash
  fluent-gem uninstall fluent-plugin-elasticsearch
  ```
- Then install the `fluent-plugin-elasticsearch` version `4.3.3` by running the below command.
- ```bash
  fluent-gem install fluent-plugin-elasticsearch -v 4.3.3
  ```
- If you're using a ` td-agent`, it's recommended to use `td-agent-gem` instead

  ```bash
  td-agent-gem uninstall fluent-plugin-elasticsearch

  sudo td-agent-gem install fluent-plugin-elasticsearch -v 4.3.3
  ```

- Check that the correct version of gem is installed by running the below command

  ```bash
  fluent-gem list | grep fluent-plugin-elasticsearch

  # OR

  td-agent-gem list | grep fluent-plugin-elasticsearch
  ```

- Now install the `elasticsearch` gem `version: 7.9`, that is compatible with the SigLens Elasticsearch and the installed `fluent-plugin-elasticsearch` version.

- First uninstall, if any `elasticsearch` gem is installed by running the below command:

  ```bash
  fluent-gem uninstall elasticsearch

  # OR

  td-agent-gem uninstall elasticsearch
  ```

- Then install the `elasticsearch` gem version: `7.9` by running the below command:

  ```bash
  fluent-gem install elasticsearch -v 7.9

  # OR

  td-agent-gem install elasticsearch -v 7.9
  ```

- _Might need to setup or install ruby modules or development toolkit. If required it is automatically prompted and installed._

## Fluentd Configuration

- Fluentd has various input or source plugins. The below sample configuration uses plugin type called `tail`. Read more about [input Plugins here](https://docs.fluentd.org/input).
- The tag in source is used to to categorize the incoming data. It is is applied to all events coming from the tailed file. This tag can be used to match these events.
- Fluentd has filter plugins that can be used to mutate the input data from the sources.
- The `<match my.logs>` section tells Fluentd that any events tagged with my.logs should be processed by this output plugin configuration.
- The output plugin is set to `elasticsearch` and the host must be `http://localhost:8081/elastic` for the ingestion in elasticsearch format for Siglens.

## Sample Configuration

```conf
<source>
  @type tail
  path D:\Siglens\SplunkExport.json
  pos_file D:\Siglens\fluentd_logs\SplunkExport1.log.pos
  tag my.logs
  read_from_head true
  <parse>
    @type json
  </parse>
</source>

<match my.logs>
  @type elasticsearch
  host http://localhost:8081/elastic
  logstash_format true
  include_tag_key true
  tag_key @log_name
  verify_es_version_at_startup false
  default_elasticsearch_version 7.9
  request_timeout 45s # defaults to 5s
</match>
```

## Run Fluentd Config

- Navigate to the Fluentd installed directory, if fluentd environment is not setup.
- Windows can open the fluentd command prompt and open it as an **Administrator**.
- Run the command: `fluentd -c <<path-of-fluentd-config>>`

- ### Linux based systems

  ```bash
  sudo fluentd -c /home/fluentd_config.conf

  # OR

  sudo td-agent -c /home/fluentd_config.conf # if td-agent is installed
  ```

- ### Windows

  - Open the fluentd command prompt as an **Administrator**.

  ```bash
  fluentd -c /home/fluentd_config.conf
  ```

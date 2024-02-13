# Splunk

- Siglens can be ingested data in Splunk format using fluentd. Install fluentd. Read more about installation [here](#install-fluentd).
- Make sure that the `endpoint` in the configuration has the splunk endpoint: `/splunk/services/collector/event`.
- Create a fluentd config file with the below [sample configuration](#sample-configuration). Read more about [Fluentd Config file](#fluentd-configuration) below.
- Run the command: `fluentd -c fluentd_config.conf`. Read more about [running fluentd config](#run-fluentd-config) below.
- Read more about Fluentd from the [official docs here](https://docs.fluentd.org/).

## Install Fluentd

- Install the Fluent-package from the [official docs](https://docs.fluentd.org/installation).
  - For Debian/Ubuntu: https://docs.fluentd.org/installation/install-by-deb#installing-fluent-package
  - For macOS: https://docs.fluentd.org/installation/obsolete-installation/treasure-agent-v4-installation/install-by-dmg-td-agent-v4
  - For Windows: https://docs.fluentd.org/installation/install-by-msi
- Follow the installation steps from the docs and install fluentd.

### Setup for Splunk

- Fluentd by default comes with various plugins but it does not include a plugin for Splunk.
- Install the Splunk plugin called [`fluent-plugin-splunk-hec`](https://github.com/splunk/fluent-plugin-splunk-hec). Read more about Splunk Plugin [here](https://docs.fluentd.org/v/0.12/output/splunk).
- ```bash
  fluent-gem install fluent-plugin-splunk-hec
  ```
- If you're using a ` td-agent`, it's recommended to use `td-agent-gem` instead

  ```bash
  sudo td-agent-gem install fluent-plugin-splunk-hec
  ```

- Check that the gem is installed by running the below command

  ```bash
  fluent-gem list | grep fluent-plugin-splunk-hec

  # OR

  td-agent-gem list | grep fluent-plugin-splunk-hec
  ```

- _Might need to setup or install ruby modules or development toolkit. If required it is automatically prompted and installed._

## Fluentd Configuration

- Fluentd has various input or source plugins. The below sample configuration uses plugin type called `tail`. Read more about [input Plugins here](https://docs.fluentd.org/input).
- The tag in source is used to to categorize the incoming data. It is is applied to all events coming from the tailed file. This tag can be used to match these events.
- Fluentd has filter plugins that can be used to mutate the input data from the sources.
- The `<match my.logs>` section tells Fluentd that any events tagged with my.logs should be processed by this output plugin configuration.
- The output plugin is set to `splunk_hec` and the `hec_endpoint` must be `/splunk/services/collector/event`. This is the Splunk HTTP Event Collector.
- The default ingestion port for Siglens is `8081` and the `hec_host` is `localhost`. The protocol needs to be set as `http` / `https`.
- The index field is necessary.
- The buffer configuration sets to send or ingest one event at a time. This is ncecessary for the ingestion to work properly.

## Sample Configuration

```conf
<source>
  @type tail
  path D:\Siglens\SplunkExport.json
  pos_file D:\Siglens\fluentd_logs\SplunkExport2.log.pos
  tag my.logs
  read_from_head true
  <parse>
    @type json
  </parse>
</source>

<match my.logs>
  @type splunk_hec
  host hostname
  hec_token A94A8FE5CCB19BA61C4C08
  hec_host localhost
  hec_port 8081
  hec_endpoint /splunk/services/collector/event
  protocol http
  index fluentd-ind-0
  # Buffer configuration
  <buffer>
    chunk_limit_records 1
    flush_at_shutdown true
  </buffer>
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

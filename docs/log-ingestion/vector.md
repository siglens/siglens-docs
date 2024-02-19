# Vector
*Ingesting logs into Siglens using Vector*

## 1. Install Vector
Read more info about installation of Vector from [here](https://vector.dev/docs/setup/installation/).

### For Unix-based Systems

Add the Vector repo:

```bash
bash -c "$(curl -L https://setup.vector.dev)"
```

Install using APT (Debian, Ubuntu):

```bash
sudo apt-get install vector
```
### For macOS

Install using Homebrew:

```bash
brew install vector
```

### For Windows

```bash
curl --proto '=https' --tlsv1.2 -sSfL https://sh.vector.dev | VECTOR_VERSION=0.34.1 bash
```

## 2. Configure Vector

- Make sure that the `endpoints` in the configuration has the `/elastic` suffix.


### Sample Configuration file

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<html>
<Tabs
  defaultValue="yaml"
  values=
  {
    [
      { label: 'YAML', value: 'yaml', },
      { label: 'JSON', value: 'json', },
    ]
  }
>
<TabItem value="yaml">

```yaml
# The directory used for persisting Vector state, such as on-disk buffers, file checkpoints, and more. Please make sure the Vector project has write permissions to this directory.
data_dir: /var/lib/vector

# Sources Reference
sources:
  # The type: "file" will read the data from the file
  read_from_file:
    type: file
    include:
      - /mnt/d/Siglens/SplunkExport.json

# Transforms Reference: Transform the data from Sources into desired format
transforms:
  remap_file_log:
    inputs:
      - 'read_from_file'
    type: 'remap'
    # The path to the file containing the remap rules. Parsing the message which is the data read from the file.
    # The parsed json is stored in the structured variable. The structured variable is merged with the other data/fields.
    source: |
      structured = parse_json!(.message)
      ., err = merge(., structured)

# Sinks Reference: Ingest the data from Sources to Siglens Sink
sinks:
  siglens:
    # The request parameters are optional.
    type: 'elasticsearch'
    # The inputs sources name to ingest the data. This is a list of sources. You can add multiple sources.
    inputs:
      - 'remap_file_log'
    # The ingestion endpoint of Siglens
    endpoints:
      - http://localhost:8081/elastic/
    id_key: hostname
    compression: none
    mode: bulk
    query:
      X-Powered-By: Vector
    healthcheck:
      enabled: false
```

</TabItem>

<TabItem value="json">
```json
{
  "data_dir": "/var/lib/vector",
  "sources": {
      "read_from_file": {
          "type": "file",
          "include": [
              "./migration1/SplunkExport.json"
          ],
      }
  },
  "transforms": {
      "remap_file_log": {
          "inputs": [
              "read_from_file"
          ],
          "type": "remap",
          "source": "structured = parse_json!(.message) ., err = merge(., structured)"
      }
  },
  "sinks": {
      "siglens": {
          "type": "elasticsearch",
          "inputs": [
              "remap_file_log"
          ],
          "endpoints": [
              "http://localhost:8081/elastic/"
          ],
          "id_key": "hostname",
          "compression": "none",
          "mode": "bulk",
          "query": {
              "X-Powered-By": "Vector"
          },
          "healthcheck": {
              "enabled": false
          }
      }
  }
}
```
</TabItem>
</Tabs>

</html>

For in-depth information on Vector configuration, visit the [official vector documentation](https://vector.dev/docs/reference/configuration/).


## 3. Start Vector

Vector needs to be started with the `--config` argument to specify the path to the configuration file. Run the following command:

```bash
vector --config vector.yaml
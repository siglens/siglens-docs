import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Filebeat

_Ingesting logs into Siglens using Filebeat_

### 1. Install Filebeat

<Tabs
  className="bg-light"
  defaultValue="unix"
  values={[
    {label: 'Unix-based Systems', value: 'unix'},
    {label: 'macOS', value: 'mac'},
    {label: 'Windows', value: 'windows'}
  ]
}>

<TabItem value="unix">

<details>
<summary>Debian and Ubuntu</summary>

Install <a href="https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-installation-configuration.html" target="_blank">Filebeat<i class="fas fa-external-link-alt"></i></a> on Debian and Ubuntu:

```bash
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-oss-7.9.3-amd64.deb
sudo dpkg -i filebeat-oss-7.9.3-amd64.deb
```
</details>

<details>
<summary>CentOS, Redhat, and Amazon Linux</summary>

Install <a href="https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-installation-configuration.html" target="_blank">Filebeat<i class="fas fa-external-link-alt"></i></a> on CentOS, Redhat, and Amazon Linux:

```bash
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-oss-7.9.3-x86_64.rpm
sudo rpm -ivh filebeat-oss-7.9.3-x86_64.rpm
```
</details>
</TabItem>
<TabItem value="mac">
Install <a href="https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-installation-configuration.html" target="_blank">Filebeat<i class="fas fa-external-link-alt"></i></a> on macOS:

```bash
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-oss-7.9.3-darwin-x86_64.tar.gz
tar xzvf filebeat-oss-7.9.3-darwin-x86_64.tar.gz
cd filebeat-7.9.3-darwin-x86_64
```
</TabItem>
<TabItem value="windows">

Install <a href="https://www.elastic.co/guide/en/beats/filebeat/7.9/filebeat-installation-configuration.html" target="_blank">Filebeat<i class="fas fa-external-link-alt"></i></a> on Windows:

```powershell
Invoke-WebRequest -Uri https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-oss-7.9.3-windows-x86_64.zip -OutFile filebeat-oss-7.9.3-windows-x86_64.zip
Expand-Archive -Path filebeat-oss-7.9.3-windows-x86_64.zip -DestinationPath C:\Program Files\
```
</TabItem>

</Tabs>

### 2. Configure Filebeat

Download the sample events file using the following command:
```bash
curl -s -L https://github.com/siglens/pub-datasets/releases/download/v1.0.0/2kevents.json.tar.gz -o 2kevents.json.tar.gz && tar -xvf 2kevents.json.tar.gz
```
Create a config file:

```yml title="filebeat.yml"
filebeat.inputs:
  - type: log
    enabled: true
    paths:
      - /Users/username/logstash/2kevents.json # Path to the log file
    json.keys_under_root: true
    json.add_error_key: true
    processors:
      - drop_event: # Drop events missing first_name
          when:
            not:
              has_fields: ['first_name']

output.elasticsearch:
  hosts: ['http://localhost:8081/elastic/']
  index: 'filebeat-ind-0'

setup.template.enabled: false
setup.ilm.enabled: false
```

### 3. Run Filebeat

On Linux:
```bash
sudo ./filebeat -e -c $(pwd)/filebeat.yml
```

On Windows (as Administrator):
```bash
.\filebeat.exe -e -c C:\path\to\filebeat.yml
```
Make sure to set the correct path to Filebeat and its config file.
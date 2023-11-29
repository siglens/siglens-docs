# Vector

- Similar to FluentD, SigLens is compatible with the Elastic plugin for vector. Install vector and start it.
- Make sure that the `endpoints` in the configuration has the `/elastic`suffix. 
- Create a vector.yaml file which will contain the configurations. Add the below configuration code to vector.yaml file
- Run the command: `vector --config vector.yaml`
```
data_dir: "/opt/homebrew/var/lib/vector/"
sources:
  dummy_logs:
    type: "demo_logs"
    format: "syslog"
    interval: 1
transforms:
  parse_logs:
    type: "remap"
    inputs: ["dummy_logs"]
    source: |
      . = parse_syslog!(string!(.message))
sinks:
  siglens:
    type: "elasticsearch"
    inputs: ["parse_logs"]
    endpoints:
      - "http://localhost:8081/elastic"
    bulk:
      index: "vector-test"
    healthcheck:
      enabled: false
```
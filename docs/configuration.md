# SigLens Configuration Guide

This guide provides a comprehensive overview of SigLens configuration options. SigLens uses a YAML configuration file (`server.yaml`) to manage its settings.
The values shown in this guide represent the default configuration.

## Basic Configuration

### Server Settings

The following settings control the basic server configuration:

```yaml
# Network settings
ingestListenIP: '0.0.0.0'           # IP address for ingest server to listen on
queryListenIP: '0.0.0.0'            # IP address for query server to listen on
ingestPort: 8081                    # Port for receiving data/logs
queryPort: 5122                     # Port for handling queries and UI access

queryHostname: ''                   # The domain name to access SigLens UI
                                    # Example: If you have DNS configured for logs.company.com
                                    # pointing to your SigLens server, then set the value 
                                    # to 'logs.company.com:5122'
                                    #
                                    # When to use:
                                    # - Leave empty to access via localhost
                                    # - Set when using a custom domain with DNS pointing to your SigLens server
                                    #
                                    # Note: This setting does not affect where the server runs (it will still 
                                    # run on the configured queryListenIP and queryPort). It only tells SigLens
                                    # what domain name user will type in their browser to access the service.

ingestUrl: ''                       # The URL where clients/applications will send logs to SigLens
                                    # If empty, defaults to http://localhost:8081
                                    #
                                    # Example: If using custom domain with queryHostname 'logs.company.com:5122',
                                    # set this to 'http://logs.company.com:8081'
                                    #
                                    # Note: Make sure to use the same domain as queryHostname to maintain
                                    # consistency in your setup

# Node configuration
queryNode: true                     # Enable query processing capabilities
ingestNode: true                    # Enable data ingestion capabilities

ssInstanceName: ''                  # For ephemeral servers (docker, k8s) set this variable to unique
                                    # container name to persist data across restarts 
                                    # - If left empty: automatically uses system hostname
                                    # - If set: uses the specified value as instance name (Example: 'sigsingle')
```

### Data Management

Configure how SigLens handles data storage and retention:

```yaml
dataPath: 'data/'                   # Where to store data files data
retentionHours: 360                 # How long to keep data (Default: 15 days)
timeStampKey: 'timestamp'           # Name of the timestamp field
dataDiskThresholdPercent: 85        # Stop ingesting data if disk usage exceeds this percentage
maxSegFileSize: 4294967296          # Maximum size for data segments (Default: 4GB)
maxAllowedColumns: 20000            # Maximum unique column names allowed across all indexes,
                                    # data ingestion will be rejected if this limit is exceeded
```

## Memory Configuration

SigLens implements sophisticated memory management with container awareness:

```yaml
memoryConfig:
  # Set to 0 to auto-detect from system/container limits
  maxMemoryAllowedToUseInBytes: 0

  # Percentage of available memory SigLens should use (Auto-limited to 50% if system has <8GB RAM )
  maxUsagePercent: 80

  # Memory distribution (must sum to 100%)
  searchPercent: 30               # Memory for search operations
  cmiPercent: 48                  # Memory for column metadata indexes
  metadataPercent: 20             # Memory for system metadata
  metricsPercent: 2               # Memory for metrics collection

  # Memory limit per query execution
  bytesPerQuery: 209715200         # Memory allocation per concurrent query (Default: 200MB)
                                   # Controls query concurrency: Lower values allow more concurrent queries
                                   # but may impact complex query performance. Higher values improve complex
                                   # query performance but reduce max concurrent queries.

  # Enable optimizations for low-memory environments
  lowMemoryMode: false            # When enabled, reduces memory usage by:
                                  # - Limiting parallelism to single-threaded 
                                  # Note: May impact query performance
```

### Memory Management Features

SigLens implements a hierarchical memory management system:

1. **Memory Limit Detection** (in priority order):

   - User-configured limit (`maxMemoryAllowedToUseInBytes`) - highest priority
   - Container memory limits (via cgroups) - checked if user limit is 0
   - Host system total memory - fallback if container limits unavailable

2. **Container Environment Detection** (in priority order):

   - Automatic detection of cgroup v2
   - Automatic detection of cgroup v1
   - Additional Kubernetes-specific paths if running in K8s
   - Fallback to host system if no container environment detected

3. **Memory Optimization**:
   - Systems with \<8GB RAM automatically limit to 50% usage
   - Memory utilization controlled by `maxUsagePercent` (default 80%)
   - Garbage collection tuning via `GOGC` environment variable
   - Memory distribution validation (component percentages must sum to 100%)

## Performance Settings

Configure performance-related parameters:

```yaml
# Work In Progress (WIP) flush intervals
idleWipFlushIntervalSecs: 5      # How often to flush idle buffers (Range: 5-60 seconds)
maxWaitWipFlushIntervalSecs: 30  # Maximum time before forced flush (Range: 5-60 seconds)

# Query execution limits
queryTimeoutSecs: 300            # Maximum query execution time (Range: 60-1800 seconds)
```

## Feature Flags

Enable or disable various SigLens capabilities:

```yaml
# Development and Debugging
debug: false                     # Enable detailed debug logging
pprofEnabled: true               # Enable Go pprof profiling endpoints
safeServerStart: false           # Perform additional startup validations

# Query Features
pqsEnabled: true                # Enable Persistent Query Store (saves query history)
analyticsEnabled: true          # Enable usage analytics collection
agileAggsEnabled: true          # Enable optimized aggregation processing
compressStatic: true            # Enable compression of static assets
```

## Security Configuration

### TLS Configuration

```yaml
tls:
  enabled: false                  # Enable TLS/HTTPS
  certificatePath: ''             # Path to TLS certificate file
  privateKeyPath: ''              # Path to private key file
  mtlsEnabled: false              # Enable mutual TLS; no effect if TLS is disabled
  clientCaPath: ''                # Path to the client Certificate Authority file. Required for mTLS.
```

## Logging Configuration

```yaml
log:
  logPrefix: ''                   # Directory for log files (Example: './logs/')
  logFileRotationSizeMB: 100      # Size trigger for log rotation
  compressLogFile: false          # Compress rotated logs
```

## Tracing Configuration

```yaml
tracing:
  serviceName: 'siglens'                            # Service name in traces
  endpoint: ''                                      # Where to send traces    
                                                    # (Example: 'http://localhost:5122/otlp/v1/traces')
  samplingPercentage: 1                             # Percentage of operations to trace (0-100)
```

### Environment Variables for Tracing

Override tracing configuration using:

- `TRACESTORE_ENDPOINT`: Tracing endpoint URL
- `SIGLENS_TRACING_SERVICE_NAME`: Service name
- `TRACE_SAMPLING_PERCENTAGE`: Sampling rate (0-100)

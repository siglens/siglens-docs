# SigLens Configuration Guide

This guide provides a comprehensive overview of SigLens configuration options. SigLens uses a YAML configuration file (`server.yaml`) to manage its settings.

## Basic Configuration

### Server Settings

The following settings control the basic server configuration:

```yaml
# Network settings
ingestListenIP: '0.0.0.0'           # IP address for ingest server to listen on
queryListenIP: '0.0.0.0'            # IP address for query server to listen on
ingestPort: 8081                    # Port for receiving data/logs
queryPort: 5122                     # Port for handling queries and UI access
ingestUrl: ''                       # Ingest server URL
queryHostname: ''                   # Query server hostname

# Node configuration
queryNode: 'true'                   # Enable query processing capabilities
ingestNode: 'true'                  # Enable data ingestion capabilities
ssInstanceName: ''                  # Unique instance identifier for this SigLens server
```

### Data Management

Configure how SigLens handles data storage and retention:

```yaml
dataPath: 'data/'                   # Base directory for all SigLens data
retentionHours: 360                 # How long to keep data (default: 15 days)
maxSegFileSize: 4294967296          # Maximum size for data segments (4GB default)
timeStampKey: 'timestamp'           # Field name used for timestamp values
dataDiskThresholdPercent: 85        # Stop ingestion if disk usage exceeds this
eventTypeKeywords: ['eventType']    # Fields used to categorize events
maxOpenColumns: 20000               # Limit on concurrent unrotated columns
```

## Memory Configuration

SigLens implements sophisticated memory management with container awareness:

```yaml
memoryConfig:
  # Set to 0 to auto-detect from system/container limits
  maxMemoryAllowedToUseInBytes: 0

  # Percentage of available memory SigLens should use
  maxUsagePercent: 80

  # Memory distribution (must sum to 100%)
  searchPercent: 30               # Memory for search operations
  cmiPercent: 48                  # Memory for column metadata indexes
  metadataPercent: 20             # Memory for system metadata
  metricsPercent: 2               # Memory for metrics collection

  # Memory limit per query execution
  bytesPerQuery: 209715200        # Default: 200MB

  # Enable optimizations for low-memory environments
  lowMemoryMode: false            # Reduces memory usage at cost of performance
```

### Memory Management Features

SigLens implements a hierarchical memory management system:

1. **Memory Limit Detection**:

   - User-configured limit (`maxMemoryAllowedToUseInBytes`)
   - Container memory limits (Docker, Kubernetes)
   - Host system total memory

2. **Container Environment Detection**:

   - Automatic detection of cgroup v1/v2
   - Support for Kubernetes memory limits
   - Support for Docker memory limits

3. **Memory Optimization**:
   - Systems with \<8GB RAM automatically limit to 50% usage
   - Garbage collection tuning via `GOGC` environment variable
   - Memory distribution validation (percentages must sum to 100%)

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
pprofEnabled: 'true'             # Enable Go pprof profiling endpoints
safeServerStart: false           # Perform additional startup validations

# Query Features
pqsEnabled: 'true'               # Enable Persistent Query Store (saves query history)
analyticsEnabled: 'true'         # Enable usage analytics collection
agileAggsEnabled: 'true'         # Enable optimized aggregation processing
dualCaseCheck: 'true'            # Enable case-insensitive field matching
compressStatic: 'true'           # Enable compression of static assets
```

## S3 Integration

Configure Amazon S3 or compatible object storage:

```yaml
s3:
  enabled: false                  # Enable S3 storage integration
  bucketName: ''                  # S3 bucket for data storage
  regionName: ''                  # AWS region (e.g., us-east-1)
  bucketPrefix: ''                # Prefix for stored objects

# S3 Ingest Queue Settings
s3IngestQueueName: ''             # SQS queue name for S3 event notifications
s3IngestQueueRegion: ''           # Region for SQS queue
s3IngestBufferSize: 1000          # Number of messages to buffer
maxParallelS3IngestBuffers: 10    # Number of parallel processing buffers
```

## Security Configuration

### TLS Configuration

```yaml
tls:
  enabled: false                  # Enable TLS/HTTPS
  certificatePath: ''             # Path to TLS certificate file
  privateKeyPath: ''              # Path to private key file
```

## Logging Configuration

```yaml
log:
  logPrefix: './logs/'            # Directory for log files
  logFileRotationSizeMB: 100      # Size trigger for log rotation
  compressLogFile: false          # Compress rotated logs
```

## Tracing Configuration

```yaml
tracing:
  serviceName: 'siglens'          # Service name in traces
  endpoint: ''                    # Tracing collector endpoint
  samplingPercentage: 1           # Percentage of traces to sample (0-100)
```

### Environment Variables for Tracing

Override tracing configuration using:

- `TRACESTORE_ENDPOINT`: Tracing endpoint URL
- `SIGLENS_TRACING_SERVICE_NAME`: Service name
- `TRACE_SAMPLING_PRECENTAGE`: Sampling rate (0-100)

## Database Configuration

```yaml
databaseConfig:
  enabled: true                   # Enable persistent database
  provider: 'sqlite'              # Database type (currently sqlite only)
  host: ''                        # Database server host
  port: 0                         # Database server port
  user: ''                        # Database username
  password: ''                    # Database password
  dbname: ''                      # Database name
```

## Email Configuration

```yaml
emailConfig:
  smtpHost: 'smtp.gmail.com'      # SMTP server hostname
  smtpPort: 587                   # SMTP server port
  senderEmail: ''                 # Sender email address
  gmailAppPassword: ''            # Gmail app-specific password
```

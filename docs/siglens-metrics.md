# SigLens Metrics

## Overview
SigLens exports metrics that track system performance, resource usage, and operational health. This guide organizes metrics by their functional domains for easier monitoring and troubleshooting.

## System Performance Metrics

### Query Performance
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.query.latency.ms | Gauge | milliseconds | Query latency in milliseconds |
| ss.query.count | Counter | count | Query counts |
| ss.current.events.searched | Gauge | count | Current number of events searched |
| ss.current.events.matched | Gauge | count | Current number of events matched |

### Storage Performance
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.segment.latency.min.ms | Gauge | milliseconds | Segment latency min in ms |
| ss.segment.latency.max.ms | Gauge | milliseconds | Segment latency max in ms |
| ss.segment.latency.avg.ms | Gauge | milliseconds | Segment latency avg in ms |
| ss.segment.latency.p95.ms | Gauge | milliseconds | Segment latency p95 in ms |

## Resource Usage Metrics

### Storage Usage
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.total.logs.on.disk.bytes | Gauge | bytes | Total number of bytes on disk for log data |
| ss.total.metrics.on.disk.bytes | Gauge | bytes | Total number of metric bytes on disk |
| ss.on.disk.bytes.per.index | Gauge | bytes | On disk bytes per index |
| ss.total.cmi.size | Gauge | bytes | Total size of CMI files |
| ss.total.csg.size | Gauge | bytes | Total size of CSG files |

### Data Volume
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.total.bytes.received | Gauge | bytes | Total number of bytes received |
| ss.past.minute.event.volume | Gauge | bytes | Volume of events ingested in the past minute |
| ss.bytes.count.per.index | Gauge | bytes | Bytes count per index |

## Operational Metrics

### Data Ingestion
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.total.event.count | Gauge | count | Total number of events |
| ss.past.minute.event.count | Gauge | count | Number of events ingested in the past minute |
| ss.past.minute.num.data.points | Gauge | count | Number of metric data points ingested in the past minute |
| ss.post.requests.count | Counter | count | Counts post requests received |
| ss.event.count.per.index | Gauge | count | Event count per index |

### Storage Management
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.current.segstore.count | Gauge | count | Current number of segstores |
| ss.current.segment.microindex.count | Gauge | count | Current number of segment microindexes |
| ss.total.segment.count | Gauge | count | Total number of segments across all indexes |
| ss.segfile.rotate.count | Counter | count | Segment rotation count |
| ss.wip.buffer.flush.count | Counter | count | WIP flush count |

### Index Management
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.total.index.count | Gauge | count | Total number of indexes |
| ss.files.per.index | Gauge | count | Number of files per index |
| ss.blocks.per.index | Gauge | count | Number of blocks per index |
| ss.total.column.count | Gauge | count | Total number of unique columns across all indexes |

### Tag Management
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.total.tag.key.count | Gauge | count | Total number of tag keys |
| ss.total.tag.value.count | Gauge | count | Total number of tag values |
| ss.total.metric.names | Gauge | count | Total number of metric names |
| ss.total.time.series | Gauge | count | Total number of time series |

### S3 Operations
| Metric Name | Type | Unit | Description |
|------------|------|------|-------------|
| ss.s3uploads.received | Counter | count | S3 uploads received |
| ss.s3downloads.received | Counter | count | S3 downloads received |
| ss.s3deleted.received | Counter | count | S3 deletes received |
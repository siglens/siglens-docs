# eventcount

## Description

Returns the number of events in the specified indexes.

## Syntax

The required syntax is in **bold**.

**eventcount** \
[index=\<string>]... \
[summarize=\<bool>] \
[report_size=\<bool>] \
[list_vix=\<bool>]

## Required arguments

None.

## Optional arguments

### index

**Syntax:** `index=<string>` \
**Description:** Specifies which index to report on. You can use wildcards to match multiple indexes (e.g., `index=*` or `index=app_*`). You can specify this argument multiple times to include different index patterns. \
**Default:** If no index is specified, the command returns information about the default index.

### summarize

**Syntax:** `summarize=<bool>` \
**Description:** Controls whether to combine event counts across all indexes and servers. If set to `false`, the command splits the event counts by index and server. \
**Default:** true

### report_size

**Syntax:** `report_size=<bool>` \
**Description:** Controls whether to include the index size in bytes in the results. When set to `true`, the command adds a `size_bytes` field to the output. \
**Default:** false

### list_vix

**Syntax:** `list_vix=<bool>` \
**Description:** Controls whether to include virtual indexes in the results. When set to `false`, virtual indexes are excluded. \
**Default:** true

## Examples

### 1. Count events across all default indexes

Display a total count of events in the default indexes, summarized across all servers.

```
| eventcount
```

### 2. Count events in each internal index with size reporting

Return the number of events in each internal index, broken down by server, and including the index size in bytes.

```
| eventcount summarize=false index=_* report_size=true
```

### 3. Count events across all external indexes by server

Return the event count for each combination of external index and server.

```
| eventcount summarize=false index=*
```

### 4. Count events across all indexes (internal and external)

Combine event counts from both external and internal indexes, specifying both patterns.

```
| eventcount summarize=false index=* index=_*
```

### Use-Case Example

**Monitoring index growth for capacity planning**

**Problem:** A system administrator needs to track index growth over time to plan for storage requirements and identify indexes that are growing faster than expected.

**Solution:** Use the `eventcount` command with `report_size=true` to monitor both event counts and storage usage across indexes.

**SPL command:**
```
| eventcount summarize=false report_size=true index=*
| eval size_mb = round(size_bytes/1024/1024, 2)
| sort -size_mb
| rename count as event_count, size_mb as storage_mb
| fields index, server, event_count, storage_mb
```

**Explanation:**
1. The `eventcount` command retrieves event counts and sizes for all indexes.
2. The `eval` command converts the size from bytes to megabytes for easier reading.
3. The `sort` command arranges indexes by size (largest first).
4. The `rename` and `fields` commands format the output for clarity.

**Example data:**
```
index           server               event_count     storage_mb
logs_app        indexer-01           12876543        256.78
logs_web        indexer-01           8765432         178.45
logs_db         indexer-01           4532109         156.32
metrics         indexer-01           24987654        98.76
audit           indexer-01           1876543         67.89
```

This use case helps administrators identify which indexes consume the most storage, enabling better capacity planning and resource allocation.
# append

## Description

Combines the results of a subsearch with the current results. The `append` command adds events from a secondary search to your primary search results.

With the `append` command, you can consolidate data from different searches into a single result set. This is useful for comparing data across different sources, time periods, or conditions.

Note that `append` operates only on historical data and may not produce accurate results in real-time searches.

## Syntax

The required syntax is in **bold**.

**append** \
[extendtimerange=\<bool>] \
[maxtime=\<int>] \
[maxout=\<int>] \
**\<subsearch>**

## Required arguments

### subsearch

**Syntax:** `[<search-string>]` \
**Description:** A secondary search enclosed in square brackets. This specifies the source of the events that you want to append to your current results.

## Optional arguments

### extendtimerange

**Syntax:** `extendtimerange=<bool>` \
**Description:** If true, includes the subsearch time range in the overall search time range. Use this when the subsearch's time range extends beyond the main search's time range, especially when using transforming commands like chart, timechart, or stats with time-based bins. \
**Default:** false

### maxtime

**Syntax:** `maxtime=<int>` \
**Description:** The maximum time in seconds to spend on the subsearch before automatically finalizing. \
**Default:** 60

### maxout

**Syntax:** `maxout=<int>` \
**Description:** The maximum number of result rows to return from the subsearch. \
**Default:** 50000

## Examples

### 1. Append results from different indexes

Combine events from both the "web" and "app" indexes.

```
index=web | append [search index=app]
```

### 2. Append results with different search criteria

Search for "error" events and append "warning" events to the results.

```
index=logs error | append [search index=logs warning]
```

### 3. Append results with extended time range

Combine current day's events with previous week's events, ensuring the time range extends to include the earlier data.

```
index=security earliest=-1d | append extendtimerange=true [search index=security earliest=-7d latest=-1d]
```

### 4. Append results with custom limits

Increase the default limits for the subsearch to include more data and allow more processing time.

```
index=logs error | append maxout=100000 maxtime=120 [search index=logs warning]
```

### Use-Case Example

**Creating a unified view of application performance across environments**

**Problem:** A DevOps engineer needs to compare application performance between production and development environments to identify discrepancies before a new release.

**Solution:** The `append` command combines performance metrics from both environments for side-by-side analysis.

**SPL command:**

```
index=metrics environment=production app_name="payment-service"
| append [search index=metrics environment=development app_name="payment-service"]
| stats avg(response_time) as avg_response, max(response_time) as max_response, count as request_count by environment, endpoint
| sort -avg_response
```

**Explanation:**

1. The search starts by retrieving performance metrics from the production environment.
2. The `append` command adds metrics from the development environment.
3. The `stats` command calculates average and maximum response times for each endpoint in both environments.
4. The `sort` command organizes results by average response time (slowest first).

**Example data:**

```
environment    endpoint              avg_response    max_response    request_count
production     /api/payment/process  245.6           1890.2          15782
development    /api/payment/process  187.3           2345.7          4521
production     /api/payment/verify   156.3           876.5           18654
development    /api/payment/verify   143.2           798.4           5231
```

This use case demonstrates how the `append` command creates a consolidated view of performance metrics across different environments, enabling effective comparison and analysis.

# timechart

## Description

Creates a time series chart with corresponding table of statistics.

A timechart is a statistical aggregation applied to a field to produce a chart, with time used as the X-axis. You can specify a split-by field, where each distinct value of the split-by field becomes a series in the chart. If you use an `eval` expression, the split-by clause is required. With the `limit` and `agg` options, you can specify series filtering. These options are ignored if you specify an explicit where-clause. If you set limit=0, no series filtering occurs.

## Syntax

The required syntax is in **bold**.

timechart \
[limit=\<chart-limit-opt>] \
[\<bin-options>... ] \
(**\<single-agg>** [BY **\<split-by-clause>**] )

## Required Arguments

When specifying `timechart` command arguments, `<single-agg>`  BY `<split-by-clause>` is required.

### single-agg

**Syntax:** `count or \<stats-func>(\<field>)` \
**Description:** A single aggregation applied to a single field, including an evaluated field. For \<stats-func>, see [Stats function options](link-for-stats-page.md). No wildcards are allowed. The field must be specified, except when using the count function, which applies to events as a whole.

### split-by-clause

**Syntax:** `<field>` \
**Description:** Specifies a field to split the results by.

## Optional Arguments

### bin-options

**Syntax:** `span=<int>[<timescale>]`
**Descripton:** Option that can be used to specify discrete bins, or groups, to organize the information. A span of each bin, based on time. If the timescale is provided, this is used as a time range. If not, this is an absolute bin length.

**\<timescale>** \
**Syntax:** `<sec>`, `<min>`, `<hr>`, `<day>`, `<week>`, `<month>`, `<quarter>`, or `<subseconds>` \
**Description:** Timescale units
**Default**: `<sec>`

| Timescale    | Valid syntax                                       | Description                                              |
|--------------|----------------------------------------------------|----------------------------------------------------------|
| `<sec>`      | s \| sec \| secs \| second \| seconds              | Time scale in seconds.                                   |
| `<min>`      | m \| min \| mins \| minute \| minutes              | Time scale in minutes.                                   |
| `<hr>`       | h \| hr \| hrs \| hour \| hours                    | Time scale in hours.                                     |
| `<day>`      | d \| day \| days                                   | Time scale in days.                                      |
| `<week>`     | w \| week \| weeks                                 | Time scale in weeks.                                     |
| `<month>`    | mon \| month \| months                             | Time scale in months.                                    |
| `<quarter>`  | q \| qtr \| qtrs \| quarter \| quarters            | Time scale in quarters.                                  |
| `<subseconds>`| us \| ms \| cs \| ds                              | Time scale in microseconds (us), milliseconds (ms), centiseconds (cs), or deciseconds (ds). |


## Examples

### 1. Chart the average of "CPU" for each "host"

For each minute, calculate the average value of "CPU" for each "host".

```
... | timechart span=1m avg(CPU) BY host
```

### 2. Chart the eventypes by source_ip

For each minute, count the eventypes by `source_ip`.

```
sshd failed OR failure | timechart span=1m count(eventtype) BY source_ip
```

### Use-Case Example

**Monitor average CPU usage over time by host**

**Problem:** A user wants to monitor the average CPU usage across different hosts over time to identify trends and potential issues.

**Solution:** The `timechart` command can be used to create a time series chart that shows the average CPU usage for each host, with the data aggregated by minute.

**SPL command:**

```
index=performance_metrics
| timechart span=1m avg(CPU) BY host
```

**Explanation:**
1. The search starts by looking at the performance metrics logs with the `index=performance_metrics`.
2. The `timechart` command is used to calculate the average CPU usage (`avg(CPU)`) for each host (`BY host`).
3. The data is aggregated in 1-minute intervals (`span=1m`).

**Example data:**

```
_time               host       avg(CPU)
2024-07-12 09:15    server1    35.2
2024-07-12 09:15    server2    42.1
2024-07-12 09:16    server1    34.8
2024-07-12 09:16    server2    43.0
...
```

This use case demonstrates how the `timechart` command can be used to monitor and visualize average CPU usage over time, split by host. This enables the user to identify trends, detect anomalies, and make informed decisions about resource allocation and performance optimization.
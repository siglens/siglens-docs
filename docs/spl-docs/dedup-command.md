# dedup

## Description

Removes the events that contain an identical combination of values for the fields that you specify.

With the `dedup` command, you can specify the number of duplicate events to keep for each value of a single field, or for each combination of values among several fields. Events returned by `dedup` are based on search order.

You can sort the fields, which determines which event is retained. Other options enable you to retain events with the duplicate fields removed, or to keep events where the fields specified do not exist in the events.

## Syntax

The required syntax is in **bold**.


**dedup** \
[\<N>] \
**\<field-list>** \
[keepevents=\<bool>] \
[keepempty=\<bool>] \
[consecutive=\<bool>] \
[sortby \<sort-by-clause>]


## Required arguments

### field-list

**Syntax:** `<field1> [<field2> ...]` \
**Description:** A list of field names to remove duplicate values from.

## Optional arguments

### consecutive

**Syntax:** `consecutive=<bool>` \
**Description:** If true, only remove events with duplicate combinations of values that are consecutive. \
**Default:** false

### keepempty

**Syntax:** `keepempty=<bool>` \
**Description:** If set to true, keeps every event where one or more of the specified fields is not present (null). \
**Default:** false. All events where any of the selected fields are null are dropped.

The `keepempty=true` argument keeps every event that does not have one or more of the fields in the field list.

### \<N>

**Syntax:** `<int>` \
**Description:** The `dedup` command retains multiple events for each combination when you specify `N`. The number for `N` must be greater than 0. If you do not specify a number, only the first occurring event is kept. All other duplicates are removed from the results.

### \<sort-by-clause>

**Syntax:** `sortby (- | +) <sort-field> [(- | +) <sort_field> ...]` \
**Description:** List of the fields to sort by and the sort order. Use the dash symbol (`-`) for descending order and the plus symbol (`+`) for ascending order. You must specify the sort order for each field specified in the `<sort-by-clause>`. The `<sort-by-clause>` determines which of the duplicate events to keep. When the list of events is sorted, the top-most event, of the duplicate events in the sorted list, is retained.

### Sort field options

**\<sort-field>**

**Syntax:** `<field>`, `auto(<field>)`, `str(<field>)`, `ip(<field>)`, or `num(<field>)` \
**Description:** The options that you can specify to sort the events.

**\<field>**

**Syntax:** `<string>` \
**Description:** The name of the field to sort.

**auto**

**Syntax:** `auto(<field>)` \
**Description:** Determine automatically how to sort the field values.

**ip**

**Syntax:** `ip(<field>)` \
**Description:** Interpret the field values as IP addresses.

**num**

**Syntax:** `num(<field>)` \
**Description:** Interpret the field values as numbers.

**str**

**Syntax:** `str(<field>)` \
**Description:** Order the field values by using the lexicographic order.

## Examples

### 1. Remove duplicate results based on one field

Remove duplicate search results with the same `host` value.

```
... | dedup host
```

### 2. Remove duplicate results and sort results in ascending order

Remove duplicate search results with the same `source` value and sort the results by the `timestamp` field in ascending order.

```
... | dedup source sortby +timestamp 
```

### 3. Remove duplicate results and sort results in descending order

Remove duplicate search results with the same `source` value and sort the results by the `size` field in descending order.

```
... | dedup source sortby -size
```

### 4. Keep the first 3 duplicate results

For search results that have the same `source` value, keep the first 3 that occur and remove all subsequent results.

```
... | dedup 3 source
```

### 5. Keep results that have the same combination of values in multiple fields

For search results that have the same `source` AND `host` values, keep the first 2 that occur and remove all subsequent results.

```
... | dedup 2 source host
```

### 6. Remove only consecutive duplicate events

Remove only consecutive duplicate events. Keep non-consecutive duplicate events. In this example duplicates must have the same combination of values the `source` and `host` fields.

```
... | dedup consecutive=true source host
```

### Use-Case Example

**Identify and retain unique error logs for troubleshooting**

**Problem:** A user wants to analyze error logs to identify unique errors based on the combination of error code and error message. They want to remove duplicate error logs to focus on unique errors for efficient troubleshooting.

**Solution:** The `dedup` command can be used to remove duplicate events that have the same combination of error code and error message.

**SPL command:**

```
index=error_logs 
| dedup error_code error_message sortby -time
| fields time, error_code, error_message, host, source
```

**Explanation:**
1. The search starts by looking at the error logs with the `index=error_logs`.
2. The `dedup` command removes duplicate events that have the same combination of `error_code` and `error_message`.
3. The `sortby` command sorts the results by `time` in descending order to show the most recent unique errors first.
4. The `fields` command selects the relevant fields (`time`, `error_code`, `error_message`, `host`, `source`) for output.

**Example data:**

```
time                      error_code    error_message                host          source
2024-07-12 09:15:23       404           Not Found                    server1       /var/log/httpd/error_log
2024-07-12 09:16:00       500           Internal Server Error        server2       /var/log/httpd/error_log
2024-07-12 09:17:45       400           Bad Request                  server3       /var/log/httpd/error_log
2024-07-12 09:18:30       503           Service Unavailable          server1       /var/log/httpd/error_log
```

This use case demonstrates how the `dedup` command can be used to identify and retain unique error logs based on the combination of error code and error message. This helps in focusing on unique errors for efficient troubleshooting and reducing noise in the error analysis process.


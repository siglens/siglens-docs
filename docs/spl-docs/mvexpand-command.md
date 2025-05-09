# mvexpand

## Description

Expands the values of a multivalue field into separate events, creating one event for each value in the multivalue field.

The `mvexpand` command transforms a single event with multiple values into multiple events with single values, allowing for more detailed analysis of each value.

Note: This command cannot be applied to internal fields.

## Syntax

The required syntax is in **bold**.

**mvexpand** **\<field>** \
[limit=\<int>]

## Required arguments

### field

**Syntax:** `<field>` \
**Description:** The name of the multivalue field to expand into separate events.

## Optional arguments

### limit

**Syntax:** `limit=<int>` \
**Description:** Specifies the maximum number of values from the multivalue field to expand for each input event. \
**Default:** 0 (no limit)

## Examples

### 1. Expand all values in a multivalue field

Create new events for each value in the multivalue field "tags".

```
... | mvexpand tags
```

### 2. Limit the number of expanded values

Create new events for only the first 10 values in the multivalue field "ip_addresses".

```
... | mvexpand ip_addresses limit=10
```

### 3. Working with multiple multivalue fields

When you need to expand events with multiple multivalue fields, you can combine them first using the `mvzip` function and then expand them.

```
... | rex field=_raw "a=(?<a>\d+)" max_match=5
| rex field=_raw "b=(?<b>\d+)" max_match=5
| eval combined = mvzip(a,b)
| mvexpand combined
| rex field=combined "(?<value_a>\d+),(?<value_b>\d+)"
| table _time value_a value_b
```

### Use-Case Example

**Analyzing user actions from access logs**

**Problem:** A security analyst needs to analyze each action performed by users, but the actions are stored as a multivalue field in the log events.

**Solution:** The `mvexpand` command can separate each action into individual events for more detailed analysis.

**SPL command:**
```
index=security sourcetype=user_activity
| eval timestamp=_time
| fields timestamp, user_id, actions
| mvexpand actions
| stats count by user_id, actions
| sort -count
```

**Explanation:**
1. The search retrieves user activity logs.
2. The `eval` command preserves the original timestamp.
3. The `fields` command selects only the relevant fields.
4. The `mvexpand` command creates a separate event for each value in the "actions" field.
5. The `stats` command counts occurrences of each action by user.
6. The `sort` command organizes results by frequency (most frequent first).

**Example data:**

Before expansion:
```
timestamp           user_id    actions
2024-07-12 09:15:23 user123    ["login", "view_report", "export_data", "logout"]
2024-07-12 10:30:45 user456    ["login", "modify_settings", "create_user", "logout"]
```

After expansion and stats:
```
user_id    actions          count
user123    export_data      15
user456    create_user      12
user123    view_report      10
user456    modify_settings  8
user123    login            7
user456    login            7
user123    logout           7
user456    logout           7
```

This use case demonstrates how the `mvexpand` command enables detailed analysis of individual values within multivalue fields, providing insights that would be difficult to obtain when the values are grouped together.
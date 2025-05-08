# format

## Description

Formats the results of a subsearch into a single result, placing that formatted result into a new field called `search`. This command is typically used implicitly by subsearches to properly structure their output.

The `format` command allows customization of how multi-value fields and result rows are combined and separated in the output.

## Syntax

The required syntax is in **bold**.

**format** \
[mvsep="\<mv separator>"] \
[maxresults=\<int>] \
["\<row prefix>" "\<column prefix>" "\<column separator>" "\<column end>" "\<row separator>" "\<row end>"] \
[emptystr="\<string>"]

Note: If you specify any row or column formatting options, you must specify all six of them.

## Required arguments

None.

## Optional arguments

### mvsep

**Syntax:** `mvsep="<string>"` \
**Description:** The separator to use between values in multi-value fields. \
**Default:** OR

### maxresults

**Syntax:** `maxresults=<int>` \
**Description:** The maximum number of results to return from the subsearch. \
**Default:** 0 (no limit)

### \<row prefix>

**Syntax:** `"<string>"` \
**Description:** The string to insert at the beginning of each row. \
**Default:** "("

### \<column prefix>

**Syntax:** `"<string>"` \
**Description:** The string to insert at the beginning of each column value. \
**Default:** "("

### \<column separator>

**Syntax:** `"<string>"` \
**Description:** The string to insert between column values within a row. \
**Default:** AND

### \<column end>

**Syntax:** `"<string>"` \
**Description:** The string to insert at the end of each column value. \
**Default:** ")"

### \<row separator>

**Syntax:** `"<string>"` \
**Description:** The string to insert between rows. \
**Default:** OR

### \<row end>

**Syntax:** `"<string>"` \
**Description:** The string to insert at the end of each row. \
**Default:** ")"

### emptystr

**Syntax:** `emptystr="<string>"` \
**Description:** The value to output when the results are empty (containing no fields or values other than internal fields). \
**Default:** NOT( )

## Examples

### 1. Basic format with default settings

Format the results of a subsearch using the default formatting options.
```
... | format
```

The default formatting produces output like: `(field1=value1 AND field2=value2) OR (field1=value3 AND field2=value4)`

### 2. Custom separators for SQL-like formatting

Format a subsearch result to use SQL-like syntax for use with another system.
```
... | format " " " " "=" " " " OR " " "
```

This creates output like: `field1=value1 OR field2=value2`

### 3. Limit the number of results

Restrict the subsearch to return only the first 5 results.
```
... | format maxresults=5
```

### 4. Custom multi-value field separator

Change how multiple values for the same field are joined together.
```
... | format mvsep=","
```

### 5. Custom empty result message

Define a custom message when the subsearch returns no results.
```
... | format emptystr="NO_MATCHING_RESULTS"
```

### Use-Case Example

**Creating a dynamic IN clause for filtering data**

**Problem:** A user needs to create a dynamic filter based on the results of a previous search, similar to an SQL IN clause.

**Solution:** Use the `format` command to structure the subsearch results into a format that can be used as a filter condition.

**SPL command:**
```
| search [
search index=security sourcetype=firewall action=blocked
| stats count by src_ip
| where count > 100
| fields src_ip
| format maxresults=1000 " " "src_ip=" " OR " " " " " "
]
```
**Explanation:**
1. The subsearch finds IP addresses that have been blocked more than 100 times
2. The `fields` command extracts just the src_ip field
3. The `format` command structures the results into a space-separated list like: `src_ip=192.168.1.1 OR src_ip=10.10.10.5 OR src_ip=172.16.0.1`
4. The main search uses this formatted string as a filter condition

This use case demonstrates how the `format` command creates dynamic filter conditions based on search results, enabling more flexible and powerful data analysis.
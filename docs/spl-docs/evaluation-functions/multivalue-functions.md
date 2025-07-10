# Multivalue functions

_This list includes functions that can be used to return multivalue fields or can operate on multivalue fields._



## split(\<str\>, \<delim\>)
This function splits `<str>` with the delimiter `<delim>` and return these parts as a multivalue field.

#### Usage
- `<str>` can be a string literal or a field name. 
- `<delim>` is a string literal specifying the delimiter. 
- You can use this function with an eval command.

### Example
The following command returns the split parts of the given string as a multivalue field fruits having values `apple`, `banana`, `mango` and `kiwi`.
```
... | eval fruits=split("apple:banana:mango:kiwi", ":")
```

### Use-Case Example

**Extracting Email Recipients from Logs**

**Problem:** In email transaction logs, recipient addresses are often stored in a single string, separated by semicolons. Analyzing individual recipient behavior or response rates requires splitting these strings into separate values for each recipient.

**Solution:** To efficiently extract individual email recipients from log entries, a command can be used to analyze the `recipients` field in the dataset. This command employs the `eval` function combined with the `split` function to separate the recipient addresses into a multivalue field.

```
... | eval email_list=split(recipients, ";")
```

**Explanation:**
1. The `eval` function creates a new field named `email_list`, which will contain the separated email addresses as individual values.
2. The `split` function is used to divide the `recipients` string into separate email addresses based on the semicolon (`;`) delimiter.
  - For example, if `recipients` contains `user1@example.com;user2@example.com;user3@example.com`, the `split` function will create an `email_list` multivalue field with three separate values: `user1@example.com`, `user2@example.com`, and `user3@example.com`.

This method allows for detailed analysis of email logs, such as calculating response rates or identifying recipient engagement, by treating each recipient address as an individual entity.

## mvindex(\<mv\>, \<start\>, \<end\>)

This function extracts a specific subset of values from a multivalue field based on the provided start and end index positions.

### Usage
- The `<mv>` parameter must be a multivalue field and `<start>` and `<end>` must be numbers.
- The `<start>` parameter is required and indicates the starting index of the value(s) you want to extract.
- The `<end>` parameter is optional. If provided, it defines the ending index, and the function will return all values between `<start>` and `<end>`, inclusive.
- If you don't provide an `<end>` index, the function does not assume a range; it simply returns the value at the start index.

### Indexing Details
- Indexes begin at 0, meaning the first item in a list is at position 0, the second at position 1, and so on.
- If only `<start>` is specified, the function returns the value at that position.
- If both `<start>` and `<end>` are specified, the function returns all values from `<start>` to `<end>`, inclusive of the item at `<end>`.
- Negative indexes are supported, where `-1` refers to the last value in the list, `-2` to the second last, and so forth.
- If the indexes provided are out of range or invalid, the function returns `NULL`.

### Example
Suppose you have a multivalue field called `cities` containing the following values:

```
New York, London, Paris, Tokyo, Sydney, Berlin, Dubai
```

To extract the third city in the list (Paris), use:

```
... | eval selected_city=mvindex(cities,2)
```

This command will set `selected_city` to `Paris`. When you use `mvindex` to extract a single item, it returns that item as a normal value instead of a multivalue field containing one item.

To get a range of cities, say from the second to the fourth city (London to Tokyo), use:

```
... | eval city_range=mvindex(cities,1,3)
```

The result for `city_range` will be `London, Paris, Tokyo`.

### Use-Case Example

**Selecting Items from Log Data**

**Problem:** Suppose you're analyzing log data where multiple status codes are recorded as a list in a single event. You need to extract specific status codes, such as the first few or the last few, for further analysis.

**Solution:** The `mvindex` function can help isolate these specific status codes based on their position in the multivalue field.

```
... | eval selected_status=mvindex(status_codes, 0, 2)
```

**Explanation:**
1. The `eval` command creates a new field called `selected_status`.
2. The `mvindex` function is used to extract the first three status codes (index 0 to 2) from the `status_codes` field.

This approach is useful for focusing on specific subsets of data within multivalue fields, such as analyzing the most recent status updates or filtering based on priority.

## mvcount(\<mv\>)

This function calculates the number of values within a multivalue field and returns this count as a single value.

### Usage
- The `<mv>` parameter is a multivalue field that contains the values you want to count.

### Function Behavior
- If the multivalue field contains multiple values, this function returns the total count of those values.
- If the field contains a single value, the function returns 1.
- If the field is empty, the function returns 0. If the field does not exist, `mvcount` is not applied to the field and produces no output.

### Example
Consider a multivalue field `colors` with the following values:

```
red, green, blue, yellow
```

To count the number of colors in this field, you would use:

```
... | eval color_count=mvcount(colors)
```

The result for `color_count` will be `4`, as there are four values in the `colors` field.

### Use-Case Example

**Counting User Interactions in Log Data**

**Problem:** You have log data where each event lists the actions a user has taken during a session, stored in a multivalue field. You need to know how many distinct actions were taken in each session.

**Solution:** The `mvcount` function can be used to count the number of actions recorded in the multivalue field for each session.

```
... | eval action_count=mvcount(user_actions)
```

**Explanation:**
1. The `eval` command creates a new field called `action_count`.
2. The `mvcount` function counts the number of distinct actions in the `user_actions` field.

This method allows you to easily track the number of interactions or actions taken by users in each session, providing insights into user engagement or system utilization.

## mvdedup(&lt;mv&gt;)
This function takes a multivalue field and returns a new multivalue field with duplicate values removed, preserving the original order of first occurrences.

#### Usage
- `<mv>` must be a multivalue field generated by another function (e.g., `split()`, `mvappend()`).
- You can use this function with the `eval` and `where` commands.
- Duplicate entries are eliminated; only the first instance of each value is kept.

### Example
The following command removes duplicate entries from the `tags` field:
```
... | eval unique_tags = mvdedup(split("error,warning,error,info,warning", ","))
```

### Use-Case Example

**Cleaning Up Log Tags for Accurate Reporting**

**Problem:** In application logs, the `tags` field may include repeated labels such as `"error","error","warning","info","warning"`. These duplicates can inflate statistics or clutter dashboards.

**Solution:** Apply the `mvdedup` function to eliminate repeated values, keeping only unique tag entries in the order they appeared.

```
... | eval raw_tags=split(tags, ",")
    | eval clean_tags=mvdedup(raw_tags)
```

**Explanation:**
1. `split(tags, ",")` creates a multivalue field from a comma-separated list.
2. `mvdedup(raw_tags)` removes all but the first occurrence of each value.
3. The result is a cleaned multivalue field: only distinct tag values remain.


## mvfind(\<mv\>, \<regex\>)

This function searches through a multivalue field to find the first value that matches a given regular expression and returns the index of that match. The index starts at zero. If no match is found, the function does not return anything.

### Usage
- The `<mv>` parameter is the multivalue field you want to search through.
- The `<regex>` parameter is the regular expression pattern used to search for a match.

### Function Behavior
- The function returns the index of the first value in the multivalue field that matches the regular expression.
- Indexes begin at 0, so the first value in the field has an index of 0, the second has an index of 1, and so on.

### Example
Suppose you have a multivalue field `error_codes` with the following values:

```
error101, warning202, error305, info404
```

To find the index of the first value that starts with "error", you would use:

```
... | eval error_index=mvfind(error_codes, "^error")
```

The result for `error_index` will be `0`, as "error101" is the first match.

### Use-Case Example

**Identifying Specific Error Patterns in Log Data**

**Problem:** You are analyzing system logs that contain various status messages, and you need to quickly identify the first occurrence of a specific type of error within each log event.

**Solution:** The `mvfind` function can help you find the position of a specific error pattern within a multivalue field that lists all messages for an event.

```
... | eval first_error_index=mvfind(log_messages, "ERROR\d{3}")
```

**Explanation:**
1. The `eval` command creates a new field called `first_error_index`.
2. The `mvfind` function searches through the `log_messages` field to find the first occurrence of a pattern that matches `ERROR` followed by three digits.

This method is useful for pinpointing the position of significant error messages in log data, enabling quick identification and response to critical issues.


## mvjoin(\<mv\>, \<delim\>)

This function takes a multivalue field and a specified delimiter, concatenating the individual values within the multivalue field into a single string, with the delimiter separating each value.

### Usage
- The `<mv>` parameter is the multivalue field containing the values you want to join.
- The `<delim>` parameter is a string that will be used to separate each value in the resulting single value field.

### Function Behavior
- The function returns a single string where each value from the multivalue field is separated by the specified delimiter.
- This is useful when you want to create a unified string representation of a multivalue field.

### Example
Consider a multivalue field `numbers` with the following values:

```
1, 2, 3, 4, 5
```

To join these numbers into a single string with "AND" as the delimiter, you would use:

```
... | eval joined_numbers=mvjoin(numbers, " AND ")
```

The result for `joined_numbers` will be `1 AND 2 AND 3 AND 4 AND 5`.

### Use-Case Example

**Creating Search Queries from User Selections**

**Problem:** You have a multivalue field where users have selected various options in a form, and you need to create a search query that includes all selected options, separated by `OR`.

**Solution:** The `mvjoin` function can be used to concatenate all selected options into a single search query string.

```
... | eval search_query=mvjoin(selected_options, " OR ")
```

**Explanation:**
1. The `eval` command creates a new field called `search_query`.
2. The `mvjoin` function joins all selected options from the `selected_options` field into a single string, using "OR" as the delimiter.

This approach is particularly useful for dynamically generating complex search queries based on user input, ensuring that all selected options are included in the query.  

## mvsort(&lt;mv&gt;)
This function takes a multivalue field and returns a new multivalue field with its values sorted lexicographically.

#### Usage
- `<mv>` must be a multivalue field, such as the result of a function like `split()`.
- Sorting is lexicographic: values are compared by byte order in UTF-8 encoding.
   - Numbers are sorted before letters.
   - Uppercase letters precede lowercase letters.
   - Symbols are sorted depending on encoding.
   - For example: `mvsort(split("one,Two,30,4", ","))` results in `["30", "4", "Two", "one"]`
- You can use this function with an `eval` command.

### Example
The following command sorts the values in the `fruits` field lexicographically.
```
... | eval sorted_fruits=mvsort(split("banana,apple,mango,kiwi", ","))
```

### Use-Case Example

**Normalizing Field Values for Accurate Grouping**

**Problem:** Multivalue fields with unordered entries can lead to inconsistent groupings or false mismatches. For instance, two rows with values `"beta,alpha"` and `"alpha,beta"` are semantically the same but differ byte-wise.

**Solution:** To ensure consistent grouping and comparisons, the multivalue field can be sorted using `mvsort` before applying further logic.

```
... | eval tags=split("beta:alpha:gamma", ":") | eval sorted_tags=mvsort(tags)
```

**Explanation:**
1. The `split` function creates a multivalue field `tags` from a colon-delimited string.
2. `mvsort` reorders the values in lexicographic (UTF-8) byte order: `"alpha", "beta", "gamma"`.

Using `mvsort` ensures consistency across pipelines and helps avoid logic errors caused by value ordering mismatches.

## mvappend(\<values\>)

### Description

This function takes one or more values and returns a single multivalue result that contains all of the values. The values can be strings, multivalue fields, or single value fields.

### Usage

You can use this function with the `eval` and `where` commands, and as part of eval expressions.

### Basic examples

This example shows how to append two values, `localhost` is a literal string value and `srcip` is a field name.

```
... | eval fullName=mvappend("localhost", srcip)
```

The following example shows how to use nested `mvappend` functions.

  * The inner `mvappend` function contains two values: `localhost` is a literal string value and `srcip` is a field name.
  * The outer `mvappend` function contains three values: the inner `mvappend` function, `destip` is a field name, and `192.168.1.1` which is a literal IP address.

The results are placed in a new field called `ipaddresses`, which contains the array `["localhost", <values_in_scrip>, <values_in_destip>, "192.168.1.1"]`.

```
... | eval ipaddresses=mvappend(mvappend("localhost", srcip), destip, "192.168.1.1")
```

Note that the previous example generates the same results as the following example, which does not use a nested `mvappend` function:

```
... | eval ipaddresses=mvappend("localhost", srcip, destip, "192.168.1.1")
```

If the first value in the `srcip` field is 203.0.113.0 and the first value in the `destip` field is 203.0.113.255, the results look something like this:

| time                | ipaddresses                                           |
| :------------------ | :---------------------------------------------------- |
| 2024-11-19 16:43:31 | localhost <br/> 203.0.113.0 <br/> 203.0.113.255 <br/> 192.168.1.1 |
## mvzip(&lt;mv_left&gt;, &lt;mv_right&gt;, &lt;delim&gt;)
This function combines the values in two multivalue fields by pairing corresponding elements and joining them with a delimiter.

#### Usage
- `<mv_left>` and `<mv_right>` must be multivalue fields.
- `<delim>` is an optional string literal specifying the delimiter to insert between paired values. If omitted, a comma (`,`) is used by default.
- You can use this function with an `eval` command.
- This function behaves similarly to Python's `zip()`.

Values are zipped in order:
- First value of `<mv_left>` with first value of `<mv_right>`,
- Second with second, and so on.
- If the lengths of the two fields differ, extra values from the longer field are ignored.

### Example
The following command joins two multivalue fields using space " " as the delimiter.
```
... | eval nserver=mvzip(mvfield1, mvfield2, " ")
```

### Use-Case Example

**Combining Host-Port Pairs into a Single Field**

**Problem:** You have two multivalue fields, `hosts` and `ports`, and you want to pair each host with its corresponding port (e.g. `host1:80`, `host2:443`).

**Solution:** Use the `mvzip` function with a colon (`:`) delimiter to create a single multivalue field that merges the corresponding values.

```
... | eval host_port=mvzip(hosts, ports, ":")
```

**Explanation:**
1. The `mvzip` function pairs values by position: `hosts[0]` with `ports[0]`, `hosts[1]` with `ports[1]`, etc.
2. It joins each pair using the specified delimiter (`:` in this case).
   - If `hosts = ["host1", "host2"]` and `ports = ["80", "443"]`, the result is `["host1:80", "host2:443"]`.
3. The output is a new multivalue field that can be used for table displays, comparisons, or lookups.

To combine more than two fields, you can nest the `mvzip` calls. For example:
```
... | eval three_fields_zip=mvzip(mvzip(field1, field2), field3)
```
This creates multivalue strings like: `value1,value2,value3`

## mvfilter(\<predicate\>)

This function filters the values in a multivalue field based on a Boolean expression. It evaluates each value in the field and retains only those that satisfy the given condition.

### Usage
- The `<predicate>` parameter is a Boolean expression used to test each value in the multivalue field.
- The expression **must reference only one field**.
- You can use `mvfilter` within commands like `eval`, `fieldformat`, and `where`.

### Function Behavior
- The function evaluates the Boolean expression for each value in the multivalue field.
- Only values for which the expression evaluates to `true` are retained in the result.
- NULL values are not included by default. To include NULL values, use `OR isnull(<value>)` in your expression.

### Example
Consider a multivalue field `email` with the following values:

```
"abc@example.com", "support@help.net", "team@org.org"
```

To filter and retain only the email addresses ending in `.net` or `.org`, use:

```
... | eval filtered_emails = mvfilter(match(email, "\.net$") OR match(email, "\.org$"))
```

The result for `filtered_emails` will be `"support@help.net", "team@org.org"`.

### Use-Case Example

**Filtering Valid Email Domains**

**Problem:** You have a multivalue field containing various email addresses, and you want to retain only those from specific domains such as `.com` and `.org`.

**Solution:** Use the `mvfilter` function with pattern matching conditions to keep only the relevant email values.

```
... | eval emails = split(user_email, ",") | eval filtered = mvfilter(match(emails, "\.com$") OR match(emails, "\.org$")) | where mvcount(filtered) > 0 | sort ident | fields filtered, ident, city | head 5
```

**Explanation:**
1. The `split` function converts comma-separated email addresses into a multivalue field called `emails`.
2. The `mvfilter` function retains only emails ending in `.com` or `.org` from the `emails` field.
3. The `where` clause filters results to show only records that have at least one valid email after filtering.

This method allows you to selectively filter multivalue fields based on complex conditions, enabling more targeted data analysis and processing.

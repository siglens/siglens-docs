# Date and Time Functions

_This list includes functions designed for handling date and time operations._

## **now()**

This function returns the current date and time in epoch seconds in local timezone.

### Usage

You can use this function to get the current timestamp in your queries. It is commonly used with the `eval` command to add the current time to your data.

### Example

1. Using the `now` function with the `eval` command to add the current timestamp to each event:
```spl
... | eval current_time=now()
```

2. When working with time data in logs or events, it's common to need to calculate the time elapsed between when an event occurred and the current time. This can be particularly useful for monitoring systems, where understanding the recency of events is crucial. 

Imagine you're monitoring a system that logs events with high-precision timestamps, and you're interested in categorizing events based on how recently they occurred. Here's how you could achieve this using the `now` command:

```spl
... | eval current_time_ms=now()*1000, time_difference_ms=current_time_ms - timestamp
	| eval time_category=if(time_difference_ms <= 300000, "within 5 minutes",
	if(time_difference_ms <= 600000, "within 10 minutes",
	if(time_difference_ms <= 1800000, "within 30 minutes", "older than 30 minutes")))
```

This SPL command calculates the time difference in milliseconds between the current time and the event timestamp, then uses nested `if` statements to categorize each event based on this time difference.

### Use-Case Example

**Problem:** Calculate the age of open support tickets in real-time.

**Solution:** Use the `now()` function to compare the current time with the ticket creation time.

**Implementation:**

```spl
status=open
| eval current_time=now()
| eval ticket_age_hours = round((current_time - timestamp) / 3600, 2)
| sort - ticket_age_hours
```

**Explanation:**
1. This query filters for open tickets.
2. It uses `now()` to get the current timestamp.
3. It calculates the ticket age in hours by subtracting the event time (`_time`) from the current time and converting to hours.
4. The results show each ticket's ID, creation time, current time, and age in hours, sorted by age.

## **strftime(&lt;epoch_time&gt;, &lt;format&gt;)**

This function formats an epoch time value as a string according to the specified format. If the format is invalid then the result from this function would be undefined. 

For a complete list and descriptions of the format options you can use, see [Using time variables](/docs/spl-docs/evaluation-functions/time-variables).

### Usage

The `<epoch_time>` argument is the time in epoch format that you want to format. The `<format>` argument is the format string that defines how the output should be formatted.

You can use this function with the `eval` and `where` commands and as part of evaluation expressions with other commands.

### Example

1. Formatting the `start_time` field as a readable date and time string:
```spl
... | eval formatted_time=strftime(timestamp, "%Y-%m-%d %H:%M:%S")
```

### Use-Case Example

**Problem:** Generate a daily report of user logins with human-readable timestamps.

**Solution:** Use `strftime()` to convert epoch timestamps to a formatted date string.

**Implementation:**

```spl
index=security sourcetype=user_logins
| eval login_date=strftime(_time, "%Y-%m-%d")
| eval login_time=strftime(_time, "%H:%M:%S")
| stats count BY login_date, user, login_time
| sort login_date, login_time
```

**Explanation:**
1. This query filters for user login events.
2. It uses `strftime()` to create separate fields for the login date and time.
3. It then counts login events by date, user, and time.
4. The results show a daily breakdown of user logins with readable timestamps.

## **strptime(&lt;date_string&gt;, &lt;format&gt;)**

This function converts a date string into epoch time based on a specified format. If the date string doesn't match the format exactly, the function will process only the parts that do match, ignoring any discrepancies. This could lead to unexpected results. If the date string is invalid, the results will be undefined. The strptime function doesn't work with timestamps that consist of only a month and year. The timestamps must include a day.

For instance, given the string `2023-03-15 09:45:30`, the corresponding format should be `%Y-%m-%d %H:%M:%S`. The date string provided must be on or after January 1, 1971. The `strptime` function accepts dates starting from January 1, 1971, and computes the UNIX timestamp, which is the number of seconds elapsed since January 1, 1970, up to the specified date.

### Usage

The `<date_string>` argument is the date string you want to parse. The `<format>` argument is the format string that defines how the input string is formatted.

You can use this function with the `eval` and `where` commands and as part of evaluation expressions with other commands.

For a complete list and descriptions of the format options you can use, see [Using time variables](/docs/spl-docs/evaluation-functions/time-variables).

### Example

1. Parsing a date string in the format "YYYY-MM-DD" to epoch time:
```spl
... | eval epoch_time=strptime("2023-07-08", "%Y-%m-%d")
```

2. Parsing a date and time string to epoch time:
```spl
... | eval epoch_time=strptime("2023-07-08 14:30:00", "%Y-%m-%d %H:%M:%S")
```

### Use-Case Example

**Problem:** Analyze website traffic patterns for a specific date range where dates are stored as strings.

**Solution:** Use `strptime()` to convert string dates to epoch time for time-based analysis.

**Implementation:**

```spl
... | eval epoch_time=strptime(date_field, "%Y-%m-%d")
| where epoch_time >= strptime("2023-06-01", "%Y-%m-%d") AND epoch_time < strptime("2023-07-01", "%Y-%m-%d")
| timechart span=1d count BY url_path
```

**Explanation:**
1. This query assumes web access logs with a `date_field` in "YYYY-MM-DD" format.
2. It uses `strptime()` to convert the `date_field` to epoch time.
3. It then filters for events in June 2023 using `strptime()` to convert the date range.
4. Finally, it creates a time chart of daily page views for different URL paths.

## **relative_time(\<time\>, \<specifier\>)**

This function takes a UNIX time value and a relative time specifier, returning a new UNIX time value that reflects the specified adjustment.

### Usage
- The `<time>` parameter is a UNIX time value you want to adjust.
- The `<specifier>` parameter is a relative time string that defines how to adjust the given time. 

You can use this function with the `eval` and `where` commands and as part of evaluation expressions with other commands.

For a complete list and descriptions of the format options you can use, see [Using time variables](/docs/spl-docs/evaluation-functions/time-variables).

### Example
To calculate the UNIX time for the start of the current week, based on the current time, you can use:

```
... | eval start_of_week=relative_time(now(), "@w0")
```

This will return the UNIX time for the most recent Sunday at midnight.

To calculate the UNIX time for exactly 3 days ago, use:

```
... | eval three_days_ago=relative_time(now(), "-3d")
```

The result for `three_days_ago` will be the UNIX time corresponding to the same time, but three days earlier.

### Use-Case Example

**Filtering Events from a Specific Time Range**

**Problem:** You need to filter log events to include only those that occurred within a specific time window, such as between two hours ago and one hour ago, snapped to the nearest hour.

**Solution:** The `relative_time` function can be used to define the boundaries of this time range.

```
... | where _time > relative_time(now(), "-2h@h") AND _time < relative_time(now(), "-1h@h")
```

**Explanation:**
1. The `where` clause filters events based on their `_time` field.
2. The `relative_time` function is used to calculate the UNIX time for two hours ago and one hour ago, both snapped to the nearest hour.



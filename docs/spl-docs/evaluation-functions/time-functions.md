# Date and Time functions

_This list includes functions designed for handling date and time operations._


## **now()**

This function returns the current date and time.

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

## **strftime(&lt;epoch_time&gt;, &lt;format&gt;)**

This function formats an epoch time value as a string according to the specified format.

### Usage

The `<epoch_time>` argument is the time in epoch format that you want to format. The `<format>` argument is the format string that defines how the output should be formatted.

You can use this function with the `eval` and `where` commands and as part of evaluation expressions with other commands.

### Example

1. Formatting the `start_time` field as a readable date and time string:
```spl
... | eval formatted_time=strftime(timestamp, "%Y-%m-%d %H:%M:%S")
```

## **strptime(&lt;date_string&gt;, &lt;format&gt;)**

This function parses a date string according to the specified format and returns the corresponding epoch time.

### Usage

The `<date_string>` argument is the date string you want to parse. The `<format>` argument is the format string that defines how the input string is formatted.

You can use this function with the `eval` and `where` commands and as part of evaluation expressions with other commands.

### Example

1. Parsing a date string in the format "YYYY-MM-DD" to epoch time:
```spl
... | eval epoch_time=strptime("2023-07-08", "%Y-%m-%d")
```

2. Parsing a date and time string to epoch time:
```spl
... | eval epoch_time=strptime("2023-07-08 14:30:00", "%Y-%m-%d %H:%M:%S")
```

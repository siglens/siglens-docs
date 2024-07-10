# Aggregate Functions

_This list includes functions that perform statistical calculations over groups of data._

## **avg(&lt;value&gt;)**
This function returns the average, or mean, of the values in a field.

### Usage

You can use this function with the `stats` and `timechart` commands.

### Example

- The following example returns the average of the values in the `latitude` field for each distinct value in the `city` field:

	```spl
	... | stats avg(latitude) BY city
	```

- The following example displays a timechart of the average of the `latency` field by city:

	```spl
	... | timechart avg(latency) BY city
	```

## **min(&lt;value&gt;)**
This function returns the minimum value in a field.

### Usage

This function processes field values as numbers if possible, otherwise processes field values as strings. You can use this function with the `stats` and `timechart` commands. This command cannot be used on non-numeric fields.

### Example

- The following example calculates the minimum value of the `latitude` field for locations in the southern hemisphere (latitude < 0) and groups the results by `weekday`:

	```spl
	... | stats min(eval(latitude < 0)) AS min BY weekday
	```

- The following example finds the minimum `latency` value:

	```spl
	... | stats min(latency)
	```

- The following example displays a timechart of the minimum latency over time for each city:

	```spl
	... | timechart min(latency) BY city
	```

## **max(&lt;value&gt;)**
This function returns the maximum value in a field.

### Usage

This function processes field values as numbers if possible, otherwise processes field values as strings. You can use this function with the `stats` and `timechart` commands. This command cannot be used on non-numeric fields.

### Example

- The following example returns the maximum value of the `latency` field:

	```spl
	... | stats max(latency)
	```

- The following example calculates the maximum value of the `latitude` field for locations in the northern hemisphere (latitude > 0) and groups the results by `weekday`:

	```spl
	... | stats max(eval(latitude > 0)) AS max BY weekday
	```

- The following example displays a timechart of the maximum latency over time for each city:

	```spl
	... | timechart max(latency) BY city
	```

## **range(&lt;value&gt;)**
Returns the difference between the maximum and minimum values in a field.

### Usage

The values in the field must be numeric. You can use this function with the `stats` and `timechart` commands.

### Example

- The following command calculates the range of latency for each city, providing a simple measure of variability:

```spl
... | stats range(latency) AS LatencyRange BY city
```

### Detailed Example

- For a more in-depth analysis, suppose you want to analyze network latency across different cities, focusing on peak hours (9 AM to 5 PM) during weekdays. You aim to identify cities with high latency variability and peak latency times:

```spl
... | where date_wday!="saturday" AND date_wday!="sunday"
| where date_hour>=9 AND date_hour<=17
| eval CityLatency=if(latency>200, "High", "Normal")
| stats min(latency) AS MinLatency, max(latency) AS MaxLatency, range(latency) AS LatencyRange BY city
| sort - LatencyRange
```

- The following example displays a timechart of the range of latency over time for each city:

```spl
... | timechart span=1h range(latency) BY city
```

## **sum(&lt;value&gt;)**
This function returns the sum of the values in a field.

### Usage

You can use this function with the `stats` and `timechart` commands.

### Example

- To calculate the total latency for all events:

	```spl
	... | stats sum(latency)
	```

- To organize the results by a specific field, such as `city`:

	```spl
	... | stats sum(latency) AS "total latency" BY city
	```

- The following example displays a timechart of the sum of latency over time:

	```spl
	... | timechart sum(latency)
	```

## **count(&lt;value&gt;) or c(&lt;value&gt;)**
This function returns the number of occurrences in a field.

### Usage

To use this function, you can specify `count(<value>)`, or the abbreviation `c(<value>)`. This function processes field values as strings. You can use this function with the `stats` and `timechart` commands.

### Example

- Count the number of events in each city:

	```spl
	... | stats count by city
	```

- The following example displays a timechart of the count of events over time, split by city:

	```spl
	... | timechart count by city
	```

## **distinct_count(&lt;value&gt;) or dc(&lt;value&gt;)**
This function returns the count of distinct values in a field.

### Usage

To use this function, you can specify `distinct_count(<value>)`, or the abbreviation `dc(<value>)`. This function processes field values as strings. You can use this function with the `stats` and `timechart` commands.

### Example

- Calculate the number of unique zip codes from which events are reported:

	```spl
	... | stats dc(zip)
	```

- For each city, calculate the distinct count of zip codes with events reporting latency greater than 100ms:

	```spl
	... | where latency > 100 | stats dc(zip) AS UniqueZipCodes by city
	```

- The following example displays a timechart of the distinct count of zip codes reporting events over time:

	```spl
	... | timechart dc(zip)
	```
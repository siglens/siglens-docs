# Aggregate Functions

_This list includes functions that perform statistical calculations over groups of data._

## **avg(\<value\>)**
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

### Use-Case Example

**Calculate Average Response Time for Web Services**

**Problem:** A web administrator wants to determine the average response time for different web services to identify which services might need optimization.

**Solution:** Use the `stats` command with the `avg` function to calculate the average response time for each web service.

**Implementation:**

```spl
index=weblog sourcetype=access_combined
| stats avg(response_time) AS avg_response_time BY service
| sort - avg_response_time
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

### Use-Case Example

**Identify the Minimum CPU Utilization per Minute per Server**

**Problem:** A user wants to identify the minimum CPU utilization recorded every minute for each server. The `cpu_usage` field contains CPU usage measurements taken every 10 seconds within that minute, separated by commas.

**Solution:** Use the `stats` command with an `eval` function to find the minimum CPU utilization value from the string of measurements.

**Assumed Data Format:**

```
server,time,cpu_usage  // fields
server1,1720350000,"50,85,90,70,85,100"
server2,1720350000,"70,90,99,85,60,70"
server1,1720350060,"105,90,87,99,90,80"
server2,1720350060,"75,89,80,70,75,80"
```

**Query:**

```spl
index=server_metrics sourcetype=cpu_usage
| makemv delim="," cpu_usage
| eval cpu_usage_list=split(cpu_usage, ",")
| eval min_cpu_per_min = min(cpu_usage_list)
| stats min(min_cpu_per_min) AS min_cpu_usage BY server, _time
```

**Explanation:**
1. The `makemv` command splits the `cpu_usage` string into multiple values based on the delimiter ",".
2. The `split` function in the `eval` command converts the `cpu_usage` string into a list of values.
3. The `min` function within the `eval` command calculates the minimum CPU utilization value from the list of `cpu_usage` values.
4. The `stats` command is then used to calculate the minimum `min_cpu_per_min` for each `server` and `time` combination, effectively finding the minimum CPU utilization per minute per server.
5. The result is stored in a new field called `min_cpu_usage`.

**Output:**

The output for the above command based on the provided data would look like this:

```
server    _time        min_cpu_usage
server1   1720350000   50
server2   1720350000   60
server1   1720350060   80
server2   1720350060   70
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

### Use-Case Example

**Identify the Maximum CPU Utilization per Server Over Time**

**Problem:** A system administrator wants to monitor the maximum CPU utilization for each server over time to identify potential overloads.

**Solution:** Use the `stats` command to calculate the maximum CPU utilization per server. Alternatively, use the `timechart` command to visualize the maximum CPU utilization over time for each server.

**Implementation with `stats`**:

Assuming the data is structured with fields for `server`, `time`, and `cpu_usage`, the following SPL query calculates the maximum CPU utilization per server:

```spl
index=server_metrics sourcetype=cpu_usage
| stats max(cpu_usage) AS max_cpu_usage BY server
```

**Explanation:**
- This query filters logs to those related to CPU usage metrics.
- The `stats` command calculates the maximum `cpu_usage` value for each `server`.
- The result is a table with each server and its maximum CPU utilization.

**Implementation with `timechart`**:

To visualize the maximum CPU utilization over time for each server:

```spl
index=server_metrics sourcetype=cpu_usage
| timechart span=1m max(cpu_usage) BY server
```

**Explanation:**
- This query also filters logs to those related to CPU usage metrics.
- The `timechart` command creates a time series chart with a 1-minute interval (`span=1m`), showing the maximum `cpu_usage` for each `server` over time.
- This visualization helps in identifying trends and potential peaks in CPU utilization across different servers.

**Output:**

- The `stats` command output will be a table listing each server with its maximum CPU utilization.
- The `timechart` command output will be a time series chart, with time on the x-axis and CPU utilization on the y-axis, displaying lines for each server to indicate how the maximum CPU utilization varies over time.

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

### Use-Case Example

**Analyze Temperature Fluctuations Across Different Locations**

**Problem:** A meteorologist wants to identify locations with the highest temperature fluctuations over a 24-hour period.

**Solution:** Use the `stats` command with the `range` function to calculate the temperature range for each location.

**Implementation:**

```spl
index=weather sourcetype=temperature_readings
| eval hour=strftime(_time, "%H")
| stats min(temperature) AS min_temp, max(temperature) AS max_temp, range(temperature) AS temp_range BY location
| sort - temp_range
```

**Explanation**:

- This query filters logs to those containing temperature readings.
- The `eval` command extracts the hour from the timestamp.
- The `stats` command calculates the minimum, maximum, and range of temperature for each location.
- Results are sorted in descending order of temperature range.
- The output will show each location with its minimum and maximum temperatures, as well as the temperature range, helping identify areas with the highest temperature fluctuations.

## **sum(&lt;value&gt;)**
This function returns the sum of the values in a field.

### Usage

You can use this function with the `stats` and `timechart` commands.

### Example

- To calculate the total revenue from subscriptions for all events:

	```spl
	... | stats sum(revenue)
	```

- For summing revenue from subscriptions per month per city:

    ```spl
    ... | stats sum(revenue) AS "total revenue" BY city, month
    ```

- The following example displays a timechart of the sum of revenue over time per city:

    ```spl
    ... | timechart span=1m sum(revenue) BY city
    ```

### Use-Case Example

**Calculate Total Sales by Product Category**

**Problem:** A sales manager wants to determine the total sales for each product category to identify top-performing categories.

**Solution:** Use the `stats` command with the `sum` function to calculate the total sales for each product category.

**Implementation:**

```spl
index=sales sourcetype=transactions
| stats sum(sale_amount) AS total_sales BY product_category
| sort - total_sales
```

**Explanation**:

- This query filters logs to those related to sales transactions.
- The `stats` command calculates the sum of sale_amount for each product_category.
- Results are sorted in descending order of total sales.
- The output will show each product category and its corresponding total sales, helping identify the top-performing categories.

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

### Use-Case Example

**Analyze Website Traffic by Source**

**Problem:** A digital marketer wants to determine which traffic sources are bringing the most visitors to the website.

**Solution:** Use the `stats` command with the `count` function to count the number of visits from each traffic source.

**Implementation:**

```spl
index=web sourcetype=access_combined
| stats count AS visits BY referrer_domain
| sort - visits
| head 10
```

**Explanation**:

- This query filters logs to those related to web access.
- The `stats` command counts the occurrences for each `referrer_domain`.
- Results are sorted in descending order of visit count.
- The `head` command limits the output to the top 10 results.
- The output will show the top 10 referrer domains and their corresponding visit counts, helping identify the most effective traffic sources.

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

### Use-Case Example

**Analyze User Engagement Across Different Devices**

**Problem:** A product manager wants to understand how many unique users are engaging with their application across different device types.

**Solution:** Use the `stats` command with the `distinct_count` function to count the number of unique users for each device type..

**Implementation:**

```spl
index=app_usage sourcetype=user_sessions
| stats dc(user_id) AS unique_users BY device_type
| sort - unique_users
```

**Explanation**:

- This query filters logs to those related to app usage and user sessions.
- The stats command calculates the distinct count of user_id for each device_type.
- Results are sorted in descending order of unique user count.
- The output will show each device type and its corresponding number of unique users, helping understand user engagement across different devices.
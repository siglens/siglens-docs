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

**Problem:** You aim to monitor the performance of various servers in your network by identifying the minimum CPU utilization recorded, to ensure that no server is showing abnormal behavior which could indicate issues.

**Solution:** Utilize the `stats` command in conjunction with the `min` function to calculate the minimum CPU utilization for each server. This method allows for a straightforward identification of servers that may be underperforming or experiencing issues, by highlighting instances of unusually low CPU utilization.

**Implementation:**

```spl
... | stats min(cpu_utilization) AS MinCPUUtilization BY host
```

**Explanation:**

- This command calculates the minimum CPU Utilization (`cpu_utilization` field) for each server (`host` field). The `min` function is used to find the lowest value of CPU utilization for each unique server. This approach is useful for monitoring server performance and quickly identifying any servers that may be experiencing issues. 

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

- The `stats` command output lists each server with its maximum CPU utilization.
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

**Solution:** Use the `stats` command with the `distinct_count` function to count the number of unique users for each device type.

**Implementation:**

```spl
index=app_usage sourcetype=user_sessions
| stats dc(user_id) AS unique_users BY device_type
| sort - unique_users
```

**Explanation**:

- This query filters logs to those related to app usage and user sessions.
- The `stats` command calculates the distinct count of `user_id` for each `device_type`.
- Results are sorted in descending order of unique user count.
- The output will show each device type and its corresponding number of unique users, helping understand user engagement across different devices.

## **perc&lt;percentile&gt;(&lt;value&gt;)**

### Description
The percentile functions return the Nth percentile value of the numeric field \<value\>. You can think of this as an estimate of where the top percentile starts. For example, a 95th percentile says that 95% of the values in field Y are below the estimate and 5% of the values in field \<value\> are above the estimate.

Valid percentile values are floating point numbers between 0 and 100, such as 99.95. 
I can help you convert that into a Markdown table. Here it is:

| Function | Description |
|---|---|
| `perc<percentile>(<value>)` or `p<percentile>(<value>)` | Use the perc function to calculate an approximate threshold, such that of the values in field Y, X percent fall below the threshold. The perc function returns a single number that represents the lower end of the approximate values for the percentile requested. |  

The percentile functions process field values as strings

> **Note:** The **perc** and **upperperc** functions are nondeterministic, which means that that subsequent searches using these functions over identical data can return variances in their results.  

### Usage

You can use this function with the [stats](../stats-command.md), [timechart](../timechart-command.md), commands.

### Differences between SigLens and Excel percentile algorithms

If there are less than 1000 distinct values, the Splunk percentile functions use the nearest rank algorithm. See <a href="http://en.wikipedia.org/wiki/Percentile#Nearest_rank">Nearest Rank</a>. Excel uses the NIST interpolated algorithm, which basically means you can get a value for a percentile that does not exist in the actual data, which is not possible for the nearest rank approach.

### SigLens algorithm with more than 1000 distinct values

If there are more than 1000 distinct values for the field, the percentiles are approximated using a radix-tree digest-based algorithm. This algorithm is much faster and uses much less memory, a constant amount, than an exact computation, which uses memory in linear relation to the number of distinct values. By default this approach limits the approximation error to \< 1% of rank error. That means if you ask for 95th percentile, the number you get back is between the 94th and 96th percentile.

### Basic examples

Consider this list of values `Y = {10,9,8,7,6,5,4,3,2,1}`.

The following example returns 5.5.

```splunk
...| stats perc50(Y)
```

The following example returns 9.55.

```splunk
...| stats perc95(Y)
```

### Extended example

Consider the following set of data, which shows the number of visitors for each hour a store is open:

| hour | visitors |
|---|---|
| 0800 | 0 |
| 0900 | 212 |
| 1000 | 367 |
| 1100 | 489 |
| 1200 | 624 |
| 1300 | 609 |
| 1400 | 492 |
| 1500 | 513 |
| 1600 | 376 |
| 1700 | 337 |

This data resides in the `visitor_count` index. You can use the `streamstats` command to create a cumulative total for the visitors.

```splunk
index=visitor_count | streamstats sum(visitors) as 'visitors total'
```

The results from this search look like this:

| hour | visitors | visitors total |
|---|---|---|
| 0800 | 0 | 0 |
| 0900 | 212 | 212 |
| 1000 | 367 | 579 |
| 1100 | 489 | 1068 |
| 1200 | 624 | 1692 |
| 1300 | 609 | 2301 |
| 1400 | 492 | 2793 |
| 1500 | 513 | 3306 |
| 1600 | 376 | 3673 |
| 1700 | 337 | 4010 |

Let's add the `stats` command with the `perc` function to determine the 50th and 95th percentiles.

```splunk
index=visitor_count | streamstats sum(visitors) as 'visitors total' | stats perc50('visitors total') perc95('visitors total')
```

The results from this search look like this:

| perc50(visitors total) | perc95(visitors total) |
|---|---|
| 1996.5 | 3858.35 |

The `perc50` estimates the 50th percentile, when 50% of the visitors had arrived. You can see from the data that the 50th percentile was reached between visitor number 1996 and 1997, which was sometime between 1200 and 1300 hours. The `perc95` estimates the 95th percentile, when 95% of the visitors had arrived. The 95th percentile was reached with visitor 3858, which occurred between 1600 and 1700 hours.  

## **median(&lt;value&gt;)**

### Description

Returns the middle-most value of the field specified.

### Usage

You can use this function with the [stats](../stats-command.md) and [timechart](../timechart-command.md) commands.

If you have an even number of events, by default the median calculation is approximated to the higher of the two values.

> **Note:** This function is, by its nature, nondeterministic. This means that subsequent runs of a search using this function over identical data can contain slight variances in their results.

### Basic examples

Consider the following list of values, which counts the number of different customers who purchased something from the Buttercup Games online store yesterday. The values are organized by the type of product (accessories, t-shirts, and type of games) that customers purchased.

| categoryId  | count |
|-------------|-------|
| ACCESSORIES | 37    |
| ARCADE      | 58    |
| NULL        | 8     |
| SIMULATION  | 34    |
| SPORTS      | 13    |
| STRATEGY    | 74    |
| TEE         | 38    |

When the list is sorted the median, or middle-most value, is 37.

| categoryId  | count |
|-------------|-------|
| NULL        | 8     |
| SPORTS      | 13    |
| SIMULATION  | 34    |
| ACCESSORIES | 37    |
| TEE         | 38    |
| ARCADE      | 58    |
| STRATEGY    | 74    |

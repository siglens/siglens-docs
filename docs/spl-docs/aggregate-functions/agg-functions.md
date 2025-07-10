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

## **varp(&lt;value&gt;)**
This function returns the population variance of the values in a field.

### Usage

You can use this function with the `stats` and `timechart` commands.  
The field must contain numeric values.

### Example

- Calculate the population variance of the `latency` field:

    ```spl
    ... | stats varp(latency)
    ```

- For each city, calculate the variance of response time:

    ```spl
    ... | stats varp(latency) AS LatencyVariance BY city
    ```

- The following example displays a timechart of population variance of latency over time:

    ```spl
    ... | timechart span=1h varp(latency) BY city
    ```

### Use-Case Example

**Analyze Latency Stability Across Cities**

**Problem:** A site reliability engineer wants to understand how stable network latency is across different cities.

**Solution:** Use the `stats` command with the `varp` function to calculate the population variance of the `latency` field for each city.

**Implementation:**

```spl
index=server_metrics sourcetype=latency_logs
| stats varp(latency) AS LatencyVariance BY city
| sort - LatencyVariance
```

**Explanation**:

- This query calculates the population variance of `latency` for each `city`.
- The `stats` command aggregates variance per city to help identify regions with inconsistent network behavior.
- A high variance suggests that latency is fluctuating significantly, possibly indicating infrastructure or routing issues.

## **latest(&lt;value&gt;)**
This function returns the most recently seen value in a field, based on timestamp order.

### Usage

You can use this function with the `stats` and `timechart` commands.  
The field is evaluated based on event time and the latest value is picked chronologically.

### Example

- Return the most recent `zip` value across all events:

    ```spl
    ... | stats latest(zip)
    ```

- For each `city`, show the latest observed `http_status`:

    ```spl
    ... | stats latest(http_status) AS LatestStatus BY city
    ```

- The following example displays a timechart of the latest `job_title` value by city over time:

    ```spl
    ... | timechart span=1h latest(job_title) BY city
    ```

### Use-Case Example

**Track the Most Recent Job Title Seen Per City**

**Problem:** A recruiter wants to monitor which job titles are most recently observed in various cities based on user activity.

**Solution:** Use the `stats` command with the `latest` function to get the last recorded job title for each city.

**Implementation:**

```spl
index=users sourcetype=activity_logs
| stats latest(job_title) AS LatestJobTitle BY city
| sort city
```

**Explanation**:

- The `latest` function picks the most recent `job_title` for each `city` based on event timestamp.
- This helps track shifting trends in job-related data across different locations.
- Sorting by `city` allows for easy scanning of geographic patterns.

## **latest_time(&lt;value&gt;)**
This function returns the UNIX timestamp of the most recent occurrence of a value in a field.

### Usage

You can use this function with the `stats` and `timechart` commands.  
It is helpful for tracking the last time a value appeared in event data or metrics.  

### Example

- Show the last time each `http_status` was seen:

    ```spl
    ... | stats latest_time(http_status) AS LastSeenTime BY http_status
    ```

- Get the latest timestamp when each `job_company` was mentioned:

    ```spl
    ... | stats latest_time(job_company) AS LastMentionedTime
    ```

- Display a timechart of the last time `user_color` was seen by city:

    ```spl
    ... | timechart span=1h latest_time(user_color) BY city
    ```

### Use-Case Example

**Determine When Each Job Title Was Last Observed**

**Problem:** An HR analyst wants to know when a specific `job_title` was last recorded in the logs for each city.

**Solution:** Use the `latest_time` function with `stats` to retrieve the most recent timestamp for each job title seen in various cities.

**Implementation:**

```spl
index=users sourcetype=activity_logs
| stats latest_time(job_title) AS LastSeenJobTime BY city
| sort city
```

**Explanation**:

- The `latest_time()` function extracts the most recent time a `job_title` appeared in the dataset for each city.
- This helps monitor the recency of different job-related activities across regions.
- Results are sorted for easy comparison by city.

## **earliest(&lt;value&gt;)**
This function returns the earliest observed value in a field based on chronological order.

### Usage

You can use this function with the `stats` and `timechart` commands.  
This function processes values in the order of event time and selects the first one seen.

### Example

- Return the earliest observed `user_color` value:

    ```spl
    ... | stats earliest(user_color)
    ```

- For each `city`, find the first `http_method` used:

    ```spl
    ... | stats earliest(http_method) AS FirstMethod BY city
    ```

- Display a timechart of the earliest `job_title` seen over time for each city:

    ```spl
    ... | timechart span=1h earliest(job_title) BY city
    ```

### Use-Case Example

**Identify the First Job Title Recorded Per City**

**Problem:** A data analyst wants to track the earliest job title recorded for users in each city.

**Solution:** Use the `stats` command with the `earliest` function to extract the chronologically first job title seen in each location.

**Implementation:**

```spl
index=users sourcetype=activity_logs
| stats earliest(job_title) AS FirstSeenJob BY city
| sort city
```

**Explanation**:

- The `earliest()` function finds the first value observed for `job_title` by timestamp.
- It is useful for detecting original data points, like first-seen users or starting values in time series.
- Sorting by city allows clear inspection of regional first-occurrence trends.

## **earliest_time(&lt;value&gt;)**
This function returns the UNIX timestamp of the earliest-seen occurrence of a value in a field.

### Usage

You can use this function with the `stats` and `timechart` commands.  
This function outputs numeric UNIX time and is useful in time-based aggregations.

### Example

- Get the earliest timestamp when each `http_method` was seen:

    ```spl
    ... | stats earliest_time(http_method) AS FirstSeenTime BY http_method
    ```

- For each `job_title`, return when it was first observed:

    ```spl
    ... | stats earliest_time(job_title) AS FirstTimestamp BY job_title
    ```

- Display a timechart of earliest occurrence of each `user_color`:

    ```spl
    ... | timechart span=1h earliest_time(user_color) BY user_color
    ```

### Use-Case Example

**Monitor First Appearance of HTTP Methods**

**Problem:** A security analyst wants to monitor when each type of HTTP method (e.g., POST, GET) was first observed in logs.

**Solution:** Use the `stats` command with `earliest_time()` to find the first UNIX timestamp for each method.

**Implementation:**

```spl
index=web sourcetype=access_combined
| stats earliest_time(http_method) AS FirstObservedTime BY http_method
| convert ctime(FirstObservedTime)
```

**Explanation**:

- This query aggregates the earliest seen time (in UNIX epoch) for each distinct `http_method`.
- The `convert ctime()` command formats the timestamp into a readable format.
- This helps track the timeline of request types appearing in your system logs.

## **sumsq(&lt;value&gt;)**
This function returns the **sum of the squares** of values in a numeric field.

### Usage

You can use this function with the `stats`, `timechart`, and `chart` commands.  
It is often used to evaluate the variance of a dataset. A large sum of squares indicates wide fluctuation from the mean.

### Example

- Calculate the sum of squares of `latency` values:

    ```spl
    ... | stats sumsq(latency)
    ```

- For each `city`, calculate the sum of squared latencies:

    ```spl
    ... | stats sumsq(latency) AS LatencySquareSum BY city
    ```

- Show a timechart of `sumsq(latency)` per city every hour:

    ```spl
    ... | timechart span=1h sumsq(latency) BY city
    ```

### Use-Case Example

**Measure Network Latency Variance Across Locations**

**Problem:** A network engineer wants to identify cities with high fluctuations in latency over time.

**Solution:** Use the `sumsq()` function to calculate the squared sum of `latency` values by city, which can help in determining variance trends.

**Implementation:**

```spl
index=server_metrics sourcetype=latency_logs
| stats sumsq(latency) AS LatencyFluctuation BY city
| sort - LatencyFluctuation
```

**Explanation**:

- This query computes the sum of squares of the `latency` field grouped by each `city`.
- Larger values indicate cities where latency fluctuates significantly from the average.
- This insight can be used for troubleshooting unstable regions in the network.

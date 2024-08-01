# streamstats command

## Description

The `streamstats` command adds cumulative statistics to search results in real-time. It computes statistics for each event as it is encountered. For instance, you can determine the running total, average, or any other aggregate for a specific field. These aggregates are derived from the values in the specified field for all events processed up to the current one.

As each event is processed by the `streamstats` command, a field is added to that event or result, representing the cumulative aggregate of all preceding events within the window. This field's value updates with each event or result as the composition of events in the window or result set changes. Essentially, the `streamstats` command generates a running aggregate that is applied to each event.

## Syntax

Required syntax is in **bold**.

**streamstats**\
[reset_on_change=\<bool\>]\
[reset_before=(\<eval-expression\>)]\
[reset_after=(\<eval-expression\>)]\
[current=\<bool\>]\
[window=\<int\>]\
[time_window=\<span-length\>]\
[global=\<bool\>]\
[allnum=\<bool\>]\
**\<stats-agg-term\>...**\
[\<by-clause\>]

### Required Arguments

#### stats-agg-term
**Syntax:** `<stats-func>(<input-field-name>) [AS <output-field-name>]`\
**Description:** \
A statistical function can be applied to an `eval` expression or a field.\
Use the `AS` clause to assign the result to a new field with a name you choose.\
Multiple `stats-agg-term` clauses can be used to calculate different statistics in a single `streamstats` command.

### Optional Arguments

#### by-clause
**Syntax:** `BY <field-list>`\
**Description:** \
Specify one or more fields to group by.\
Wildcard characters cannot be used; each field must be named individually.\
The `BY` clause produces running statistics for each event based on the distinct values in the specified fields.\
Without a `BY` clause, the `streamstats` command returns running statistics that consider all events in the window up to the current event.

#### current
**Syntax:** current=`<boolean>`\
**Description:** \
If `true`, the search includes the current event in the statistical calculations.\
If `false`, the search performs statistical calculations without including the current event.\
**Default:** `true`


#### global
**Syntax:** global=`<boolean>`\
**Description:**\
This option is used only when the `window` argument is set.\
If `true`, a single global window is used for statistical calculations.\
If `false`, separate windows are used for statistical calculations for each group of values specified in the `BY` clause.\
**Default:** `true`

#### reset_after
**Syntax:** reset_after=(`<boolean-expression>`)\
**Description:**\
This option resets all accumulated statistics if the `boolean-expression` evaluates to `true` after the `streamstats` calculations are produced for an event.\
The `boolean-expression` must return either `true` or `false`. When used with the `window` argument, the window is also reset when the accumulated statistics are reset.\
**Default:** `false`

#### reset_before
**Syntax:** reset_before=(`<boolean-expression>`)
**Description:**
This option resets all accumulated statistics if the `boolean-expression` evaluates to `true` before the `streamstats` calculations are produced for an event.\
The `boolean-expression` must return either `true` or `false`. When used with the `window` argument, the window is also reset when the accumulated statistics are reset.\
**Default:** `false`

#### reset_on_change
**Syntax:** reset_on_change=`<boolean>`\
**Description:** \
If `true`, all accumulated statistics are reset when the group-by fields change, as if no previous events have been processed.\
When used with the `window` argument, the window is also reset when the accumulated statistics are reset. Refer to the Usage section for more details.\
**Default:** `false`

#### time_window
**Syntax:** time_window=`<span-length>`\
**Description:** \
Calculations are performed based on a time-based window, determined by the `timestamp` of the current event.\
This option requires the results to be sorted in either increasing or decreasing order of the `timestamp` field.\
The `global` and `current` options cannot be set to `false` when using this option.

**For example:**\
`... | streamstats avg(latency) time_window=10m`\
If the `timestamp` is sorted in increasing order, the `avg` of `latency` is calculated based on the events in the last 10 minutes. If sorted in decreasing order, the `avg` is based on the events in the next 10 minutes.

#### \<span-length\>
**Syntax:** `<int><timescale>`\
**Description:** \
`<span-length>` specifies the duration of the window.\
`<int>` is a positive integer that defines the magnitude of the time unit specified by `timescale`.

#### \<timescale\>
**Syntax:** `<second>`, `<minute>`, `<hour>`, `<day>`, `<week>`, `<month>`, `<quarter>` or `<year>`\
**Description:** \
`<timescale>` is a `<string>` that specifies the unit of time.\
For `<month>`, the only permissible `<int>` values are `1, 2, 3, 4, 6, 12`.\
For `<quarter>`, the only permissible `<int>` values are `1, 2, 4`.

| **Unit** | **Strings used to specify Unit** |
| --------- | ----------------------------- |
| `<second>` | seconds, second, secs, sec, s  |
| `<minute>` | minutes, minute, mins, min, m |
| `<hour>` | hours, hour, hrs, hr, h |
| `<day>` | days, day, d |
| `<week>` | weeks, week, w |
| `<month>` | months, month, mon |
| `<quarter>` | quarters, quarter, qtrs, qtr, q |
| `<year>` | years, year, yrs, yr, y |


#### window
**Syntax:** window=`<integer>`\
**Description:** \
Specifies the number of events to include in the statistical calculations.\
A window value of 0 means all previous and current events are used.\
When both `window` and `time_window` options are specified, only events that fall within the `time_window` and do not exceed the `window` size will be used for calculations.\
**Default:** 0


#### stats-func
**Syntax:** The syntax depends on the function that you use. Refer to the table below.\
**Description:**\
Statistical functions that you can use with the `streamstats` command. Each time you invoke the `streamstats` command, you can use one or more of these functions. However, you can only use one BY clause.

The following table lists the supported functions by type of function. Use the links in the table to see descriptions and examples for each function

| Type of function    | Supported functions           |
|---------------------|-------------------------------------------|
| [Aggregate functions](./aggregate-functions/agg-functions.md) | `avg()`, `min()`, `max()`, `range()`, `sum()`, `count()`, `distinct_count()` |


### Usage

### reset_on_change

The following command calculates a running `count` on `hobby` and resets the count when the hobby changes:
```
... | streamstats reset_on_change=true count(hobby) AS hobby_count BY Hobby
```
The output of this command for sample data would look as follows:

| **hobby** | **hobby_count** |
| --------- | ----------------------------- |
| Swimming | 1  |
| Reading | 1 |
| Reading | 2 |
| Hiking | 1 |
| Swimming | 1 |
| Swimming | 2 |
| Swimming | 3 |
| Reading | 1 |
| Hiking | 1 |


### reset_after

The following command calculates running `count` statistics and resets the count when the hobby `Swimming` is observed, after including the current event.
```
... | streamstats reset_after=(hobby="Swimming") count(hobby) AS hobby_count
```
The output of this command for sample data would look as follows:

| **hobby** | **hobby_count** |
| --------- | ----------------------------- |
| Reading | 1  |
| Reading | 2 |
| Painting | 3 |
| Hiking | 4 |
| Hiking | 5 |
| Swimming | 6 |
| Reading | 1 |
| Hiking | 2 |
| Acting | 3 |
| Acting | 4 |



### reset_before

The following command calculates running `count` statistics and resets the count when the hobby `Swimming` is observed, before including the current event.
```
... | streamstats reset_before=(hobby="Swimming") count(hobby) AS hobby_count
```
The output of this command for sample data would look as follows:

| **hobby** | **hobby_count** |
| --------- | ----------------------------- |
| Reading | 1  |
| Reading | 2 |
| Painting | 3 |
| Hiking | 4 |
| Hiking | 5 |
| Swimming | 1 |
| Reading | 2 |
| Hiking | 3 |
| Acting | 4 |
| Acting | 5 |


## Use-Case Examples

### Monitoring Web Server Performance in Real-Time

**Problem:** A web operations team needs to monitor their web server's performance in real-time, specifically focusing on response times. They want to identify trends and potential issues by looking at a moving average of response times over short periods, rather than just individual data points which might be affected by momentary spikes.

**Solution:** Use the `streamstats` command to calculate a 5-minute moving average of response times:

```
index=webserver
| sort timestamp
| streamstats time_window=5m avg(response_time) AS avg_response_time
```

#### Explanation
- `sort timestamp` sorts the events in increasing order of timestamp.
- The `time_window=5m` parameter tells `streamstats` to look at the preceding 5 minutes of data for each event.
- `avg(response_time)` calculates the average of the `response_time` field within the specified time window.
- `AS avg_response_time` creates a new field with this name for each event, containing the calculated average.


### Detecting Potential Brute Force Attacks by Monitoring Failed Login Attempts

**Problem:** You are a system security analyst tasked with monitoring login attempts across multiple servers. You want to identify when there are multiple failed login attempts for a single user account within a short time frame, which could indicate a brute force attack. After detecting these patterns, you want to perform further analysis to summarize the findings.

**Solution:** Use the `streamstats` command to detect multiple failed login attempts and summarize the findings.

```
index=auth_logs
| streamstats window=5 global=false count(eval(status="failed" AND reason="invalid password")) as failed_login_count by user, src_ip 
| where failed_login_count >= 3 
| stats count as total_failed_attempts, avg(failed_login_count) as avg_failed_attempts, max(failed_login_count) as max_failed_attempts, min(failed_login_count) as min_failed_attempts by user, src_ip
```

#### Explanation

- `streamstats window=5 global=false sum(eval(status="failed" AND reason="invalid password")) as failed_login_count by user, src_ip` uses streamstats to calculate the sum of failed login attempts within the last 5 events for each combination of user and source IP.
    - `window=5` specifies that we're looking at the last 5 login attempts.
    - `global=false` ensures that these calculations are done separately for each user and source IP combination.
    - `by user, src_ip` groups the calculations by each user and source IP address.
    - `count(eval(status="failed" AND reason="invalid password"))` counts the number of events where the login status is `failed` and the reason is `invalid password`.
- `where failed_login_count >= 3` filters the results to show only events where there were 3 or more failed login attempts within the last 5 attempts for a user from a specific IP.
- `stats count as total_failed_attempts, avg(failed_login_count) as avg_failed_attempts, max(failed_login_count) as max_failed_attempts, min(failed_login_count) as min_failed_attempts by user, src_ip` summarizes the findings by calculating:
    - total_failed_attempts shows the number of events that met the failed login criteria.
    - avg_failed_attempts shows the average number of failed login attempts within the window.
    - max_failed_attempts shows the maximum number of failed login attempts within the window.
    - min_failed_attempts shows the minimum number of failed login attempts within the window.
- `by user, src_ip` groups the summary statistics by user and source IP.

This approach provides a comprehensive view of potential brute force attacks, allowing security teams to quickly identify and respond to threats. By combining streamstats with stats, we can efficiently detect patterns of failed login attempts and summarize the findings using simple statistical functions.

### Analyzing Stock Market Data for Trends and Volatility

**Problem:** A financial analyst needs to identify stocks with unusual trading patterns, focusing on high volatility, significant price movements relative to recent averages, and above-average trading volumes. This information can be used to spot potential market trends or anomalies that warrant further investigation.

**Solution:** Use the `streamstats` command to calculate key metrics over a 5-day window:

```
index=stocks
| eval price_change = close - open 
| eval percent_change = (price_change / open) * 100 
| streamstats time_window=5d min(low) AS period_low, max(high) AS period_high, avg(volume) AS avg_volume, avg(close) AS avg_close, range(close) AS price_range BY symbol
| eval volatility = (period_high - period_low) / period_low * 100
| eval relative_strength = (close / avg_close - 1) * 100
| where volume > avg_volume * 1.5 AND (volatility > 10 OR abs(relative_strength) > 5)
| fields _time, symbol, open, close, volume, price_change, percent_change, period_low, period_high, price_range, volatility, relative_strength
| sort -volatility
```

#### Explanation

- `eval price_change = close - open` calculates the difference between the closing and opening prices.
- `eval percent_change = (price_change / open) * 100` calculates the percentage change based on the opening price.
- `streamstats time_window=5d` calculates metrics over a 5-day window for each stock symbol.
- **Metrics Calculation:**
  - `min(low) AS period_low` finds the lowest price in the 5-day period.
  - `max(high) AS period_high` finds the highest price in the 5-day period.
  - `avg(volume) AS avg_volume` calculates the average trading volume over the 5-day period.
  - `avg(close) AS avg_close` calculates the average closing price over the 5-day period.
  - `range(close) AS price_range` calculates the range of closing prices over the 5-day period.
- `eval volatility = (period_high - period_low) / period_low * 100` calculates the volatility as a percentage.
- `eval relative_strength = (close / avg_close - 1) * 100` calculates the relative strength as a percentage.
- `where volume > avg_volume * 1.5 AND (volatility > 10 OR abs(relative_strength) > 5)` filters stocks with significant volume and either high volatility or relative strength.
- `fields _time, symbol, open, close, volume, price_change, percent_change, period_low, period_high, price_range, volatility, relative_strength` selects the relevant fields for the final output.
- `sort -volatility` sorts the results by volatility in descending order.



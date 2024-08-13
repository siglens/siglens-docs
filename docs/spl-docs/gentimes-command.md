# gentimes command

## Description
Generates timestamp results beginning at the specified start time. Each result represents an adjacent, non-overlapping time range based on the increment value. This process continues until enough results are generated to pass the end time.

The `gentimes` command produces events up to, but not including, the end time.

## Syntax

Required syntax is in **bold**.

| **gentimes**\
**start=\<timestamp\>**\
[end=\<timestamp\>]\
[increment=\<increment\>]

### Required Arguments

#### start
**Syntax:** `start=<timestamp>`\
**Description:** \
Specify the start time.

#### \<timestamp\>
**Syntax:** `MM/DD/YYYY[:HH:MM:SS]` or `<int>`\
**Description:**\
Specify the timeframe using either a timestamp or an integer value.\
`<int>` represents the number of days relative to the current date.\
For example: `11/15/2021` for November 15, 2021 at 00:00:00, `05/20/2022:14:30:00` for May 20, 2022 at 14:30:00, or `-7` for seven days ago.

### Optional Arguments

#### end
**Syntax:** `end=<timestamp>` or `<int>`\
**Description:**\
Specify the end time.\
**Default:** midnight before the current local time.\
`<int>` represents the number of days relative to the current date.\
For example: If the current local time is 13:00:00 on May 20, 2022, the default end time would be 00:00:00 on May 20, 2022, or `5` for five days in the future.

#### increment
**Syntax:** `increment=<int>(s | m | h | d)` or `increment=<int>`\
**Description:**\
Specify the time interval to increment from the `start` time to the `end` time. You can use seconds (s), minutes (m), hours (h), or days (d).\
If you only provide an integer without a time unit, it will be assumed to be in seconds.\
**Default:** 1d

### Usage

The `gentimes` command is an event-generating command. This command uses a leading pipe character and should be the first command in a search.

The `gentimes` command returns the following four fields:

| **Field**   | **Description**                                      |
|-------------|------------------------------------------------------|
| starttime   | The starting time range as UNIX epoch in seconds.     |
| starthuman  | The human-readable time for `starttime`.             |
| endtime     | The ending time range as UNIX epoch in seconds.       |
| endhuman    | The human-readable time for `endtime`.               |

The human-readable time is in the following format:\
**Format:** Weekday Month Day Hour:Minute:Second Year (Timezone difference with respect to UTC)\
**Example:** July 4, 2024, at 12:00:00 PM in the NYC timezone would be Thu Jul 4 12:00:00 2024 -0400.

## Example

The following example generates daily time ranges from May 1, 2021, to May 5, 2021 (not including the end time).
```
| gentimes start=05/01/2021 end=05/05/2021
```
The output would look as follows, considering the timezone to be Eastern Time.
| **endhuman**                  | **endtime**   | **starthuman**                  | **starttime** |
|-------------------------------|--------------|---------------------------------|---------------|
| Sat May 1 23:59:59 2021 -0400 | 1619927999   | Sat May 1 00:00:00 2021 -0400   | 1619841600    |
| Sun May 2 23:59:59 2021 -0400 | 1620014399   | Sun May 2 00:00:00 2021 -0400   | 1619928000    |
| Mon May 3 23:59:59 2021 -0400 | 1620100799   | Mon May 3 00:00:00 2021 -0400   | 1620014400    |
| Tue May 4 23:59:59 2021 -0400 | 1620187199   | Tue May 4 00:00:00 2021 -0400   | 1620100800    |


The following example generates time ranges from 20 days ago to 15 days ago (not including the end time).
```
| gentimes start=-20 end=-15
```

The following example generates hourly time ranges from November 6, 2022, to November 8, 2022 (not including the end time).
```
| gentimes start=11/06/2022 end=11/08/2022 increment=1h
```

The following example generates daily time ranges starting from April 25, 2022, at 16:17:18 until midnight before the current time in the respective timezone.
```
| gentimes start=04/25/2022:16:17:18
```

The following example generates time ranges from January 3, 2023, to February 1, 2023, with an increment of 7 minutes between each timestamp.
```
| gentimes start=01/03/2023 end=02/01/2023 increment=7m
```

The following example generates time ranges starting from January 2, 2023, at 12:11:00, with an increment of 20 seconds between each timestamp, until 12:12:11 on the same day.
```
| gentimes start=01/02/2023:12:11:00 end=01/02/2023:12:12:11 increment=20
```
The output would look as follows, considering the timezone to be Eastern Time.

| **endhuman**                  | **endtime**   | **starthuman**                  | **starttime** |
|-------------------------------|--------------|---------------------------------|---------------|
| Mon Jan 2 12:11:19 2023 -0500 | 1672679479   | Mon Jan 2 12:11:00 2023 -0500   | 1672679460    |
| Mon Jan 2 12:11:39 2023 -0500 | 1672679499   | Mon Jan 2 12:11:20 2023 -0500   | 1672679480    |
| Mon Jan 2 12:11:59 2023 -0500 | 1672679519   | Mon Jan 2 12:11:40 2023 -0500   | 1672679500    |
| Mon Jan 2 12:12:19 2023 -0500 | 1672679539   | Mon Jan 2 12:12:00 2023 -0500   | 1672679520    |



## Use-Case Examples


### Creating Simulated Server Log Data

**Problem:** As a system administrator responsible for monitoring server performance, you need to ensure that your monitoring and alerting systems are functioning correctly. However, you don't have access to real production data for testing. You need to create a simulated dataset that represents server logs with various metrics, such as CPU usage, memory usage, network traffic, and different types of events. This dataset will help you test dashboards, alerts, and queries without risking real data exposure.

**Solution:** To create a simulated dataset, you can use the `gentimes` command to generate timestamps and combine it with `eval` to create random values for different metrics.

```
| gentimes start=-2 increment=5m
| eval server_id = random() % 5 + 1
| eval cpu_usage = random() % 101
| eval memory_usage = random() % 101
| eval network_traffic = random() % 1000
| eval status = case(
    cpu_usage > 90 OR memory_usage > 90, "Critical",
    cpu_usage > 70 OR memory_usage > 70, "Warning",
    cpu_usage >= 0, "Normal")
| eval event_type = random() % 4
| eval event_description = case(
    event_type = 0, "User Login",
    event_type = 1, "Config Change",
    event_type = 2, "Service Restart",
    event_type = 3, "Backup Completed")
```

#### Explanation

- `gentimes start=-2 increment=5m` generates a series of timestamps starting from 2 days ago, with an increment of 5 minutes between each timestamp.
- `eval server_id = random() % 5 + 1` assigns a random server ID from 1 to 5 to each event.
- `eval cpu_usage = random() % 101` generates a random CPU usage percentage between 0 and 100.
- `eval memory_usage = random() % 101` generates a random memory usage percentage between 0 and 100.
- `eval network_traffic = random() % 1000` generates a random network traffic value between 0 and 999.
- `eval status = case(cpu_usage > 90 OR memory_usage > 90, "Critical", cpu_usage > 70 OR memory_usage > 70, "Warning", cpu_usage >= 0, "Normal")` assigns a status based on CPU and memory usage:
  - `Critical` if CPU or memory usage is above 90%.
  - `Warning` if CPU or memory usage is above 70%.
  - `Normal` otherwise.
- `eval event_type = random() % 4` generates a random event type between 0 and 3.
- `eval event_description = case(event_type = 0, "User Login", event_type = 1, "Config Change", event_type = 2, "Service Restart", event_type = 3, "Backup Completed")` assigns a description based on the event type.


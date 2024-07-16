# Time Modifiers

_Specify time modifiers in your search_

## Description

You can use these time modifiers to specify absolute or relative time ranges when searching or saving a search:

```spl
earliest=<time_modifier>
latest=<time_modifier>
```

An absolute time range specifies exact start and end dates and times, such as from 12 A.M. on June 1, 2024, to 12 A.M. on June 13, 2024.

A relative time range is dependent on when the search is run. For instance, using -60m indicates a search for events from 60 minutes before the current time. So, if it's 2 P.M. now, the search would cover events from 1 P.M. to 2 P.M. on the same day.

The current time is referred to as `now`.

### Time modifiers and the Time Range Picker

The time range that is specified in the query using time modifiers, or in a saved search, overrides the time range that is selected in the Time Range Picker.

For example, if you specify a time range of Last 24 hours in the Time Range Picker and in the Search bar you specify `earliest=-1h latest=now`, the search only looks at events that have a timestamp within the last 1 hour.


## Syntax

### Specify absolute time ranges

For exact time ranges, the syntax for the time modifiers is `%m/%d/%Y:%H:%M:%S`. For instance, to search within a time frame from midnight on May 1, 2023, to midnight on May 10, 2023, you would use the following syntax:

```spl
earliest=05/01/2023:00:00:00 latest=05/10/2023:00:00:00
```

If you specify only the earliest time modifier, latest is set to the current time now by default. If you specify a latest time modifier, you must also specify an earliest time. If the specified time modifiers are invalid, then the system would return an error.

### Specify relative time ranges

The syntax for defining relative time ranges is an integer and a time unit.

1. Begin your relative time modifier String with a minus (-) or a plus (+) sign to indicate the offset before (-) or after (+) the time amount.

2. Specify the time amount by combining a number with a time unit. When single time units are used, the number 1 is implied. For instance, `s` is equivalent to `1s`, `m` to `1m`, and so on.

The supported time units are listed in the following table: 

| Time range | Valid values                                  |
|------------|-----------------------------------------------|
| seconds    | `s`, `sec`, `secs`, `second`, `seconds`       |
| minutes    | `m`, `min`, `minute`, `minutes`               |
| hours      | `h`, `hr`, `hrs`, `hour`, `hours`             |
| days       | `d`, `day`, `days`                            |
| weeks      | `w`, `week`, `weeks`                          |
| months     | `mon`, `month`, `months`                      |
| quarters   | `q`, `qtr`, `qtrs`, `quarter`, `quarters`     |
| years      | `y`, `yr`, `yrs`, `year`, `years`             |

When specifying relative time, use `now` to refer to the current time.

### Relative time modifiers that snap to a time

In relative time settings, you can specify a snap to time, which acts as an offset from the relative time. This snap to time unit will round down to the nearest or latest time for the time amount that you specify. To apply this, simply separate the time amount from the snap to time unit using an `@` symbol.

The syntax for the snap to time unit is `[+|-]<time_integer><time_unit>@<time_unit>`.

When snapping to the nearest or latest time, the system always snaps backwards or rounds down to the latest time that is not after the specified time. For example, the current time is 15:45:00 and the snap to time is earliest=-h@h. The time modifier snaps to 14:00.

You can also define the relative time modifier using only the snap to time unit. For example, to snap to a specific day of the week, use @w0 for Sunday, @w1 for Monday, and so on. For Sunday, you can specify either w0 or w7.

When a snap to time unit isn't defined, the system defaults to using seconds. If an invalid snap to time unit is provided, it may result in a syntax error or unexpected search results.

The snap to option becomes very useful in a range of situations. For example, if you want to search for events in the previous month, specify earliest=-mon@mon latest=@mon. This sets the search to start at the beginning of the last month and end at the beginning of this month.

### Difference between relative time and relative snap to time

Imagine it's May 15th, and you initiate a search at 10:30 AM.

- If you use earliest=-3h, the search covers the past three hours, beginning at 7:30 AM on May 15th.
- If you use earliest=-3h@h, the search adjusts to three hours ago but snaps to the start of the hour. This means the search includes events from 7:00 AM on May 15th.

### Special time units

The following abbreviations are reserved for special cases of time units and snap time offsets.



| Time Unit | Description |
|-----------|-------------|
| `earliest=1` | To search events from the start of UNIX epoch time, use `earliest=1`. UNIX epoch time 1 is UTC January 1, 1970, at 12:00:01 AM. |
| `earliest=0` | Including `earliest=0` in the search string indicates that time is not considered in the search. |
| `earliest=1` and `latest=now` or `latest=<a_large_number>` | The search spans all time. However, specifying `latest=now` (the default) excludes future events, while `latest=<a_large_number>` includes future events, which are events with timestamps beyond the current time, `now()`. |
| `earliest=now` or `latest=now` | Specifies that the search starts or ends at the current time. Any search including `earliest=<relative time offset>` should also include `latest=now`. For example, `earliest=-30s latest=now`. |
| `@q`, `@qtr`, or `@quarter` | Specify a snap to the beginning of the most recent quarter: Jan 1, Apr 1, July 1, or Oct 1. |
| `w0`, `w1`, `w2`, `w3`, `w4`, `w5`, `w6`, and `w7` | Specify "snap to" days of the week, with `w0` representing Sunday, `w1` for Monday, and so on. Snapping to a week using `@w` or `@week` defaults to snapping to Sunday, equivalent to `@w0`. Sunday can be referred to as either `w0` or `w7`. |

### Specify earliest relative time offset and latest time in ad hoc searches

Ad hoc searches that use the earliest time modifier with a relative time offset should also include `latest=now` in order to avoid time range inaccuracies. For instance, to capture all events from the last 15 seconds starting at 01:00:15, the following search returns all events that occur between the time of 01:00:00 and 01:00:15, as expected.

```spl
index=main earliest=-15s latest=now
```

Running the same search without including `latest=now` might produce unpredictable results.

## Examples

### Examples of Absolute time modifiers 

1. **Using `earliest` for a Specific Start Date**
   To search for events starting from January 1, 2023, you would use:
   ```spl
   ... | earliest=01/01/2023:00:00:00
   ```
   In this search, `latest` is not specified which means that it would default to the current time `now()`. This search retrieves all events from the beginning of January 1, 2023, onwards

2. **Combining `earliest` and `latest` for a Specific Date Range**
   To search for events during the first quarter of 2023, you would use:
   ```spl
   ... | earliest=01/01/2023:00:00:00 latest=03/31/2023:23:59:59
   ```
   This command captures all events from January 1, 2023, up to and including March 31, 2023, providing a complete view of the first quarter's data.

### Examples of relative time modifiers

For the following examples, the current time is Monday, 07 October 2024, 10:15:00 A.M.

> **Note:** `24h` is usually, but not always, equivalent to `1d` due to Daylight Savings Time adjustments.

| Time Modifier | Description | Resulting Time | Equivalent Modifiers |
|---------------|-------------|----------------|----------------------|
| `now` | Now, the current time | Monday, 07 October 2024, 10:15:00 A.M. | `now()` |
| `-60m` | 60 minutes ago | Monday, 07 October 2024, 09:15:00 A.M. | `-60m@s` |
| `-1h@h` | 1 hour ago, to the hour | Monday, 07 October 2024, 09:00:00 A.M. |  |
| `-1d@d` | Yesterday | Sunday, 06 October 2024, 12:00:00 A.M. |  |
| `-24h` | 24 hours ago (yesterday) | Sunday, 06 October 2024, 10:15:00 A.M. | `-24h@s` |
| `-7d@d` | 7 days ago, 1 week ago today | Monday, 30 September 2024, 12:00:00 A.M. |  |
| `-7d@m` | 7 days ago, snap to minute boundary | Monday, 30 September 2024, 10:15:00 A.M. |  |
| `@w0` | Beginning of the current week | Sunday, 06 October 2024, 12:00:00 A.M. |  |
| `+1d@d` | Tomorrow | Tuesday, 08 October 2024, 12:00:00 A.M. |  |
| `+24h` | 24 hours from now, tomorrow | Tuesday, 08 October 2024, 10:15:00 A.M. | `+24h@s` |

### Examples of searches with relative time modifiers

#### Search from the Beginning of the Week to the Time of Your Search

In this example, we're looking for events that occurred from the start of the current week up to the moment the search is executed.

```spl
... | earliest=@w0 latest=now
```
This query captures events from the very beginning of the week, starting at midnight on Sunday, all the way to the current time. For example, executing this search on a Wednesday at 3:00 P.M. would cover events over an approximate span of 87 hours.

The equivalent time range for this query, if conducted at 3:00 P.M. on a Wednesday, extends from 00:00 A.M. on Sunday to 3:00 P.M. on Wednesday.

#### Search the Current Business Week

This example searches for events occurring within the current business week, with `@w1` representing Monday and `@w6` representing Friday.
```spl
... | earliest=@w1 latest=+7d@w6
```
The query fetches events from the start of the current week at 12:00 A.M. on Monday, concluding at 11:59 P.M. on Friday of the same week.

- Conducting this search at noon on a Monday will result in data spanning only the preceding 12 hours.
- Running the search on a Friday will retrieve events from the entire week up to the current time on Friday.

The equivalent time range for this query, if executed at noon on a Monday, is from 12:00 A.M. on Monday to 12:00 P.M. on Monday. If executed on a Friday, the time range extends from 12:00 A.M. on Monday to the current time on Friday.

#### Search the Last Full Business Week

This example searches for events from the last full business week.
```spl
... | earliest=-7d@w1 latest=@w6
```
This search returns matching events starting from 12:00 A.M. of the Monday of the last week and ending at 11:59 P.M. of the Friday of the last week.

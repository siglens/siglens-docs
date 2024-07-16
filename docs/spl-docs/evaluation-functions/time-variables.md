# Using time variables

You can use time variables to define date and time formats using the [strftime()](../evaluation-functions/time-functions.md#strftimeepoch_time-format) and [strptime()](../evaluation-functions/time-functions#strptimedate_string-format) evaluation functions.

There are variables that produce dates, variables that produce times, and variables that produce both dates and times.

## Date and time variables
The following table lists variables that produce both a date and a time.

| Variable | Description |
|----------|-------------|
| `%c`     | The date and time in the current locale's format as defined by the server's operating system. For example, `Mon Oct 3 14:45:00 2022` for US English on Linux. |
| `%+`     | The date and time with time zone in the current locale's format as defined by the server's operating system. For example, `Mon Oct 3 14:45:00 PDT 2022` for US English on Linux. |



## Time variables

The following table lists variables that produce a time.

| Variable | Description |
|----------|-------------|
| `%Ez`    | Represents the timezone offset from UTC with a colon between hours and minutes. For example, `-08:00` indicates 8 hours behind UTC. |
| `%H`     | Hour (24-hour clock) as a decimal number. Hours are represented by the values 00 to 23. Leading zeros are accepted but not required. |
| `%I`     | Hour (12-hour clock) with the hours represented by the values 01 to 12. Leading zeros are accepted but not required. |
| `%k`     | Like `%H`, the hour (24-hour clock) as a decimal number. Leading zeros are replaced by a space, for example, 0 to 23. |
| `%M`     | Minute as a decimal number. Minutes are represented by the values 00 to 59. Leading zeros are accepted but not required. |
| `%N`     | Represents the nanosecond component of the time |
| `%p`     | AM or PM. |
| `%Q`     | Represents the millisecond component of the time. |
| `%S`     | Second as a decimal number, for example, 00 to 59. |
| `%s`     | The Unix Epoch Time timestamp, or the number of seconds since the Epoch: 1970-01-01 00:00:00 +0000 (UTC). (Example: 1609459200 is Fri Jan 1 00:00:00 2021) |
| `%T`     | The time in 24-hour notation (`%H:%M:%S`). For example, 23:59:59. |
| `%X`     | The time in the format for the current locale. For US English, the format for 9:30 AM is 9:30:00. |
| `%Z`     | The timezone abbreviation. For example, PST for US Pacific Standard Time. |
| `%z`     | The timezone offset from UTC, without a colon between hours and minutes: +hhmm or -hhmm. For example, for 8 hours behind UTC the value is -0800. |
| `%%`     | A literal `%` character. |

# Date variables

The following table lists variables that produce a date.

| Variable | Description |
|----------|-------------|
| `%F`     | Equivalent to `%Y-%m-%d` (the ISO 8601 date format). |
| `%x`     | The date in the format of the current locale. For example, `7/16/2024` for US English. |


## Specifying days and weeks
The following table lists variables that produce values for days and weeks.

| Variable | Description |
|----------|-------------|
| `%A`     | Full weekday name. (e.g., Sunday, ..., Saturday) |
| `%a`     | Abbreviated weekday name. (e.g., Sun, ..., Sat) |
| `%d`     | Day of the month as a decimal number, including leading zeros. (e.g., 01 to 31) |
| `%e`     | Like `%d`, the day of the month as a decimal number, but a leading zero is replaced by a space. (e.g., ` 1` to `31`) |
| `%j`     | Day of the year as a decimal number, including leading zeros. (e.g., 001 to 366) |
| `%V`     | Week of the year as a decimal number. (e.g., 1 to 52) |
| `%w`     | Weekday as a decimal number. (0 = Sunday, ..., 6 = Saturday) |

## Specifying months
The following table lists variables that produce values for months.

| Variable | Description |
|----------|-------------|
| `%b`     | Abbreviated month name. (e.g., Jan, Feb, etc.) |
| `%B`     | Full month name. (e.g., January, February, etc.) |
| `%m`     | Month as a decimal number. (e.g., 01 to 12). Leading zeros are accepted but not required. |

## Specifying year
The following table lists variables that produce values for years.

| Variable | Description |
|----------|-------------|
| `%y`     | Year as a decimal number, without the century. (e.g., 00 to 99). Leading zeros are accepted but not required. |
| `%Y`     | Year as a decimal number with century. For example, 2023. |

## Examples
The following table shows the results of various time format strings:

| Time Format String       | Result                |
|--------------------------|-----------------------|
| `%Y-%m-%d`               | `2021-12-31`          |
| `%y-%m-%d`               | `21-12-31`            |
| `%b %d, %Y`              | `Feb 11, 2022`        |
| `%d %b '%y = %Y-%m-%d`    | `23 Apr '22 = 2022-04-23` |
| `%A, %B %d, %Y`          | `Monday, October 3, 2022` |
| `%a, %b %d, %Y`          | `Mon, Oct 3, 2022`    |
| `%H:%M:%S`               | `14:45:00`            |
| `%I:%M %p`               | `02:45 PM`            |
| `%Y-%m-%dT%H:%M:%S%z`    | `2022-10-03T14:45:00-0700` |
| `%j of %Y`               | `277 of 2022` (Day of the year of Year) | 
# bin command

The bin command allows you to categorize continuous numerical data into discrete intervals or buckets. 
This is useful for:
Data aggregation - grouping values into time intervals, age brackets, etc.
Simplifying data presentation - preparing data for visualizations like histograms or bar charts
Streamlining queries - making searches more efficient by working with binned data

## Syntax

The required syntax is in **bold**.

**bin**\
[\<bin-options\>...]\
**\<field\>** [AS \<newfield\>]

### Required Arguments

#### \<field\>
**Syntax:** `<field>`\
**Description:** \
This argument refers to the name of the field on which you want to create bins.

### Optional Arguments

#### \<bin-options\>
**Syntax:** `<bins> | <minspan> | <span> | <start> | <end> | <aligntime>`\
**Description:** \
These are the bin options that can be used to create bins or buckets for the data in the `<field>`.

#### \<newfield\>
**Syntax:** `AS <string>`\
**Description:** \
The name of the new field which would have the binned-data.\
If not provided the binned-data would overwrite the existing data in the specified `<field>`.



#### \<bins\>
**Syntax:** `<N>`\
**Description:** \
`<N>` is an integer denoting the maximum number of bins to create.\
**Default:** 100

#### \<minspan\>
**Syntax:** `<span-length>`\
**Description:** \
Specifies the smallest level of granularity for the bins.


#### \<span\>
**Syntax:** `<span-length> | <log-span>`\
**Description:** \
Specifies the exact size of the bin.

#### \<start\>
**Syntax:** `<N>`\
**Description:** \
`<N>` is a numeric value that signifies the minimum value to be considered while creating bins.
This value is ignored if it is greater than the minimum value present in the data distribution.
This option only works on numerical data. It does not work for time data. 

#### \<end\>
**Syntax:** `<N>`\
**Description:** \
`<N>` is a numeric value that signifies the maximum value to be considered while creating bins.
This value is ignored if it is greater than the maximum value present in the data distribution.
This option only works on numerical data. It does not work on time data.

#### \<aligntime\>
**Syntax:** `<absolute-time> | <relative-time> | <N>`\
**Description:** \
This argument is used to align the bin values for time-based data.\
The bins created for time data would be aligned to this specific value.\
`<N>` is a positive integer denoting the time as unix epoch in milliseconds.\
<!-- TODO link earliest and latest pages -->
Refer earliest and latest for `<absolute-time>` and `<relative-time>`\
This option would be ignored if span has a timescale of `day, week, month or quarter`.




#### \<log-span\>
**Syntax:** `<coefficient>log<base>`\
**Description:** \
Sets the span in terms of logarithmic scale.\
`<coefficient>` is an optional positive numeric value which is the coefficient of this logarithmic span. Its value has to be less than `<base>` and greater than or equal to `1.0`. \
**Default Value:** `1.0`\
`<base>` is an optional positive numeric value which is the base of this logarithmic span. Its value has to be greater than `1.0`.\
**Default Value:** `10.0`\




#### \<span-length\>
**Syntax:** `<N> | <int><timescale>`\
**Description:** \
This argument specifies the span for each bin. `<int><timescale>` is required for creating bins on time-based data in `timestamp`.\
`<N>` is a positive numeric value denoting the exact size for creating bins.\
`<int>` is a positive integer used to denote the magnitude of the time unit specified by `timescale`.

#### \<timescale\>
**Syntax:**  `<subsecond> | <second> | <minute> | <hour> | <day> | <week> | <month> | <quarter> | <year>`
**Description:** \
`<timescale>` is a `<string>` used to denote the time unit.\
The magnitude of time represented by `<int><subsecond>` has to be less than 1 second and should be evenly divisible by 1 second.\
`<month>` can only have `<int>` values `1, 2, 3, 4, 6, 12`.\
`<quarter>` can only have `<int>` values `1, 2, 4`.

| **Unit** | **String to denote the Unit** |
| --------- | ----------------------------- |
| `<subsecond>` | millisecond (`ms`), centisecond (`cs`), decisecond (`ds`) |
| `<second>` | `seconds`, `second`, `secs`, `sec`, `s`  |
| `<minute>` | `minutes`, `minute`, `mins`, `min`, `m` |
| `<hour>` | `hours`, `hour`, `hrs`, `hr`, `h` |
| `<day>` | `days`, `day`, `d` |
| `<week>` | `weeks`, `week`, `w` |
| `<month>` | `months`, `month`, `mon` |
| `<quarter>` | `quarters`, `quarter`, `qtrs`, `qtr`, `q` |
| `<year>` | `years`, `year`, `yrs`, `yr`, `y` |



## How does bin work?






# bin command

The `bin` command allows you to categorize continuous numerical data into discrete intervals or buckets.\
This is useful for:
- Data aggregation - grouping values into time intervals, age brackets, etc.
- Simplifying data presentation - preparing data for visualizations like histograms or bar charts.
- Streamlining queries - making searches more efficient by working with binned data.

## Syntax

The required syntax is in **bold**.

**bin**\
[\<bin-options\>...]\
**\<field\>** [AS \<newfield\>]

### Required Arguments

#### \<field\>
**Syntax:** `<field>`\
**Description:** \
`<field>` specifies the name of the field you wish to bin.

### Optional Arguments

#### \<bin-options\>
**Syntax:** `<bins>`, `<minspan>`, `<span>`, `<start>`, `<end>` or `<aligntime>`\
**Description:** \
These are the options for the `bin` command that can be used to create bins for the data in `<field>`.

#### \<newfield\>
**Syntax:** `AS <string>`\
**Description:** \
`<string>` is the name of the new field that will contain the binned data.\
If not provided, the binned data will overwrite the existing data in the specified `<field>`.

#### \<bins\>
**Syntax:** `<N>`\
**Description:** \
`<N>` is an integer that specifies the maximum number of bins to create.\
**Default:** 100

#### \<minspan\>
**Syntax:** `<span-length>`\
**Description:** \
Specifies the smallest level of granularity for the bins.

#### \<span\>
**Syntax:** `<span-length>` or `<log-span>`\
**Description:** \
Specifies the exact size of the bins.

#### \<start\>
**Syntax:** `<N>`\
**Description:** \
`<N>` is a numeric value that signifies the minimum value to be considered when creating bins.\
This value is disregarded if it exceeds the minimum value present in the data distribution.\
This option applies only to numerical data and does not apply to time-based data.

#### \<end\>
**Syntax:** `<N>`\
**Description:** \
`<N>` is a numeric value that signifies the maximum value to be considered when creating bins.\
This value is disregarded if it is less than maximum value present in the data distribution.\
This option applies only to numerical data and does not apply to time-based data.

#### \<aligntime\>
**Syntax:** `<absolute-time>`, `<relative-time>` or `<N>`\
**Description:** \
`<aligntime>` is used to align the bin values for time-based data.\
The bins created for time data will be aligned to this specific value.\
`<N>` is a positive integer specifying the time as unix epoch in milliseconds.
<!-- TODO link earliest and latest pages -->
Refer to the earliest and latest commands for `<absolute-time>` and `<relative-time>`\
This option will be ignored if the span has a timescale of `day, week, month or quarter`.\
By default, all time bins are aligned to UTC epoch 0.


#### \<log-span\>
**Syntax:** `<coefficient>log<base>`\
**Description:** \
Sets the span in terms of logarithmic scale.\
`<coefficient>` is an optional positive numeric value that serves as the coefficient of this logarithmic span.\
Its value must be less than `<base>` and greater than or equal to `1.0`.\
**Default Value:** 1.0\
`<base>` is an optional positive numeric value that serves as the base for the logarithmic span.\
Its value must be greater than `1.0`.\
**Default Value:** 10.0




#### \<span-length\>
**Syntax:** `<N>` or `<int><timescale>`\
**Description:** \
`<span-length>` specifies the span for each bin.\
`<N>` is a positive numeric value specifying the exact size for creating bins.\
`<int><timescale>` is required for creating bins on time-based data in `timestamp`.\
`<int>` is a positive integer used to specify the magnitude of the time unit specified by `timescale`.

#### \<timescale\>
**Syntax:** `<subsecond>`, `<second>`, `<minute>`, `<hour>`, `<day>`, `<week>`, `<month>`, `<quarter>` or `<year>`\
**Description:** \
`<timescale>` is a `<string>` that specifies the unit of time.\
The magnitude of time represented by `<int><subsecond>` must be less than 1 second and evenly divisible by 1 second.\
For `<month>`, the only permissible `<int>` values are `1, 2, 3, 4, 6, 12`.\
For `<quarter>`, the only permissible `<int>` values are `1, 2, 4`.

| **Unit** | **Strings used to specify Unit** |
| --------- | ----------------------------- |
| `<subsecond>` | millisecond (ms), centisecond (cs), decisecond (ds) |
| `<second>` | seconds, second, secs, sec, s  |
| `<minute>` | minutes, minute, mins, min, m |
| `<hour>` | hours, hour, hrs, hr, h |
| `<day>` | days, day, d |
| `<week>` | weeks, week, w |
| `<month>` | months, month, mon |
| `<quarter>` | quarters, quarter, qtrs, qtr, q |
| `<year>` | years, year, yrs, yr, y |


## How does bin work?
The `<span>` option always takes priority. All other options are ignored when `<span>` is explicitly specified.

If not specified, the span is derived based on the data distribution of the `<field>`.\
If `<minspan>` is specified, the derived span must follow this property.\
In the absence of an explicitly specified `<span>`, the derived span must strictly adhere to the maximum number of bins specified by `<bins>` or its default value.

**For Numerical Data:**\
`<span-length>` or `<log-span>` can be used to specify the exact span of the bin using `<span>` option.\
The derived `<span-length>` for bins will always be in powers of 10.

**Log Span Example:**

Given `<log-span>` as `2log3`, when calculating the bin for the value 301, the process is as follows:
1. **Divide the Value by the Coefficient:** Divide 301 by the coefficient (2), resulting in 150.5.
2. **Calculate Logarithm:** Compute the base 3 logarithm of 150.5, which is approximately 4.5639058801.
3. **Find Floor and Ceiling Values:** Determine the floor (4) and ceiling (5) of this logarithmic value. If they are equal, increment the ceiling by 1 to ensure a range.
4. **Calculate Lower and Upper Bounds:** The lower bound is found by raising the base (3) to the power of the floor value (4) and multiplying by the coefficient (2), resulting in 162. The upper bound is calculated similarly, using the ceiling value, resulting in 486.
5. **Determine Bin Range:** The lower (162) and upper bounds (486) represent the bin range for the value 301.

Some sample bin sizes are presented below for different types of `<log-span>`\
**2log3:** 2-6, 6-18, 18-54, 54-162, 162-486, 486-1458 ...\
**log2:** 1-2, 2-4, 4-8, 8-16, 6-32, 32-64, 64-128, 128-256, ...\
**3log5:** 3-15, 15-75, 75-375, 375-1875, 1875-9375, 9375-46875 ...


**For Time-Based Data:**\
Currently, SigLens only supports time discretization on the default `timestamp` field.\
`<span-length>` can be used to specify the exact span of the bin using `<span>` option. The minimum span length that meets all the specified properties will be decided.\
All derived `<span-length>` will be aligned to the UTC timezone by default.\
The derived `<span-length>` are fixed and are listed below in ascending order:
- 1 second
- 10 seconds
- 30 seconds
- 1 minute
- 5 minutes
- 10 minutes
- 30 minutes
- 1 hour
- 1 day
- 1 month

The `<bins>` option will be ignored in this case if it is not possible to accommodate all the data into the maximum number of bins specified by the largest derived span, i.e., **1 month**.


## Examples

The following example creates bins based on the `timestamp` field and aligns the bins to the UTC time of 1720713887000.
```
...| bin aligntime=1720713887000 timestamp
```


## Use-Case Examples

### Analyzing Event Latency in Real-Time

**Problem:** The challenge is to understand how the latency of events fluctuates over very short intervals, specifically on a second-by-second basis. This analysis is crucial for identifying performance bottlenecks in real-time systems where even minor delays can impact user experience or system efficiency.

**Solution:** The solution involves using a command sequence to bin events into one-second intervals based on their timestamps, and then calculate the average latency for events within each interval.

```
... | bin span=1s timestamp 
    | stats avg(latency) by timestamp
    | sort timestamp
```
**Explanation:**
1. The `bin span=1s timestamp` command segments the event data into one-second intervals. This step is essential for analyzing how event latency varies from one second to the next, providing a granular view of performance.
2. The `stats avg(latency) by timestamp` command computes the average latency for all events within each one-second bin.
3. The `sort timestamp` command orders the results by the timestamp of each bin, ensuring that the analysis of latency over time is presented in a chronological sequence. This makes it easier to trace the latency trends and identify specific moments of performance spikes or drops.

This approach offers a detailed analysis of event latency, enabling the identification of specific time intervals that may require optimization to improve overall system performance.



### Analyzing Age Distribution in Data

**Problem:** A common challenge in data analysis is understanding the distribution of a numerical attribute, such as age, across a dataset. This is crucial for identifying trends, patterns, and outliers in the data, which can inform decision-making in areas like marketing, product development, and policy formulation.

**Solution:** The solution involves using a command sequence to bin numerical data, such as age, into ten-year intervals, and then count the number of records within each interval.

```
... | bin span=10 age AS age_bin
    | stats count by age_bin 
    | sort age_bin
```


**Explanation:**
1. The `bin span=10 age AS age_bin` command segments the age data into bins of ten-year intervals and creates a new field named `age_bin` containing the bin value. This step is essential for categorizing the data into meaningful groups that reflect different age ranges, facilitating the analysis of age distribution within the dataset.
2. The `stats count by age_bin` command calculates the number of records within each age bin. This aggregation helps in understanding the distribution of ages across the dataset.
3. The `sort age_bin` command orders the results by age bin, making it easier to analyze the age distribution sequentially from the youngest to the oldest groups.

This approach provides a clear view of the age distribution within the dataset, highlighting predominant age groups and potential gaps. It is particularly useful for demographic analysis and understanding the target audience in various contexts.


### Analyzing Price Distribution in Product Data

**Problem:** A frequent challenge in retail and e-commerce analytics is understanding the distribution of product prices within a catalog. This analysis is vital for identifying pricing trends, setting competitive prices, and spotting outliers that could indicate errors or opportunities for special promotions.

**Solution:** The solution involves using a command sequence to bin product prices into 20 equal intervals, count the number of products within each interval, and then sort the results to analyze the price distribution across the product range.

```
... | bin bins=20 price AS price_bin
    | stats count by price_bin 
    | sort price_bin
```
**Explanation:**
1. The `bin bins=20 price AS price_bin` command divides the range of product prices into 20 equal intervals and assigns each product to a bin, creating a new field named `price_bin`. The creation of the `price_bin` field facilitates subsequent analysis by categorizing products into distinct price segments.
2. The `stats count by price_bin` command calculates the number of products within each price bin. This aggregation provides insights into how products are distributed across different price ranges, highlighting the most and least populated price segments.
3. The `sort price_bin` command orders the results by price bin, facilitating a sequential analysis of the price distribution from the lowest to the highest price segments.

This approach offers a detailed view of the price distribution within the product catalog, enabling businesses to make informed decisions regarding pricing strategies, product positioning, and market competitiveness. It is especially useful for identifying price points that are over or underrepresented in the product range, guiding adjustments to meet market demand and strategic objectives.


### Optimizing Network Performance by Analyzing Packet Size Distribution

**Problem:** Network administrators face challenges in managing network performance due to the wide range and uneven distribution of packet sizes. Small packets like ACKs and large data transfers coexist, affecting throughput and efficiency. Identifying patterns and anomalies in packet size distribution is crucial for network optimization and security.

**Solution:** The solution involves using a command sequence to bin packet sizes using a logarithmic scale, count the occurrences of each bin, and then sort the results to analyze the distribution of packet sizes across the network.

```
... | bin span=log2 packet_size AS bin_packet_size
    | stats count by bin_packet_size
    | sort bin_packet_size
```

**Explanation:**
1. The `bin span=log2 packet_size AS bin_packet_size` command segments packet sizes into bins on a logarithmic scale and assigns each packet to a bin, creating a new field named `bin_packet_size`. This method provides a more nuanced view of packet size distribution, especially useful for analyzing a wide range of sizes from very small to very large packets. The creation of the `bin_packet_size` field facilitates subsequent analysis by categorizing packets into distinct size segments.
2. The `stats count by bin_packet_size` command calculates the number of packets within each bin. This aggregation provides insights into the distribution of packet sizes, highlighting the most common sizes and identifying outliers. It helps in understanding how network traffic is composed in terms of packet sizes, which is crucial for optimizing network performance and capacity planning.
3. The `sort bin_packet_size` command orders the results by the bin of packet sizes, facilitating a sequential analysis of the packet size distribution. This organization allows for an easier identification of patterns, such as the prevalence of small packets that may indicate a large number of control messages or the presence of large packets that suggest data transfers.

This approach offers a detailed view of the packet size distribution across the network, enabling network administrators to make informed decisions regarding network configuration, optimization, and security. It is particularly useful for identifying trends and anomalies in packet size distribution, which can inform strategies to enhance network efficiency and performance.

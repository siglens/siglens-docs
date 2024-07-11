# Statistical eval functions

The following list contains the evaluation functions that you can use to calculate statistics.

## max(\<values>)

This function takes one or more numeric or string values and returns the maximum value. Strings are greater than numbers.

### Usage

The `<values>` argument can be a list of strings or numbers or a field name.

### Example

The following example returns either `"foo"` or the value in the `name` field. Splunk searches use lexicographical order, where numbers are sorted before letters. If the value in the `name` field is `"baz"`, then `"foo"` is returned. If the value in the `name` field is `"zaz"`, then `"zaz"` is returned.

```
... | eval n=max(1, 3, 6, 7, "foo", name)
```

This example returns the maximum value in a multivalue field.

The following search creates a field called `n` with a single value, which is a series of numbers. The `makemv` command is used to make the single value into multiple values, each of which appears on its own row in the results. Another new field called `maxn` is created which takes the values in `n` and returns the maximum value, `6`.

```
... | eval n = "1 3 5 6 4 2" | makemv n | eval maxn = max(n)
```

### Use-Case Example

**Identify the maximum CPU utilization per minute per server**

**Problem:** A user wants to identify the maximum CPU utilization recorded every minute for each server. The `cpu_usage` field is a string of CPU usage measurements taken every 10 seconds within that minute, separated by commas.

**Solution:** The `max()` command within an `eval` function can be used to find the maximum CPU utilization value from the string.

Assume the ingested data format is like this per minute across different servers:

```
server,time,cpu_usage  // fields
server1,1720350000,"50,85,90,70,85,100"
server2,1720350000,"70,90,99,85,60,70"
server1,1720350060,"105,90,87,99,90,80"
server2,1720350060,"75,89,80,70,75,80"
```

For the above data, the query will be:

```
index=server_metrics sourcetype=cpu_usage
| makemv delim="," cpu_usage
| eval max_cpu_per_min = max(cpu_usage)
| fields server, time, max_cpu_per_min
```

**Explanation:**
1. The `makemv` command is used to split the `cpu_usage` string into multiple values based on the delimiter ",".
2. The `eval` command uses the `max()` function to calculate the maximum CPU utilization value from the `cpu_usage` values.
3. The result is stored in a new field called `max_cpu_per_min`.
4. The `fields` command selects the relevant fields (`server`, `time`, `max_cpu_per_min`) for output.

**Output:**

The output for the above command based on the above-mentioned data would look like this:

```
server    time         max_cpu_per_min
server1   1720350000   100
server2   1720350000   99
server1   1720350060   105
server2   1720350060   89
```

## min(\<values>)

This function takes one or more numeric or string values and returns the minimum value. Strings are greater than numbers.

### Usage

The each element in `<values>` argument can be a literal string, literal number, or a field name.

### Example

The following example returns either `3` or the value in the `size` field. Splunk searches use lexicographical order, where numbers are sorted before letters. If the value in the `size` field is `9`, then `3` is returned. If the value in the `size` field is `1`, then `1` is returned.

```
... | eval n=min(3, 6, 7, "maria", size)
```

The following example returns the minimum value in a multivalue field.

This search creates a field called `n` with a single value, which is a series of numbers. The `makemv` command is used to make the single value into multiple values, each of which appears on it's own row in the results. Another new field called `minn` is created which takes the values in `n` and returns the minimum value, `2`.

```
... | eval n = "3 5 6 4 7 2" | makemv n | eval minn = min(n)
```

### Use-Case Example

**Identify the minimum CPU utilization per minute per server**

**Problem:** A user wants to identify the minimum CPU utilization recorded every minute for each server. The `cpu_usage` field is a string of CPU usage measurements taken every 10 seconds within that minute, separated by commas.

**Solution:** The `min()` command within an `eval` function can be used to find the minimum CPU utilization value from the string.

Assume the ingested data format is like this per minute across different servers:

```
server,time,cpu_usage  // fields
server1,1720350000,"50,85,90,70,85,100"
server2,1720350000,"70,90,99,85,60,70"
server1,1720350060,"105,90,87,99,90,80"
server2,1720350060,"75,89,80,70,75,80"
```

For the above data, the query will be:

```
index=server_metrics sourcetype=cpu_usage
| makemv delim="," cpu_usage
| eval min_cpu_per_min = min(cpu_usage)
| fields server, time, min_cpu_per_min
```

**Explanation:**
1. The `makemv` command is used to split the `cpu_usage` string into multiple values based on the delimiter ",".
2. The `eval` command uses the `min()` function to calculate the minimum CPU utilization value from the `cpu_usage` values.
3. The result is stored in a new field called `min_cpu_per_min`.
4. The `fields` command selects the relevant fields (`server`, `time`, `min_cpu_per_min`) for output.

**Output:**

The output for the above command based on the above-mentioned data would look like this:

```
server    time         min_cpu_per_min
server1   1720350000   50
server2   1720350000   60
server1   1720350060   80
server2   1720350060   70
```

## random()

This function returns a pseudo-random integer ranging from `0 to (2^31)-1`.

### Example

The following example returns a random integer, such as 0...2147483647.

```
... | eval n=random()
```

The following example returns a random number within a specified range. In this example the random number is between 1 and 100,000.

```
... | eval n=(random() % 100000) + 1
```

This example takes a random number and uses the modulo mathematical operator `( % )` to divide the random number by `100000`. This ensures that the random number returned is not greater than `100000`. The number remaining after the division is increased by `1` to ensure that the number is at least greater than or equal to `1`.

### Use-Case Example

**Randomly sample data for performance analysis**

**Problem:** A user wants to perform an analysis on data for a certain time frame, but the dataset is too large, making the analysis time-consuming. The user needs to randomly select a small percentage of records within that time frame for a quicker analysis.

**Solution:** The `random()` command within an `eval` function can be used to randomly sample a subset of the data.

```
index=large_dataset
| eval sample_flag = if(random() % 100 < 10, 1, 0)
| where sample_flag = 1
| fields - sample_flag
```

**Explanation:**
1. The `eval` command uses the `random()` function to generate a random integer. The modulo operator (`%`) is used to determine if the record should be flagged for sampling.
2. The condition `random() % 100 < 10` flags approximately 10% of the records (randomly selected) by setting `sample_flag` to 1.
3. The `where` command filters the dataset to include only the records where `sample_flag` is 1.
4. The `fields - sample_flag` command removes the `sample_flag` field from the output, keeping the dataset clean.

This approach allows the user to quickly perform an analysis on a random sample of the data, reducing the time required for processing large datasets.



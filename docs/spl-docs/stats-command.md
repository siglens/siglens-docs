# stats

## Description

Calculates aggregate statistics, such as average, count, and sum, across the results set. When the `stats` command is utilized without a `BY` clause, a single row is returned, representing the aggregation across the whole set of incoming results. If a `BY` clause is used, one row is generated for each unique value specified in the `BY` clause.


## Syntax

**Simple:**  
stats (stats-function(field) [AS field])... [BY field-list]

**Complete:**  
Required syntax is in **bold**.

| stats  
**( \<stats-agg-term\>... )**  
[\<by-clause\>]  

### Required Arguments

#### stats-agg-term  
**Syntax:** \<stats-func\>(\<input-field-name>) [AS \<output-field-name\>]   
**Description:** A statistical aggregation function. This function can be applied to an eval expression, or to a single field or multiple fields. Utilize the AS clause to assign the result to a new field with a name you choose.


### Optional Arguments

#### by-clause
**Syntax:** `BY <field-list>`\
**Description:** The name of one or more fields to group by. Wildcard characters cannot be used to specify multiple fields with similar names; each field must be individually named. The BY clause produces one row for each distinct value in the specified fields. Without a BY clause, the stats command returns a single row, aggregating across the entire incoming results set.  

### Stats function options

#### stats-func

**Syntax:** The syntax depends on the function that you use. Refer to the table below.\
**Description:** Statistical and charting functions that you can use with the stats command. Each time you invoke the stats command, you can use one or more functions. However, you can only use one BY clause.

The following table lists the supported functions by type of function. Use the links in the table to see descriptions and examples for each function

| Type of function    | Supported functions           |
|---------------------|-------------------------------------------|
| [Aggregate functions](./aggregate-functions/agg-functions.md) | `avg()`, `min()`, `max()`, `range()`, `sum()`, `count()`, `distinct_count()` |

## Usage

### Eval expressions with statistical functions

When you use the stats command, you can use an `eval` expression as part of the statistical function. For example:

``` spl
... | stats count(eval(error_code=503)) AS error_503_count BY endpoint
```


### Invalid Wildcards in BY Clauses

The stats command does not allow the use of wildcard characters in field values within BY clauses.  

For example, you cannot specify:

```spl
| stats count BY app*.
```

### Field Renaming Constraints

You cannot assign multiple new names to a single field. For instance, if you have field A, you cannot rename A to both B and C. The following example is not valid:

```spl
... | stats count(user) AS total_users, count(user) AS unique_users
```

## Examples

### 1. Calculate the average load time for each server

    ```spl
    ... | stats avg(load_time) BY server
    ```

### 2. Calculate the minimum and maximum latency for each city

    Compute the minimum and maximum latency for each city, providing insights into the network performance across different locations.

    ```spl
    ... | stats min(latency) AS MinLatency, max(latency) AS MaxLatency BY city
    ```
    
### 3. Eliminate duplicate entries and calculate the total count of unique entries

    Remove duplicate entries based on the "user" value and return the total count of unique entries that remain.

    ```spl
    ... | stats dc(user)
    ```
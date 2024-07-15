# eval command

## Description

The `eval` command computes an expression and assigns the outcome to a field within the search results. If the specified field name does not correspond to an existing field in the output, the command introduces a new field to the search results. Conversely, if the specified field name already exists, the command overwrites that existing field with the values derived from the `eval` expression. The `eval` command is capable of processing mathematical, string, and boolean expressions.

For executing multiple `eval` expressions within a single search, you can separate them with commas. The search handles these expressions sequentially from left to right, allowing the use of fields evaluated earlier in expressions that follow.

## Syntax

The required syntax is in **bold**.

**eval**\
**\<assignment_expression\>** ["," \<assignment_expression\> ]...

### Required Arguments

#### \<assignment_expression\>

**Syntax:** `<field>=<expression>`\
**Description:** \
`<field>` refers to the name of the destination field that will contain the result of the evaluation of `<expression>`.\
If the field name already exists in your record, it will be overwritten with the evaluated result.\
Otherwise, a new field will be created. Avoid using reserved keywords as the field name.

`<expression>` is a `<string>` that may include a mix of values, variables, operators, and functions. These components are evaluated together to compute the final result for the target `<field>`.
- Expressions can concatenate string literals or fields using the `.` operator.
- Expressions such as `... | eval new_address = address." USA"` will concatenate the value from the `address` field with the string `" USA"`, and `new_address` will contain this concatenated value.
- If the expression contains an operator, the value before the operator must be a numeric field. The value after the operator can be a numeric literal, a field, or a numeric expression itself, which follows this same rule.
- The exception to the previous rule is when concatenating strings using the `.` operator; fields and string literals can be used in any order or combination.
- An expression can be a single string or a numeric literal.
- A string literal must be enclosed in double quotes.
- The result of `<expression>` cannot be boolean. It must evaluate to a number or a string.
- Expressions are case-sensitive.

## How does eval command work?

The `eval` command is generally used to create new fields that result from an evaluation or serve as intermediary results required for further processing in the search.

#### Using Eval Functions

The following are the different types of `eval` functions that can be used in an `<expression>`.
<!-- TODO: once all docs are merged we can add links to the pages -->
- Comparison and Conditional functions
- Conversion functions
- Date and Time functions
- Informational functions
- Mathematical functions
- Multivalue functions
- Statistical functions
- Text functions
- Trig and Hyperbolic functions


## Examples

The example below shows how to create a field named `new_field` in all records, assigning it the value `"my new field"`.
```
... | eval new_field="my new field"
```
Similarly, a numeric literal can be used to create a new field. The example below demonstrates creating a field named `golden_ratio` with the value `1.618`.
```
... | eval golden_ratio=1.618
```

You can also perform simple numeric computations with numeric fields. The following example creates a new field named `new_salary`, having the salary after a 10% increment.
```
... | eval new_salary=salary*1.1
```

You can use multiple fields to compute a new field. The following example creates a new field named `final_amount` by adding the simple interest calculated using the existing fields `principal`, `rate`, and `time_period`.
```
... | eval final_amount=principal + (principal * rate * time_period)/100
```


## Use-Case Example 

**Device Type Latency Analysis**

**Problem:** The objective is to analyze network latency across different device types, identifying which devices experience higher or lower latency. This analysis is crucial for optimizing user experience and network performance for diverse user bases.

**Solution:** Leverage the `eval` and `stats` commands in Splunk to classify devices based on their user agent strings, then calculate the minimum, maximum, and average latency for each device type.

```
... | eval device_type=case( 
        like(lower(user_agent), "%iphone%"), "iPhone", 
        like(lower(user_agent), "%android%"), "Android", 
        like(lower(user_agent), "%windows%"), "Windows", 
        like(lower(user_agent), "%macintosh%"), "Mac", 
        like(user_agent, "%"), "Other") 
    | stats min(latency), max(latency), avg(latency) by device_type
```


**Explanation:**
1. The `eval` command is utilized to dynamically assign device types based on the `user_agent` string. This process involves examining the `user_agent` string for patterns that match known device types.
   - The `case` function within `eval` allows for conditional logic to be applied, enabling multiple conditions to be checked sequentially until a match is found. For each device, the first condition that matches its `user_agent` string determines its `device_type`.
     - `like(lower(user_agent), "%iphone%")` checks for the presence of "iphone" in the `user_agent` string, assigning the `device_type` as "iPhone" if matched. The use of `lower` ensures the match is case-insensitive.
     - Similar conditions are applied for "Android", "Windows", "Mac", and a catch-all "Other" category for user agents that do not match any of the specified patterns.
   - This classification is crucial for the subsequent analysis, as it groups devices into meaningful categories based on their operating system or platform.
2. The `stats` command is used post-classification to calculate the minimum, maximum, and average latency values for each `device_type`.
     - `min(latency)`, `max(latency)`, and `avg(latency)` functions within `stats` compute the respective latency metrics for each group.
   - Grouping by `device_type`:
     - The `by device_type` clause in the `stats` command ensures that the calculated metrics are grouped according to the device type. This means that for each unique `device_type` identified in the first step, the minimum, maximum, and average latency values are calculated separately.
   - This step is essential for analyzing network performance across different device types, as it provides specific latency metrics for each category. These metrics are instrumental in identifying performance trends and potential issues specific to each device type.

This method provides a clear overview of network performance across different device types, enabling targeted improvements and optimizations.







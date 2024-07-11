# eval command

## Description

The eval command computes an expression and assigns the outcome to a field within the search results.
If the specified field name does not correspond to an existing field in the output, the command introduces a new field to the search results. Conversely, if the specified field name already exists, the command overwrites that existing field with the values derived from the eval expression. 
The eval command is capable of processing mathematical, string, and boolean expressions.

For executing multiple eval expressions within a single search, you can separate them with commas. The search handles these expressions sequentially from left to right, allowing the use of fields evaluated earlier in expressions that follow.

## Syntax

The required syntax is in **bold**.

**eval**
**\<assignment_expression\>** ["," \<assignment_expression\> ]...

### Required Arguments

#### \<assignment_expression\>

**Syntax:** `<field>=<expression>`\
**Description:** \
`<field>` refers to the name of the destination field which would contain the result of evaluation of `<expression>`.
If the field name already exists in your record, then that field would be overwritten with the evaluated result. Else, new field would be created.
Do not use reserved keywords as the field name.

`<expression>` is a `<string>` which could have a mix of values, variables, operators and functions.
These components are evaluated together to compute the final result for the target `<field>`.
- Expression cannot concat string values or fields using `+` operator directly.
- Expression such as `... | eval new_address = address+" USA"` are not supported.
- If the expression contains operator, the value before the operator must be a numeric field. Value after the operator could be a numeric literal or a field or a numeric expression itself which follows this same rule.
- Expression can be a single string or a numeric literal.
- String literal must be enclosed in double quotes.
- Result of `<expression>` cannot be boolean. It must evaluate to a number or a string.
- Expression is case-sensitive.

## How does eval command work?

Generally `eval` command is used to create new fields that are either a result of the some evaluation or an intermediary result that is required for further processing in the search.

#### Using Eval Functions
<!-- TODO: once all docs are merged we can add links to the pages -->
- Comparison and Conditional functions
- Conversion functions
- Date and Time functions
- Informational functions
- Mathematical functions
- Multi-value eval functions
- Statistical eval functions
- Text functions
- Trig and Hyperbolic functions


## Examples

The following example demonstrates how to create a field using a string literal. Here field `new_field` would be created for all the records and it would have value `"my new field"`.
```
... | eval new_field="my new field"
```

Same could be done for numeric literal. The following example creates a new field `golden_ratio` which has value `1.618`.
```
... | eval golden_ratio=1.618
```

You can also perform simple numeric computation with numeric fields. The following examples creates a new field `new_salary` specifying the salary after increment of 10%.
```
... | eval new_salary=salary*1.1
```

You can use multiple fields to compute a new field. The following example creates a new field `final_amount` after adding the simple interest using the existing fields `principle`, `rate` and `time_period`.
```
... | eval final_amount=principle + (principle * rate * time_period)/100
```


You can also use the newly created fields using eval in other functions that appear after it in the search. The following example calculates the min, max and average latency for different kinds of device types.

```
... | eval device_type=case( 
        like(lower(user_agent), "%iphone%"), "iPhone", 
        like(lower(user_agent), "%android%"), "Android", 
        like(lower(user_agent), "%windows%"), "Windows", 
        like(lower(user_agent), "%macintosh%"), "Mac", 
        like(user_agent, "%"), "Other") 
    | stats min(latency), max(latency), avg(latency) by device_type
```









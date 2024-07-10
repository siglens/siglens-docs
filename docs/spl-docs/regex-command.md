# regex command

## Description

This command can be used to filter out the results that either match or do not match the specified regular expression.


## Syntax
Required arguments are in bold.

**regex**
(\<field\>=\<regex-expression\> | \<field\>!=\<regex-expression\> | **\<regex-expression\>**)


### Required Arguments

#### \<regex-expression\>

**Syntax:** `"<string>"`\
**Description:** \
This argument has to be an unanchored regular expression compatible with RE2 syntax.\
This expression has to be enclosed in double quotes


### Optional Arguments

#### \<field\>

**Syntax:** `<field>`\
**Description:** \
Indicate the field name to compare values with the regular expression. \
Use `<field>=<regex-expression>` to retain results matching the expression.\
Use `<field>!=<regex-expression> `to keep results that do not match.\
<!-- 
**Default value:** `*`. It means that it would search for this regular expression on all the fields and retain the result if any of them matches. -->


### Differences between regex and rex command

The `regex` command is used to filter out results based on whether they match or do not match a specified regular expression. 
Alternatively, the `rex` command is utilized for extracting fields using named groups within a regular expression or for modifying a field's content through replacement or substitution with sed expressions.



## Example

The following example can be used to filter the person records having job_title as Engineer or Developer.
```
... | regex job_title="(?i)(engineer|developer)"
```


The following example can be used to identify percentage of slow requests for image files and analyze the average latency across different countries to improve user experience.

```
... | regex url="(?i)\.(jpg|jpeg|png|gif|webp)(\?|$)" 
    | regex http_status="^(2\d{2}|304)$" 
    | eval is_slow = if(latency > 1000, 1, 0) 
    | stats count as total_requests, avg(latency) as avg_latency, 
            sum(is_slow) as slow_requests by country, http_status 
    | eval slow_percentage = round((slow_requests / total_requests) * 100, 2), 
           avg_latency = round(avg_latency, 2)
```






# search command

## Description

The search command is a versatile tool that allows you to retrieve events from your indexes and filter the results of previous search commands in your pipeline. 
You can use keywords, quoted phrases, wildcards, and field-value expressions to specify the events you want to retrieve from your indexes. 
The search command is implied at the beginning of any search, so you don't need to explicitly include it when defining your search criteria.
Additionally, you can use the search command later in your search pipeline to filter the results from the previous command.

## Syntax

The required syntax is in **bold**.

search **\<search-expression\>**


### Required Arguments

#### \<search-expression\>

**Syntax:** `<literal-expression> | <comparison-expression>`\
**Description:** \
This argument can be a word, phrase, field-value comparsion or combination of search expressions.\
You can use logical constructs like `AND`, `OR` or `NOT` to combine search expressions. Parenthesis can be used to separate different search expressions.

#### \<literal-expression\>

**Syntax:** `<literal-value> | "<literal-phrase>"`\
**Description:** \
You can use number, strings, phrases to search in the data. \
If the phrase have characters like space, periods (`.`), etc. you must enclose the phrase in double quotes.



#### \<comparison-expression\>

**Syntax:** `<field><comparison-operator><value>`\
**Description:** \
`<comparison-operator>` can be `=` or `!=` for string comparisons. For numerical values, valid comparison operators are `=, !=, <, <=, >, >=`.\
`<field>` refers to the field name and `<value>` is literal value can be a number of a string.


## Usage
Search command is implied by default during the beginning of every search

`NOT` and `!=` are different in terms of how they are used. `NOT` operator would return the record for which the value is not equal to what is specified or the value is not present (marked as `NULL`). Whereas in the case of `!=`, if the field has `NULL` value the result would not be retrieved.

You can search for terms with a similar pattern of characters by utilizing the wildcard character (`*`). This character is applicable in both textual searches and when seeking specific field values.


## Example


Some examples of implied search are:
- `Boston`: fetch all the records containing the word "Boston" in any of the field.
- `http_status=200`: fetch all the records where `http_status` field has value `200`.
- `Boston AND http_status=200`: fetch all the records where `http_status` field has value `200` and word Boston is present in any of the field.
- `city=San*`: fetch all records where city field's value start with value `San`.


The following example can be used in identifying the root cause of high latency issues by checking the average latency across combinations of countries, urls and user_agents and display the results in decreasing order of average latencies.

```
search latency>1000 
| stats count, avg(latency) as avg_latency by country, url, user_agent 
| sort -avg_latency
```

The following example can be to gather number of males and females working as Engineer in the USA

```
search country="*America*" AND job_title="Engineer" 
| stats count as total by gender
```

The following example can be used to identify potential brute force attacks by looking for blocked connections to SSH (port 22) or RDP (port 3389) ports with a high number of attempts from the same source IP
```
search (dest_port=22 OR dest_port=3389) AND sourcetype=firewall AND action=blocked
| stats count as conn_count by src_ip, dest_ip
| where conn_count > 100
| sort -conn_count
```

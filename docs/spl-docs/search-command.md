# search command

## Description

The search command is a versatile tool that allows you to retrieve events from your indexes and filter the results of previous search commands in your pipeline. 
You can use keywords, quoted phrases, wildcards, and field-value expressions to specify the events you want to retrieve from your indexes. 
The search command is implied at the beginning of any search, so you don't need to explicitly include it when defining your search criteria.

## Syntax

The required syntax is in **bold**.

search **\<search-expression\>**


### Required Arguments

#### \<search-expression\>

**Syntax:** `<literal-expression> | <comparison-expression>`\
**Description:** \
This argument can be a word, phrase, field-value comparison, or combination of search expressions. \
You can use logical constructs like `AND`, `OR`, or `NOT` to combine search expressions. Parentheses can be used to separate different search expressions.

#### \<literal-expression\>

**Syntax:** `<literal-value> | "<literal-phrase>"`\
**Description:** \
You can use numbers, strings, and phrases to search in the data.\
If the phrase contains characters like spaces or periods (`.`), you must enclose the phrase in double quotes.


#### \<comparison-expression\>

**Syntax:** `<field><comparison-operator><value>`\
**Description:** \
`<comparison-operator>` can be `=` or `!=` for string comparisons. For numerical values, valid comparison operators include `=`, `!=`, `<`, `<=`, `>`, `>=`.\
`<field>` refers to the field name, and `<value>` is the literal value, which can be a number or a string.

## Usage
Search command is implied by default during the beginning of every search

`NOT` and `!=` are different in terms of how they are used. `NOT` operator would return the record for which the value is not equal to what is specified or the value is not present (marked as `NULL`). Whereas in the case of `!=`, if the field has `NULL` value the result would not be retrieved.

You can search for terms with a similar pattern of characters by utilizing the wildcard character (`*`). This character is applicable in both textual searches and when seeking specific field values.


## Example

Some examples of implied search are:
- `Boston`: fetches all the records containing the word "Boston" in any field.
- `http_status=200`: fetches all the records where the `http_status` field has the value `200`.
- `Boston AND http_status=200`: fetches all the records where the `http_status` field has the value `200` and the word Boston is present in any field.
- `city=San*`: fetches all records where the city field's value starts with `San`.

The following example can be used to identify the root cause of high latency issues by checking the average latency across combinations of countries, URLs, and user agents, and displaying the results in decreasing order of average latencies.
```
search latency>1000 
| stats count, avg(latency) as avg_latency by country, url, user_agent 
| sort -avg_latency
```

The following example can be used to gather the number of males and females working as Engineers in the USA.
```
search country="*America*" AND job_title="Engineer" 
| stats count as total by gender
```

## Use-Case Example

**Identifying Potential Brute Force Attacks**

**Problem:** Detecting potential brute force attacks is crucial for maintaining network security. These attacks often involve repeated attempts to connect to critical services like SSH (port 22) or RDP (port 3389) from the same source IP, aiming to guess passwords and gain unauthorized access.

**Solution:** To identify potential brute force attacks, a search command can be utilized to filter firewall logs for blocked connection attempts to SSH and RDP ports, count the attempts by source and destination IP, and highlight cases with a high number of attempts.

```
search (dest_port=22 OR dest_port=3389) AND sourcetype=firewall AND action=blocked
| stats count as conn_count by src_ip, dest_ip
| where conn_count > 100
| sort -conn_count
```


**Explanation:**
1. The search filters for logs where the destination port is either 22 (SSH) or 3389 (RDP), the source type is `firewall`, and the action is `blocked`, indicating unsuccessful connection attempts.
2. It then aggregates these logs, counting the number of connection attempts (`conn_count`) grouped by source IP (`src_ip`) and destination IP (`dest_ip`).
3. The `where` clause filters these counts to only include cases where the number of attempts from the same source IP exceeds 100, a threshold indicative of a brute force attack pattern.
4. Finally, the results are sorted in descending order by `conn_count` to prioritize the most aggressive attack attempts.

This approach helps in quickly identifying and addressing potential brute force attacks, enhancing network security.
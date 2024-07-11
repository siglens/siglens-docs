# fields command

## Description

This command allows you to filter the fields that you want to display in the search results.
By default, Siglens adds timestamp and _index fields to the search results.

## Syntax
The required syntax is in **bold**.

**fields**\
[+|-] **\<field-list\>**


### Required Arguments

#### \<field-list\>

**Syntax:** `<field1>, <field2>, ...`\
**Description:** \
This argument contains comma delimited fields that you can keep or remove from the search result.\
One can also use wildcard like `*` to specify fields with similar names. \
For e.x. if you want all the fields starting with letter "a" you can specify `a*`.



### Optional Arguments

#### +|-

**Syntax:** `+|-`\
**Description:** \
The plus (`+`) symbol indicates that only the fields listed in `<field-list>` should be displayed in the search results.\
The minus (`-`) symbol indicates that the fields listed in `<field-list>` should not be displayed in the search results.\
**Default value:** `+`





## Example

The following example can be used to display a user's basic information from the search results. You can filter the `first_name`, `last_name`, `user_email`, and `user_phone`.
```
... | fields first_name, last_name, user_email, user_phone
```

The following example can be used to display only fields that start with "http" to narrow down the results to web-related information, providing further insights.
```
... | fields http*
```

## Use-Case Example

**Protecting Sensitive Information in Search Results**

**Problem:** When analyzing data, it's crucial to safeguard sensitive information such as names, social security numbers (SSNs), addresses, and user identifiers. Displaying this information in search results can lead to privacy violations and potential security risks.

**Solution:** To prevent the exposure of sensitive information in search results, a command can be utilized to selectively remove fields that contain potentially identifiable and sensitive data.

```
... | fields - *name,ssn,address,user*
```

**Explanation:**
1. The `fields -` command is used to exclude specific fields from the search results. 
    - `*name` matches and excludes any field that ends with "name", such as "firstname", "lastname", or "username", because the asterisk (`*`) wildcard character matches any sequence of characters before "name".
    - `ssn` specifically matches and excludes the field named "ssn", which typically represents a social security number, without using a wildcard, indicating an exact field name match.
    - `address` specifically matches and excludes the field named "address", similar to "ssn", indicating an exact match and not using a wildcard for any variations.
    - `user*` matches and excludes any field that starts with "user", such as "userid", "username", or "useremail", because the asterisk (`*`) wildcard character matches any sequence of characters after "user".

By using this combination of specific field names and wildcard patterns, the command effectively removes fields that could contain sensitive information, enhancing privacy and security in the data analysis process.

# fields command

## Description

This command allows you to filter the fields that you want to display in the search result.
By default Siglens adds timestamp and _index fields in the search result.

## Syntax
Required arguments are in **bold**.

**fields** [+|-] **\<field-list\>**


### Required Arguments

#### \<field-list\>

**Syntax:** `<field1>, <field2>, ...`\
**Description:** \
This argument contains comma delimited fields that you can keep or remove from the search result.\
One can also use wildcard like `*` to specify fields with similar names. \
For e.x. if you want all the fields starting with letter "a" you can specify `a*`.



### Optional Arguments

#### \<field-list\>

**Syntax:** `+|-`\
**Description:** \
The plus (`+`) symbol is used to indicate that fields present in the `<field-list>` should only be displayed in the search result.\
The minus (`-`) symbol is used to indicate that fields present in the `<field-list>` should not be displayed in the search result.\
**Default value:** `+`





## Example

The following example can be used if you want to display user's basic information from the search results. You can filter the `first_name`, `last_name`, `user_email` and `user_phone`.
```
... | fields first_name, last_name, user_email, user_phone
```

The following example can be used to only display fields which starts with http to narrow down the result to web-related information to gain further insights.
```
... | fields http*
```

The following example can be used to remove fields that can reveal potentially identifiable and sensitive information from the search result.
```
... | fields - *name,ssn,address,user*
```



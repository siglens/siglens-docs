# tail command

## Description

This command allows you to fetch the last N records from the search results. 
The records are returned in reverse order meaning that the last record of the search result would be on top.
By default if N is not specified, it would be considered as 10.

## Syntax
Required arguments are in **bold**.

**tail** [\<N\>]


### Required Arguments

None.


### Optional Arguments

#### \<field-list\>

**Syntax:** `<N>`\
**Description:** \
`<N>` refers to the number of records to be retrieved from the end of the result set.\
**Default:** 10


## Example

The following example can be used to display the last 50 records of the result set.
```
... | tail 50
```

The following example can be used to fetch the top 10 performing sales representative.
```
index=sales_data 
    | stats sum(sale_amount) as total_sales by sales_rep 
    | sort total_sales 
    | tail
```
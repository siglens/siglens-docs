# tail command

## Description

This command allows you to fetch the last N records from the search results.\
The records are returned in reverse order, meaning that the last record of the search result will be on top.\
By default, if N is not specified, it will be considered as 10.

## Syntax
The required syntax is in **bold**.

**tail** [\<N\>]


### Required Arguments

None.


### Optional Arguments

#### \<N\>

**Syntax:** `<N>`\
**Description:** \
`<N>` refers to the number of records to be retrieved from the end of the result set.\
**Default:** 10


## Example

The following example can be used to display the last 50 records of the result set.
```
... | tail 50
```

## Use-Case Example

**Identifying Top Performing Sales Representatives**

**Problem:** In a competitive sales environment, identifying the top-performing sales representatives is crucial for recognizing achievements and understanding the drivers of sales success. This analysis can help in strategic planning, training, and motivating the sales team.

**Solution:** To identify the top 10 performing sales representatives based on their total sales amount, a search command can be utilized. This command aggregates sales data by representative, sorts them by total sales, and then retrieves the bottom 10 records having the highest total sales, displaying them in reverse to prioritize top-performing representatives.

```
index=sales_data 
    | stats sum(sale_amount) as total_sales by sales_rep 
    | sort total_sales 
    | tail
```

**Explanation:**
1. `stats sum(sale_amount) as total_sales by sales_rep` aggregates the data by sales representative (`sales_rep`), calculating the total sales amount (`total_sales`) for each representative.
2. `sort total_sales` sorts the aggregated results in ascending order based on the total sales amount (`total_sales`).
3. Finally, the `tail` command is correctly used to fetch the bottom 10 records with the highest sales amounts, effectively identifying the top-performing sales representatives based on total sales.

This approach provides a clear and efficient method for recognizing and analyzing the contributions of the highest-performing sales team members.
# where command

## Description

The `where` command filters search results based on predicate expression. This expression yield a `true` or `false` outcome upon evaluation. Only the results for which the predicate expression evaluates to `true` are retained and the rest are discarded from the search result.

## Syntax

The required syntax is in **bold**.

**where \<predicate-expression\>**


### Required Arguments

#### \<predicate-expression\>

**Syntax:** `<predicate-expression>`\
**Description:** \
`<predicate-expression>` is any expression that can evaluate to a boolean value i.e. `true` or `false`.

Syntax of the `<predicate-expression>` is checked first and only if it is correct the where command is applied on the search result.
You can club different sub expression that are also boolean expression to create a complex `<predicate-expression>` using `AND`, `OR` and `NOT` clauses.
<!-- TODO link to the eval function page -->
Most of the eval functions can be used with where command as a part of predicate expression.


## Examples

The following example filters network traffic to show connections with more than 1 million bytes received, excluding a specific source IP.
```
... | where bytes_in > 1000000 AND source_ip!="10.0.0.1"
```

The following example shows how to filter error messages that are longer than 100 characters. This could be useful in filtering out the important errors. Notice how len function is used to create a predicate expression.
```
... | where len(error_message) > 100
```

The following example shows how to filter expensive products (prices greater than $1000) which can further be analyzed to find total revenue, minimum, maximum and average prices of expensive products across each product category.

```
... | where price > 1000 
    | stats sum(price) as total_revenue, min(price), max(price), avg(price) by product_category
```

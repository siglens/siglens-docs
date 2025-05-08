# where

## Description

The `where` command filters search results based on a predicate expression. This expression yields a `true` or `false` outcome upon evaluation. Only the results for which the predicate expression evaluates to `true` are retained, and the rest are discarded from the search results.

## Syntax

The required syntax is in **bold**.

**where \<predicate-expression\>**


### Required Arguments

#### \<predicate-expression\>

**Syntax:** `<predicate-expression>`\
**Description:** \
`<predicate-expression>` is a Boolean expression that evaluates to either `true` or `false`.\
You can combine different sub-expressions, which are also Boolean expressions, to create a complex `<predicate-expression>` using the `AND`, `OR`, and `NOT` clauses.
<!-- TODO link to the eval function page -->
Most `eval` functions can be utilized within the `where` command as part of a `<predicate-expression>`.

## Examples

The following example filters network traffic to show connections with more than 1 million bytes received, excluding a specific source IP.
```
... | where bytes_received > 1000000 AND source_ip!="10.0.0.1"
```

The following example shows how to filter error messages that are longer than 100 characters. This could be useful in filtering out the important errors. Notice how len function is used to create a predicate expression.
```
... | where len(error_message) > 100
```

## Use-Case Example

**Analyzing Revenue from Expensive Products**

**Problem:** The goal is to identify and analyze expensive products (those with prices greater than $1000) to determine the total revenue, as well as the minimum, maximum, and average prices of these products across each product category.

**Solution:** The solution involves using a combination of the `where` and `stats` commands in a Splunk search to filter and analyze the data.

The following example shows how to filter expensive products (prices greater than $1000) which can further be analyzed to find total revenue, minimum, maximum and average prices of expensive products across each product category.

```
... | where price > 1000 
    | stats sum(price) as total_revenue, min(price), max(price), avg(price) by product_category
```

**Explanation:**
1. The `where` command filters out products with prices greater than $1000. This step narrows down the dataset to only include the products of interest for this analysis.
2. The `stats` command is then used to calculate the total revenue (`sum(price) as total_revenue`), as well as the minimum (`min(price)`), maximum (`max(price)`), and average (`avg(price)`) prices of these expensive products. These calculations are performed for each product category (`by product_category`), allowing for a detailed analysis of revenue and price metrics across different categories.
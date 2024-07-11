# head command

## Description

This command retrieves the initial N results as they appear in the search sequence. Two forms of constraints can be utilized: a fixed count of results or a conditional expression that continues to return results until the specified condition is no longer met.

## Syntax
The required syntax is in **bold**.

**head**\
[\<N\> | (\<eval-expression\>)]\
[limit=\<int\>]\
[null=\<bool\>]\
[keeplast=\<bool\>]


### Required Arguments

None.


### Optional Arguments

#### \<N\>
**Syntax:** `<int>`\
**Description:**\
The number of results to return.\
**Default:** 10



#### limit
**Syntax:** `limit=<int>`\
**Description:**\
An alternative method to specify the number of results to be returned.\
**Default:** 10



#### \<eval-expression\>
**Syntax:** `<eval-compare-exp> | <eval-bool-exp>`\
**Description:** \
`<eval-expression>` is a boolean expression that evaluates to `true` or `false`.\
The search continues to yield results until the given expression is no longer `true`.


#### keeplast
**Syntax:** `keeplast=<bool>`\
**Description:**\
This argument is a boolean value used to specify whether to keep the first event that evaluated to `false` or `NULL`.\
This argument can only be used with an `<eval-expression>`.\
If `keeplast` is `true`, the first event that did not evaluate to `true` will be present in the result set, and the search will stop after this event. If `keeplast` is `false`, this event will not be present in the final result set, and the search will stop.\
**Default:** `false`

#### null
**Syntax:** `null=<bool>`\
**Description:**\
This argument is a boolean value used to specify how the events that evaluated to `NULL` should be controlled.\
This argument can only be used with an `<eval-expression>`.\
If a field or a value in the expression is `NULL`, the result of that expression is `NULL`.\
When `null` is set to `true`, events causing the `<eval-expression>` to return `NULL` are still included in the output, and the command proceeds to evaluate subsequent events. Conversely, when `null` is set to `false`, any `<eval-expression>` resulting in `NULL` is considered as having returned `false`, halting the head's event processing and discarding this output from the result. However, to keep this last output, one can specify `keeplast` as `true`.\
**Default:** `false`


## Example

The following example demonstrates how to retrieve the 5 most recent events.
```
... | head 5
```
The same can be accomplished using the `limit` argument.
```
... | head limit=5
```

This example demonstrates how to retrieve the most recent web requests that resulted in either a bad request or a server error. It includes requests with a response status that may not have been logged (marked as `NULL`) and retains the last web request that did not result in either of these errors.
```
... | head http_status = 400 OR http_status = 500 null=true keeplast=true
```

## Use-Case Example

**Identifying URLs with High Error Rates**

**Problem:** The goal is to identify the top 10 URLs with the highest rates of bad requests or server errors. This analysis is crucial for pinpointing issues that could be affecting user experience or indicating server-side problems.

**Solution:** A search command is used to fetch the top 10 URLs that have an error rate of at least 50%. If fewer than 10 URLs meet this criterion, the command includes the URL with the highest error rate below 50%.

```
... | stats count(eval(http_status>=400)) as error_count, count as total_count by url 
    | eval error_rate = error_count / total_count 
    | sort -error_rate
    | head limit=10 error_rate >= 0.5 keeplast=true
```

**Explanation:**
1. `stats count(eval(http_status>=400)) as error_count, count as total_count by url` performs two main functions:
   - `count(eval(http_status>=400)) as error_count`: This part of the command filters and counts the number of requests for each URL where the HTTP status code is 400 or higher, indicating a bad request or server error. The result is stored in a new field named `error_count`.
   - `count as total_count`: This counts the total number of requests made to each URL, regardless of the HTTP status code, and stores the result in a field named `total_count`. This allows for the calculation of the error rate by comparing the number of errors to the total number of requests for each URL.
2. `eval error_rate = error_count / total_count` computes the error rate for each URL.
3. `sort -error_rate` sorts the URLs in descending order based on their error rates.
4. `head limit=10 error_rate >= 0.5 keeplast=true` selects the top 10 URLs with an error rate of at least 50%. If fewer than 10 URLs meet this criterion, it includes the URL with the highest error rate below 50%, ensuring that the most critical cases are always highlighted.




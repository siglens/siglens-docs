# head command

## Description

This command retrieves the initial N results as they appear in the search sequence. For real-time searches, it corresponds to the initial N events captured and for historical searches, this equates to the most recent N occurrences.

Two forms of constraints can be utilized: a fixed count of results, or a conditional expression that continues to return results until the specified condition is no longer met.

## Syntax
Required arguments are in bold.

**head**
[\<N\> | (\<eval-expression\>)]
[limit=\<int\>]
[null=\<bool\>]
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
**Default:** `10`



#### eval-expression
**Syntax:** `<eval-compare-exp> | <eval-bool-exp>`\
**Description:** \
`<eval-expression>` argument is a boolean expression. 
The search continues to yield results until the given expression is no longer `true`.



#### keeplast
**Syntax:** `keeplast=<bool>`\
**Description:**\
This argument is a boolean value used to specify whether to keep the first event that evaluated to `false` or `NULL`.\
This argument can only be used with an `<eval-expression>`.\
If keeplast is `true`, the first event which did not evaluate to `true` would be present in the result set and the search would be stopped after this.\
If keeplast is `false`, this event would not be present in the final result set and the search would be stopped.\
**Default:** `false`

#### null
**Syntax:** `null=<bool>`\
**Description:**\
This argument is a boolean value used to specify how should the events that evaluated to `NULL` be controlled.\
This argument can only be used with an `<eval-expression>`.\
If a field or a value in the expression is `NULL`, the result of that expression is `NULL`.\
When `null` is set to `true`, events causing the `<eval-expression>` to return NULL are still included in the output, and the command proceeds to evaluate subsequent events.\
Conversely, with `null` set to `false`, any `<eval-expression>` resulting in `NULL` is considered as having returned `false`, halting the head's event processing and discarding this output from the result. Although, to keep this last output, one can specify `keeplast` as `true`.\
**Default:** `false`


## Example

The following example can be used to fetch the 5 most recent events.
```
... | head 5
```
The same can be accomplished using the `limit` argument.
```
... | head limit=5
```

The following example retrieves the most recent web requests that resulted in either a bad request or server error, including those with a response status that may not have been logged (marked as NULL) and retain the last web request that did not have either of these errors.
```
... | head http_status = 400 OR http_status = 500 null=true keeplast=true
```

The following example can be used to fetch the top 10 URLs with the highest bad request or server error rates, where the error count is at least 50%. If fewer than 10 URLs meet this criterion, include the URL with the highest error rate below 50%.
```
... | stats count(eval(http_status>=400)) as error_count, count as total_count by url 
    | eval error_rate = error_count / total_count 
    | sort -error_rate
    | head limit=10 error_rate >= 0.5 keeplast=true
```



# Multivalue functions

_This list includes functions that manipulates text data._


## case(\<condition\>, \<value\>, ...)
This function takes in pairs of condition and value and returns value corresponding to the first condition that evaluated to `true`.

#### Usage
- `<condition>` arguments are Boolean expressions that can evaluate to either `true` or `false`. 
- `<value>` argument can either be a string or a numeric literal. 
- If all the conditions are `false`, the default value returned is `NULL`.
- One can use this function with an eval command.

#### Example
The following command returns the performance by checking the sales_amount with different cases and returns the performance value corresponding to the first condition evaluated to `true`. 
For example, if sales_amount for a record is `11000`, the first condition will evaluate to true so the result would be `"Excellent"`. 
If the sales_amount is `3000`, then first two conditions will evaluate to false and third condition will evaluate to `true`. So, the result would be `"Average"`.
```
... | eval sales_performance=case(sales_amount >= 10000, "Excellent", 
                                    sales_amount >= 5000, "Good", 
                                    sales_amount >= 1000, "Average", 
                                    sales_amount > 0, "Below Average", 
                                    sales_amount == 0, "No Sale")
```


## validate(\<condition\>, \<value\>, ...)
This function is opposite of case function. It takes in pairs of condition and value and returns value corresponding to the first condition that evaluated to `false`. 

#### Usage
- `<condition>` arguments are Boolean expressions that can evaluate to either `true` or `false`. 
- `<value>` argument can either be a string or a numeric literal. 
- If all conditions are `true`, the default value returned is `NULL`.
- One can use this function with an eval command.

#### Example
The following command checks the field age and based on the condition returns appropriates values.

```
... | eval is_valid=validate(isint(age), "Age is not an integer", 
                               age < 18 OR age > 120, "Age is not valid")
```



## coalesce(\<values\>)
This function takes in one or more values and returning the first value passed that is not `NULL`.

#### Usage
- `<value>` argument can be a field name, string or numeric literal or an expression.
- If all the values are `NULL`, it returns `NULL`.
- One can use this function with an eval command.

#### Example
The following command checks for the user identity from fields username, login_id or email and returns the first value that is not `NULL`. Specifically, it checks in order username, login_id, email. If all the three fields have `NULL` values, it returns `Unknown`.

```
... | eval user=coalesce(username, login_id, email, "Unknown")
```




## searchmatch(\<search_str\>)
This function returns `true` if the record matches for the search string `<search_str>`. Else it returns `false`.

#### Usage
- `<search_str>` argument is a string containing set of comparisons between field and value as key value pairs like `"field1=value1 field2=value2"`.
- searchmatch will search for value in the corresponding field. If all the searches for field value pairs are successful, the functions returns `true`, else returns `false`.
- Values presented in the search string can have wildcard characters `*` or `?`. 
- `<search_str>` could also have a single string literal. In this case, this string literal would be searched in all the available fields and if anyone matches the searchmatch returns `true`, else returns `false`.
- One can use this function with an eval command.

#### Example
The following command searches for string error in the error_msg field and also searches for http server error codes that are http_status field. If both the searches are successful the function returns `true`, else will return `false`. Thus, when used in combination with `if` command, the field error_type gets the value `"Server error"` if the searchmatch is true else would be `"Unknown"`
```
... | eval error_type=if(searchmatch("error_msg=*error* http_status=5??"), 
                        "Server Error", 
                        "Unknown")
```




## if(\<predicate\>, \<true_value\>, \<false_value\>)
This function evaluates the `<predicate>` expression and if the expression returns `true`, the `<true_value>` is returned, else `<false_value>` is returned.

#### Usage
- `<predicate>` argument is a boolean expression that evaluates to `true` or `false`.
- `<true_value>` and `<false_value>` can be a field name, string or numeric literal or an expression.
- One can use this function with an eval command.

#### Example
The following command evaluates the predicate checking if the txn_amount is greater than `10000` and country is not `USA` then high_risk is set to `Yes` else set to `No`.

```
... | eval high_risk=if(txn_amount > 10000 AND country != "USA", "Yes", "No")
```


## in(\<value\>, \<list\>)
This function checks if the `<value>` is present in the `<list>` and returns `true` if present, else returns `false`.

#### Usage
- `<value>` argument can be a field name, string or numeric literal or an expression.
- `<list>` arguemnt is a list of values that can be a field name, string or numeric literal or an expression.
- One can use this function with an eval command.

#### Example
The following command checks for valid status in the status field and returns `true` if value present in the status field is in the given list of values `(200, 201, 202)`. Else returns `false`. Based on these boolean values if condition evaluates and `TRUE` or `FALSE` is returned.
```
... | eval is_valid=if(in(status, 200, 201, 202), "TRUE", "FALSE")

```



## like(\<str\>, \<pattern\>)
This function matches `<str>` with `<pattern>` and returns `true` if match is successful, else returns `false`.

#### Usage
- `<str>` argument can be a field name or a string literal.
- `<pattern>` argument is a string that can either be a normal string literal or a string literal with wildcard.
- wildcard character `%` is used to match multiple characters.
- wildcard character `_` is used to match a single character.
- One can use this function with an eval command.

#### Example
The following command checks if the value in the first_name field starts with `A`. If so, it returns `true`. Else, returns `false`. Based on this evaluation we get value `yes` or `no` from the `if` function.
```
... | eval start_with_a=if(like(first_name, "A%"), "yes", "no")
```



## match(\<str\>, \<regex\>)
This function matches `<str>` with regular expression pattern `<regex>` and returns `true` if match is successful, else returns `false`.

#### Usage
- `<str>` argument can be a field name or a string literal.
- `<regex>` argument is a regular expression pattern that is a string literal.
- One can use this function with an eval command.

#### Example
The following command matches the value in email field to find out if it is a google id or not. If the value in the email field matches the given regex, the match function returns `true`, else returns `false`. Based on this evaluation we get value `yes` or `no` from the `if` function.
```
... | eval is_google_id=if(match(email, "^([^@]+)@google.com"), "yes", "no")
```




## cidrmatch(\<cidr\>, \<ip\>)
This function matches `<ip>` with the `<cidr>` notation and returns `true` if match is successful, else returns `false`.

#### Usage
- `<ip>` argument can be a field name or a string literal representing ip address.
- `<cidr>` argument can be a field name or a string literal representing CIDR notation.

#### Example
The following command matches the ip address in the field client_ip with the CIDR `10.0.0.0/24` to check whether the client_ip is a subnet or not. If the match is successful, the function returns `true`, else `false`. Based on this evaluation we get value `yes` or `no` from the `if` function.
```
... | eval is_subnet=if(cidrmatch("10.0.0.0/24", client_ip), "yes", "no")
```


# Comparison and Conditional functions

_This list includes functions that can be used to return values based on conditions or compare different values._


## case(\<condition1\>, \<value1\>, \<condition2\>, \<value2\> ...)
This function takes in pairs of conditions and values and returns the value corresponding to the first condition that evaluated to `true`.

### Usage
- `<condition>` is a Boolean expression that evaluates to `true` or `false`. 
- `<value>` can be a string or a numeric literal. 
- If all the conditions are `false`, the default value returned is `NULL`.
- You can use this function with eval and where commands.

### Use-Case Example

**Categorizing Sales Performance**

**Problem:** In sales data analysis, it's crucial to categorize sales amounts into performance ratings to easily identify and differentiate between high and low-performing sales. This categorization helps in understanding sales trends and making informed decisions.

**Solution:** To categorize sales amounts into distinct performance ratings, the `case` function can be used within an `eval` command. This approach allows for evaluating `sales_amount` against a series of conditions, assigning a corresponding performance rating based on the first condition met.

```
... | eval sales_rating=case(sales_amount >= 10000, "Excellent", 
                                    sales_amount >= 5000, "Good", 
                                    sales_amount >= 1000, "Average", 
                                    sales_amount > 0, "Below Average", 
                                    sales_amount = 0, "No Sale")
```

**Explanation:**
1. The `eval` command used with `case` function is used to create a new field `sales_rating` based on the `sales_amount`.
2. It evaluates `sales_amount` against a series of conditions in sequence:
  - If `sales_amount` is greater than or equal to 10,000, it assigns "Excellent".
  - If `sales_amount` is greater than or equal to 5,000 but less than 10,000, it assigns "Good".
  - If `sales_amount` is greater than or equal to 1,000 but less than 5,000, it assigns "Average".
  - If `sales_amount` is greater than 0 but less than 1,000, it assigns "Below Average".
  - If `sales_amount` is exactly 0, it assigns "No Sale".
3. This categorization allows for easy identification and differentiation of sales performance, aiding in the analysis and decision-making process.


## validate(\<condition1\>, \<value1\>, \<condition2\>, \<value2\> ...)
This function is opposite of case function. It takes in pairs of conditions and values and returns the value corresponding to the first condition that evaluated to `false`. 

### Usage
- `<condition>` is a Boolean expression that evaluates to `true` or `false`. 
- `<value>` can either be a string or a numeric literal. 
- If all conditions are `true`, the default value returned is `NULL`.
- You can use this function with eval and where commands.

### Use-Case Example

**Identifying Network Connection Issues**

**Problem:** In network monitoring and analysis, identifying potential issues with network connections is crucial for maintaining system integrity and performance. Issues such as loopback connections, use of non-standard protocols, and invalid port numbers can indicate misconfigurations or malicious activities.

**Solution:** To efficiently identify potential network connection issues, a command can be utilized to analyze network traffic logs. This command employs a custom `validate` function to check for common issues based on `src_ip`, `protocol`, and `port` fields.

```
... | eval connection_issues = validate(
    src_ip != dest_ip, "Possible loopback connection",
    match(protocol, "^(TCP|UDP|ICMP)$"), "Non-standard protocol",
    port >= 1 AND port <= 65535, "Invalid port number")
```

**Explanation:**
1. The `validate` function is used to apply multiple conditions to the network traffic data:
  - **Loopback Connection Check**: If `src_ip` equals `dest_ip`, indicating a loopback connection, the condition is false, and the message `"Possible loopback connection"` is returned.
  - **Protocol Check**: If the `protocol` does not match TCP, UDP, or ICMP, indicating the use of a non-standard protocol, the condition is false, and the message `"Non-standard protocol"` is returned.
  - **Port Number Check**: If the `port` is not within the valid range of 1 to 65535, indicating an invalid port number, the condition is false, and the message `"Invalid port number"` is returned.
2. If all conditions are true (i.e., no issues found), the `connection_issues` field will be `NULL`, indicating the absence of the identified potential issues.

This method allows for the quick identification of common network connection issues, aiding in network analysis and security monitoring.


## coalesce(\<values\>)
This function takes in one or more values and returns the first value that is not `NULL`.

### Usage
- `<value>` can be a field name, string or numeric literal or an expression.
- If all the values are `NULL`, it returns `NULL`.
- You can use this function with eval and where commands.

### Use-Case Example

**Identifying Users in Data Records**

**Problem:** In datasets containing user information, it's common to encounter records with missing data. Specifically, identifying users can be challenging when their `username`, `login_id`, or `email` fields are inconsistently filled, leading to difficulties in user data analysis and management.

**Solution:** To address this issue, the `coalesce` function can be employed within an `eval` command. This function systematically checks each specified field (`username`, `login_id`, `email`) for a non-`NULL` value, returning the first valid identifier it finds. If all specified fields are `NULL`, it defaults to a predefined value, such as "Unknown".

This command determines the user's identity by checking the fields `username`, `login_id`, or `email` in that order, returning the first non-`NULL` value found. If all fields are `NULL`, it defaults to `Unknown`.
```
... | eval user=coalesce(username, login_id, email, "Unknown")
```
**Explanation:**
1. The `coalesce` function is employed within an `eval` command to create a new field named `user`, which serves as a identifier across data records.
2. It sequentially checks the `username`, `login_id`, and `email` fields for a non-`NULL` value:
  - First, it checks the `username` field; if it is not `NULL`, this value is used.
  - If `username` is `NULL`, it proceeds to check the `login_id` field.
  - If `login_id` is also `NULL`, it checks the `email` field.
  - If all these fields are `NULL`, the function defaults to assigning "Unknown" to the `user` field.
3. This systematic approach ensures every record is assigned an identifier, enhancing data completeness and reliability.
4. By prioritizing the `username`, followed by `login_id`, and finally `email`, the method utilizes the most relevant available information for user identification.

This technique is particularly beneficial for data analysis and management, facilitating the identification process of users across datasets.


## searchmatch(\<search_str\>)
This function returns `true` if the record matches for the search string `<search_str>`; otherwise it returns `false`.

### Usage
- `<search_str>` is a string containing sets of field value pairs like `"field1=value1 field2=value2"`.
- This function will search for value in the corresponding field. If all the searches for field value pairs are successful, the functions returns `true`; otherwise it returns `false`.
- Values presented in the search string can have wildcard characters `*` or `?`. 
- Wildcard character `*` is used to match multiple characters.
- Wildcard character `?` is used to match a single character.
- `<search_str>` could also have a single string literal. In this case, this string literal would be searched in all the available fields and if any one matches the `<search_str>`, it returns `true`; otherwise it returns `false`.
- You can use this function with eval and where commands.

### Use-Case Example

**Finding Important Server Related Issue in Log Data**

**Problem:** In system monitoring and log analysis, quickly identifying and categorizing errors is crucial for maintaining system health and performance. Specifically, distinguishing server errors from other types of errors based on log data can be challenging due to the volume and variety of log messages.

**Solution:** To address this challenge, a specific command can be used to analyze log data, checking for the presence of the string "error" in the `error_msg` field and for HTTP error codes in the 500 range in the `http_status` field. This command employs the `eval` function combined with the `if` and `searchmatch` functions to categorize errors efficiently.


The following command checks for the presence of the string "error" in the `error_msg` field and for HTTP error codes in the 500 range in the `http_status` field. If both conditions are met, it returns `true`; otherwise, it returns `false`. When combined with the `if` command, this logic assigns `"Server error"` to the `error_type` field if the conditions are true, and `"Unknown"` otherwise.
```
... | eval error_type=if(searchmatch("error_msg=*error* http_status=5??"), 
                        "Server Error", 
                        "Unknown")
```

**Explanation:**
1. The `eval` function creates a new field named `error_type`, which is used to categorize errors.
2. The `if` function checks two conditions using the `searchmatch` function:
  - The presence of the substring "error" within the `error_msg` field.
  - HTTP status codes starting with "5", indicating server errors, within the `http_status` field.
3. If both conditions are met, the `if` function assigns `"Server Error"` to the `error_type` field, indicating a server-related issue.
4. If either condition is not met, it defaults to assigning `"Unknown"`, covering all other cases or when error details are insufficient.

This method allows for the precise identification and categorization of errors, facilitating faster response and resolution of server-related issues, thereby improving system reliability and performance.


## if(\<predicate\>, \<true_value\>, \<false_value\>)
This function returns `<true_value>` if `<predicate>` evaluates to `true`, otherwise it returns `<false_value>`.

### Usage
- `<predicate>` is a Boolean expression that evaluates to `true` or `false`.
- `<true_value>` and `<false_value>` can be a field name, string or numeric literal or an expression.
- You can use this function with eval and where commands.

### Use-Case Example

**Identifying High-Risk Transactions**

**Problem:** In financial data analysis, identifying transactions that may pose a high risk is crucial for fraud detection and risk management. Transactions that exceed a certain amount and originate from countries other than the USA are often considered higher risk due to various regulatory and risk factors.

**Solution:** To efficiently identify high-risk transactions, a command can be used to analyze transaction data. This command employs the `eval` function along with a conditional `if` statement to categorize transactions based on the `transaction_amount` and `country` fields.

```
... | eval high_risk=if(transaction_amount > 10000 AND country != "USA", "Yes", "No")
```
**Explanation:**
1. The `eval` function is used to create a new field named `high_risk`, which indicates whether a transaction is considered high risk.
2. The `if` statement checks two conditions:
  - Whether the `transaction_amount` exceeds `10000`.
  - Whether the transaction did not originate from the `USA` (`country != "USA"`).
3. If both conditions are met, the transaction is categorized as `"Yes"` for high risk.
4. If either condition is not met, the transaction is categorized as `"No"` for high risk.

This approach allows for the targeted identification of transactions that may require further investigation or monitoring, enhancing fraud detection and risk management efforts.


## in(\<value\>, \<list\>)
This function returns whether `<value>` is present in `<list>`. If present it returns `true`; otherwise it returns `false`.

### Usage
- `<value>` can be a field name, string or numeric literal or an expression.
- `<list>` is a list of values that can be a field name, string or numeric literal or an expression.
- You can use this function with eval and where commands.

### Use-Case Example

**Validating HTTP Status Codes**

**Problem:** In web service monitoring and log analysis, quickly identifying valid HTTP responses is essential for ensuring service availability and performance. Validating that the status codes of responses fall within a specific range of successful codes (200, 201, or 202) can be challenging due to the variety of possible HTTP status codes.

**Solution:** To efficiently validate HTTP status codes, a command can be utilized to analyze log data. This command employs the `eval` function combined with the `if` and `in` functions to check if the `status` field contains a valid status code (200, 201, or 202).

```
... | eval is_valid=if(in(status, 200, 201, 202), "TRUE", "FALSE")
```

**Explanation:**
1. The `eval` function is used to create a new field named `is_valid`, which indicates whether a status code is considered valid.
2. The `if` function checks if the `status` field's value is within the list of valid status codes (200, 201, or 202) using the `in` function.
3. If the status code is one of the valid codes, the `if` function assigns `"TRUE"` to the `is_valid` field, indicating a successful HTTP response.
4. If the status code does not match any of the valid codes, it assigns `"FALSE"` to the `is_valid` field, indicating an unsuccessful or non-standard HTTP response.

This method allows for the quick identification of valid HTTP responses, facilitating effective monitoring and analysis of web service health and performance.


## like(\<str\>, \<pattern\>)
This function checks if `<str>` matches `<pattern>` and returns `true` for a successful match; otherwise it returns `false`.

### Usage
- `<str>` can be a field name or a string literal.
- `<pattern>` is a string that can either be a normal string literal or a string literal with wildcard.
- Wildcard character `%` is used to match multiple characters.
- Wildcard character `_` is used to match a single character.
- You can use this function with eval and where commands.

### Example
The following command checks if the value in the field `first_name` begins with `A`. If so, it returns `true`; otherwise it returns `false`. Based on this evaluation we get value `yes` or `no` from the `if` function.
```
... | eval starts_with_a=if(like(first_name, "A%"), "yes", "no")
```

### Use-Case Example

**Analyzing Devices Used to Access Service**

**Problem:** Understanding the types of devices used to access a service is crucial for optimizing user experience and tailoring service offerings. Differentiating between device types (e.g., iPhone, Android, Windows, Mac) based on user agent strings in access logs can be challenging due to the diversity of devices and the complexity of user agent strings.

**Solution:** To effectively analyze types of devices used to access service, a command can be utilized to categorize access logs by device type based on the `user_agent` field. This command employs the `eval` function combined with the `case` function to match patterns in the `user_agent` strings and categorize them accordingly.

```
... | eval device_type=case( 
        like(lower(user_agent), "%iphone%"), "iPhone", 
        like(lower(user_agent), "%android%"), "Android", 
        like(lower(user_agent), "%windows%"), "Windows", 
        like(lower(user_agent), "%macintosh%"), "Mac", 
        like(user_agent, "%"), "Other") 
    | stats count by device_type
```

**Explanation:**
1. The `eval` function creates a new field named `device_type`, which indicates the type of device used to access the service.
2. The `case` function evaluates multiple conditions in sequence, checking for the presence of specific substrings within the `user_agent` string (converted to lowercase for case-insensitive matching):
  - If the `user_agent` contains "iphone", the device is categorized as "iPhone".
  - If it contains "android", the device is categorized as "Android".
  - If it contains "windows", the device is categorized as "Windows".
  - If it contains "macintosh", the device is categorized as "Mac".
  - If none of these conditions are met, the device is categorized as "Other".
3. The `stats count by device_type` command then counts the number of occurrences for each device type, providing insights into the most commonly used devices to access the service.

This approach enables a detailed analysis of device used to access your service, informing decisions related to service optimization and user experience enhancement.


## match(\<str\>, \<regex\>)
This function matches `<str>` with regular expression pattern `<regex>` and returns `true` if match is successful; otherwise it returns `false`.

### Usage
- `<str>` can be a field name or a string literal.
- `<regex>` is a regular expression pattern in form of a string literal.
- You can use this function with eval and where commands.

### Use-Case Example

**Identifying Google Email IDs**

**Problem:** In data analysis involving user information, it's often useful to quickly identify users with email addresses belonging to a specific domain, such as Google. This can be challenging due to the variety of email formats and domains.

**Solution:** To efficiently identify Google email IDs, a command can be used to analyze the `email` field in the dataset. This command employs the `eval` function combined with the `match` function to check if the email addresses end with "@google.com".

```
... | eval is_google_id=if(match(email, "^([^@]+)@google.com"), "yes", "no")
```
**Explanation:**
1. The `eval` function creates a new field named `is_google_id`, which indicates whether an email ID is associated with Google.
2. The `match` function is used to apply a regular expression that checks if the `email` field matches the pattern `^([^@]+)@google.com`. This pattern looks for strings that:
  - Start with any character sequence except the "@" symbol (`^([^@]+)`), followed by "@google.com".
3. If the `email` field matches this pattern, the `match` function returns `true`, and the `if` function assigns `"yes"` to the `is_google_id` field.
4. If the `email` field does not match this pattern, the `match` function returns `false`, and the `if` function assigns `"no"` to the `is_google_id` field.

This method allows for the quick identification of Google email IDs, facilitating targeted analysis or actions based on user email domains.



## cidrmatch(\<cidr\>, \<ip\>)
This function matches `<ip>` with the `<cidr>` and returns `true` if match is successful; otherwise it returns `false`.

### Usage
- `<ip>` can be a field name or a string literal representing ip address.
- `<cidr>` can be a field name or a string literal representing CIDR notation.
- You can use this function with eval and where commands.

### Use-Case Example

**Filtering IP Addresses by Subnet**

**Problem:** In network analysis and security, it's crucial to quickly identify whether IP addresses accessing a service fall within a specific subnet. This helps in assessing access patterns and identifying potentially unauthorized or suspicious activities.

**Solution:** To efficiently filter IP addresses by subnet, a command can be utilized to analyze the `client_ip` field in the dataset. This command employs the `eval` function combined with the `cidrmatch` function to check if the IP addresses match the CIDR block `10.0.0.0/24`.

```
... | eval is_subnet=if(cidrmatch("10.0.0.0/24", client_ip), "yes", "no")
```

**Explanation:**
1. The `eval` function creates a new field named `is_subnet`, which indicates whether a `client_ip` is within the specified subnet.
2. The `cidrmatch` function is used to compare each `client_ip` against the CIDR block `10.0.0.0/24`. This function:
  - Returns `true` if the `client_ip` falls within the `10.0.0.0/24` subnet.
  - Returns `false` otherwise.
3. Based on the result from `cidrmatch`, the `if` function assigns:
  - `"yes"` to the `is_subnet` field if the IP is within the subnet.
  - `"no"` if the IP is outside the subnet.

This method allows for the quick identification of IP addresses within a specific subnet, aiding in network analysis, security monitoring, and ensuring that access patterns are within expected parameters.


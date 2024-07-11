# Text functions

_This list includes functions that manipulates text data._

## lower(\<str\>)
This function returns a new string that is lowercase version of `<str>`.

### Usage
- `<str>` can be a string literal or a field name. 
- You can use this function with eval and where commands.

### Example
The following command returns lowercase version of the string in field `name`.
```
... | eval lowercase_name=lower(name)
```
The following command returns lowercase version of the given string i.e. `"abc z"`.
```
... | eval lowercase_str=lower("Abc Z")
```
### Use-Case Example

**Normalizing Job Titles for Accurate Count**

**Problem:** In datasets with job titles, variations in case (uppercase vs lowercase) can lead to discrepancies in data analysis, particularly when counting the number of individuals in each job position. This inconsistency can skew results and affect decision-making processes.

**Solution:** To address this issue, job titles can be converted to a consistent case (either all lowercase or all uppercase) using `lower` or `upper` functions before performing counts. This normalization ensures that variations in case do not affect the accuracy of the data analysis.

```
... | eval lowercase_job_title=lower(job_title)
    | stats count by lowercase_job_title
```
**Explanation:**
1. The `eval` command uses the `lower` function to generate a new field `lowercase_job_title` containing the `job_title` values in lowercase.
2. The `stats` command then aggregates data based on `lowercase_job_title`, ensuring accurate grouping and count regardless of case discrepancies in the dataset.


## upper(\<str\>)
This function returns a new string that is uppercase version of `<str>`.

### Usage
- `<str>` can be a string literal or a field name. 
- You can use this function with eval and where commands.

### Example
The following command returns uppercase version of the string in field `name`.
```
... | eval uppercase_name=upper(name)
```
The following command returns a uppercase version of the given string i.e. `"ABC Z"`.
```
... | eval uppercase_str=upper("Abc Z")
```



## trim(\<str\>, \<trim_chars\>)
This function trims the characters present in the `<trim_chars>` from the both sides of the `<str>` and returns this new string.

`<trim_chars>` is an optional argument. If not present, it would remove leading and trailing spaces and tabs from `<str>` and return this new string. Other types of whitespace characters would remain unaffected.

### Usage
- `<str>` can be a string literal or a field name. 
- `<trim_chars>` is a string containing characters that needs to be trimmed. 
- You can use this function with eval and where commands.

### Example

The following command trims the characters `a`, `Z` and space from both sides of the given string and returns this new string `"BcDe"`.
```
... | eval trimmed_str=trim("  aaBcDeZ ", "aZ ")
```
### Use-Case Example

**Cleaning Address Fields**

**Problem:** In datasets, address fields often contain leading or trailing spaces and tabs due to inconsistent data entry practices. These inconsistencies can lead to issues in data processing and analysis, such as incorrect matching and sorting of addresses.

**Solution:** To ensure data consistency and accuracy, it's essential to clean the address fields by removing any leading or trailing spaces and tabs. This preprocessing step makes the data uniform and easier to work with.

```
... | eval trimmed_address=trim(address)
```

**Explanation:**
The command utilizes the `eval` function to create a new field named `trimmed_address`, which contains the value of the `address` field with all leading and trailing spaces and tabs removed. This operation ensures that address data is consistent and accurately formatted for further processing and analysis.



## ltrim(\<str\>, \<trim_chars\>)
This function trims the characters present in the `<trim_chars>` from the left side of the `<str>` and returns this new string.

`<trim_chars>` is an optional argument. If not present, it would remove leading spaces and tabs from the `<str>` and return this new string. Other types of whitespace characters would remain unaffected.

### Usage
- `<str>` can be a string literal or a field name. 
- `<trim_chars>` is a string containing characters that needs to be trimmed. 
- You can use this function with eval and where commands.

### Example
The following command returns the address after removing all leading spaces and tabs.
```
... | eval left_trimmed_address=ltrim(address)
```

The following command trims the characters `a`, `Z` and space from the left side of the given string and returns this new string `"BcDeZ "`.
```
... | eval left_trimmed_str=ltrim("  aaBcDeZ ", "aZ ")
```


## rtrim(\<str\>, \<trim_chars\>)
This function trims the characters present in the `<trim_chars>` from the right side of the `<str>` and returns this new string.

`<trim_chars>` is an optional argument. If not present, it would remove leading spaces and tabs from the `<str>` and return this new string. Other types of whitespace characters would remain unaffected.

### Usage
- `<str>` can be either a string literal or a field name. 
- `<trim_chars>` is a string containing characters that needs to be trimmed. 
- You can use this function with eval and where commands.

### Example
The following command returns the address after removing all trailing spaces and tabs.
```
... | eval right_trimmed_address=rtrim(address)
```

The following command trims the characters `a`, `Z` and space from the right side of the given string and returns this new string `"  aaBcDe"`.
```
... | eval right_trimmed_str=rtrim("  aaBcDeZ ", "aZ ")
```


## replace(\<str\>,\<regex\>,\<replacement\>)
This function substitutes every occurrence of the regular expression `<regex>` match in `<str>` with the `<replacement>` string.

### Usage
- `<str>` can be either a string literal or a field name. 
- `<regex>` is a string containing regular expression pattern. 
- `<replacement>` is a string literal.
- You can use this function with eval and where commands.

### Example

The following command replaces slashes ("/") with dashes ("-") in the given date, resulting in the newly formatted date `07-10-2024`.
```
... | eval new_format_date=replace("07/10/2024", "/", "-")
```

### Use-Case Example

**Masking Email Addresses**

**Problem:** Sensitive information, such as email addresses in datasets, often needs to be anonymized or masked to protect user privacy. Specifically, the prefix of an email address (everything before the "@" symbol) must be hidden or replaced to prevent identification of the individual.

**Solution:** To address privacy concerns, the prefix of email addresses can be masked by replacing it with a generic string (e.g., "xxxxx"). This process retains the structure of the email address while anonymizing the user's identity.

```
... | eval masked_email=replace(email, "^([^@]+)@", "xxxxx@")
```

**Explanation:**
1. `eval` function is used to create a new field `masked_email` that will hold the masked email address.
2. `replace(email, "^([^@]+)@", "xxxxx@")`: This expression uses a regular expression to identify the prefix of the email address and replaces it with `"xxxxx"`, resulting in a masked email address.


## substr(\<str\>,\<start\>,\<length\>)

This functions returns a substring of `<str>` starting at index `<start>`. `<length>` denotes the number of characters to return from `<start>` index.

### Usage
- `<str>` can be a string literal or a field name. 
- `<length>` is optional if not present would return the rest of the string.
- `<start>` specifies the starting index for the substring, with index beginning at 1, not 0. Use negative indexes to start from the end of the string.
- You can use this function with eval and where commands.
- If `<start>` is past the length of the string, the function will return an empty string.
- If the specified `<length>` exceeds the available number of characters from `<start>` index, the function returns an empty string.
- If `<str>` is `NULL`, this function will not process it and an empty string would be present.

### Example
The following command returns the first 4 characters of string in field name.
```
... | eval substr_name=substr(name, 1, 4)
```
The following command returns the last 5 characters of the given string i.e. `"melon"`.
```
... | eval substr_str=substr("Watermelon", -5)
```
### Use-Case Example

**Extracting HTTP Status Codes from Web Server Logs**

**Problem:** When analyzing web server logs, the HTTP status code is often embedded within a longer status line string. This makes it difficult to quickly filter, group, or analyze based on the status code alone.

**Status line format:** "HTTP/1.1 404 Not Found"

**Solution:** Use `substr` function to extract the specific portion of the string containing the status code.

```
... | eval status_code = substr(status_line, 10, 3)
```

**Explanation:**

1. The `eval` command is utilized to create a new field named `status_code`, leveraging the `substr` function to extract specific parts of the `status_line` field.
2. The `substr` function begins extraction at the 10<sup>th</sup> character of `status_line`, a choice based on the typical starting position of HTTP status codes within the status line.
3. By specifying a length of 3 for the substring, the command precisely isolates 3-digit HTTP status codes (e.g., "404", "200"), storing them in the "status_code" field for subsequent analysis or visualization.

This solution allows for more efficient and focused analysis of HTTP status codes without the need to parse or filter the entire status line each time.



## len(\<str\>)
This function returns the length of `<str>`.

### Usage
- `<str>` can be a field name. 
- You can use this function with eval and where commands.

### Example
The following command returns the length of the string in field name.
```
... | eval len_name=len(name)
```




## urldecode(\<url\>)
This function decodes `<url>` and returns this decoded url.

### Usage
- `<url>` can be a string literal or a field name. 
- You can use this function with eval and where commands.

### Example
The following command decodes the given url and returns `"https://www.siglens.com/index.html"`.
```
... | eval decoded_url=urldecode("https%3A%2F%2Fwww.siglens.com%2Findex.html")
```

### Use-Case Example

**Decoding URL Strings**

**Problem:** URLs are often encoded for transmission over the Internet, which can make them difficult to read and interpret when analyzing data. Encoded characters (e.g., `%3A` for `:`) can obscure the actual content of the URL.

**Solution:** To make URLs readable and usable for analysis, encoded URLs can be decoded back to their original form. This process involves converting percent-encoded characters back to their corresponding characters.


```
... | eval decoded_url=urldecode(url)
```

**Explanation:** The command utilizes the `eval` function to create a new field named `decoded_url`, which contains the decoded URL from the `url` field. This technique is crucial for data analysis involving URLs, as it converts encoded URLs back to their original, human-readable form, facilitating easier analysis and interpretation of web data.
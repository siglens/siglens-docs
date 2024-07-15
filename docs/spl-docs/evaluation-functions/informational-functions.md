# Informational Functions

_This list includes functions designed to obtain information about a value._

## **isbool(&lt;value&gt;)**

This function returns `TRUE` if the given value is Boolean.

### Usage

`isbool` can be used with `eval` and `where` commands to check if a field's value is a Boolean (`true` or `false`). This is useful for conditional checks and for filtering records that contain a Boolean value in any field.

### Example

1. To add a field named `isBoolean` indicating whether the `isActive` field is a Boolean:

```spl
... | eval isBoolean=if(isbool(isActive), "true", "false")
```

2. To filter records where the `isActive` field is Boolean:

```spl
... | where isbool(isActive)
```

### Use-Case Example

**Problem**: In a dataset containing user activity logs, the `isActive` field is supposed to be Boolean but sometimes gets incorrectly inputted as a string or number, leading to inaccurate filtering and analysis.

**Solution**: Use the `isbool` function to identify and filter records where `isActive` is correctly a Boolean. This ensures that only records with valid Boolean values are considered in subsequent analysis or processing steps.

**Implementation**:

```spl
... | where isbool(isActive) | stats count by isActive
```

**Explanation**:

- The `where` command filters records to include only those where `isActive` is a Boolean value, using the `isbool` function directly for filtering.
- The `stats` command then counts the number of records grouped by the `isActive` Boolean status, providing a count of active vs. inactive users based on accurate Boolean data.

## **isnum(&lt;value&gt;)**

This function returns `TRUE` if the given value is numeric.

### Usage

`isnum` can be used with `eval` and `where` commands to check if a field's value is numeric. This comes in handy for conditional checks and for filtering records that have any numeric value in a field.

### Example

1. To add a field named `isNumeric` indicating whether the `latency` field is numeric:

```spl
... | eval isNumeric=if(isnum(latency), "true", "false")
```

2. To filter records where the `latency` field is numeric:

```spl
... | where isnum(latency)
```

### Use-Case Example

**Problem**: In a dataset containing network traffic logs, the `latency` field is expected to be numeric. However, due to data entry errors, some records have `latency` recorded as strings or other non-numeric formats, causing issues in calculations and analysis.

**Solution**: Use the `isnum` function to identify and filter records where `latency` is correctly numeric. This ensures that calculations and analysis are performed only on records with valid numeric `latency` values.

**Implementation**:

```spl
... | where isnum(latency) | stats avg(latency) as AverageLatency
```

**Explanation**:

- The `where` command filters records to include only those where `latency` is numeric, using the `isnum` function directly for filtering.
- The `stats` command calculates the average latency from the filtered records, providing insights into network performance based on accurate numeric data.

## **isint(&lt;value&gt;)**

This function returns `TRUE` if the given value is an integer.

### Usage

`isint` can be used with `eval` and `where` commands to check if a field's value is an integer. This is useful for conditional checks and for filtering records that contain an integer value in any field.

### Example

1. To classify `userAge` field values as integer or not:

```spl
... | eval isUserAgeInteger=if(isint(userAge), "true", "false")
```

2. To keep only the records where `userAge` is an integer:

```spl
... | where isint(userAge)
```

### Use-Case Example

**Problem**: A user database contains the `userAge` field, which should only have integer values. However, some entries have been mistakenly filled with non-integer values, such as strings or floats, causing issues in age-based segmentation.

**Solution**: Use the `isint` function to filter out records where `userAge` is not an integer. This ensures that age-based segmentation and analysis are performed only on records with valid integer age values.

**Implementation**:

```spl
... | where isint(userAge) | stats count by userAge
```

**Explanation**:

- The `where` command filters records to include only those where `userAge` is an integer, using the `isint` function for accurate filtering.
- The `stats` command then counts the number of users for each age, providing a clear distribution of user ages based on valid integer data.

## **isnull(&lt;value&gt;)**

This function returns `TRUE` if the given value is `NULL`.

### Usage

`isnull` can be used with `eval` and `where` commands to check if a field's value is `NULL`. This is particularly useful in conditional expressions and for filtering records based on the presence of `NULL` values.

### Example

1. To mark records with a `NULL` `transactionAmount` as "Not Available":

```spl
... | eval transactionStatus=if(isnull(transactionAmount), "Not Available", "Available")
```

2. To exclude records where `transactionAmount` is `NULL`:

```spl
... | where isnull(transactionAmount) = FALSE
```

### Use-Case Example

**Problem**:A dataset includes an email field. Some records are incomplete and do not have an email address, resulting in NULL values. You need to validate whether the email field is null and output a message indicating if the field is null.

**Solution**: Use the `validate` function with `isnull` to check for null values in the email field and print a message accordingly.

**Implementation**:

```spl
... | eval email_check = validate(isnull(email), "ERROR: Email is null", "Email is valid")
```

**Explanation**:

- The `validate` function checks if the email field is NULL.
- If the `email` field is NULL, it returns the message "ERROR: Email is null". If the `email` field is not NULL, it returns the message "Email is valid".

## **isnotnull(&lt;value&gt;)**

This function returns `TRUE` if the given value is not `NULL`.

### Usage

`isnotnull` can be used with `eval` and `where` commands to check if a field's value is not `NULL`. This is particularly useful in conditional expressions and for filtering records based on the absence of `NULL` values.

### Example

1. To mark records with a non-`NULL` `customerFeedback` as "Received":

```spl
... | eval feedbackStatus=if(isnotnull(customerFeedback), "Received", "Awaiting")
```

2. To select records where `customerFeedback` is not `NULL`:

```spl
... | where isnotnull(customerFeedback)
```

### Use-Case Example

**Problem**: In a dataset of server health logs, some entries may lack critical performance metrics like `cpuUsage` due to collection errors or misconfigurations.

**Solution**: Use the `validate` function to check for the presence of `cpuUsage` and categorize records for immediate anomaly detection.

**Implementation**:

```spl
... | eval healthStatus=validate(isnotnull(cpuUsage), "Normal", "Alert: CPU Usage Missing")
```

**Explanation**:

- This command uses `validate` to check if `cpuUsage` is not `NULL`. If `cpuUsage` is present, the record is marked as "Normal". Otherwise, it's flagged with "Alert: CPU Usage Missing".
- This approach ensures that entries missing `cpuUsage` are immediately flagged for anomaly detection.

## **typeof(&lt;value&gt;)**

This function returns the data type of the given value, which can be a literal value or more commonly, a field name in your dataset.

### Usage

`typeof` is versatile and can be used with `eval` and `where` commands. It is particularly useful for understanding the data type of fields in your dataset, which can inform data processing and manipulation strategies.

### Possible Outputs

- **String**: Indicates the value is a string.
- **Number**: Indicates the value is a numeric type.
- **Boolean**: Indicates the value is a boolean (`TRUE` or `FALSE`).
- **NULL**: Indicates the field is not present or its value is `NULL`.

### Example

1. To determine the data type of a field named `latency`:

```spl
... | eval fieldType=typeof(latency)
```

### Use-Case Example

**Problem**: A dataset includes a `response_time` field. Sometimes, due to logging errors, the `response_time` field in server logs is recorded as a `String` instead of a `Number`. This causes issues in calculations and reporting, as the field should consistently be numerical for accurate analysis.

**Solution**: Use the `typeof` command to identify and correct entries where `response_time` is misclassified as a string, ensuring all data in this field is treated as numerical.

**Implementation**:

```spl
... | eval response_time=if(typeof(response_time)="String", tonumber(response_time), response_time)
```

**Explanation**:

- This implementation uses the `typeof` command to identify entries where `response_time` is misclassified as a string. The `if` function checks the type, and if it is a `String`, `tonumber(response_time)` converts it to a `Number`. If not, it leaves the field unchanged. This ensures that all data in the `response_time` field is numeric. By standardizing the data type, this approach prevents errors in downstream processing and reporting.

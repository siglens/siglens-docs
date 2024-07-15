
# Informational Functions

_This list includes functions designed to obtain information about a value._

## **isbool(&lt;value&gt;)**

This function returns `TRUE` if the given value is Boolean.

### Usage

`isbool` can be used with `eval` and `where` commands to check if a field's value is a Boolean (`true` or `false`). This is particularly useful in conditional expressions and for filtering records based on Boolean field values.

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
... | where isbool(isActive)
    | stats count by isActive
```

**Explanation**:

- The `where` command filters records to include only those where `isActive` is a Boolean value, using the `isbool` function directly for filtering.
- The `stats` command then counts the number of records grouped by the `isActive` Boolean status, providing a count of active vs. inactive users based on accurate Boolean data.

## **isnum(&lt;value&gt;)**

This function returns `TRUE` if the given value is numeric.

### Usage

`isnum` can be used with `eval` and `where` commands to check if a field's value is numeric. This is especially useful in conditional expressions and for filtering records based on numeric field values.

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
... | where isnum(latency)
    | stats avg(latency) as AverageLatency
```

**Explanation**:

- The `where` command filters records to include only those where `latency` is numeric, using the `isnum` function directly for filtering.
- The `stats` command calculates the average latency from the filtered records, providing insights into network performance based on accurate numeric data.

## **isint(&lt;value&gt;)**

This function returns `TRUE` if the given value is an integer.

### Usage

`isint` can be used with `eval` and `where` commands to check if a field's value is an integer. This is particularly useful in conditional expressions and for filtering records based on integer field values.

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
... | where isint(userAge)
    | stats count by userAge
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

**Problem**: A financial transactions dataset includes a `transactionAmount` field. Some transactions are pending and have not been assigned an amount, resulting in `NULL` values. These `NULL` values need to be identified and handled appropriately for accurate financial reporting.

**Solution**: Use the `isnull` function to identify records with `NULL` `transactionAmount` values. This can help in segregating pending transactions from completed ones.

**Implementation**:

```spl
... | eval transactionStatus=if(isnull(transactionAmount), "Pending", "Completed")
    | stats count by transactionStatus
```

**Explanation**:

- The `eval` command uses `isnull` to check for `NULL` `transactionAmount` values, labeling these transactions as "Pending" and others as "Completed".
- The `stats` command then counts the number of transactions in each category, providing a clear overview of pending versus completed transactions.

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

**Problem**: A customer service dataset includes a `customerFeedback` field. Not all interactions result in feedback, leading to `NULL` values in this field. For quality assurance and follow-up processes, it's important to distinguish between interactions that have received feedback and those that haven't.

**Solution**: Use the `isnotnull` function to filter records based on the presence of `customerFeedback`. This enables targeted analysis and actions for interactions with or without feedback.

**Implementation**:

```spl
... | eval feedbackStatus=if(isnotnull(customerFeedback), "Received", "Awaiting")
    | stats count by feedbackStatus
```

**Explanation**:

- The `eval` command uses `isnotnull` to check for non-`NULL` `customerFeedback` values, labeling these interactions as "Received" and others as "Awaiting".
- The `stats` command then counts the number of interactions in each category, providing insights into the volume of feedback received versus pending.

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

2. To handle different data types in processing using `if` statements:

```spl
... | eval processData=if(typeof(field)=="String", "Process as string",
                         if(typeof(field)=="Number", "Process as number",
                         if(typeof(field)=="Boolean", "Process as boolean",
                         if(typeof(field)=="Multivalue", "Process as multivalue",
                         "Unknown type"))))
```

### Use-Case Example

**Problem**: In a dataset containing various types of data, it's crucial to identify the data type of each field to apply appropriate processing techniques, especially when the data source is dynamic and the types of some fields can change.

**Solution**: Use the `typeof` function to dynamically identify the data type of fields. This enables the application of data type-specific processing logic, ensuring data integrity and accuracy in analysis.

**Implementation**:

```spl
... | eval fieldType=typeof(latency),
         processData=case(
           typeof(latency)="String", "Process as string",
           typeof(latency)="Number", "Process as number",
           typeof(latency)="Boolean", "Process as boolean",
           typeof(latency)="Multivalue", "Process as multivalue"
         )
```

**Explanation**:

- The `eval` command is used to determine the data type of the `latency` field using `typeof`.
- A `case` statement then maps each identified data type to a specific processing logic. This approach ensures that each data type is handled appropriately, without the need for a default or catch-all case, streamlining the processing logic for known data types.
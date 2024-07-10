
# Informational Functions

_This list includes functions designed to obtain information about a value._

## **isbool(&lt;value&gt;)**

This function returns `TRUE` if the given value is Boolean.

### Usage

You can utilize this function with the `eval` and `where` commands and as part of evaluation expressions within other commands.

To determine if a field's value is "true" or "false", use the syntax `<fieldname>=true OR <fieldname>=false` since field values are typically strings or numbers.

### Example 

1. Using the `isbool` function with the `if` function to add a field named `isBoolean` with values "true" or "false" based on whether `isActive` is a Boolean:

```spl
... | eval isBoolean=if(isbool(isActive),"true","false")
```

2. Using the `isbool` function with the `where` command to filter results where the `isActive` field is Boolean:

```spl
... | where isbool(isActive)
```

## **isnum(&lt;value&gt;)**

This function returns `TRUE` if the given value is numeric.

### Usage

You can utilize this function with the `eval` and `where` commands and as part of evaluation expressions within other commands.

### Example

1. Using the `isnum` function with the `if` function to add a field named `isNumeric` with values "yes" or "no" based on whether `latency` is a number:

```spl
... | eval isNumeric=if(isnum(latency),"yes","no")
```

2. Using the `isnum` function with the `where` command to filter results where the `latency` field is numeric:

```spl
... | where isnum(latency)
```

## **isint(&lt;value&gt;)**

This function returns `TRUE` if the given value is an integer.

### Usage

You can use this function with the `eval` and `where` commands, within the `WHERE` clause of the `from` command, and as part of evaluation expressions with other commands.

### Example

1. Using the `isint` function with the `if` function to add a field "n" with values "int" or "not int" depending on whether the "field" is an integer:

```spl
... | eval n=if(isint(latency),"int", "not int")
```

2. Using the `isint` function with the `where` command to filter results where the `field` is an integer:

```spl
... | where isint(latency)
```

## **isnull(&lt;value&gt;)**

This function returns `TRUE` if the given value is `NULL`.

### Usage

You can use this function with the `eval` and `where` commands, within the `WHERE` clause of the `from` command, and as part of evaluation expressions with other commands.

### Example

1. Using the `isnull` function with the `if` function to add a field "n" with values "yes" or "no" depending on whether the "field" is `NULL`:

```spl
... | eval n=if(isnull(latency),"yes","no")
```

2. Using the `isnull` function with the `where` command to filter results where the `field` is `NULL`:

```spl
... | where isnull(latency)
```

## **isnotnull(&lt;value&gt;)**

This function returns `TRUE` if the given value is not `NULL`.

### Usage

This function is useful for checking whether a field contains a value. You can use this function with the `eval` and `where` commands, within the `WHERE` clause of the `from` command, and as part of evaluation expressions with other commands.

### Example

1. Using the `isnotnull` function with the `if` function to add a field "n" with values "yes" or "no" depending on whether the "field" is not `NULL`:

```spl
... | eval n=if(isnotnull(latency),"yes","no")
```

2. Using the `isnotnull` function with the `where` command to filter results where the `field` is not `NULL`:

```spl
... | where isnotnull(latency)
```

## **typeof(&lt;value&gt;)**

This function returns the data type of the given value.

### Usage

You can use this function with the `eval` and `where` commands, within the `WHERE` clause of the `from` command, and as part of evaluation expressions with other commands.

### Example

For raw values that are strings or numbers:

```spl
... | eval typeString=typeof("hello"), typeNumber=typeof(123)
```

When passing a field name, which could be a string, number, or `NULL`:

```spl
... | eval fieldType=typeof(latency)
```

This will return "String" for string values, "Number" for numeric values, and "NULL" if the field is not present or its value is `NULL`.

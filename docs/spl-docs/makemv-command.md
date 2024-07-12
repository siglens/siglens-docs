# makemv

## Description

Converts a single valued field into a multivalue field by splitting the values on a string delimiter or by using a regular expression. The delimiter can be a multicharacter delimiter.

## Syntax

makemv \
[delim=\<string> or tokenizer=\<string>] \
[allowempty=\<bool>] \
[setsv=\<bool>] \
\<field> 

## Required Arguments

### field

**Syntax**: `<field>` \
**Description**: The name of a field to generate the multivalues from.

## Optional Arguments

### delim

**Syntax**: `delim=<string>` \
**Description**: A string value used as a delimiter. Splits the values in `field` on every occurrence of this delimiter. \
**Default**: A single space (" ").

### tokenizer

**Syntax**: `tokenizer=<string>` \
**Description**: A regular expression with a capturing group that is repeat-matched against the values in the field. For each match, the first capturing group is used as a value in the newly created multivalue field.

### allowempty

**Syntax**: `allowempty=<bool>` \
**Description**: Specifies whether to permit empty string values in the multivalue field. When using `allowempty=true`, repeats of the delimiter string produce empty string values in the multivalue field. For example if `delim=","` and `field="a,,b"`, by default does not produce any value for the empty string. When using the `tokenizer` argument, zero length matches produce empty string values. By default they produce no values. \
**Default**: false

### setsv

**Syntax**: `setsv=<bool>` \
**Description**: If true, the `makemv` command combines the decided values of the field into a single value, which is set on the same field. (The simultaneous existence of a multivalue and a single value for the same field is a problematic aspect of this flag.) \
**Default**: false

## Examples

### 1. Use a comma to separate field values

For sendmail search results, separate the values of "senders" into multiple values. Display the top values.

```
eventtype="sendmail" | makemv delim="," senders | top senders
```

### 2. Use a colon delimiter and allow empty values

Separate the value of "product_info" into multiple values.

```
... | makemv delim=":" allowempty=true product_info
```

### 3. Use a regular expression to separate values

The following search creates a result and adds three values to the `my_multival` field. The `makemv` command is used to separate the values in the field by using a regular expression.

```
| makeresults
| eval my_multival="one,two,three"
| makemv tokenizer="([^,]+),?" my_multival
```

### 4. Use a delimiter with multiple characters

Separate the value of `log_data` into multiple values using a delimiter with multiple characters.

```
... | makemv delim=";|;" log_data
```

**Explanation:**
1. The `makemv` command uses the delimiter `";|;"` to split the `log_data` field into multiple values.

**Example log entry:**

```
log_data="error;|;warning;|;info;|;debug"
```

**Output:**

The output for the above command would be:

```
log_data
error
warning
info
debug
```

### Use-Case Example

**Parsing Email Recipients**

**Problem:** A company's email server logs contain a field called "recipients" that stores all email recipients as a comma-separated string. The security team wants to analyze email distribution patterns, but they need each recipient as a separate value for proper analysis.

**Solution:** The `makemv` command can be used to split the "recipients" field into multiple values, allowing for individual analysis of each recipient.

**Example log entry:**

```
timestamp="2024-07-12 09:15:23" sender="john@company.com" recipients="alice@company.com,bob@company.com,carol@external.com" subject="Project Update"
```

**SPL command:**

```
index=email_logs 
| makemv delim="," recipients 
| stats count by sender, recipients
```

**Explanation:**
1. The search starts by looking at the email logs index.
2. The `makemv` command splits the "recipients" field into multiple values using the comma as a delimiter.
3. The `stats` command then counts occurrences for each unique combination of sender and recipient.
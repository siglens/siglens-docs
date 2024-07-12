# Multivalue functions

_This list includes functions that can be used to return multivalue fields or can operate on multivalue fields._



## split(\<str\>, \<delim\>)
This function splits `<str>` with the delimiter `<delim>` and return these parts as a multivalue field.

#### Usage
- `<str>` can be a string literal or a field name. 
- `<delim>` is a string literal specifying the delimiter. 
- You can use this function with an eval command.

### Example
The following command returns the split parts of the given string as a multivalue field fruits having values `apple`, `banana`, `mango` and `kiwi`.
```
... | eval fruits=split("apple:banana:mango:kiwi", ":")
```

### Use-Case Example

**Extracting Email Recipients from Logs**

**Problem:** In email transaction logs, recipient addresses are often stored in a single string, separated by semicolons. Analyzing individual recipient behavior or response rates requires splitting these strings into separate values for each recipient.

**Solution:** To efficiently extract individual email recipients from log entries, a command can be used to analyze the `recipients` field in the dataset. This command employs the `eval` function combined with the `split` function to separate the recipient addresses into a multivalue field.

```
... | eval email_list=split(recipients, ";")
```

**Explanation:**
1. The `eval` function creates a new field named `email_list`, which will contain the separated email addresses as individual values.
2. The `split` function is used to divide the `recipients` string into separate email addresses based on the semicolon (`;`) delimiter.
  - For example, if `recipients` contains `user1@example.com;user2@example.com;user3@example.com`, the `split` function will create an `email_list` multivalue field with three separate values: `user1@example.com`, `user2@example.com`, and `user3@example.com`.

This method allows for detailed analysis of email logs, such as calculating response rates or identifying recipient engagement, by treating each recipient address as an individual entity.
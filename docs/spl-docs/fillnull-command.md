# fillnull

## Description

Replaces null values with a specified value. Null values are field values that are missing in a particular result but present in another result. Use the `fillnull` command to replace null field values with a string. You can replace the null values in one or more fields. You can specify a string to fill the null field values or use the default, field value which is zero ( 0 ).​

## Syntax

The required syntax is in **bold**.​

**fillnull** \
[value=\<string>] \
[\<field-list>]

## Required Arguments

None.

## Optional Arguments

### field-list

**Syntax**: `<field>...` \
**Description**: A space-delimited list of one or more fields. If you specify a field list, all of the fields in that list are filled in with the `value` you specify. If you specify a field that didn't previously exist, the field is created. If you do not specify a field list, the `value` is applied to all fields.

### value

**Syntax**: `value=<string>` \
**Description**: Specify a string value to replace null values. If you do not specify a value, the default value is applied to the `<field-list>`. \
**Default**: 0

## Examples

### 1. Fill all empty field values with the default value

​You can fill all of empty field values with the zero by adding the `fillnull` command to your search.​

```
... | fillnull
```

### 2. Fill all empty fields with the string "NULL"

You fill all empty field values with the string "NULL" by specifying the argument `value` with your `fillnull` command

```
... | fillnull value=NULL
```

### 3. Fill the specified fields with the string "unknown"

​You can fill all empty field values in the "host" and "kbps" fields with the string "unknown" by adding the `fillnull` command to your search.​

```
... | fillnull value=unknown host kbps
```

​​If you specify a field that does not exist the field is created and the value you specify is added to the new field. ​For example, let's say `bytes` did not exist and if you specify `bytes` in the field list, the `bytes` field is created and filled with the string "unknown".​

```
... | fillnull value=unknown host kbps bytes
```

### Use-Case Example

**Ensuring Data Completeness in Sales Reports**

**Problem:** In sales data analysis, missing values in fields like `sales_rep`, `region`, and `product_category` can lead to incomplete reports and incorrect insights. These null values need to be filled with a meaningful placeholder to ensure data consistency and completeness.

**Solution:** The `fillnull` command can be used to replace null values in specific fields with the string "unknown", ensuring that all fields have valid values for accurate analysis.

```
index=sales_data 
| fillnull value=unknown sales_rep region product_category
| fields sales_rep region product_category total_sales
```

**Explanation:**
1. The `fillnull` command is used to replace null values in the `sales_rep`, `region`, and `product_category` fields with the string "unknown".
2. This ensures that the specified fields have no null values, making the data consistent and complete.
3. The `fields` command is used to display only the relevant fields (`sales_rep`, `region`, `product_category`, `total_sales`) in the output.






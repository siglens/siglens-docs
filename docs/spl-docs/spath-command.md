# spath

## Description

The `spath` command extracts values from structured data formats such as XML and JSON. It allows you to navigate hierarchical data structures and retrieve specific values, storing them in designated fields.

This command is particularly useful for working with API responses, configuration files, or any other structured data that needs to be processed in a search.

## Syntax

The required syntax is in **bold**.

**spath** \
[input=\<field>] \
[output=\<field>] \
[path=\<datapath> | \<datapath>]

## Required arguments

None.

## Optional arguments

### input

**Syntax:** `input=<field>` \
**Description:** Specifies the field containing the structured data to extract values from. \
**Default:** _raw

### output

**Syntax:** `output=<field>` \
**Description:** Specifies the field name where the extracted value will be stored. \
**Default:** If not specified, the value of the path argument becomes the field name.

### path

**Syntax:** `path=<datapath> | <datapath>` \
**Description:** Specifies the location path to the value you want to extract. The path can be provided with or without the "path=" prefix. Location paths are composed of one or more steps separated by periods (e.g., `data.items.name`). \
**Default:** If omitted, the command runs in "auto-extract" mode, finding and extracting all fields from the input.

## Path Syntax

### Basic Path

A period-separated list of field names that traverses the data structure:

```parent.child.grandchild```

### Array Indexing

Use curly braces to specify array indices:
```
items{0}.name    # First item's name in JSON (zero-based)
items{1}.name    # Second item's name in JSON
books{}.title    # All book titles (returns a multi-value field)
```

### XML Attribute Access

Use the @ symbol to access XML attributes:

```
book.title{@year}    # Access the "year" attribute of the title element
```

## Examples

### 1. Basic field extraction

Extract a specific value from JSON data:
```
... | spath output=product_name path=product.name
```

### 2. Extract all fields automatically

Extract all fields from structured data without specifying individual paths:
```
... | spath
```

### 3. Extract values from arrays

Extract the first item's description from a JSON array:
```
... | spath output=first_description path=items{0}.description
```

### 4. Extract all values from an array

Extract all descriptions from all items in a JSON array:
```
... | spath output=all_descriptions path=items{}.description
```


### 5. Extract XML attributes

Extract the year attribute from book titles in XML:
```
... | spath output=publication_years path=catalog.book.title{@year}
```

### Use-Case Example

**Analyzing API response data for error patterns**

**Problem:** A DevOps engineer needs to monitor a microservices architecture by analyzing JSON API responses to identify patterns in error messages across different services.

**Solution:** Use the `spath` command to extract specific fields from the structured API responses.

**SPL command:**

```
index=api sourcetype=json_api
| spath input=_raw
| spath output=service_name path=service.name
| spath output=error_code path=error.code
| spath output=error_message path=error.message
| spath output=transaction_id path=meta.transactionId
| where error_code!="" AND error_code!=null
| stats count by service_name, error_code, error_message
| sort -count
```

**Explanation:**
1. The search retrieves JSON API responses
2. The first `spath` command without arguments auto-extracts all fields
3. The subsequent `spath` commands extract specific fields into named outputs
4. The `where` command filters to include only events with error codes
5. The `stats` command groups and counts errors by service and error type
6. The results are sorted by frequency (most common errors first)

**Example data:**

```
service_name    error_code    error_message                      count
auth-service    401           Invalid authentication token        156
payment-api     503           Payment gateway unavailable         87
user-service    404           User profile not found              42
inventory-api   400           Invalid product ID format           28
payment-api     422           Insufficient funds                  15
```

This use case demonstrates how the `spath` command enables effective analysis of structured data by extracting and organizing key information from complex nested structures.RetryClaude can make mistakes. Please double-check responses.
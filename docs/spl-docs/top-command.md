# top

## Description

Finds the most common values for the fields in the field list. Calculates a count and a percentage of the frequency the values occur in the events. If the `<by-clause>` is included, the results are grouped by the field you specify in the `<by-clause>`.

## Syntax

```
top [<N>][<top-options>...] <field-list> [<by-clause>]
```

## Required arguments

### `<field-list>`

**Syntax:** `<field>, <field>, ...` \
**Description:** Comma-delimited list of field names.

## Optional arguments

### `<N>`

**Syntax:** `<int>` \
**Description:** The number of results to return. \
**Default:** 10

### `<top-options>`

**Syntax:** `countfield=<string> | limit=<int> | othertstr=<string> | percentfield=<string> | showcount=<bool> | showperc=<bool> | useother=<bool>` \
**Description:** Options for the `top` command. See Top options.

### `<by-clause>`

**Syntax:** `BY <field-list>` \
**Description:** The name of one or more fields to group by.

Here are the top options for the `top` command based on the provided image:

## Top options

### countfield

**Syntax:** `countfield=<string>` \
**Description:** For each value returned by the `top` command, the results also return a count of the events that have that value. This argument specifies the name of the field that contains the count. The count is returned by default. If you do not want to return the count of events, specify `showcount=false`. \
**Default:** `count`

### limit

**Syntax:** `limit=<int>` \
**Description:** Specifies how many results to return. To return all values, specify zero (0). Specifying `top limit=<int>` is the same as specifying `top <N>`. \
**Default:** 10

### otherstr

**Syntax:** `otherstr=<string>` \
**Description:** If `useother=true`, a row representing all other values is added to the results. Use `otherstr=<string>` to specify the name of the label for the row. \
**Default:** `OTHER`

### percentfield

**Syntax:** `percentfield=<string>` \
**Description:** For each value returned by the `top` command, the results also return a percentage of the events that have that value. This argument specifies the name of the field that contains the percentage. The percentage is returned by default. If you do not want to return the percentage of events, specify `showperc=false`. \
**Default:** `percent`

### showcount

**Syntax:** `showcount=<bool>` \
**Description:** Specify whether to create a field called "count" (see `countfield` option) with the count of that tuple. \
**Default:** `true`

### showperc

**Syntax:** `showperc=<bool>` \
**Description:** Specify whether to create a field called "percent" (see `percentfield` option) with the relative prevalence of that tuple. \
**Default:** `true`

### useother

**Syntax**: `useother=<bool>` \
**Description**: Specify whether or not to add a row that represents all values not included due to the limit cutoff. \
**Default**: false

## Default fields

When you use the `top` command, two fields are added to the results: `count` and `percent`.

| Field   | Description                                                                                       |
|---------|---------------------------------------------------------------------------------------------------|
| count   | The number of events in your search results that contain the field values that are returned by the `top` command. See the `countfield` and `showcount` arguments.  |
| percent | The percentage of events in your search results that contain the field values that are returned by the `top` command. See the `percentfield` and `showperc` arguments. |

## Examples

### 1. Return the 20 most common values for a field

This search returns the 20 most common values of the "referer" field. The results show the number of events (count) that have that count of referer, and the percent that each referer is of the total number of events.

```
sourcetype=access_* | top limit=20 referer
```

### 2. Return top values for one field organized by another field

This search returns the top "action" values for each "referer_domain".

```
sourcetype=access_* | top action by referer_domain
```

Because a limit is not specified, this returns all the combinations of values for "action" and "referer_domain" as well as the counts and percentages.

### 3. Returns the top product purchased for each category

This search returns the top product purchased for each category. Do not show the percent field. Rename the count field to "total".

```
sourcetype=access_* status=200 action=purchase | top 1 productName by categoryId showperc=f countfield=total
```

### Use-Case Example

**Analyze the top products purchased by customer segments**

**Problem:** A user wants to analyze the top products purchased by different customer segments to understand purchasing behavior and tailor marketing strategies accordingly.

**Solution:** The `top` command can be used to find the most commonly purchased products for each customer segment, along with the count and percentage of total purchases.

**Example log entry:**

```
timestamp="2024-07-12 09:15:23" customer_segment="premium" product="laptop" action="purchase"
timestamp="2024-07-12 09:16:00" customer_segment="regular" product="mouse" action="purchase"
timestamp="2024-07-12 09:17:00" customer_segment="premium" product="laptop" action="purchase"
timestamp="2024-07-12 09:18:00" customer_segment="regular" product="keyboard" action="purchase"
timestamp="2024-07-12 09:19:00" customer_segment="premium" product="laptop" action="purchase"
timestamp="2024-07-12 09:20:00" customer_segment="regular" product="mouse" action="purchase"
timestamp="2024-07-12 09:21:00" customer_segment="regular" product="keyboard" action="purchase"
timestamp="2024-07-12 09:22:00" customer_segment="premium" product="monitor" action="purchase"
timestamp="2024-07-12 09:23:00" customer_segment="regular" product="monitor" action="purchase"
```

**SPL command:**

```
index=purchase_logs action=purchase 
| top limit=2 product by customer_segment countfield=total_purchases percentfield=purchase_percentage
```

**Explanation:**
1. The search starts by looking at the purchase logs with the `index=purchase_logs` and filtering for purchase actions.
2. The `top` command is used to find the top 2 products for each customer segment, with custom field names for count (`total_purchases`) and percentage (`purchase_percentage`).
3. The results show the count and percentage of each product within each customer segment.

**Output:**

The output for the above command based on the mentioned data would look like this:

```
customer_segment   product     total_purchases   purchase_percentage
premium            laptop      3                 75.00%
premium            monitor     1                 25.00%
regular            mouse       2                 40.00%
regular            keyboard    2                 40.00%
regular            monitor     1                 20.00%
```

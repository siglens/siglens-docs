# sort Command

## Description

The `sort` command organizes the output based on the designated fields. If a result lacks a specified field, it is considered to have either the minimum or maximum value for that field, depending on whether the sorting is in ascending or descending order.

When the initial argument to the `sort` command is a numeral, it limits the output to that number of results, presented in sequence. In the absence of a specified number, a default cap of 10000 results applies. Specifying the number 0 as the first argument returns all results.

## Syntax
The required syntax is in bold

**sort**
[\<count\>]
**\<sort-by-clause\>...**
[desc]

### Required Arguments

#### \<sort-by-clause\>
**Syntax:** `[ - | + ] <sort-field>, ( - | + ) <sort-field> ...`\
**Description:** Specifies the fields to sort by, including the order of sorting. A minus sign (-) indicates descending order, while a plus sign (+) denotes ascending order. For multiple fields, separate each with a comma.

### Optional Arguments

#### \<count\>
**Syntax:** `<int> or limit=<int>`\
**Description:** Determines the number of results to display after sorting. Absent a specified count, a default threshold of 10000 results is applied. Specifying 0 returns all possible results. The count can be directly indicated by an integer or introduced with the prefix 'limit=', e.g., limit=10.

**Default:** 10000

#### desc
**Syntax:** `d or desc`\
**Description:** Inverts the sequence of the results. When multiple fields are designated, it inversely arranges the values within those fields according to their specified sequence. For instance, with three fields indicated, the `desc` parameter inversely organizes the values in the first field. For any group of identical values in the first field, it similarly inverts the order of related values in the second field, and for each group of matching values in the second field, it reverses the order of associated values in the third field.

### Sort Field Options

#### \<sort-field\>
**Syntax:** `<field> or auto(<field>) or str(<field>) or ip(<field>) or num(<field>)`\
**Description:** Defines the options available for `<sort-field>`.

#### \<field\>
**Syntax:** `<string>`\
**Description:** Identifies the field to be sorted.

#### auto
**Syntax:** `auto(<field>)`\
**Description:** Automatically determines the best method to sort the field values.

#### ip
**Syntax:** `ip(<field>)`\
**Description:** Treats the field values as IP addresses for sorting.

#### num
**Syntax:** `num(<field>)`\
**Description:** Considers the field values as numbers for sorting purposes.

#### str
**Syntax:** `str(<field>)`\
**Description:** Sorts the field values alphabetically, treating them as strings.

## Examples

1. **Use the sort field options to specify field types**

Sort the results by the `http_status` field in ascending order, and then sort by `latency` in descending order to see the slowest responses at the top for each status code.

    ```spl
    ... | sort num(http_status), -num(latency)
    ```

2. **Specifying the number of results to sort**

Sort first 100 results in descending order of the `latency` field and then by the `city` value in ascending order. This example specifies the type of data in each of the fields. The `latency` field contains numbers and the `city` field contains strings.
	```spl
	... | sort 100 -num(latency), +str(city)
	```

3. **Specifying descending and ascending sort orders**

To analyze user engagement by location and performance, sort results by the "country" field in ascending order to group data by country, and then by the "latency" field in descending order to see the slowest responses at the top within each country.

	```spl
	... | sort country, -latency
	```

4. **Fetching the Latest Event**

Retrieve the most recent event by sorting in descending order based on the `timestamp` field.
	```spl
	... | sort 1 -timestamp
	```

5. **Limiting Results with a Label**

Specify the number of entries to display by using a label. For instance, to view the top 12 entries based on the "app_name" field in ascending order, you can set a limit.

	```spl
	... | sort limit=12 app_name
	```


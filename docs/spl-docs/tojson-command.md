# tojson

## Description

Converts events into JSON objects. You can specify which fields get converted by identifying them through exact match or through wildcard expressions. You can also apply specific JSON datatypes to field values using datatype functions. The `tojson` command converts multivalue fields into JSON arrays.

When fields are specifically named in a `tojson` search, the command generates JSON objects that are limited to the values of just those named fields. If no fields are specified for `tojson`, `tojson` generates JSON objects for all fields that would otherwise be returned by the search.

## Syntax

Required syntax is in **bold**.  
**|tojson**  
[\<tojson-function\>]...  
[default_type=\<datatype\>]  
[fill_null=\<boolean\>]  
[include_internal=\<boolean\>]  
[output_field=\<string\>]  

### Optional arguments

#### tojson-function
**Syntax:** `[auto|bool|json|none|num|str](<wc-field>)...`  
**Description:** Applies JSON datatype functions to values of named fields. See Usage for details about how `tojson` interprets these datatype functions, and how `tojson` applies datatypes to field values when it converts events into JSON objects.  
If you provide no fields, the tojson processor creates JSON objects for each event that include all available fields. In other words, it applies `none(*)` to the search.  
**Default**: `none(*)`

#### default_type
**Syntax:** `default_type=<datatype>`  
**Description:** Specifies the datatype that the `tojson` processor should apply to fields that aren't specifically associated with a datatype function.  
**Default:** `none`

#### fill_null
**Syntax:** `fill_null=<boolean>`  
**Description:** When set to true, `tojson` outputs a literal `null` value when `tojson` skips a value. For example, normally, when `tojson` tries to apply the `json` datatype to a field that does not have proper JSON formatting, `tojson` skips the field. However, if `fill_null=true`, the `tojson` processor outputs a `null` value  
**Default:** `false`

#### include_internal
**Syntax:** `include_internal=<boolean>`  
**Description:** When set to true, `tojson` includes internal fields such as `_time`, `_indextime`, or `_raw` in its JSON object output.  
**Default:** `false`

#### output_field 
**Syntax:** `output_field=<string>`  
**Description:** Specifies the name of the field to which the `tojson` search processor writes the output JSON objects.  
**Default:** `_raw` 

### Usage
The `tojson` command is a <a href="https://docs.splunk.com/Splexicon:Streamingcommand" target="_blank" rel="noopener">streaming command</a>, which means it operates on each event as it is returned by the search.

#### Apply JSON datatypes to field values
The `tojson` command applies JSON datatypes to field values according to logic encoded in its datatype functions.

You can assign specific datatype functions to fields when you write a `tojson` search. Alternatively, you can name a set of fields without associating them with datatype functions, and then identify a `default_type` that `tojson` can apply to those unaffiliated fields.

If you do not specify any fields for the `tojson` command, the `tojson` returns JSON objects for each field that can possibly be returned by the search at that point, and applies the `none` datatype function to the values of those fields. The `none` datatype function applies the numeric datatype to field values that are purely numeric, and applies the string datatype to all other field values.

The following table explains the logic that the various datatype functions use to apply datatypes to the values of the fields with which they are associated. 

| Datatype function | Conversion logic |
|-------------------|------------------|
| **auto** | Converts all values of the specified field into JSON-formatted output. Automatically determines the field datatypes. • If the value is numeric, the JSON output has a numeric output and includes a literal numeric. • If the value is the string `true` or `false`, the JSON output has a Boolean type. • If the value is a literal `null`, the JSON output has a null type and includes a null value. • If the value is a string other than the previously mentioned strings, `tojson` examines the string. If it is proper JSON, `tojson` outputs a nested JSON object. If not, it includes the string as-is. |
| **bool** | Converts valid values of the specified field to the Boolean datatype and skips invalid values using string validation. • If the value is a number, `tojson` outputs `false` only if the value is `0`. Otherwise it outputs `true`. • If the value is a string, `tojson` outputs `false` only if the value is `false`, `f`, or `no`. • `tojson` outputs `true` only if the value is `true`, `t`, or `yes`. Other strings are skipped. • Validation is case-insensitive: `FALSE`, `False`, `F`, `NO`, etc. are interpreted as `false`. |
| **json** | Converts all values of the specified field to the JSON type using string validation. Skips invalid JSON values. • If the value is a number, `tojson` outputs that number. • If the value is a string, `tojson` outputs the string as a JSON block. • Invalid JSON values are skipped. |
| **none** | Outputs all values for the specified field in the JSON type. No string validation is applied. • Numeric values are output with a numeric type. • String values are output with a string type. |
| **num** | Converts all values of the specified field to the numeric type using string validation. • If the value is a number, it is output as a numeric type. • If the value is a string, `tojson` attempts to parse it as a number. Invalid strings are skipped. |
| **str** | Converts all values of the specified field into the string datatype using string validation. The `tojson` processor applies the string type to all values of the specified field, even if they are numbers, Booleans, etc. |


When a field includes multivalues, `tojson` outputs a JSON array and applies the datatype function logic to each element of the array. 

# Examples

### 1\. Convert all events returned by a search into JSON objects

This search of **`index=_internal`** converts all events it returns for its time range into **JSON-formatted** data. Because the search string doesn't assign datatype functions to specific fields, by default **`tojson`** applies the **`none`** datatype function to all fields returned by the search. This means all of their values get either the numeric or string datatypes.

```splunk
index=_internal | tojson
```

For example, say you start with events that look like this:

```
12-18-2020 18:19:25.601 +0000 INFO Metrics - group=thruput, name=thruput, instantaneous_kbps=5.821, instantaneous_eps=27.194, average_kbps=5.652, total_k_processed=444500.000, kb=180.443, ev=843, load_average=19.780
```

After being processed by **`tojson`**, such events have JSON formatting like this:

```json
{ [-]
   component: Metrics
   date_hour: 18
   date_mday: 18
   date_minute: 22
   date_month: december
   date_second: 9
   date_wday: friday
   date_year: 2020
   date_zone: 0
   event_message: group=thruput, name=thruput, instantaneous_kbps=2.914, instantaneous_eps=13.903, average_kbps=5.062, total_k_processed=398412.000, kb=90.338, ev=431, load_average=14.690
   group: thruput
   host: sh1
   index: _internal
   linecount: 1
   log_level: INFO
   name: thruput
   punct: --_::._+____-_=,_=,_=.,_=.,_=.,_=.,_=.,_=,_=.
   sourcetype: siglens
   timeendpos: 29
   timestartpos: 0
}
```

-----

### 2\. Specify different datatypes for 'date' fields

The following search of the **`_internal`** index converts results into JSON objects that have only the **`date_*`** fields from each event. The **numeric** datatype is applied to all **`date_hour`** field values. The **string** datatype is applied to all other date field values.

```splunk
index=_internal | tojson num(date_hour) str(date_*)
```

This search produces JSON objects like this:

```json
{ [-]
   date_hour: 18
   date_mday: 18
   date_minute: 28
   date_month: december
   date_second: 45
   date_wday: friday
   date_year: 2020
   date_zone: 0
}
```

Note that all fields that don't start with **`date_`** have been stripped from the output.

-----

### 3\. Limit JSON object output and apply datatypes to the field values

This search returns JSON objects only for the **`name`**, **`age`**, and **`isRegistered`** fields. It uses the **`auto`** datatype function to have **`tojson`** automatically apply appropriate JSON datatypes to the values of those fields.

```splunk
... | tojson auto(name) auto(age) auto(isRegistered)
```

-----

### 4\. Convert all events into JSON objects and apply appropriate datatypes to all field values

This search converts all of the fields in each event returned by the search into JSON objects. It uses the **`auto`** datatype function in conjunction with a wildcard to apply appropriate datatypes to the values of all fields returned by the search.

```splunk
... | tojson auto(*)
```

Notice that this search references the **`auto`** datatype function, which ensures that Boolean, JSON, and null field values are appropriately typed alongside numeric and string values.

Alternatively, you can use **`default_type`** to apply the **`auto`** datatype function to all fields returned by a search:

```splunk
... | tojson default_type=auto
```

-----

### 5\. Apply the Boolean datatype to a specific field

This example generates JSON objects containing values of the **`isInternal`** field. It uses the **`bool`** datatype function to apply the Boolean datatype to those field values.

```splunk
... | tojson bool(isInternal)
```

-----

### 6\. Include internal fields and assign a 'null' value to skipped fields

This example demonstrates usage of the **`include_internal`** and **`fill_null`** arguments.

```splunk
... | tojson include_internal=true fill_null=true
```

-----

### 7\. Designate a default datatype for a set of fields and write the JSON objects to another field

This search generates JSON objects based on the values of four fields. It uses the **`default_type`** argument to convert the first three fields to the **`num`** datatype. It applies the string datatype to a fourth field. Finally, it writes the finished JSON objects to the field **`my_JSON_field`**.

```splunk
... | tojson age height weight str(name) default_type=num output_field=my_JSON_field
```
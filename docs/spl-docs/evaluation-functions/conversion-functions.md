
# Conversion Functions

_This list includes functions designed for converting between various data formats._

## **ipmask(&lt;mask&gt;&lt;ip&gt;)**

This function generates a new masked IP address by applying a bitwise AND operation between a mask and an IP address. It simplifies the isolation of an IPv4 address octet without splitting the IP address.

### Usage

The `<mask>` argument must be a valid IPv4 address. The `<ip>` argument must be a valid IPv4 address or a field name containing a valid IPv4 address.

A valid IPv4 address uses quad-dotted notation of four decimal integers, each ranging from 0-255.

For the `<mask>` argument, you can specify a default subnet mask like `255.255.255.0`.

You can use this function with the `eval` and `where` commands, in the `WHERE` clause of the `from` command, and as part of evaluation expressions with other commands.

### Example

1. Using the `ipmask` function with the `eval` command. The output of this example is 10.20.30.0:
```spl
... | eval maskedIP = ipmask("255.255.255.0", "10.20.30.120")
```

2. Masking IP addresses in the `clientip` field and returning the results in a new field called `maskedip`:
```spl
... | eval maskedip=ipmask("0.255.0.244", clientip)
```
 
3. Filtering events based on a specific masked IP value:
```spl
... | where ipmask("0.255.0.224", clientip)="10.20.30.120"
```

## **tonumber(&lt;str&gt;, &lt;base&gt;)**

This function converts a string to a number. The base is optional and defaults to base 10 if not specified.

### Usage

You can use this function with the `eval` and `where` commands, in the `WHERE` clause of the `from` command, and as part of evaluation expressions with other commands.

The `<str>` argument can be a field name or a value.

The `<base>` argument specifies the base of the number in `<str>`. It can range from 2 to 36, with the default being 10 (decimal system).

If the `tonumber` function cannot parse a field value to a number (e.g., if the value contains leading or trailing spaces), the function returns `NULL`. Use the `trim` function to remove such spaces.

If the `tonumber` function cannot parse a literal string to a number, it returns an error.

### Example
1. Converting the string values in the `ssn` field to numbers using the default base:
```spl
... | eval n=tonumber(ssn)
```

2. Converting a hexadecimal number to a decimal number using a base of 16 to return the number "164":
```spl
... | eval n=tonumber("0A4",16)
```

3. Trimming leading or trailing spaces from values in the `celsius` field before converting it to a number:
```spl
... | eval temperature=tonumber(trim(celsius))
```

## **tostring(&lt;value&gt;, &lt;format&gt;)**

This function converts a value to a string using the specified format.

If the input value is a number, it reformats it as a string. If the input value is Boolean, it returns the corresponding string value, "True" or "False".

### Usage

You can use this function with the `eval` and `where` commands and as part of evaluation expressions with other commands.

If `<value>` is a number, the second argument `<format>` is optional and can be "hex", "commas", or "duration".

### Example

1. Converting 615 seconds to minutes and seconds, returning `period=615` and `period_time=00:10:15`:
```spl
... | eval period=615 
| eval period_time = tostring(period, "duration")
```


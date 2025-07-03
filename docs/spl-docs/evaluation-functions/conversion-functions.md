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

### Use-Case Example

**Problem**: A small business wants to monitor its network traffic to detect when devices outside its local network make requests. This is part of a double-check mechanism to ensure their firewall is effectively blocking unauthorized access.

**Solution**: The `ipmask` function can be used to identify requests coming from outside the office network subnet. By filtering out local network traffic, any remaining traffic can be assumed to be from external sources, thus indicating potential unauthorized access attempts or failures in the firewall configuration.

**Implementation**:

```spl
... | eval isExternal = if(ipmask("255.255.255.0", ip_address) != "192.168.1.0", "true", "false") | where isExternal="true"
```

**Explanation**:

- The `eval` command applies a subnet mask (`255.255.255.0`) to the `ip_address` field, generating a subnet identifier for each IP address
- An `if` statement checks if the masked IP address does not match the office network's subnet (`192.168.1.0`), marking it as `true` for external network devices.
- The `where` clause filters the results to include only devices identified as being outside the office network, highlighting potential unauthorized access attempts or firewall configuration issues.

## **printf(&lt;format_specifier&gt;[,&lt;argument&gt;]...)**

This function generates a string formatted using the arguments passed to it. The syntax for `<format_specifier>` is similar to that of C's `printf()` function.

### Usage

The `<format_specifier>` argument must be a valid format specifier, or a field name containing a valid format specifier. Each `<argument>` may be a value of the appropriate data type or a field name containing a value of the appropriate data type.

You can use this function with the `eval` and `where` commands, and as part of evaluation expressions with other commands.

### Printf Format Specifiers

The conversion specifiers follow the syntax: `%[<flags>][<width>][.<precision>]<conversion_specifier>`

#### Conversion Specifier

| Specifier(s) | Description               | Example                                     |
|--------------|---------------------------|---------------------------------------------|
| `%d`         | Signed decimal integer    | `printf("%d", 123)` : `123`                 |
| `%u`         | Unsigned decimal integer  | `printf("%u", 123)` : `123`                 |
| `%o`         | Unsigned octal            | `printf("%o", 8)` : `10`                    |
| `%x`, `%X`   | Hexadecimal (lower/upper) | `printf("%x, %X", 255, 255)` : `ff, FF`     |
| `%f`         | Floating point (decimal)  | `printf("%.2f", 3.14159)` : `3.14`          |
| `%e`         | Float (exponential)       | `printf("%.1e", 12345.0)` : `1.2e+04`       |
| `%g`         | Float (auto `%e` or `%f`) | `printf("%.3g", 12345.0)` : `1.23e+04`      |
| `%s`         | String                    | `printf("%s", "go")` : `go`                 |
| `%c`         | Unicode code point        | `printf("%c", 65)` : `A`                    |
| `%%`         | Literal percent sign      | `printf("%%")` : `%`                        |

#### Flags

| Flag    | Description                                   | Example                                                     |
|---------|-----------------------------------------------|----------------------------------------------------------   |
| `'`     | Adds commas as thousands separators           | `printf("%'d", 1234567)` : `1,234,567`                      |
| `-`     | Left-justify                                  | `printf("\|%-5d\|", 42)` : `\|42   \|`                      |
| `0`     | Pad number with leading zeros                 | `printf("%05d", 42)` : `00042`                              |
| `+`     | Always include sign                           | `printf("%+d", 42)` : `+42`<br/>`printf("%+d", 0)` : `+0`   |
| (space) | Prefix space for positive numbers and zero    | `printf("% d", 42)` : ` 42`                                 |
| `#`     | Alternate form (`0`/`0x` prefix or force dot) | `printf("%#x", 31)` : `0x1f`<br/>`printf("%#o", 8)` : `010` |

#### Field Width

| Width     | Description                                 | Example                                |
|-----------|---------------------------------------------|----------------------------------------|
| number    | Minimum field width (pads with spaces)      | `printf("%6s", "go")` : `"    go"`     |
| `*`       | Dynamic width from argument                 | `printf("%*d", 5, 7)` : `"    7"`      |

#### Precision

| Applies To                    | Description                                  | Example                                         |
|-------------------------------|----------------------------------------------|-------------------------------------------------|
| `%d`,`%i`,`%o`,`%u`,`%x`      | Minimum digits (pads with zeros)             | `printf("%.5d", 42)` : `00042`                  |
| `%f`,`%e`,`%g`                | Digits after decimal / significant digits    | `printf("%.3f", 2.71828)` : `2.718`             |
| `%s`                          | Maximum string length                        | `printf("%.3s", "gopher")` : `gop`              |
| `.*`                          | Precision specified by argument              | `printf("%.*f", 3, 1.23456)` : `1.235`          |
| `.` (no number)               | Precision zero                               | `printf("%.d", 0)` : `​`(_empty string_)<br/>`printf("%.f", 12.34)` : `12`                   |
<!-- We use a zero-width space between the backticks in the first Precision-zero example to show an empty string; it shows up as two backticks otherwise -->

### Use-Case Example

**Problem**: An operations team needs to generate a human-readable report in Splunk that shows disk usage percentages and service names in aligned columns. The default output is hard to scan because numeric fields and strings vary in length.

**Solution**: The `printf` function can format numbers and strings with fixed widths, padding, and precision. By left-justifying service names and zero-padding percentages to two decimal places, the report becomes easy to read.

**Implementation**:

```spl
... | eval pct_used = round(disk_used / disk_total * 100, 2), report_line = printf("%-20s %06.2f%%", service_name, pct_used) | table report_line
```


**Explanation**:

- The `eval` command `round(disk_used / disk_total * 100, 2)` computes the disk usage percentage to two decimal places
- `printf("%-20s %06.2f%%", service_name, pct_used)`:
   - `%-20s` left-justifies the service name in a 20-character field
   - `%06.2f`formats the percentage with at least 6 characters, two after the decimal, padding with leading zeros
   - `%%` emits a literal percent symbol
- `table report_line` displays each formatted line as a single column, making it easy to scan service names and usage side by side

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
... | eval n=tonumber("0A4", 16)
```

### Use-Case Example

**Problem**: A web application stores user interaction times (like page load time) as strings in a log file. To optimize the user experience, the development team needs to calculate the average page load time.

**Solution**: Use the `tonumber` function to convert the string representations of interaction times into numeric values, enabling the calculation of the average page load time.

**Implementation**:

```spl
... | eval loadTimeNumeric = tonumber(loadTimeString) | stats avg(loadTimeNumeric) as avgLoadTime
```

**Explanation**:

- The `eval` command uses the `tonumber` function to convert the loadTimeString (which is in string format) into a numeric value loadTimeNumeric.
- The `stats` command then calculates the average of these numeric values (avgLoadTime), providing the development team with the information needed to identify performance bottlenecks and improve the user experience.

## **tostring(&lt;value&gt;, &lt;format&gt;)**

This function converts a numeric, boolean, or NULL value to a string, optionally formatting the output based on the specified format. If the value is a field name and a row has NULL, it returns an empty string. The function does not directly support multivalue fields without preprocessing.

### Usage

The `tostring` function is used within `eval`, `where`, and other commands for converting numbers or boolean values to strings. The `<format>` argument is optional and can be used to apply specific formatting styles such as hexadecimal ("hex"), with commas ("commas"), or as a duration ("duration").

### Formatting Details

- **Hexadecimal ("hex")**: Converts a numeric value to its hexadecimal representation. If the value is not numeric, the result is undefined.
- **With Commas ("commas")**: Formats a numeric value with commas as thousands separators. If the value is not numeric, the result is undefined.
- **Duration ("duration")**: Converts a numeric value representing seconds into a duration format (e.g., "HH:MM:SS"). If the value is not numeric, the result is undefined. If the duration is negative, `tostring` handles it by displaying the negative sign before the converted duration. For example, a negative duration of -3600 seconds would be converted to -01:00:00 (representing negative 1 hour). 

### Example

1. **Hexadecimal Conversion**: Converting a decimal number to a hexadecimal string:
   ```spl
   ... | eval hexValue=tostring(255, "hex")
   ```
   This converts the decimal number `255` into the hexadecimal string `"ff"`.

2. **Formatting with Commas**: Converting a large number to a string with commas:
   ```spl
   ... | eval formattedNumber=tostring(1234567, "commas")
   ```
   This converts the number `1234567` into the string `"1,234,567"`.

3. **Duration Formatting**: Converting seconds to a duration format:
   ```spl
   ... | eval duration=tostring(3661, "duration")
   ```
   This converts `3661` seconds into the string representing the duration `"1:01:01"` (1 hour, 1 minute, and 1 second).

### Use-Case Example

**Problem**: A DevOps team needs to analyze high-value transactions in their e-commerce platform logs. They want to quickly identify transactions above a certain threshold and make the large amounts more readable in their dashboards and searches.

**Solution**: Use the `tostring` function to convert numeric transaction amounts into formatted strings with commas.

**Implementation**:

```spl
... | where transaction_amount > 10000 | eval formatted_amount=tostring(transaction_amount, "commas")
```

**Explanation**:

- The `eval` command uses the `tostring` function to create a new field `formatted_amount`, converting the numeric `transaction_amount` into a string with commas as thousands separators.

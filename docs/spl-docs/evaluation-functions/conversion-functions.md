
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

**Problem**: A small business wants to ensure that only devices from its office network can access certain sensitive resources. They need a simple way to verify the network segment of incoming connections.

**Solution**: The `ipmask` function can be used to filter connections, allowing only those from the office network subnet. This method is straightforward and doesn't require complex network configuration.

**Implementation**:

```spl
... | eval isOfficeNetwork = if(ipmask("255.255.255.0", ip_address) = "192.168.1.0", "true", "false")
     | where isOfficeNetwork="true"
```

**Explanation**:

- The `eval` command applies a subnet mask (`255.255.255.0`) to the `ip_address` field, generating a subnet identifier for each IP address.
- An `if` statement checks if the masked IP address matches the office network's subnet (`192.168.1.0`), marking it as `true` for office network devices.
- The `where` clause filters the results to include only devices identified as being on the office network, ensuring that only these devices can access the sensitive resources.

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
... | eval loadTimeNumeric = tonumber(loadTimeString)
     | stats avg(loadTimeNumeric) as avgLoadTime
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
- **Duration ("duration")**: Converts a numeric value representing seconds into a duration format (e.g., "HH:MM:SS"). If the value is not numeric, the result is undefined.

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

**Problem**: A financial application displays transaction amounts in a user's activity feed. To enhance readability, the application needs to format large transaction amounts with commas.

**Solution**: Use the `tostring` function to convert numeric transaction amounts into formatted strings with commas.

**Implementation**:

```spl
... | eval formattedAmount=tostring(transactionAmount, "commas")
```

**Explanation**:

- The `eval` command uses the `tostring` function to convert the numeric `transactionAmount` into a string, applying the "commas" format. This makes large numbers easier to read by adding commas as thousands separators.
- Displaying transaction amounts in this format improves the user experience by making financial data more accessible and understandable.
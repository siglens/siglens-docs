# Text functions

_This list includes functions that manipulates text data._

## lower(\<str\>)
This function returns a new string that is lowercase version of `<str>`.

#### Usage
- `<str>` argument can be a string literal or a field name. 
- One can use this function with an eval command.

#### Example
The following command returns lowercase version of the string in field name.
```
... | eval lowercase_name=lower(name)
```
The following command returns lowercase version of the given string i.e. `"abc z"`.
```
... | eval lowercase_str=lower("Abc Z")
```



## upper(\<str\>)
This function returns a new string that is uppercase version of `<str>`.

#### Usage
- `<str>` argument can be a string literal or a field name. 
- One can use this function with an eval command.

#### Example
The following command returns uppercase version of the string in field name.
```
... | eval uppercase_name=upper(name)
```
The following command returns a uppercase version of the given string i.e. `"ABC Z"`.
```
... | eval uppercase_str=upper("Abc Z")
```




## trim(\<str\>, \<trim_chars\>)
This function trims the characters present in the `<trim_chars>` from the both sides of the `<str>` and returns this new string.

`<trim_chars>` is an optional argument. If not present, it would remove leading and trailing spaces and tabs from `<str>` and return this new string. Other types of whitespace characters would remain unaffected.

#### Usage
- `<str>` argument can be a string literal or a field name. 
- `<trim_chars>` is a string containing characters that needs to be trimmed. 
- One can use this function with an eval command.

#### Example
The following command returns the trimmed version (without any leading or trailing spaces and tabs) of the address.
```
... | eval trimmed_address=trim(address)
```

The following command trims the characters _a_, _Z_ and _space_ from both sides of the given string and returns this new string `"BcDe"`.
```
... | eval trimmed_str=trim("  aaBcDeZ ", "aZ ")
```



## ltrim(\<str\>, \<trim_chars\>)
This function trims the characters present in the `<trim_chars>` from the left side of the `<str>` and returns this new string.

`<trim_chars>` is an optional argument. If not present, it would remove leading spaces and tabs from the `<str>` and return this new string. Other types of whitespace characters would remain unaffected.

#### Usage
- `<str>` argument can be a string literal or a field name. 
- `<trim_chars>` is a string containing characters that needs to be trimmed. 
- One can use this function with an eval command.

#### Example
The following command returns the left trimmed version (without any leading spaces or tabs) of the address.
```
... | eval left_trimmed_address=ltrim(address)
```

The following command trims the characters _a_, _Z_ and _space_ from the left side of the given string and returns this new string `"BcDeZ "`.
```
... | eval left_trimmed_str=ltrim("  aaBcDeZ ", "aZ ")
```


## rtrim(\<str\>, \<trim_chars\>)
This function trims the characters present in the `<trim_chars>` from the right side of the `<str>` and returns this new string.

`<trim_chars>` is an optional argument. If not present, it would remove leading spaces and tabs from the `<str>` and return this new string. Other types of whitespace characters would remain unaffected.

#### Usage
- `<str>` argument can be either a string literal or a field name. 
- `<trim_chars>` is a string containing characters that needs to be trimmed. 
- One can use this function with an eval command.

#### Example
The following command returns the right trimmed version (without any trailing spaces or tabs) of the address.
```
... | eval right_trimmed_address=rtrim(address)
```

The following command trims the characters _a_, _Z_ and space from the right side of the given string and returns this new string `"  aaBcDe"`.
```
... | eval right_trimmed_str=rtrim("  aaBcDeZ ", "aZ ")
```


## replace(\<str\>,\<regex\>,\<replacement\>)
This function substitutes every occurence of the regular expression `<regex>` match in `<str>` with the `<replacement>` string.

#### Usage
- `<str>` argument can be either a string literal or a field name. 
- `<regex>` is a string containing regular expression pattern. 
- `<replacement>` is a string literal.
- One can use this function with an eval command.

#### Example
The following command replaces the prefix of the string in field email with `"xxxxx"` and returns this new string which is a masked email.
```
... | eval masked_email=replace(email, "^([^@]+)@", "xxxxx@")
```



## substr(\<str\>,\<start\>,\<length\>)

This functions returns a substring of `<str>` starting at index `<start>`. `<length>` denotes the number of characters to return from `<start>` index.

#### Usage
- `<str>` argument can be a string literal or a field name. 
- `<length>` argument is optional if not present would return the rest of the string.
- Indexes start at 1 not 0. Negative indexes can be used to indicate start from the end of the string.
- One can use this function with an eval command.

#### Example
The following command returns the first 4 characters of string in field name.
```
... | eval substr_name=substr(name, 1, 4)
```
The following command returns the last -5 characters of the given string i.e. `"melon"`.
```
... | eval substr_str=substr("Watermelon", -5)
```



## len(\<str\>)
This function returns the length of `<str>`.

#### Usage
- `<str>` argument can be a field name. 
- One can use this function with an eval command.

#### Example
The following command returns the length of the string in field name.
```
... | eval len_name=len(name)
```




## urldecode(\<url\>)
This function decodes `<url>` and returns this decoded url.

#### Usage
- `<url>` argument can be a string literal or a field name. 
- One can use this function with an eval command.

#### Example
The following command decodes the given url and returns `"https://www.siglens.com/index.html"`.
```
... | eval decoded_url=urldecode("https%3A%2F%2Fwww.siglens.com%2Findex.html")
```





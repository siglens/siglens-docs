# Multivalue functions

_This list includes functions that manipulates text data._



## split(\<str\>, \<delim\>)
This function splits `<str>` with the delimiter `<delim>` and return these parts as a multivalue field.

#### Usage
- `<str>` argument can be either a string literal or a field name. 
- `<delim>` is a string literal referring the delimiter. 
- One can use this function with an eval command.

#### Example
The following command returns the split parts of the given string as a multivalue field fruits having values `apple`, `banana`, `mango` and `kiwi`.
```
... | eval fruits=split("apple:banana:mango:kiwi", ":")
```
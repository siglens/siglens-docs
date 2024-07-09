# Statistical eval functions

The following list contains the evaluation functions that you can use to calculate statistics.

## max(\<values>)

This function takes one or more numeric or string values and returns the maximum value. Strings are greater than numbers.

### Usage

The `<values>` argument can be list of strings or numbers or a field name.

### Example

The following example returns either `"foo"` or the value in the name field. Splunk searches use lexicographical order, where numbers are sorted before letters. If the value in the name field is `"baz"`, then `"foo"` is returned. If the value in the name field is `"zaz"`, then `"zaz"` is returned.

```
... | eval n=max(1, 3, 6, 7, "foo", name)
```

This example returns the maximum value in a multivalue field.

The following search creates a field called `n` with a single value, which is a series of numbers. The `makemv` command is used to make the single value into multiple values, each of which appears on it's own row in the results. Another new field called `maxn` is created which takes the values in `n` and returns the maximum value, `6`.

```
... | eval n = "1 3 5 6 4 2" | makemv n | eval maxn = max(n)
```

## min(\<values>)

This function one or more numeric or string values and returns the minimum value. Strings are greater than numbers.

### Usage

The `<values>` argument can be list of strings or numbers or a field name.

### Example

The following example returns either `3` or the value in the `size` field. Splunk searches use lexicographical order, where numbers are sorted before letters. If the value in the `size` field is `9`, then `3` is returned. If the value in the `size` field is `1`, then `1` is returned.

```
... | eval n=min(3, 6, 7, "maria", size)
```

The following example returns the minimum value in a multivalue field.

This search creates a field called `n` with a single value, which is a series of numbers. The `makemv` command is used to make the single value into multiple values, each of which appears on it's own row in the results. Another new field called `minn` is created which takes the values in `n` and returns the minimum value, `2`.

```
... | eval n = "3 5 6 4 7 2" | makemv n | eval minn = min(n)
```

## random()

This function returns a pseudo-random integer ranging from `0 to 231-1`.

### Example

The following example returns a random integer, such as 0...2147483647.

```
... | eval n=random()
```

The following example returns a random number within a specified range. In this example the random number is between 1 and 100,000.

```
... | eval n=(random() % 100000) + 1
```

This example takes a random number and uses the modulo mathematical operator `( % )` to divide the random number by `100000`. This ensures that the random number returned is not greater than `100000`. The number remaining after the division is increased by `1` to ensure that the number is at least greater than or equal to `1`.



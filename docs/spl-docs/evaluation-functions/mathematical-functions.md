# Mathematical Functions

The following list contains the functions that you can use to perform mathematical calculations.

## abs(\<num>)

This function returns absolute value of a number.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example creates a field called abs_latitude, whose values are the absolute values of the numeric field latitude.

```
... | eval abs_latitude=abs(latitude)
```

## exact(\<expression>)

This function returns the result of a numeric eval calculation with a larger amount of precision in the formatted output.

### Usage

The `<expression>` argument can be any mathematical expression and the expression can include the values of a numeric field.

### Example

Calculates the circumference of a set of circles by multiplying pi by the values in the diameter field.

```
... | eval n=exact(3.14 * diameter)
```

## exp(\<num>)

This function returns the exponential function `e^X` of a number.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example creates a field called y, whose values are the exponent of 3. In other words, the below example returns `y=e^3`

```
... | eval y=exp(3)
```

## ceil(\<num>) or ceiling(\<num>)

This function rounds a number up to the next highest integer.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example returns n=2.

```
... | eval n=ceil(1.9)
```

## floor(\<num>)

This function rounds a number down to the nearest whole integer.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example returns 1.

```
... | eval n=floor(1.9)
```

## round(\<num>, \<precision>)

This function returns a number rounded to the decimal places specified by the precision. 

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal. 

The `<precision>` is optional, and if omitted the round function rounds to an integer.
You cannot specify a negative number for the precision.

### Example

#### Specifying a value without precision

The following example returns `n=4`. Because a `<precision>` is not specified, the number is rounded to the integer.

```
... | eval n=round(3.5)
```

#### Specifying a value and a precision

The following example returns n=2.56.

```
... | eval n=round(2.55556, 2)
```

## ln(\<num>)

This function returns the natural logarithm of a number.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal. 

### Example

The following example returns the natural logarithm of the values in the bytes field.

```
... | eval nat_logarithm=ln(bytes)
```

## log(\<num>, \<base>)

This function returns the logarithm of a number using a base. 

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

The `<base>` is optional, and if omitted the log function uses base 10.

### Example

The following example returns the logarithm of the values of the number field, using base 2.

```
... | eval num=log(number,2)
```

The following example returns the logarithm of the numeric literal 100000, using base 10.

```
... | eval num=log(100000)
```

## pow(\<num>, \<exp>)

This function returns a number to the power of the exponent.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

The `<exp>` argument is the exponent.

### Example

The following example calculates the area of a circle, which is pi() multiplied by the radius to the power of 2.

```
... | eval area_circle=pi()*pow(radius,2)
```

## pi()

This function takes no arguments and returns the constant 'pi to 11 digits of precision.

### Usage

This function is useful whenever the precise value of π is required, eliminating the need to manually enter its value.

### Example

The following example calculates the area of a circle, which is pi() multiplied by the radius to the power of 2.

```
... | eval area_circle=pi()*pow(radius,2)
```

## sqrt(\<num>)

This function returns the square root of a number.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example returns 3:

```
... | eval n=sqrt(9)
```













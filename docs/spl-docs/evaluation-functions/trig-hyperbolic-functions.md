# Trigonometric and Hyperbolic functions

The following list contains the functions that you can use to calculate trigonometric and hyperbolic values.

## acos(x)

This function computes the arc cosine of `x`, in the interval `[0, pi]` radians. The valid input domain for `x` is `[-1, 1]`. If `x` is outside this domain, the behavior is `undefined`.

### Example

This example returns `1.5707963267948966`.

```
... | eval n=acos(0)
```

The following example converts the `acos(0)` from radians to degrees. This example returns `90.0000000003`.

```
... | eval degrees=acos(0)*180/pi()
```

## acosh(x)

This function computes the arc hyperbolic cosine of `x` radians. The valid input domain for `x` is `[1, ∞)`. If `x` is less than 1, the behavior is `undefined`.

### Example

This example returns `1.3169578969248166`.

```
... | eval n=acosh(2)
```

## asin(x)

This function computes the arc sine of `x`, in the interval `[-pi/2, +pi/2]` radians. The valid input domain for `x` is `[-1, 1]`. If `x` is outside this domain, the behavior is `undefined`.

### Example

This example returns `1.5707963267948966`.

```
... | eval n=asin(1)
```

The following example converts the `asin(1)` from radians to degrees. This example returns `90.0000000003`.

```
... | eval degrees=asin(1)*180/pi()
```

## asinh(x)

This function computes the arc hyperbolic sine of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `0.881373587019543`.

```
... | eval n=asinh(1)
```

## atan(x)

This function computes the arc tangent of `x`, in the interval `[-pi/2, +pi/2]` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `0.4636476090008061`.

```
... | eval n=atan(0.50)
```

## atanh(x)

This function computes the arc hyperbolic tangent of `x` radians. The valid input domain for `x` is `(-1, 1)`. If `x` is outside this domain, the behavior is `undefined`.

### Example

This example returns `0.5493061443340549`.

```
... | eval n=atanh(0.50)
```

## cos(x)

This function computes the cosine of an angle of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `0.5403023058681398`.

```
... | eval n=cos(-1)
```

The following example calculates the cosine of π and returns `-1.00000000000`.

```
... | eval n=cos(pi())
```

## cosh(x)

This function computes the hyperbolic cosine of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `1.5430806348152437`.

```
... | eval n=cosh(1)
```

## sin(x)

This function computes the sine of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `0.8414709848078965`.

```
... | eval n=sin(1)
```

The following search calculates the sine of π divided by 180 and then multiplied by 90.

```
... | eval n=sin(90 * pi()/180)
```

## sinh(x)

This function computes the hyperbolic sine of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `1.1752011936438014`.

```
... | eval n=sinh(1)
```

## tan(x)

This function computes the tangent of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `1.5574077246549023`.

```
... | eval n=tan(1)
```

## tanh(x)

This function computes the hyperbolic tangent of `x` radians. There are no restrictions on the input domain for `x`.

### Example

This example returns `0.7615941559557649`.

```
... | eval n=tanh(1)
```
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

### Use-Case Example

**Monitor the disk space utilization across multiple servers.**

**Problem:** A user wants to identify servers where disk space usage has deviated significantly (either increased or decreased) from the average usage. This helps in proactive management of disk space to avoid over-utilization or under-utilization issues.

**Solution:** The `abs()` command can be used to calculate the absolute deviation from the average disk space usage, making it easier to identify the servers that significantly deviated from the average usage.

```
index=disk_space_usage
| stats latest(disk_usage) as current_disk_usage, avg(disk_usage) as avg_disk_usage by server
| eval deviation = current_disk_usage - avg_disk_usage
| eval abs_deviation = abs(deviation)
| where abs_deviation > 20
| fields server, current_disk_usage, avg_disk_usage, deviation, abs_deviation
```

**Explanation:**
1. The `stats` command calculates the latest (`current_disk_usage`) and average (`avg_disk_usage`) disk usage per server.
2. The `eval` command computes the deviation between the current and average disk usage (`deviation = current_disk_usage - avg_disk_usage`).
3. The `abs()` function is used to calculate the absolute value of the deviation (`abs_deviation = abs(deviation)`).
4. The `where` clause filters the results to show only the servers with an absolute deviation greater than 20.
5. The `fields` command selects the relevant fields (`server`, `current_disk_usage`, `avg_disk_usage`, `deviation`, `abs_deviation`) for output.

## exact(\<expression>)

This function returns the result of a numeric eval calculation with a larger amount of precision in the formatted output.

### Usage

The `<expression>` argument can be any mathematical expression and the expression can include the values of a numeric field.

### Example

Calculates the circumference of a set of circles by multiplying pi by the values in the diameter field.

```
... | eval n=exact(3.14 * diameter)
```

### Use-Case Example

**Calculate precise financial metrics**

**Problem:** A user wants to calculate the exact amount of sales tax for a set of transactions. This requires high precision due to the financial nature of the data.

**Solution:** The `exact()` command can be used to ensure the precision of the sales tax calculation.

```
index=sales_transactions
| eval item_total = item_price * quantity
| eval sales_tax = exact((item_total + shipping_fee - discount) * 0.0825)
| fields transaction_id, item_price, quantity, item_total, shipping_fee, discount, total_amount, sales_tax
```

**Explanation:**
1. The `eval` command calculates the total item cost by multiplying the `item_price` by the `quantity` (`item_total = item_price * quantity`).
2. The `eval` command calculates the sales tax using the `exact()` function to ensure high precision, by adding `item_total`, `shipping_fee`, and subtracting `discount`, then multiplying by the tax rate (`sales_tax = exact((item_total + shipping_fee - discount) * 0.0825)`).

## exp(\<num>)

This function returns the exponential function `e^X` of a number.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example creates a field called y, whose values are Euler's number raised to the third power. In other words, the below example returns `y=e^3`

```
... | eval y=exp(3)
```

### Use-Case Example

**Calculate compound interest growth**

**Problem:** A user wants to calculate the future value of an investment with continuous compounding interest. The formula for continuous compounding is given by `Accumulated_Amount = Principal * e^(annual_interest_rate * time_years)`, where:

**Solution**: The `exp()` command can be used to compute `e^(annual_interest_rate * time_years)`.

```
index=investment_data
| eval principal = 1000
| eval annual_interest_rate = 0.05
| eval time_years = 10
| eval growth_factor = exp(annual_interest_rate * time_years)
| eval future_value = principal * growth_factor
| fields principal, annual_interest_rate, time_years, growth_factor, future_value
```
**Explanation:**
1. The `eval` command assigns the principal amount (`principal = 1000`), the annual interest rate (`annual_interest_rate = 0.05`), and the investment duration in years (`time_years = 10`).
2. The `eval` command calculates the growth factor using the `exp()` function to compute `e^(annual_interest_rate * time_years)` (`growth_factor = exp(annual_interest_rate * time_years)`).
3. The `eval` command calculates the future value of the investment by multiplying the principal by the growth factor (`future_value = principal * growth_factor`).

## ceil(\<num>) or ceiling(\<num>)

This function rounds a number up to the next highest integer.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example returns `n=2`.

```
... | eval n=ceil(1.9)
```

### Use-Case Example

**Round up transaction amounts to the nearest whole dollar**

**Problem:** A user wants to round up transaction amounts to the nearest whole dollar for accounting purposes. This can be useful when dealing with financial reports where only whole dollar amounts are required.

**Solution**: The `ceil()` command can be used to round up the transaction amounts.

```
index=transactions
| eval rounded_amount = ceil(amount)
| fields transaction_id, amount, rounded_amount
```

**Explanation:**

1. `amount` represents the original transaction amount which might be a decimal.
2. `rounded_amount` is calculated using `ceil(amount)`, which rounds up the transaction amount to the next highest integer.

This ensures that all transaction amounts are rounded up to the nearest whole dollar, simplifying financial reporting and ensuring consistency in the data.

## floor(\<num>)

This function rounds a number down to the nearest whole integer.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

### Example

The following example returns `1`.

```
... | eval n=floor(1.9)
```

### Use-Case Example

**Calculate shipping charges based on weight**

**Problem:** A user wants to calculate shipping charges based on the weight of items. The shipping company charges a flat rate for each whole kilogram, and any fraction of a kilogram is rounded down to the nearest whole number to avoid overcharging.

**Solution:** The `floor()` command can be used to round down the weight to the nearest whole kilogram.

```
index=shipping_data
| eval weight_kg = weight_grams / 1000
| eval rounded_weight_kg = floor(weight_kg)
| eval shipping_charge = rounded_weight_kg * flat_rate_per_kg
| fields order_id, weight_grams, weight_kg, rounded_weight_kg, shipping_charge
```

**Explanation:**

1. `weight_kg` is calculated by converting the weight from grams to kilograms.
2. `rounded_weight_kg` is calculated using `floor(weight_kg)`, which rounds down the weight to the nearest whole kilogram.
3. `shipping_charge` is then calculated by multiplying the `rounded_weight_kg` by the `flat_rate_per_kg`.

This ensures that shipping charges are calculated based on whole kilograms, adhering to the shipping company's pricing policy and preventing overcharging customers for partial kilograms.

## round(\<num>, \<precision>)

This function returns a number rounded to the decimal places specified by the precision.

### Usage

The `<num>` argument can be either a numeric field or a numeric literal.

The `<precision>` argument is optional. If omitted, the function rounds the number to the nearest integer. 
`<precision>` must be a non-negative integer that specifies the number of decimal places to round to.

### Example

#### Specifying a value without precision

The following example returns `n=4`. Because a `<precision>` is not specified, the number is rounded to the integer.

```
... | eval n=round(3.5)
```

#### Specifying a value and a precision

The following example returns `n=2.56`.

```
... | eval n=round(2.55556, 2)
```

### Use-Case Example

**Calculate average transaction amounts**

**Problem:** A user wants to display the average transaction amounts in a financial report. The average amounts should be rounded to two decimal places for clarity and consistency in the report.

**Solution:** The `round()` command can be used to round the average transaction amounts to two decimal places.

```
index=financial_transactions
| stats avg(transaction_amount) as avg_amount by account_id
| eval avg_amount_rounded = round(avg_amount, 2)
| fields account_id, avg_amount, avg_amount_rounded
```

**Explanation:**
1. The `stats` command calculates the average transaction amount for each account.
2. The `eval` command rounds the average amount to two decimal places using `round(avg_amount, 2)`.

This ensures that the average transaction amounts are displayed with two decimal places, making the financial report clear and consistent.

## ln(\<num>)

This function returns the natural logarithm of a number.

**Note**: This is *"ln"* (lowercase L for natural logarithm), not *"In"* (uppercase I).

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal. 

### Example

The following example returns the natural logarithm of the values in the `bytes` field.

```
... | eval nat_logarithm=ln(bytes)
```

### Use-Case Example

**Analyze exponential growth in website traffic**

**Problem:** A user wants to analyze the exponential growth of website traffic over time. The natural logarithm can be used to transform the data, making it easier to identify trends and growth patterns.

**Solution:** The `ln()` command can be used to calculate the natural logarithm of the number of website visits, which helps in analyzing growth trends.

```
index=web_traffic
| stats sum(visits) as total_visits by date
| eval log_visits = ln(total_visits)
| fields date, total_visits, log_visits
```

**Explanation:**
1. The `stats` command calculates the total number of website visits per day.
2. The `eval` command calculates the natural logarithm of the total visits using `ln(total_visits)`.

This allows the user to analyze the log-transformed data to identify exponential growth patterns in website traffic.

## log(\<num>, \<base>)

This function returns the logarithm of a number using a base. 

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal. The value of `<num>` must be greater than 0.

The `<base>` is optional, and if omitted the log function uses base 10. The value of `<base>` must be greater than 0 and not equal to 1.

### Example

The following example returns the logarithm of the values of the `number` field, using base 2.

```
... | eval num=log(number,2)
```

The following example returns the logarithm of the numeric literal `100000`, using base 10.

```
... | eval num=log(100000)
```

### Use-Case Example

**Analyze order of magnitude in financial transactions**

**Problem:** A user wants to categorize financial transactions based on their order of magnitude to identify large, medium, and small transactions for risk assessment and reporting purposes.

**Solution:** The `log()` command can be used to calculate the logarithm of transaction amounts, making it easier to categorize them based on their magnitude.

```
index=financial_transactions
| eval log_amount = log(transaction_amount, 10)
| eval category = case(log_amount >= 5, "Large", log_amount >= 3, "Medium", log_amount < 3, "Small")
| fields transaction_id, transaction_amount, log_amount, category
```

**Explanation:**
1. The `eval` command calculates the logarithm (base 10) of the transaction amounts using `log(transaction_amount, 10)`.
2. The `category` field is created using a `case` statement to categorize transactions based on their logarithmic value.

This allows the user to categorize transactions efficiently, aiding in risk assessment and detailed financial reporting.

## pow(\<num>, \<exp>)

This function returns a number to the power of the exponent.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal.

The `<exp>` argument is the exponent.

### Example

The following example calculates the area of a circle, which is `pi()` multiplied by the radius to the power of 2.

```
... | eval area_circle=pi()*pow(radius,2)
```

### Use-Case Example

**Calculate future investment value with compound interest**

**Problem:** A user wants to calculate the future value of an investment based on compound interest. The formula for compound interest is given by 
```
Future_Value = Principal * (1 + annual_interest_rate/times_compounded_per_year)^(times_compounded_per_year * years)
```

**Solution:** The `pow()` command can be used to compute 
```
(1 + annual_interest_rate/times_compounded_per_year)^(times_compounded_per_year * years)
```

```
index=investment_data
| eval principal = 1000
| eval annual_interest_rate = 0.05
| eval times_compounded_per_year = 4
| eval years = 10
| eval future_value = principal * pow(1 + annual_interest_rate / times_compounded_per_year, times_compounded_per_year * years)
| fields principal, annual_interest_rate, times_compounded_per_year, years, future_value
```

## pi()

This function takes no arguments and returns the constant `pi` to 11 digits of precision.

### Usage

This function is useful whenever the precise value of π is required, eliminating the need to manually enter its value.

### Example

The following example rounds up the Pi value to two decimal places and assigns it to a new field called `pi_rounded`.

```
... | eval pi_rounded = round(pi(), 2)
```

### Use-Case Example

**Calculate the area of a circle**

**Problem:** A user wants to calculate the area of a circular field given the radius. The formula for the area of a circle is `Area = pi() * radius^2`.

**Solution:** The `pi()` command can be used to get the precise value of π for the area calculation.

```
index=circle_data
| eval radius = 5
| eval area_circle = pi() * pow(radius, 2)
| fields radius, area_circle
```

**Explanation:**
1. The `eval` command assigns the radius value.
2. The `eval` command calculates the area of the circle using `pi() * pow(radius, 2)`.

This ensures that the user can accurately calculate the area of a circle given its radius using the precise value of π.

## sqrt(\<num>)

This function returns the square root of a number.

### Usage

The `<num>` argument can be the name of a numeric field or a numeric literal and the value must be a positive number.

### Example

The following example returns `3`:

```
... | eval n=sqrt(9)
```

### Use-Case Example

**Calculate the Root Mean Square Error (RMSE) of predictions**

**Problem:** A user wants to evaluate the accuracy of a predictive model by calculating the Root Mean Square Error (RMSE) between the predicted values and the actual values. RMSE is a measure of the differences between predicted and observed values.

**Solution:** The `sqrt()` command can be used to calculate the square root as part of the RMSE calculation.

```
index=model_predictions
| eval squared_error = pow(predicted_value - actual_value, 2)
| stats avg(squared_error) as mean_squared_error
| eval rmse = sqrt(mean_squared_error)
| fields rmse
```

**Explanation:**
1. The `eval` command calculates the squared error for each prediction using `pow(predicted_value - actual_value, 2)`.
2. The `stats` command calculates the mean of the squared errors (`mean_squared_error`).
3. The `eval` command calculates the RMSE by taking the square root of the mean squared error using `sqrt(mean_squared_error)`.

This use case demonstrates how the `sqrt()` function can be applied to evaluate the accuracy of a predictive model by calculating the RMSE, providing insights into the model's performance.




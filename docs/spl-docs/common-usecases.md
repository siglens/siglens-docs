# Common Use-Cases

### 1. Identifying Potential Brute Force Attacks

**Problem:** Detecting potential brute force attacks is crucial for maintaining network security. These attacks often involve repeated attempts to connect to critical services like SSH (port 22) or RDP (port 3389) from the same source IP, aiming to guess passwords and gain unauthorized access.

**Solution:** To identify potential brute force attacks, a [`search`](search-command.md) command can be utilized to filter firewall logs for blocked connection attempts to SSH and RDP ports, count the attempts by source and destination IP, and highlight cases with a high number of attempts. [View full Solution](search-command#use-case-example)

### 2. Monitor the Disk Space Utilization Across Multiple Servers

**Problem:** A user wants to identify servers where disk space usage has deviated significantly (either increased or decreased) from the average usage. This helps in proactive management of disk space to avoid over-utilization or under-utilization issues.

**Solution:** The [`abs()`](evaluation-functions/mathematical-functions#absnum) command can be used to calculate the absolute deviation from the average disk space usage, making it easier to identify the servers that significantly deviated from the average usage. [View full Solution](evaluation-functions/mathematical-functions#use-case-example)

### 3. Calculate Precise Financial Metrics

**Problem:** A user wants to calculate the exact amount of sales tax for a set of transactions. This requires high precision due to the financial nature of the data.

**Solution:** The [`exact()`](evaluation-functions/mathematical-functions#exactexpression) command can be used to ensure the precision of the sales tax calculation. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-1)

### 4. Parsing Email Recipients

**Problem:** A company's email server logs contain a field called "recipients" that stores all email recipients as a comma-separated string. The security team wants to analyze email distribution patterns, but they need each recipient as a separate value for proper analysis.

**Solution:** The [`makemv`](makemv-command.md) command can be used to split the "recipients" field into multiple values, allowing for individual analysis of each recipient. [View full Solution](makemv-command#use-case-example)

### 5. Analyzing Event Latency in Real-Time

**Problem:** The challenge is to understand how the latency of events fluctuates over very short intervals, specifically on a second-by-second basis. This analysis is crucial for identifying performance bottlenecks in real-time systems where even minor delays can impact user experience or system efficiency.

**Solution:** The solution involves using a command sequence to [`bin`](bin-command.md) events into one-second intervals based on their timestamps, and then calculate the average latency for events within each interval. [View full Solution](bin-command#analyzing-event-latency-in-real-time)

### 6. Optimizing Network Performance by Analyzing Packet Size Distribution

**Problem:** Network administrators face challenges in managing network performance due to the wide range and uneven distribution of packet sizes. Small packets like ACKs and large data transfers coexist, affecting throughput and efficiency. Identifying patterns and anomalies in packet size distribution is crucial for network optimization and security.

**Solution:** The solution involves using a command sequence to [`bin`](bin-command.md) packet sizes using a logarithmic scale, count the occurrences of each `bin`, and then sort the results to analyze the distribution of packet sizes across the network. [View full Solution](bin-command#optimizing-network-performance-by-analyzing-packet-size-distribution)

### 7. Identifying High-Risk Transactions

**Problem:** In financial data analysis, identifying transactions that may pose a high risk is crucial for fraud detection and risk management. Transactions that exceed a certain amount and originate from countries other than the USA are often considered higher risk due to various regulatory and risk factors.

**Solution:** To efficiently identify high-risk transactions, a command can be used to analyze transaction data. This command employs the [`eval`](eval-command.md) function along with a conditional [`if`](evaluation-functions/comparison-conditional-functions#ifpredicate-true_value-false_value) statement to categorize transactions based on the `transaction_amount` and `country` fields. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-4)

### 8. Protecting Sensitive Information in Search Results

**Problem:** When analyzing data, it's crucial to safeguard sensitive information such as names, social security numbers (SSNs), addresses, and user identifiers. Displaying this information in search results can lead to privacy violations and potential security risks.

**Solution:** To prevent the exposure of sensitive information in search results, the [`fields`](fields-command.md) command in Splunk can be utilized to selectively remove fields that contain potentially identifiable and sensitive data. [View full Solution](fields-command#use-case-example)

### 9. Device Type Latency Analysis

**Problem:** The objective is to analyze network latency across different device types, identifying which devices experience higher or lower latency. This analysis is crucial for optimizing user experience and network performance for diverse user bases.

**Solution:** Leverage the [`eval`](eval-command.md) and `stats` commands in Splunk to classify devices based on their user agent strings, then calculate the minimum, maximum, and average latency for each device type. [View full Solution](eval-command#use-case-example)

### 10. Identifying URLs with High Error Rates

**Problem:** The goal is to identify the top 10 URLs with the highest rates of bad requests or server errors. This analysis is crucial for pinpointing issues that could be affecting user experience or indicating server-side problems.

**Solution:** The [`head`](head-command.md) can be used to fetch the top 10 URLs that have an error rate of at least 50%. If fewer than 10 URLs meet this criterion, the command includes the URL with the highest error rate below 50%. [View full Solution](head-command#use-case-example)

### 11. Identify Transactions with the Same Session ID and IP Address

**Problem:** A user wants to group web access events into transactions based on the same session ID and IP address. Each transaction should start with an event containing the string "view" and end with an event containing the string "purchase." Additionally, the user wants to filter out transactions that took less than a second to complete and display the duration and event count for each transaction.

**Solution:** The [`transaction`](transaction-command.md) command can be used to define a transaction based on the session ID (`JSESSIONID`) and IP address (`clientip`). The `startswith` and `endswith` arguments specify the start and end events of the transaction. The `where` command can then be used to filter transactions based on their duration. [View full Solution](transaction-command#use-case-example)

### 12. Validating HTTP Status Codes

**Problem:** In web service monitoring and log analysis, quickly identifying valid HTTP responses is essential for ensuring service availability and performance. Validating that the status codes of responses fall within a specific range of successful codes (200, 201, or 202) can be challenging due to the variety of possible HTTP status codes.

**Solution:** To efficiently validate HTTP status codes, a command can be utilized to analyze log data. This command employs the `eval` function combined with the [`if`](evaluation-functions/comparison-conditional-functions#ifpredicate-true_value-false_value) and [`in`](evaluation-functions/comparison-conditional-functions#invalue-list) functions to check if the `status` field contains a valid status code (200, 201, or 202). [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-5)

### 13. Optimizing Image Delivery for Improved User Experience

**Problem:** Improving user experience on websites often involves ensuring that image files load quickly across different regions. Slow loading times for images can negatively impact user satisfaction and engagement.

**Solution:** To address this issue, a [`regex`](regex-command.md) search command can be utilized to identify the percentage of slow requests for image files (such as JPG, JPEG, PNG, GIF, WEBP) and analyze the average latency across different countries. This analysis helps in pinpointing regions with performance issues and aids in optimizing content delivery networks (CDNs) or server configurations. [View full Solution](regex-command#use-case-example)

### 14. Identifying Top Performing Sales Representatives

**Problem:** In a competitive sales environment, identifying the top-performing sales representatives is crucial for recognizing achievements and understanding the drivers of sales success. This analysis can help in strategic planning, training, and motivating the sales team.

**Solution:** To identify the top 10 performing sales representatives based on their total sales amount, a search with [`tail`](tail-command.md) command can be utilized. This command aggregates sales data by representative, sorts them by total sales, and then retrieves the bottom 10 records having the highest total sales, displaying them in reverse to prioritize top-performing representatives. [View full Solution](tail-command#use-case-example)

### 15. Analyze the Top Products Purchased by Customer Segments

**Problem:** A user wants to analyze the top products purchased by different customer segments to understand purchasing behavior and tailor marketing strategies accordingly.

**Solution:** The [`top`](top-command.md) command can be used to find the most commonly purchased products for each customer segment, along with the count and percentage of total purchases. [View full Solution](top-command#use-case-example)

### 16. Analyzing Revenue from Expensive Products

**Problem:** The goal is to identify and analyze expensive products (those with prices greater than $1000) to determine the total revenue, as well as the minimum, maximum, and average prices of these products across each product category.

**Solution:** The solution involves using a combination of the [`where`](where-command.md) and `stats` commands in a Splunk search to filter and analyze the data. [View full Solution](where-command#use-case-example)

### 17. Categorizing Sales Performance

**Problem:** In sales data analysis, it's crucial to categorize sales amounts into performance ratings to easily identify and differentiate between high and low-performing sales. This categorization helps in understanding sales trends and making informed decisions.

**Solution:** To categorize sales amounts into distinct performance ratings, the [`case`](evaluation-functions/comparison-conditional-functions#casecondition1-value1-condition2-value2-) function can be used within an [`eval`](eval-command.md) command. This approach allows for evaluating `sales_amount` against a series of conditions, assigning a corresponding performance rating based on the first condition met. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example)

### 18. Identifying Network Connection Issues

**Problem:** In network monitoring and analysis, identifying potential issues with network connections is crucial for maintaining system integrity and performance. Issues such as loopback connections, use of non-standard protocols, and invalid port numbers can indicate misconfigurations or malicious activities.

**Solution:** To efficiently identify potential network connection issues, a command can be utilized to analyze network traffic logs. This command employs a custom [`validate`](evaluation-functions/comparison-conditional-functions#validatecondition1-value1-condition2-value2-) function to check for common issues based on `src_ip`, `protocol`, and `port` fields. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-1)

### 19. Identifying Users in Data Records

**Problem:** In datasets containing user information, it's common to encounter records with missing data. Specifically, identifying users can be challenging when their `username`, `login_id`, or `email` fields are inconsistently filled, leading to difficulties in user data analysis and management.

**Solution:** To address this issue, the [`coalesce`](evaluation-functions/comparison-conditional-functions#coalescevalues) function can be employed within an [`eval`](eval-command.md) command. This function systematically checks each specified field (`username`, `login_id`, `email`) for a non-`NULL` value, returning the first valid identifier it finds. If all specified fields are `NULL`, it defaults to a predefined value, such as "Unknown".

This command determines the user's identity by checking the fields `username`, `login_id`, or `email` in that order, returning the first non-`NULL` value found. If all fields are `NULL`, it defaults to `Unknown`. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-2)

### 20. Finding Important Server Related Issue in Log Data

**Problem:** In system monitoring and log analysis, quickly identifying and categorizing errors is crucial for maintaining system health and performance. Specifically, distinguishing server errors from other types of errors based on log data can be challenging due to the volume and variety of log messages.

**Solution:** To address this challenge, a specific command can be used to analyze log data, checking for the presence of the string "error" in the `error_msg` field and for HTTP error codes in the 500 range in the `http_status` field. This command employs the [`eval`](eval-command.md) function combined with the [`if`](evaluation-functions/comparison-conditional-functions#ifpredicate-true_value-false_value) and [`searchmatch`](evaluation-functions/comparison-conditional-functions#searchmatchsearch_str) functions to categorize errors efficiently. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-3)

### 21. Filtering IP Addresses by Subnet

**Problem:** In network analysis and security, it's crucial to quickly identify whether IP addresses accessing a service fall within a specific subnet. This helps in assessing access patterns and identifying potentially unauthorized or suspicious activities.

**Solution:** To efficiently filter IP addresses by subnet, a command can be utilized to analyze the `client_ip` field in the dataset. This command employs the [`eval`](eval-command.md) function combined with the [`cidrmatch`](evaluation-functions/comparison-conditional-functions#cidrmatchcidr-ip) function to check if the IP addresses match the CIDR block `10.0.0.0/24`. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-8)

### 22. Identify the Maximum CPU Utilization Per Minute Per Server

**Problem:** A user wants to identify the maximum CPU utilization recorded every minute for each server. The `cpu_usage` field is a string of CPU usage measurements taken every 10 seconds within that minute, separated by commas.

**Solution:** The [`max()`](evaluation-functions/statistical-functions#maxvalues) command within an [`eval`](eval-command.md) function can be used to find the maximum CPU utilization value from the string. [View full Solution](evaluation-functions/statistical-functions#use-case-example)

### 23. Identify the Minimum CPU Utilization Per Minute Per Server

**Problem:** A user wants to identify the minimum CPU utilization recorded every minute for each server. The `cpu_usage` field is a string of CPU usage measurements taken every 10 seconds within that minute, separated by commas.

**Solution:** The [`min()`](evaluation-functions/statistical-functions#minvalues) command within an [`eval`](eval-command.md) function can be used to find the minimum CPU utilization value from the string. [View full Solution](evaluation-functions/statistical-functions#use-case-example-1)

### 24. Randomly Sample Data for Performance Analysis

**Problem:** A user wants to perform an analysis on data for a certain time frame, but the dataset is too large, making the analysis time-consuming. The user needs to randomly select a small percentage of records within that time frame for a quicker analysis.

**Solution:** The [`random()`](evaluation-functions/statistical-functions#random) command within an [`eval`](eval-command.md) function can be used to randomly sample a subset of the data. [View full Solution](evaluation-functions/statistical-functions#use-case-example-2)

### 25. Normalizing Job Titles for Accurate Count

**Problem:** In datasets with job titles, variations in case (uppercase vs lowercase) can lead to discrepancies in data analysis, particularly when counting the number of individuals in each job position. This inconsistency can skew results and affect decision-making processes.

**Solution:** To address this issue, job titles can be converted to a consistent case (either all lowercase or all uppercase) using [`lower`](evaluation-functions/text-functions#lowerstr) or [`upper`](evaluation-functions/text-functions#upperstr) functions before performing counts. This normalization ensures that variations in case do not affect the accuracy of the data analysis. [View full Solution](evaluation-functions/text-functions#use-case-example)

### 26. Cleaning Address Fields

**Problem:** In datasets, address fields often contain leading or trailing spaces and tabs due to inconsistent data entry practices. These inconsistencies can lead to issues in data processing and analysis, such as incorrect matching and sorting of addresses.

**Solution:** To ensure data consistency and accuracy, it's essential to clean the address fields by removing any leading or trailing spaces and tabs. The [`trim`](evaluation-functions/text-functions#trimstr-trim_chars), or [`ltrim`](evaluation-functions/text-functions#ltrimstr-trim_chars), or [`rtrim`](evaluation-functions/text-functions#rtrimstr-trim_chars) can be used for this preprocessing step depending on the format of the data. This makes the data uniform and easier to work with. [View full Solution](evaluation-functions/text-functions#use-case-example-1)

### 27. Masking Email Addresses

**Problem:** Sensitive information, such as email addresses in datasets, often needs to be anonymized or masked to protect user privacy. Specifically, the prefix of an email address (everything before the "@" symbol) must be hidden or replaced to prevent identification of the individual.

**Solution:** To address privacy concerns, the prefix of email addresses can be masked by replacing it with a generic string (e.g., "xxxxx"). This process retains the structure of the email address while anonymizing the user's identity. The [`replace`](evaluation-functions/text-functions#replacestrregexreplacement) function can be used for this purpose. [View full Solution](evaluation-functions/text-functions#use-case-example-2)

### 28. Extracting HTTP Status Codes from Web Server Logs

**Problem:** When analyzing web server logs, the HTTP status code is often embedded within a longer status line string. This makes it difficult to quickly filter, group, or analyze based on the status code alone.

**Status line format:** "HTTP/1.1 404 Not Found"

**Solution:** Use [`substr`](evaluation-functions/text-functions#substrstrstartlength) function to extract the specific portion of the string containing the status code. [View full Solution](evaluation-functions/text-functions#use-case-example-3)

### 29. Decoding URL Strings

**Problem:** URLs are often encoded for transmission over the Internet, which can make them difficult to read and interpret when analyzing data. Encoded characters (e.g., `%3A` for `:`) can obscure the actual content of the URL.

**Solution:** To make URLs readable and usable for analysis, encoded URLs can be decoded back to their original form using the [`urldecode`](evaluation-functions/text-functions#urldecodeurl) function in Splunk. This process involves converting percent-encoded characters back to their corresponding characters. [View full Solution](evaluation-functions/text-functions#use-case-example-4)

### 30. Extracting Email Recipients from Logs

**Problem:** In email transaction logs, recipient addresses are often stored in a single string, separated by semicolons. Analyzing individual recipient behavior or response rates requires splitting these strings into separate values for each recipient.

**Solution:** To efficiently extract individual email recipients from log entries, a command can be used to analyze the `recipients` field in the dataset. This command employs the [`eval`](eval-command.md) function combined with the [`split`](evaluation-functions/multivalue-functions#splitstr-delim) function to separate the recipient addresses into a multivalue field. [View full Solution](evaluation-functions/multivalue-functions#use-case-example)

### 31. Calculate Average Transaction Amounts

**Problem:** A user wants to display the average transaction amounts in a financial report. The average amounts should be rounded to two decimal places for clarity and consistency in the report.

**Solution:** The [`round()`](evaluation-functions/mathematical-functions#roundnum-precision) function can be used to round the average transaction amounts to two decimal places, ensuring clarity and consistency in the financial report. Alternatively, if decimal precision is not necessary, the [`floor`](evaluation-functions/mathematical-functions#floornum) function can be used to round down to the nearest integer, or the [`ceil`](evaluation-functions/mathematical-functions#ceilnum-or-ceilingnum) function can be used to round up to the next highest integer. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-5)

### 32. Calculate Compound Interest Growth

**Problem:** A user wants to calculate the future value of an investment with continuous compounding interest. The formula for continuous compounding is given by `Accumulated_Amount = Principal * e^(annual_interest_rate * time_years)`, where:

**Solution**: The [`exp()`](evaluation-functions/mathematical-functions#expnum) command can be used to compute `e^(annual_interest_rate * time_years)`. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-2)

### 33. Analyze Exponential Growth in Website Traffic

**Problem:** A user wants to analyze the exponential growth of website traffic over time. The natural logarithm can be used to transform the data, making it easier to identify trends and growth patterns.

**Solution:** The [`ln()`](evaluation-functions/mathematical-functions#lnnum) command can be used to calculate the natural logarithm of the number of website visits, which helps in analyzing growth trends. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-6)

### 34. Analyze Order of Magnitude in Financial Transactions

**Problem:** A user wants to categorize financial transactions based on their order of magnitude to identify large, medium, and small transactions for risk assessment and reporting purposes.

**Solution:** The [`log()`](evaluation-functions/mathematical-functions#lognum-base) command can be used to calculate the logarithm of transaction amounts, making it easier to categorize them based on their magnitude. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-7)

### 35. Calculate the Root Mean Square Error (RMSE) of predictions

**Problem:** A user wants to evaluate the accuracy of a predictive model by calculating the Root Mean Square Error (RMSE) between the predicted values and the actual values. RMSE is a measure of the differences between predicted and observed values.

**Solution:** The [`pow`](evaluation-functions/mathematical-functions#pownum-exp) function in Splunk along with [`sqrt()`](evaluation-functions/mathematical-functions#sqrtnum) function can be used to calculate the square root as part of the RMSE calculation. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-10)

### 36. Analyzing Devices Used to Access Service

**Problem:** Understanding the types of devices used to access a service is crucial for optimizing user experience and tailoring service offerings. Differentiating between device types (e.g., iPhone, Android, Windows, Mac) based on user agent strings in access logs can be challenging due to the diversity of devices and the complexity of user agent strings.

**Solution:** To effectively analyze types of devices used to access service, a command can be utilized to categorize access logs by device type based on the `user_agent` field. This command employs the [`eval`](eval-command.md) function combined with the [`case`](evaluation-functions/comparison-conditional-functions#casecondition1-value1-condition2-value2-) function and [`like`](evaluation-functions/comparison-conditional-functions#likestr-pattern) function to match patterns in the `user_agent` strings and categorize them accordingly. [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-6)

### 37. Identifying Google Email IDs

**Problem:** In data analysis involving user information, it's often useful to quickly identify users with email addresses belonging to a specific domain, such as Google. This can be challenging due to the variety of email formats and domains.

**Solution:** To efficiently identify Google email IDs, a command can be used to analyze the `email` field in the dataset. This command employs the [`eval`](eval-command.md) function combined with the [`match`](evaluation-functions/comparison-conditional-functions#matchstr-regex) function to check if the email addresses end with "@google.com". [View full Solution](evaluation-functions/comparison-conditional-functions#use-case-example-7)

### 38. Calculate the Area of a Circle

**Problem:** A user wants to calculate the area of a circular field given the radius. The formula for the area of a circle is `Area = pi() * radius^2`.

**Solution:** The [`pi()`](evaluation-functions/mathematical-functions#pi) command can be used to get the precise value of π for the area calculation. [View full Solution](evaluation-functions/mathematical-functions#use-case-example-9)

### 39. Ensuring Data Completeness in Sales Reports

**Problem:** In sales data analysis, missing values in fields like `sales_rep`, `region`, and `product_category` can lead to incomplete reports and incorrect insights. These null values need to be filled with a meaningful placeholder to ensure data consistency and completeness.

**Solution:** The [`fillnull`](fillnull-command.md) command can be used to replace null values in specific fields with the string "unknown", ensuring that all fields have valid values for accurate analysis. [View full Solution](fillnull-command.md#use-case-example)

### 40. Handling Redundant Data in User Activity Logs

**Problem:** In user activity logs, sometimes the `previous_page` and `current_page` fields can have the same value, indicating that the user has refreshed the same page. For better clarity in reports, it's useful to set the `current_page` field to NULL when it matches the `previous_page`.

**Solution:** The [`nullif()`](evaluation-functions/comparison-conditional-functions.md/#nulliffield1-field2) function can be used within an [`eval`](eval-command.md) expression to set the `current_page` field to NULL if it is equal to the `previous_page`. [View full Solution](evaluation-functions/comparison-conditional-functions.md#use-case-example-9)

### 41. Resetting Field Values in Inventory Data

**Problem:** In an inventory management system, there are instances where certain products need to be marked as discontinued or out of stock. For these products, resetting the `stock_level` field to NULL helps indicate that the field no longer holds any meaningful value and should be excluded from stock calculations.

**Solution:** The [`null()`](evaluation-functions/comparison-conditional-functions.md#null) function can be used within an [`eval`](eval-command.md) expression to set the `stock_level` field to NULL for discontinued or out-of-stock products. [View full Solution](evaluation-functions/comparison-conditional-functions.md#use-case-example-8)

### 42. Analyzing Stock Market Data for Trends and Volatility

**Problem:** A financial analyst needs to identify stocks with unusual trading patterns, focusing on high volatility, significant price movements relative to recent averages, and above-average trading volumes. This information can be used to spot potential market trends or anomalies that warrant further investigation.

**Solution:** The [`streamstats`](streamstats-command.md) command can be used to calculate key metrics over a 5-day window. By applying various statistical functions, you can identify stocks with high volatility, significant price movements, and above-average trading volumes, thereby uncovering unusual trading patterns. [View full Solution](streamstats-command.md#analyzing-stock-market-data-for-trends-and-volatility)

### 43. Creating Simulated Server Log Data

**Problem:** As a system administrator responsible for monitoring server performance, you need to ensure that your monitoring and alerting systems are functioning correctly. However, you don't have access to real production data for testing. You need to create a simulated dataset that represents server logs with various metrics, such as CPU usage, memory usage, network traffic, and different types of events. This dataset will help you test dashboards, alerts, and queries without risking real data exposure.

**Solution:** The [`gentimes`](gentimes-command.md) command can be used to generate timestamps, and the `eval` command can be used to create random values for different metrics. By combining these commands, you can create a simulated dataset that represents server logs with various metrics. [View full Solution](gentimes-command.md#creating-simulated-server-log-data)
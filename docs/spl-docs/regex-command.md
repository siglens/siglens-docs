# regex command

## Description

This command can be used to filter out results that either match or do not match the specified regular expression.

## Syntax
The required syntax is in **bold**.

**regex**\
(\<field\>=\<regex-expression\> or \<field\>!=\<regex-expression\> or **\<regex-expression\>**)


### Required Arguments

#### \<regex-expression\>

**Syntax:** `"<string>"`\
**Description:** \
This argument must be a regular expression compatible with RE2 syntax and enclosed in double quotes.\
By default, the `<regex-expression>` is considered unanchored unless you explicitly anchor it.\
If only `<regex-expression>` is present without any `<field>` argument, it will fetch all records where this `<regex-expression>` matches in any field.

### Optional Arguments

#### \<field\>

**Syntax:** `<field>`\
**Description:** \
`<field>` indicates the field name for comparing values with the regular expression.\
Use `<field>=<regex-expression>` to retain results matching the regular expression.\
Use `<field>!=<regex-expression>` to exclude results that match this regular expression.


## Example

The following example can be used to filter person records with the job title of Engineer or Developer.
```
... | regex job_title="(?i)(engineer|developer)"
```


## Use-Case Example

**Optimizing Image Delivery for Improved User Experience**

**Problem:** Improving user experience on websites often involves ensuring that image files load quickly across different regions. Slow loading times for images can negatively impact user satisfaction and engagement.

**Solution:** To address this issue, a search command can be utilized to identify the percentage of slow requests for image files (such as JPG, JPEG, PNG, GIF, WEBP) and analyze the average latency across different countries. This analysis helps in pinpointing regions with performance issues and aids in optimizing content delivery networks (CDNs) or server configurations.

```
... | regex url="(?i)\.(jpg|jpeg|png|gif|webp)(\?|$)" 
    | regex http_status="^(2\d{2}|304)$" 
    | eval is_slow = if(latency > 1000, 1, 0) 
    | stats count as total_requests, avg(latency) as avg_latency, 
            sum(is_slow) as slow_requests by country, http_status 
    | eval slow_percentage = round((slow_requests / total_requests) * 100, 2), 
           avg_latency = round(avg_latency, 2)
```

**Explanation:**
1. The search begins by filtering requests for image files using a `regex` command with a regular expression that matches image file extensions. This step is crucial for focusing the analysis on image delivery performance.
   - The regular expression `(?i)\.(jpg|jpeg|png|gif|webp)(\?|$)` is designed to be case-insensitive (`?i`) and to match URLs ending with common image file extensions (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`). 
   - It accounts for URLs that might end directly with the file extension or have additional parameters after the extension, as indicated by the presence of a question mark (`?`) or the end of the URL (`$`).
2. It then filters these requests further to include only those with successful responses (`2xx` status codes) or cache hits (`304`), ensuring the analysis focuses on successfully delivered images.
3. The `eval` command is used to classify a request as slow if its latency exceeds 1000 milliseconds, setting a threshold for what constitutes a slow request.
4. The `stats` command aggregates the data, calculating:
   - The total number of requests (`total_requests`),
   - The average latency (`avg_latency`),
   - The number of slow requests (`slow_requests`), grouped by country and HTTP status.
5. Finally, the `eval` command calculates the percentage of slow requests (`slow_percentage`) and rounds the average latency to two decimal places, providing clear metrics for analysis.

This analysis provides valuable insights into how image delivery can be optimized to improve user experience across different regions.
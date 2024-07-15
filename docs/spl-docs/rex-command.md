# rex

## Description

Use this command to either extract fields using regular expression named groups, or replace or substitute characters in a field using sed expressions.

The rex command matches the value of the specified field against the unanchored regular expression and extracts the named groups into fields of the corresponding names.

## Syntax

The required syntax is in **bold**.

**rex** \
**[field=\<field>]** \
**\<regex-expression>**

## Required Arguments

### field

**Syntax:** `field=<field>` \
**Description:** The field that you want to extract information from.

### regex-expression

**Syntax:** `"<string>"` \
**Description:** The PCRE regular expression that defines the information to match and extract from the specified field.

### Examples

### 1. Extract major and minor version number from an app version.

This search extracts the major and minor version numbers from the `app_version` field using named groups and displays them as separate fields.

```
... | rex field=app_version "(?<major>\d+)\.(?<minor>\d).*"  
| fields app_version, major, minor
```

**Example field value:**
```
app_version = "2.3.5" will be extracted as major = "2" and minor = "3"
```

### 2. Extract an email domain from an email address.

This search extracts the domain part of the email addresses in the `user_email` field.

```
... | rex field=user_email "(?<domain>@\w+\.\w+)"
| fields user_email, domain
```

**Example field value:**
```
user_email = "example@domain.com" will be extracted as domain = "domain.com"
```

### 3. Extract multiple fields using a complex regular expression.

This search extracts the `method`, `status_code`, and `response_time` from the `access_log` field.

```
... | rex field=access_log "(?<method>\w+)\s+\w+\s+(?<status_code>\d{3})\s+\d+\s+(?<response_time>\d+)"
| fields access_log, method, status_code, response_time
```

**Example field value:**
```
access_log = "GET /index.html 200 512 1234" will be extracted as method = "GET", status_code = "200", and response_time = "1234"
```

### Use-Case Example

**Analyze and extract key details from web server logs**

**Problem:** A user wants to analyze web server logs to extract and analyze specific details such as the HTTP method, the requested URL path, and the status code from each log entry. This helps in identifying request patterns, errors, and overall performance metrics.

**Solution:** The `rex` command can be used to extract these specific details using named groups from the web server logs.

**Example log entry:**

```
timestamp="2024-07-12 09:15:23" client_ip="192.168.1.1" request="GET /index.html HTTP/1.1" status="200" response_time="123"
```

**SPL command:**

```
index=web_logs 
| rex field=request "(?<method>\w+)\s+(?<url>\S+)\s+\S+" 
| fields timestamp, client_ip, method, url, status, response_time
```

**Explanation:**
1. The search starts by looking at the web logs with the `index=web_logs`.
2. The `rex` command extracts the HTTP method and URL path from the `request` field using named groups.
3. The `fields` command selects the relevant fields (`timestamp`, `client_ip`, `method`, `url`, `status`, `response_time`) for output.

**Example field value:**

```
request = "GET /index.html HTTP/1.1" will be extracted as method = "GET" and url = "/index.html"
```

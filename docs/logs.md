---
sidebar_position: 9
---

# Logs Overview 📊

## Query Search Interface Overview 🔍

- Overview of the query search interface supporting SQL, SPL, and LogQL queries.




### Steps for Using the Query Search

1. **Select or Enter Queries:**
   - You can either select a query from the info icon or enter your own.
   ![Query Search](/static/img/icon.png)

2. **Choose Query Type:**
   - Select which type of query you want to search: SQL, SPL, LogQL.
   ![Query Type](/static/img/query-type.png)

3. **Select Index:**
   - Choose an index from the index dropdown.
   ![Index](/static/img/index.png)

4. **Set Time Range:**
   - Select the time range for the query.
   ![Time Range](/static/img/time.png)

5. **Use Query Builder:**



   ![Query Builder Search](/static/img/query-builder.png)
   ![Query Builder Query](/static/img/query-qb.png)

---

## SQL Query Examples 💾

To use SQL queries:

- Select SQL as the query language from the dropdown and enter your query in the search field.

```
SELECT first_name AS firstnames, country AS origincountry FROM `ind-0`
```

   ![sql-1](/static/img/sql-1.png)

```   
SELECT * FROM `ind-0` ORDER BY latency ASC
```

   ![sql-2](/static/img/sql-2.png)

```
SELECT MAX(latency), COUNT(city) FROM `*` GROUP BY country, gender LIMIT 10
```

   ![sql-3](/static/img/sql-3.png)

```
SELECT min(latency), COUNT(city) FROM `*` WHERE gender = male GROUP BY country LIMIT 10
```
   ![sql-4](/static/img/sql-4.png)

```
select 1 as one,'word' as word,city from `ind-0`
```

   ![sql-5](/static/img/sql-5.png)

##  SPL Query Examples 📈

To use SPL queries:

- Select SPL as the query language from the dropdown and enter your query in the search field.

```
city=Boston | stats count AS Count BY weekday | where Count / 2 > 6 OR weekday = "Saturday"
```

   ![spl-1](/static/img/spl-1.png)

```
http_method=POST | regex city="^[a-zA-Z]+\s[a-zA-Z]+$" | fields city
```

   ![spl-2](/static/img/spl-2.png)

```
city=Boston | stats count AS Count BY state | eval myField=state . " start:" . rtrim(state, "nd")
```

   ![spl-3](/static/img/spl-3.png)

```
city=Boston | stats count AS Count BY state | eval myField=if(in(state, "Mary" . "land", "Hawaii", 99 + 1), state, "Error")
```

   ![spl-4](/static/img/spl-4.png)

```
city=Columbus | stats count AS Count BY http_status | eval sqrt=sqrt(http_status + 200)
```

   ![spl-5](/static/img/spl-5.png)

# LogQL Query Examples 📜

To use LogQL queries:

- Select query langauge LogQL from the dropdown and enter the query in the search field

```
{gender="female",city="Fresno"} != "batch-212"
```

   ![logql-1](/static/img/logql-1.png)

```
{gender="female"} | json
```

   ![logql-2](/static/img/logql-2.png)
```
{gender="female"} | logfmt
```

   ![logql-3](/static/img/logql-3.png)
```
{gender="female",city="Fresno"} | json city_life="city", single_gender="gender[0]"
```

   ![logql-4](/static/img/logql-4.png)

```
{gender="female",city="Fresno"} | logfmt city_life="city", single_gender="gender", host
```

   ![logql-5](/static/img/logql-5.png)




















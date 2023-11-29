---
sidebar_position: 9
---

# Logs

- Given below is an overview of the query search interface that supports SQL,SPL and LogQL queries

https://github.com/Davleen14/siglens-docs/assets/114626340/a9482aed-6d8e-483d-b6f6-4c606cd863cd

- You can select query from info icon or you can enter your own query
  
![Query Search](/static/img/icon.png)

- Select which type of query you want to search: SQL,SPL,LogQL
  
![Query Type](/static/img/query-type.png)

- You can select index from the index dropdown
  
![index](/static/img/index.png)

- Select time range for the query
  
![last-search](/static/img/time.png)

- Searching with query builder
  
https://github.com/Davleen14/siglens-docs/assets/114626340/442c69dc-aac5-48b4-925b-b41d20aca842

![qb-search](/static/img/query-builder.png)

![qb-query](/static/img/query-qb.png)










# SQL query 

- Select query language SQL from the dropdown and enter the query in the search field
 
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

# SPL query

- Select query langauge SPL from the dropdown and enter the query in the search field

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

# LogQL query

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













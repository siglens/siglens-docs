---
sidebar_position: 9
---

# Logs

- Given below is an overview of the query search interface that supports SQL,SPL and LogQL queries

    <video width="320" height="240" controls>
    <source src="/static/img/query-search-overview.mp4" type="video/mp4">
    </video>

- You can select query from info icon or you can enter your own query
![Query Search](/static/img/search-query-1.png)

- Select which type of query you want to search: SQL,SPL,LogQL
![Query Type](/static/img/query-type.png)

- You can select index from the index dropdown
![index](/static/img/index.png)

- Selecting the last search time 
![last-search](/static/img/last-search.png)

# SQL query 

- Select query language SQL from the dropdown and enter the query in the search field

    1. SELECT first_name AS firstnames, country AS origincountry FROM `ind-0`

    ![sql-1](/static/img/sql-1.png)
    
    - Select/unselect the fields you want from the available fields dropdown

    ![available-fields](/static/img/available-fields.png)

    ![sql-field](/static/img/sql-fields.png)

    2. SELECT * FROM `ind-0` ORDER BY latency ASC

    ![sql-2](/static/img/sql-2.png)

    3. SELECT MAX(latency), COUNT(city) FROM `*` GROUP BY country, gender LIMIT 10

    ![sql-3](/static/img/sql-3.png)

    4. SELECT min(latency), COUNT(city) FROM `*` WHERE gender = male GROUP BY country LIMIT 10

    ![sql-4](/static/img/sql-4.png)

    5. select 1 as one,'word' as word,city from `ind-0`

    ![sql-5](/static/img/sql-5.png)

# SPL query

- Select query langauge SPL from the dropdown and enter the query in the search field

    1. city=Boston | stats count AS Count BY weekday | where Count / 2 > 6 OR weekday = "Saturday"

    ![spl-1](/static/img/spl-1.png)

    2. http_method=POST | regex city="^[a-zA-Z]+\s[a-zA-Z]+$" | fields city

    ![spl-2](/static/img/spl-2.png)

    3. city=Boston | stats count AS Count BY state | eval myField=state . " start:" . rtrim(state, "nd")

    ![spl-3](/static/img/spl-3.png)

    4. city=Boston | stats count AS Count BY state | eval myField=if(in(state, "Mary" . "land", "Hawaii", 99 + 1), state, "Error")

    ![spl-4](/static/img/spl-4.png)

    5. city=Columbus | stats count AS Count BY http_status | eval sqrt=sqrt(http_status + 200)

    ![spl-5](/static/img/spl-5.png)

# LogQL query

- Select query langauge LogQL from the dropdown and enter the query in the search field

    1. {gender="female",city="Fresno"} != "batch-212"

    ![logql-1](/static/img/logql-1.png)

    2. {gender="female"} | json

    ![logql-2](/static/img/logql-2.png)

    3. {gender="female"} | logfmt

    ![logql-3](/static/img/logql-3.png)

    4. {gender="female",city="Fresno"} | json city_life="city", single_gender="gender[0]"

    ![logql-4](/static/img/logql-4.png)

    5. {gender="female",city="Fresno"} | logfmt city_life="city", single_gender="gender", host

    ![logql-5](/static/img/logql-5.png)













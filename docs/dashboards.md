---
sidebar_position: 10
---

# Dashboards

- Adding panel to dashboard



  Enter a query in the search bar and select the option right next to downloads option to add the panel to dashboard.

  ![add panel](/static/img/add-panel.png)

  ![display panel](/static/img/display-panel.png)

  You can view, edit, duplicate and remove the panel as well

  ![view add panel](/static/img/view-add-panel.png)

  ![view panel](/static/img/view-panel.png)

- Adding panel demo


- Create dashboard panel demo



- Create Panel for SPL Query

  1. Click on the add panel option to add the panel and then click on edit panel 

  ![edit panel](/static/img/edit-panel.png)

  2. Now you can select a data source
  eg: Logs

  ![data source](/static/img/data-source.png)

  3. Then select the query language
    eg:Splunk QL 

  ![query language](/static/img/query-type.png)

  4. Enter query-

     city=Boston | stats count, avg(latency) BY weekday

  ![SPL1 query](/static/img/spl1-query.png)

  5. Enter the details in SPL panel options

  ![spl panel](/static/img/spl1-panel-options.png)

  6. Then after filling the details click on run query

  ![spl bar](/static/img/spl1-bar.png)

  7. Similarly we can enter another SPL query and now the chart type is data table

     city=Boston | ```This is a comment``` fields http*

  ![SPL2 query](/static/img/spl2.png)

- Create Panel for SQL Query

  Follow the same steps as above for SPL and change the query language to SQL and you can modify 
  the panel details as per your needs

  1. SELECT COUNT(weekday) FROM `*` GROUP BY weekday

  ![SQL1 query](/static/img/sql1.png)

  2. SELECT * FROM `ind-0` ORDER BY latency ASC

  ![SQL2 query](/static/img/sql2.png)

- Create Panel for Log QL Query

  Follow the same steps as above for SPL and change the query language to Log QL  and you can modify the panel details as per your needs

  1. {gender="female",city="Fresno"} != "batch-212"

  ![LogQL1 query](/static/img/logql1.png)

  2. {gender="female"} | json

  ![LogQL2 query](/static/img/logql2.png)

- Create Panel for Metrics Query

  Note - You have to ingest metrics data to get the metrics data
  
  1. max by (color) (testmetric0)

  ![metrics1 query](/static/img/metrics-1.png)

  2. min by (model) (testmetric0)

  ![metrics2 query](/static/img/metrics-2.png)

  Panel Overview

  ![panel](/static/img/metrics-overview.png)

- Create Panel for traces

  Note - You have to ingest traces data to get the traces

  1. service="adservice"

  ![traces query](/static/img/traces.png)








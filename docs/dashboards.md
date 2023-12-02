---
sidebar_position: 10
---

# Dashboards 📊

## Create Dashboard Panel Demo 📈

Demonstration for creating a dashboard panel 
[Video](/static/img/dashboard-preview.mp4)

## Create Panel for Spunk QL Query 
1. **Add and Edit Panel:**
   - Click on the 'Add Panel' option and then click on edit.
     ![Edit Panel](/static/img/edit-panel.png)
2. **Select Data Source:**
   - Example: Logs
     ![Data Source](/static/img/data-source.png)
3. **Choose Query Language:**
   - Example: Splunk QL
     ![Query Language](/static/img/query-type.png)
4. **Enter Spunk QL Query:**
    ```
    city=Boston | stats count, avg(latency) BY weekday
    ```
    ![SPL1 Query](/static/img/spl1-query.png)
5. **Fill in Splunk QL Panel Options:**
     ![SPL Panel](/static/img/spl1-panel-options.png)
6. **Run Query:**
     ![SPL Bar](/static/img/spl1-bar.png)
7. **Similarly you can add more Splunk QL Queries:**
    ```
    city=Boston | This is a comment fields http*
    ```
    ![SPL2 Query](/static/img/spl2.png)
8. **Panel View:**
    ![SPL preview](/static/img/spl-preview.png)


## Create Panel for SQL Query 
Follow the same steps as for SPL and change the query language to SQL. Modify the panel details as needed.
1. **Enter SQL Query:**
    ```
    SELECT COUNT(weekday) FROM `*` GROUP BY weekday
    ```
    ![SQL1 Query](/static/img/sql1.png)
2. **Similarly you can add more SQL Queries:**
    ```
    SELECT * FROM `ind-0` ORDER BY latency ASC
    ```
    ![SQL2 Query](/static/img/sql2.png)

## Create Panel for LogQL Query 
Follow the same steps as for SPL and change the query language to LogQL. Modify the panel details as needed.
1. **Enter LogQL Query:**
    ```
    {gender="female",city="Fresno"} != "batch-212"
    ```
    ![LogQL1 Query](/static/img/logql1.png)
2. **Additional LogQL Query:**
    ```
    {gender="female"} | json
    ```
    ![LogQL2 Query](/static/img/logql2.png)

## Create Panel for Metrics Query 
Note: You need to ingest metrics data to get the metrics.
1. **Enter Metrics Query:**
    ```
    max by (color) (testmetric0)
    ```
    ![Metrics1 Query](/static/img/metrics-1.png)
2. **Additional Metrics Query:**
    ```
    min by (model) (testmetric0)
    ```
    ![Metrics2 Query](/static/img/metrics-2.png)
3. **Panel Overview**
    ![Panel Overview](/static/img/metrics-preview.png)

## Create Panel for Traces 
Note: You need to ingest traces data to get the traces.
1. **Enter Traces Query:**
    ```
    service="loadgenerator"
    ```
    ![Traces Query](/static/img/traces.png)

## Adding Panel to Dashboard 

Demonstration for adding a panel
[Video](/static/img/add-panel.mp4)

1. **Add Panel to Dashboard:**
   - Enter a query in the search bar and select the option next to the downloads option to add the panel to the dashboard.
     ![Add Panel](/static/img/add-panel.png)
     ![Display Panel](/static/img/display-panel.png)
2. **Panel Options:**
   - You can view, edit, duplicate, and remove the panel.
     ![View Add Panel](/static/img/view-add-panel.png)
     ![View Panel](/static/img/view-panel.png)





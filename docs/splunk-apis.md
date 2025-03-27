# Splunk APIs

### 1. Retrieve Ingested Data:
Ingest data in JSON format. Supports reading json data from file.

```
GET /api/search
POST /api/search
```

Parameters:
- `searchText`: The actual search query using Splunk syntax.
- `indexName:` Specifies the index (like "traces") to search data from.

Example:

Using raw json:
```bash
# Send data in the request body to perform a search using Splunk QL.
curl -X POST http://localhost:5122/api/search \
-H "Content-Type: application/json" \
-d '{
  "startEpoch": "now-1h",
  "endEpoch": "now",
  "searchText": "*",
  "indexName": "traces",
  "queryLanguage": "Splunk QL"
}'

# Pass search parameters directly in the URL to retrieve data using a GET request.
curl -X GET "http://localhost:5122/api/search?startEpoch=now-1h&endEpoch=now&searchText=*&indexName=traces&queryLanguage=Splunk%20QL"
```

### 2. Gantt chart data
For Gantt chart data specific to a trace ID, modify the request body accordingly

Example:
```bash

# send a POST request to search for Gantt chart data using the specific trace ID.
curl -X POST http://localhost:5122/api/search \
-H "Content-Type: application/json" \
-d '{
  "startEpoch": "now-1h",
  "endEpoch": "now",
  "searchText": "trace_id=9f3239f9e01f9f648d188de4767c9a36",
  "indexName": "traces",
  "queryLanguage": "Splunk QL"
}'
```


### 3. Red-metrics Data
Retrieve Red-metrics data


Example:

Using Raw json
```bash
# retrieve Red-metrics data from the red-traces index using Splunk QL.
curl -X POST http://localhost:5122/api/search \
-H "Content-Type: application/json" \
-d '{
  "startEpoch": "now-1h",
  "endEpoch": "now",
  "searchText": "*",
  "indexName": "red-traces",
  "queryLanguage": "Splunk QL"
}'

```

### 4. Searching all Traces Data
Fetch all traces data .

Example:

Using Raw json
```bash
#Fetch all traces data from the traces index using Splunk QL.
curl -X POST http://localhost:5122/api/traces/search \
-H "Content-Type: application/json" \
-d '{
  "startEpoch": "now-1h",
  "endEpoch": "now",
  "searchText": "*",
  "indexName": "traces",
  "queryLanguage": "Splunk QL"
}'

```

### 5. Dependency Graph Data
Get dependency graph data

Example:
```bash
# get dependency graph data from the service-dependency index using Splunk QL.
curl -X POST http://localhost:5122/api/traces/dependencies \
-H "Content-Type: application/json" \
-d '{
  "startEpoch": "now-1h",
  "endEpoch": "now",
  "searchText": "*",
  "indexName": "service-dependency",
  "queryLanguage": "Splunk QL"
}'
```

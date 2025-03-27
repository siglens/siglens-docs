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

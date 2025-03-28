# Splunk APIs

### 1. Querying Data:
Send a splunk query via below endpoints and json body

```
POST /api/search
```

Parameters:
- `startEpoch`: Start time for the search query (e.g., "now-1h" means one hour ago).
- `endEpoch`: End time for the search query (e.g., "now" means current time).
- `searchText`: The actual search query using Splunk syntax.
- `indexName:` Specifies the index (like "traces") to search data from.
- `queryLanguage`: Defines the query language used (in this case, "Splunk QL").  

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

```

Example: 

```bash
endpoint: api/search
method: POST

request : http://localhost:5122/api/search
body: 
{
  "startEpoch": "now-1h",
  "endEpoch": "now",
  "searchText": "email",
  "indexName": "traces",
  "queryLanguage": "Splunk QL" 
}

response: 
{
    "hits": {
        "totalMatched": {
            "value": 25,
            "relation": "eq"
        },
        "records": [
            {
                "dropped_attributes_count": 0,
                "dropped_events_count": 0,
                "dropped_links_count": 0,
                "duration": 158167,
                "end_time": 1739535202168818296,
                "events": "null",
                "kind": "SPAN_KIND_INTERNAL",
                "links": "[]",
                "name": "sinatra.render_template",
                "parent_span_id": "b7d033279ad69e92",
                "service": "email",
                "sinatra.template_name": "layout",
                "span_id": "8d8d932fed32fd32",
                "start_time": 1739535202168660129,
                "status": "STATUS_CODE_UNSET",
                "timestamp": 1739535213733,
                "trace_id": "cdd36b0b200f195ac0981e28ce7b3ff1",
                "trace_state": ""
            },
            #Additional records...
        ]
    },
    "aggregations": null,
    "elapedTimeMS": 0,
    "allColumns": [
        "app.shipping.amount",
        "parent_span_id",
        "node_id",
        #Additional Columns...
    ],
    "qtype": "logs-query",
    "can_scroll_more": false,
    "dashboardPanelId": "",
    "columnsOrder": [
        "app.ads.ad_request_type",
        "app.ads.ad_response_type",
        "app.ads.category",
        #Additional Columns Order...
    ]
}
```


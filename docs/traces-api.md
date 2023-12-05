# Traces API

## 1. Retrieve Ingested Data
To retrieve all ingested data, use the `api/search` endpoint.

Request Body:
``` json
{
    "startEpoch": "now-1h",
    "endEpoch": "now",
    "searchText": "*",
    "indexName": "traces",
    "queryLanguage": "Splunk QL"
}
```
Response Body:
``` json
{
    "hits": {
        "totalMatched": {
            "value": 23321,
            "relation": "gte"
        },
        "records": [
            {
                "_index": "traces",
                "app.ads.ad_request_type": null,
                "app.ads.ad_response_type": null,
                "app.ads.category": null,
                "app.ads.contextKeys": null,
                "app.ads.contextKeys.count": null,
                "app.ads.count": null,
                "app.cart.items.count": null,
                "app.currency.conversion.from": null,
                "app.currency.conversion.to": null,
                "app.email.recipient": null,
                "app.featureflag.enabled": null,
                "app.featureflag.name": null,
                "app.filtered_products.count": null,
                "app.filtered_products.list.0": null,
                "app.filtered_products.list.1": null,
                "app.filtered_products.list.2": null,
                "app.filtered_products.list.3": null,
                "app.filtered_products.list.4": null,
                "app.order.amount": null,
                "app.order.id": null,
                "app.order.items.count": null,
                "app.payment.amount": null,
                "app.payment.card_type": null,
                "app.payment.card_valid": null,
                "app.payment.charged": null,
                "app.product.id": null,
                "app.product.name": null,
                "app.product.quantity": null,
                "app.products.count": null,
                "app.products_recommended.count": null,
                "app.quote.cost.total": null,
                "app.quote.items.count": null,
                "app.recommendation.cache_enabled": null,
                "app.shipping.amount": null,
                "app.shipping.cost.total": null,
                "app.shipping.items.count": null,
                "app.shipping.tracking.id": null,
                "app.shipping.zip_code": null,
                "app.synthetic_request": null,
                "app.user.currency": null,
                "app.user.id": null,
                "busy_ns": null,
                "canceled": null,
                "code.filepath": null,
                "code.function": null,
                "code.lineno": null,
                "code.namespace": null,
                "component": "proxy",
                "db.instance": null,
                "db.name": null,
                "db.redis.database_index": null,
                "db.redis.flags": null,
                "db.statement": null,
                "db.system": null,
                "db.type": null,
                "db.url": null,
                "decode_time_microseconds": null,
                "downstream_cluster": null,
                "dropped_attributes_count": 0,
                "dropped_events_count": 0,
                "dropped_links_count": 0,
                "duration": 60669000,
                "end_time": 1701741403012683000,
                "error": null,
                "events": "null",
                "guid:x-request-id": null,
                "http.client_ip": null,
                "http.flavor": null,
                "http.host": null,
                "http.method": null,
                "http.protocol": "HTTP/1.1",
                "http.request_content_length": null,
                "http.request_content_length_uncompressed": null,
                "http.response_content_length": null,
                "http.route": null,
                "http.scheme": null,
                "http.status_code": 200,
                "http.status_text": null,
                "http.target": null,
                "http.url": null,
                "http.user_agent": null,
                "idle_ns": null,
                "idle_time_microseconds": null,
                "kind": "SPAN_KIND_CLIENT",
                "links": "[]",
                "messaging.client_id": null,
                "messaging.destination.kind": null,
                "messaging.destination.name": null,
                "messaging.kafka.consumer.group": null,
                "messaging.kafka.destination.partition": null,
                "messaging.kafka.message.offset": null,
                "messaging.message.payload_size_bytes": null,
                "messaging.operation": null,
                "messaging.system": null,
                "name": "router frontend egress",
                "net.host.ip": null,
                "net.host.name": null,
                "net.host.port": null,
                "net.peer.ip": null,
                "net.peer.name": null,
                "net.peer.port": null,
                "net.sock.host.addr": null,
                "net.sock.peer.addr": null,
                "net.sock.peer.port": null,
                "net.transport": null,
                "node_id": null,
                "parent_span_id": "efd4f4939e0c2d69",
                "peer.address": "172.18.0.24:8080",
                "peer.service": null,
                "phoenix.action": null,
                "phoenix.plug": null,
                "query_time_microseconds": null,
                "queue_time_microseconds": null,
                "request_size": null,
                "response_flags": "-",
                "response_size": null,
                "rpc.grpc.status_code": null,
                "rpc.method": null,
                "rpc.service": null,
                "rpc.system": null,
                "rpc.user_agent": null,
                "service": "frontend-proxy",
                "sinatra.template_name": null,
                "source": null,
                "span_id": "36bd1a491a6a764e",
                "start_time": 1701741402952014000,
                "status": "STATUS_CODE_UNSET",
                "thread.id": null,
                "thread.name": null,
                "timestamp": 1701741405424,
                "total_time_microseconds": null,
                "trace_id": "2a874c870c3b2ff3bccd135c6375ae3f",
                "trace_state": "",
                "upstream_address": "172.18.0.24:8080",
                "upstream_cluster": "frontend",
                "upstream_cluster.name": "frontend",
                "user_agent": null,
                "zone": null
            }
            {
            // ... more records ...
            },

        ]
    },
           
    "aggregations": {},
    "elapedTimeMS": 410,
    "allColumns": [
        "_index",
        // ... more columns ...
    ],
    "qtype": "logs-query",
    "can_scroll_more": true,
    "total_rrc_count": 100,
    "dashboardPanelId": ""
}
```
## 2. Gantt Chart Data
For Gantt chart data specific to a trace ID, modify the request body accordingly and use the `api/search` endpoint. The response body will be similar to the one provided above, but it will be filtered to include data specific to the desired trace ID.

Request Body:
```json
{
    "startEpoch": "now-1h",
    "endEpoch": "now",
    "searchText": "trace_id=9f3239f9e01f9f648d188de4767c9a36",
    "indexName": "traces",
    "queryLanguage": "Splunk QL"
}
```
## 3. Red-metrics Data
Use the `api/search` endpoint to get the red-metrics data.

Request Body:
```json
{
    "startEpoch": "now-1h",
    "endEpoch": "now",
    "searchText": "*",
    "indexName": "red-traces",
    "queryLanguage": "Splunk QL"
}
```

Response Body:
```json
{
    "hits": {
        "totalMatched": {
            "value": 35,
            "relation": "eq"
        },
        "records": [
            {
                "_index": "red-traces",
                "error_rate": 0,
                "p50": 49792000,
                "p90": 49792000,
                "p95": 49792000,
                "p99": 49792000,
                "rate": 0.03333333333333333,
                "service": "frontend-proxy",
                "timestamp": 1701744228514
            },
            {
                "_index": "red-traces",
                "error_rate": 0,
                "p50": 2043042,
                "p90": 2043042,
                "p95": 2043042,
                "p99": 2043042,
                "rate": 0.016666666666666666,
                "service": "adservice",
                "timestamp": 1701744228514
            },
            {
                // ... more records ...
            }
         ]
    },
    "aggregations": {},
    "elapedTimeMS": 6,
    "allColumns": [
        "_index",
        "error_rate",
        "p50",
        "p90",
        "p95",
        "p99",
        "rate",
        "service",
        "timestamp"
    ],
    "qtype": "logs-query",
    "can_scroll_more": false,
    "total_rrc_count": 35,
    "dashboardPanelId": ""
}
```
## 3. Searching all Traces Data
To search for all traces data, use `api/traces/search` endpoint.

Request Body:
```json
{
    "startEpoch": "now-1h",
    "endEpoch": "now",
    "searchText": "*",
    "indexName": "traces",
    "queryLanguage": "Splunk QL"
}
```
Response Body:
```json

{
    "traces": [
        {
            "trace_id": "497021dac34126ec34bb671b235013f8",
            "start_time": 1701740537332844544,
            "end_time": 1701740537365339648,
            "span_count": 4,
            "span_errors_count": 0,
            "service_name": "frontend",
            "operation_name" : "GET"
        },
        {
            "trace_id": "ce926f2dc509e61591d62734945ab781",
            "start_time": 1701739970657999872,
            "end_time": 1701739976741989376,
            "span_count": 37,
            "span_errors_count": 0,
            "service_name": "productcatalogservice",
            "operation_name" : "oteldemo.ProductCatalogService/GetProduct"
        },
        {
            // ... more records ...
        }
     ]
}
```
## 4. Dependency Graph Data
To get dependency graph data use `api/traces/dependencies` endpoint.

Request Body:
```json
{
    "startEpoch": "now-1h",
    "endEpoch": "now",
    "searchText": "*",
    "indexName": "service-dependency",
    "queryLanguage": "Splunk QL"
}
```
Response Body:
```json
{
    "_index": "service-dependency",
    "frontend": {
        "adservice": 1,
        "cartservice": 1,
        "productcatalogservice": 4
    },
    "frontend-proxy": {
        "frontend": 7
    },
    "loadgenerator": {
        "frontend-proxy": 5
    },
    "timestamp": 1701745060056
}
```




    


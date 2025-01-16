# PromQL APIs

### Instant Query
Query the current value of your metrics. Use this when you need the latest data point.

```
GET /promql/api/v1/query
POST /promql/api/v1/query
```

Parameters:
- `query` (required): PromQL expression to evaluate
- `time`: Evaluation timestamp (RFC3339 or Unix timestamp). Optional, defaults to current time

Example:
```bash
# Get current value of a metric
curl -X GET "http://localhost:8081/promql/api/v1/query?query=http_requests_total"

# Calculate rate of requests
curl -X POST "http://localhost:8081/promql/api/v1/query" \
  -d 'query=rate(http_requests_total[5m])'
```

### Range Query
Query metrics data over a time range.

```
GET /promql/api/v1/query_range
POST /promql/api/v1/query_range
```

Parameters:
- `query` (required): PromQL expression to evaluate
- `start` (required): Start timestamp (RFC3339 or Unix timestamp)
- `end` (required): End timestamp (RFC3339 or Unix timestamp)
- `step` (required): Query resolution step width (duration or float number of seconds)

Example:
```bash
curl -X GET "http://localhost:8081/promql/api/v1/query_range?query=rate(http_requests_total[5m])&start=2024-01-01T00:00:00Z&end=2024-01-02T00:00:00Z&step=1h"
```

### List All Labels
Get a list of all label names in your metrics.

```
GET /promql/api/v1/labels
POST /promql/api/v1/labels
```

Parameters:
- `start`: Start timestamp (optional)
- `end`: End timestamp (optional)

Example:
```bash
curl -X GET "http://localhost:8081/promql/api/v1/labels"
```

### Get Label Values
Get all possible values for a specific label.

```
GET /promql/api/v1/label/{labelName}/values
```

Parameters:
- `labelName` (required): Name of the label
- `start`: Start timestamp (optional)
- `end`: End timestamp (optional)

Example:
```bash
# Get all values for the 'job' label
curl -X GET "http://localhost:8081/promql/api/v1/label/job/values"
```

### Get Series by Label Matchers
Find time series that match certain label sets.

```
GET /promql/api/v1/series
POST /promql/api/v1/series
```

Parameters:
- `match[]`: Series selector string (repeated)
- `start`: Start timestamp (optional)
- `end`: End timestamp (optional)

Example:
```bash
# Find series matching a label selector
curl -X GET "http://localhost:8081/promql/api/v1/series?match[]=http_requests_total{job='apiserver'}"
```

### UI Query
Special endpoint for UI-based metric exploration.

```
POST /promql/api/ui/query
```

Request body:
```json
{
  "query": "http_requests_total",
  "start": "2024-01-01T00:00:00Z",
  "end": "2024-01-02T00:00:00Z"
}
```

### Build Information
Get version and build details of the PromQL service.

```
GET /promql/api/v1/status/buildinfo
```

Example Response:
```json
{
  "version": "2.40.0",
  "revision": "40c56f5",
  "branch": "HEAD",
  "buildUser": "root@hostname",
  "buildDate": "20240115-12:00:00",
  "goVersion": "go1.19.5"
}
```

### Write Metrics
Write new metrics data points.

```
POST /promql/api/v1/write
```


Example:
```bash
curl -X POST "http://localhost:8081/promql/api/v1/write" \
  -H 'Content-Type: application/json' \
  -d '{
    "metrics": [
      {
        "name": "http_requests_total",
        "labels": {"method": "GET", "endpoint": "/api/v1"},
        "value": 42,
        "timestamp": "2024-01-15T12:00:00Z"
      }
    ]
  }'
```
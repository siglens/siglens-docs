# Elasticsearch APIs

1. **Ingest API**:
Ingest data in JSON format. Supports reading json data from file.

    Example:

    Using json file:
    ```
    curl -X POST http://localhost:8081/elastic/_bulk \
    -H 'Content-Type: application/json' \
    --data-binary "@sampleEvents.json" 
    ```
    Using raw json:
    ```
    curl -X POST "http://localhost:8081/elastic/_bulk" \
    -H 'Content-Type: application/json' \
    -d '{ "index" : { "_index" : "test" } }
    { "name" : "john", "age":"23" }'
    ```


2. **Get elasticsearch cluster information**:

    ```
    curl  http://localhost:8081/elastic/
    curl -X GET "http://localhost:8081/elastic/"
    curl -X GET "http://localhost:8081/elastic/_xpack"
    ```

    Example Output:
    ```
    {"name":"local","cluster_name":"siglens","cluster_uuid":"398fb430-f809-4f4c-88a7-95a5a1c28738","version":{"number":"7.9.3","build_flavor":"oss","build_type":"tar","build_date":"2021-10-07T21:56:19.031608185Z","build_hash":"83c34f456ae29d60e94d886e455e6a3409bba9ed","build_snapshot":false,"lucene_version":"8.9.0","minimum_wire_compatibility_version":"6.8.0","minimum_index_compatibility_version":"6.0.0-beta1"}}
    ```


3. **Create a new elasticsearch index**

    ```
    curl -X PUT http://localhost:8081/elastic/{indexName}
    ```


4. **Query / search ingested data**

    ```
    GET /elastic/_search
    GET /elastic/{indexName}/_search
    POST /elastic/_search
    POST /elastic/{indexName}/_search
    POST /elastic/{indexName}/_doc/_search
    GET /elastic/{indexName}/{docType}/_search
    POST /elastic/{indexName}/{docType}/_search 
    ```
    Examples:
    ```    
    curl -X GET http://localhost:5122/elastic/_search  \
        -d'{"query": {"match_all": {}}, "size": 2}'

    curl -X GET http://localhost:5122/elastic/ind-0/_search  \
        -d'{"query": {"match_all": {}}, "size": 2}'

    curl -X POST http://localhost:5122/elastic/_search  \
        -d'{"query": {"match_all": {}}}'

    curl -X POST http://localhost:5122/elastic/ind-0/_search  \
        -d '{"query":{"bool":{"must":{"term": {"weekday": "Saturday"}}}},"size": 1}' 

    curl -X POST http://localhost:5122/elastic/ind-0/_doc/_search  \
        -d '{"query":{"bool":{"must":{"term": {"weekday": "Saturday"}}}},"size": 1}' 
    ```


5. **Delete index**

    ```
    curl -X DELETE http://localhost:5122/elastic/{indexName}
    ```


6. **Create index alias**

    ```
    curl -X POST http://localhost:5122/elastic/_aliases 
    curl -X PUT http://localhost:5122/elastic/{indexName}/_alias/{aliasName}
    curl -X POST http://localhost:5122/elastic/{indexName}/_alias/{aliasName}
    ```
    Example:
    ```
    curl -X POST http://localhost:5122/elastic/_aliases \
    -d'{"actions" : [{ "add" : { "index" : "ind-0", "alias" : "alias1" } }]}'

    curl -X PUT http://localhost:5122/elastic/ind-0/_alias/ddd
    ```


7. **Create multiple index aliases**

    ```
    curl -X PUT http://localhost:5122/elastic/{indexName}/_aliases/{aliasName}
    curl -X POST http://localhost:5122/elastic/{indexName}/_aliases/{aliasName}
    ```
    Example:
    ```
    curl -X PUT http://localhost:5122/elastic/ind-0/_aliases/{ind-alias1,ind-alias2}
    ```


8. **Get index alias**

    ```
    curl -X GET http://localhost:5122/elastic/_aliases
    curl -X GET http://localhost:5122/elastic/_cat/aliases
    curl -X GET http://localhost:5122/elastic/_alias/{aliasName}
    ```
    Example:
    ```
    curl -X GET http://localhost:5122/elastic/_alias/ind-alias1

    Output:
    {"ind-0":{"aliases":{"ddd":{},"alias1":{},"ind-alias1":{},"ind-alias2":{}}}}%
    ```
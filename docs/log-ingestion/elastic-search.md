# Elastic Search

SigLens allows you to effortlessly ingest log data in Elastic Search format as well. All you need to do is POST the data to the ingestion server. 

To learn more about Elastic Search, check out the [Elastic website](https://www.elastic.co/)

# Ingesting Mock Data in Elastic Search Format

**Note**: Before proceeding, please make sure that the ingestion server is running on port 8081. If it is running on a different port, please change the port number in the below `curl` command accordingly.

We have created some mock data which you can use to test out the Elastic log ingestion features.

To load mock data into SigLens use the following commands:

```bash
curl -L https://github.com/sigscalr/ss-pub-data/releases/download/v1.0.0/prod-data-100mb.json.tar.gz -o prod-data-100mb.json.tar.gz 
tar -xf prod-data-100mb.json.tar.gz
curl http://localhost:8081/elastic/_bulk -i  --data-binary "@prod-data-0.json"
```

If you want to experiment with larger volumes of data, you can use these files.

The below files have sample data of 1GB and 4GB respecitvely. 
```
curl -L https://github.com/sigscalr/ss-pub-data/releases/download/v1.0.0/prod-data-1gb.json.tar.gz -o prod-data-1gb.json.tar.gz
curl -L https://github.com/sigscalr/ss-pub-data/releases/download/v1.0.0/prod-data-4gb.json.tar.gz -o prod-data-4gb.json.tar.gz
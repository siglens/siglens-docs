# Elastic Search

# The siglens instance should be running on localhost with ingestPort 8081

To load mock data into SigLens use the following commands:
```bash
curl -L https://github.com/sigscalr/ss-pub-data/releases/download/v1.0.0/prod-data-100mb.json.tar.gz -o prod-data-100mb.json.tar.gz 
tar -xjOf prod-data-100mb.json.tar.gz > prod-data-100mb.json  
curl http://localhost:8081/elastic/_bulk -i  --data-binary "@prod-data-100mb.json"
```

To load larger volumes of data, use:
```
curl -L https://github.com/sigscalr/ss-pub-data/releases/download/v1.0.0/prod-data-1gb.json.tar.gz -o prod-data-1gb.json
curl -L https://github.com/sigscalr/ss-pub-data/releases/download/v1.0.0/prod-data-4gb.json.tar.gz -o prod-data-4gb.json
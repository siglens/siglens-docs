# Python App

### Auto-instrument sample Python app for traces

In this tutorial, we will go through the steps to auto-instrument a Python app to send traces to Siglens.

### Prerequisites
- Siglens instance should be running on localhost with ingest port-4318. To do so you need to change the ingest port of Siglens to `4318` in `server.yaml`
- Python app (refer to the documentation below if you don't have the setup for the go app)

### Set up for Python application
Let's start by setting up our example application. This application will be a simple server that, when accessed, will respond with the message 'Web App with Python Flask!'. 

To begin, set up an environment in a new directory:
```
mkdir python-hello-world-otel
cd python-hello-world-otel
python3 -m venv venv
source ./venv/bin/activate
```
Now install Flask:
```
pip install 'flask<3' 'werkzeug<3'
```
Create a file server.py and add the following code to it:
```
from flask import Flask
 
app = Flask(__name__)
 
@app.route('/')
def index():
    return 'Web App with Python Flask!'
 
app.run(host='0.0.0.0', port=81)
```
Run the application using the following command:
```
python3 server.py
```

You can now access the running app at `http://localhost:81`:

![py-app](/tutorials/python-app.png)

### Auto instrumentation setup for Python app

We have to install all OpenTelemetry components that are required to auto-instrument our app:

Install the opentelemetry-distro package, which contains the OpenTelemetry API, SDK, and also the tools opentelemetry-bootstrap and opentelemetry-instrument you will use below
```
pip install opentelemetry-distro
```
Then run this command:
```
pip install Iv protobuf==3.20.1 
```
Run the opentelemetry-bootstrap command:
```
opentelemetry-bootstrap --action=install 
```
Now, we need to install the OpenTelemetry exporter:
```
pip install opentelemetry-exporter-otlp
pip install opentelemetry-exporter-otlp-proto-http
```
Run the following command in the terminal to enable auto-instrumentation of the application
```
OTEL_TRACES_EXPORTER=otlp OTEL_METRICS_EXPORTER=none 
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="http://localhost:4318/otlp/v1/traces" 
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf" OTEL_RESOURCE_ATTRIBUTES=service.name=python-app opentelemetry-instrument python3 server.py
```
The application gets started on `http://localhost:81`. Refresh the page to trigger our app to generate and emit a trace of that transaction (repeat that a few times to generate sample traces).

![terminal-py-app](/tutorials/terminal-python.png)

You can search traces:

![search-traces-py](/tutorials/search-traces-py.png)

You can view red-metrics traces:

![siglens-py-app](/tutorials/metrics-python.png)

Graph visualization of red-metrics:

![graph-1-py](/tutorials/metrics-graph-1-py.png)

![graph-2-py](/tutorials/metrics-graph-2-py.png)



# Javascript App

## Auto-instrument sample Javascript app for traces

In this tutorial, we will go through the steps to auto-instrument a Javascript app to send traces to Siglens.

## Quickstart
Start Siglens:
```bash
curl -L https://siglens.com/install.sh | sh
```

Install instrumentation tools from OpenTelemetry:
```bash
npm install --save @opentelemetry/api
npm install --save @opentelemetry/auto-instrumentations-node
```

Run a JavaScript app in a separate terminal:
```bash
git clone https://github.com/dockersamples/helloworld-demo-node
cd helloworld-demo-node

OTEL_LOGS_EXPORTER=none \
OTEL_METRICS_EXPORTER=none \
OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:8081/otlp" \
OTEL_SERVICE_NAME="my-service" \
NODE_OPTIONS="--require @opentelemetry/auto-instrumentations-node/register" \
node app.js
```

Go to the app at http://localhost:8089 and refresh the page a few times (you should see the docker whale) to send traces to Siglens.
After about 10 seconds, you should see the traces on Siglens on http://localhost:5122 then going to Tracing -> Search Traces and clicking the Find Traces button.

## More Details
OpenTelemetry has full auto-instrumentation for JavaScript, so auto-instrumenting your own JavaScript app is easy.
Simply follow the Quickstart instructions but replace the example JavaScript repo with your own.

Once you're on the Tracing tab of Siglens, you can search the traces and see health metrics and graphs for each service.
## Auto instrumentation setup for Javascript app

Now run the application with the following command:
```
node -r ./tracing.js index.js
```
![terminal-js](/static/tutorials/terminal-js-app.png)

Now, visit `http://localhost:5555/` and refresh the page a couple of times. Wait for 1-2 minutes, then check the data on SigLens.

You can search traces:

![search-js](/static/tutorials/search-traces-js.png)

You can view red-metrics:

![metrics-js](/static/tutorials/metrics-js.png)

Graph visualization of red-metrics:

![metrics-js-graph-1](/static/tutorials/js-graph-1.png)

![metrics-js-graph-2](/static/tutorials/js-graph-2.png)

# Javascript App

### Auto-instrument sample Javascript app for traces

In this tutorial we will go through the steps to auto instrument a Javascript app to send traces to Siglens.

### Prerequisites
- Siglens instance should be running on localhost with ingest port-4318. To do so you need to change the ingest port of Siglens to `4318` in `server.yaml`
- Javascript app (refer the documentation below if you don't have the setup for javascript app)
- To begin with the setup of Javascript app you must have Node.js installed locally. You can download it from [here](https://nodejs.org/en/download/)

### Set up for Javascript application

Given below are the instructions for setting up a sample Javascript application:

Note:                                                                                
To check if node is installed you can run the following command:
```
node -v
```
Create a new directory and install `Express` and `Cors` within that directory with the command given below:
```
npm i express cors
```
Now create a file named `index.js` and add the following code to it which gives `Hello World` as output:
```
const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || "5555";
const app = express();

app.use(cors());
app.use(express.json())

app.all("/", (req, res) => {
 res.json({ method: req.method, message: "Hello World", ...req.body });
 });
 
 app.get('/404', (req, res) => {
 res.sendStatus(404);
 })
 
 app.listen(parseInt(PORT, 10), () => {
 console.log(`Listening for requests on http://localhost:${PORT}`);
 })
```
Run the application with the following command:
```
node index.js
```
You can access the running app at `http://localhost:5555/`

![js-app](/tutorials/js-app.png)

### Auto instrumentation setup for Javascript app

Install the following Opentelemetry dependencies:
```
npm install --save @opentelemetry/sdk-node
npm install --save @opentelemetry/auto-instrumentations-node
npm install --save @opentelemetry/exporter-trace-otlp-proto
```
- The `@opentelemetry/sdk-node` package provides the full OpenTelemetry SDK for Node.js.
- The `@opentelemetry/auto-instrumentations-node` package installs instrumentation packages that will automatically create spans corresponding to code called in libraries. In this case, it provides instrumentation for Express, letting the example app automatically create spans for each incoming request.
- The `@opentelemetry/exporter-trace-otlp-proto` package allows to transport data via OTLP using the protocol - `http/protobuf`.

Create a file named tracing.js and add the following code to the file:
```
'use strict'
const process = require('process');
const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const init = (serviceName, environment) => {

  const exporterOptions = {
    url: 'http://localhost:4318/otlp/v1/traces',
  }

  const traceExporter = new OTLPTraceExporter(exporterOptions);
  const sdk = new opentelemetry.NodeSDK({
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: environment,
    })
  });

  sdk.start()

  process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });

}
```
Now to import this file in `index.js` add the following lines of code to index.js and tracing.js:

```
# Add the following lines at the start of index.js

const { init } = require('./tracing')
init('demo-node-service', 'development')
```
```
# Add the following lines at the end of tracing.js

module.exports = {
  init: init,
}
```
The default endpoint for sending the traces to SigLens is `http://localhost:4318/otlp/v1/traces` which is set in the code using `exporterOptions`.

Now run the application with the following command:
```
node -r ./tracing.js index.js
```
![terminal-js](/tutorials/terminal-js-app.png)

Now, visit `http://localhost:5555/` and refresh the page a couple of times. Wait for 1-2 minutes, then check the data on SigLens.

You can search traces:

![search-js](/tutorials/search-traces-js.png)

You can view red-metrics:

![metrics-js](/tutorials/metrics-js.png)

Graph visualization of red-metrics:

![metrics-js-graph-1](/tutorials/js-graph-1.png)

![metrics-js-graph-2](/tutorials/js-graph-2.png)






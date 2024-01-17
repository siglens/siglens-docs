# Python App

## Auto-instrument sample Python app for traces

In this tutorial, we will go through the steps to auto-instrument a Python app to send traces to SigLens.

## Quickstart
Start SigLens:
```bash
curl -L https://siglens.com/install.sh | sh
```

Setup a simple Python app:
```bash
git clone https://github.com/helloflask/flask-examples.git
cd flask-examples/hello
python3 -m venv flask
source flask/bin/activate
```

Install packages for OpenTelemetry Python development:
```bash
pip install opentelemetry-exporter-otlp-proto-http
pip install opentelemetry-distro
opentelemetry-bootstrap -a install
```

Install packages for OpenTelemetry Python development with Flask:
```bash
pip install 'flask<3' 'werkzeug<3'
pip install opentelemetry-instrumentation-flask
```

Run with OpenTelemetry auto-instrumentation:
```bash
OTEL_LOGS_EXPORTER=none \
OTEL_METRICS_EXPORTER=none \
OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:8081/otlp" \
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf" \
OTEL_SERVICE_NAME="my-service" \
opentelemetry-instrument flask run -p 8080
```

Go to the app at http://localhost:8080 and refresh the page a few times (you should see `Hello, World!`) to send traces to SigLens.
After about 10 seconds, you should see the traces on SigLens on http://localhost:5122 then going to Tracing -> Search Traces and clicking the Find Traces button.

## More Details
To auto-instrument your own Flask app, you'll follow a similar procedure as in the Quickstart.
For a Python app using a different framework, like Django, the process will be largely the same, but instead of installing `opentelemetry-instrumentation-flask` you'll install `opentelemetry-instrumentation-django`. Check out the [OpenTelemetry Registry](https://opentelemetry.io/ecosystem/registry/) to find the appropriate package for instrumenting your Python app.

For Django specifically, you'll also need to run the app like `python manage.py runserver --noreload`, passing the `--noreload` flag so that OpenTelemetry can properly instrument it (this flag prevents Django from running `main` twice).

Once you're on the Tracing tab of SigLens, you can search the traces and see health metrics and graphs for each service.

![search-python](/static/tutorials/search-traces-python.png)

![metrics-python](/static/tutorials/metrics-python.png)

![metrics-python-graph-1](/static/tutorials/python-graph-1.png)

![metrics-python-graph-2](/static/tutorials/python-graph-2.png)


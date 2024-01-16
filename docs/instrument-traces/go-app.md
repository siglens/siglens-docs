# Go App

## Auto-instrument sample Golang app for traces

In this tutorial, we will go through the steps to auto-instrument a Go app to send traces to Siglens.

## Quickstart
Start siglens:
```bash
git clone https://github.com/siglens/siglens.git
cd siglens
go run cmd/siglens/main.go --config server.yaml
```

Start a Go app in a separate terminal:
```bash
git clone https://github.com/siglens/bookstore-app.git
cd bookstore-app
SERVICE_NAME=goGinApp go run main.go  // TODO: check SERVICE_NAME
```

Go to the bookstore app at http://localhost:8090/books and refresh the page a few times (you should see `{"data":[]}`) to send traces to Siglens.
After about 10 seconds, you should see the traces on Siglens on http://localhost:5122 then going to Tracing -> Search Traces and clicking the Find Traces button.

## Instrumenting your Go app
Instrumenting your existing Go app to send traces to Siglens requires a few extra steps becasue OpenTelemetry doesn't yet have full auto-instrumentation for Go.
Let's say you have an app that uses the [Gin](https://gin-gonic.com/) framework.
Here's how you would use the `otelgin` package to instrument the `gin` calls:

1. In your `main.go`, update your imports section:
```
import (
    // Existing imports ...

    "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
)
```

2. Setup an `initTracing()` function in your `main.go`:
```
var (
	serviceName = os.Getenv("SERVICE_NAME")
)

func initTracing() func(context.Context) error {

	exporter, err := otlptrace.New(
		context.Background(),
		otlptracehttp.NewClient(
			otlptracehttp.WithInsecure(), // TODO: remove in production to use https, not http
			otlptracehttp.WithEndpoint("localhost:8081"),
			otlptracehttp.WithURLPath("/otlp/v1/traces"),
		),
	)

	if err != nil {
		log.Fatalf("Failed to create exporter: %v", err)
	}

	resources, err := resource.New(
		context.Background(),
		resource.WithAttributes(
			attribute.String("service.name", serviceName),
			attribute.String("library.language", "go"),
		),
	)

	if err != nil {
		log.Fatalf("Could not set resources: %v", err)
	}

	otel.SetTracerProvider(
		sdktrace.NewTracerProvider(
			sdktrace.WithSampler(sdktrace.AlwaysSample()),
			sdktrace.WithBatcher(exporter),
			sdktrace.WithResource(resources),
		),
	)
	return exporter.Shutdown
}
```

3. Call your new `initTracing()` in `main()`:

```
func main() {

    cleanup := initTracing()
    defer cleanup(context.Background())

    r := gin.Default()
    r.Use(otelgin.Middleware(serviceName))

    // Existing code ...
}
```

4. Run `go mod tidy` to download all the imported packages

The endpoint for sending the traces to SigLens is `http://localhost:8081/otlp/v1/traces` which is set in the code using the `otlptracehttp.With...` function calls.

```
```
Note:
- You will have to run `go mod tidy` to download all the packages that are there in the code and populate the `go.sum` file

The endpoint for sending the traces to SigLens is `http://localhost:4318/otlp/v1/traces` which is set in the code using `otlptracehttp.WithURLPath("/otlp/v1/traces")`
. Now, set the environment variable and run the app:

```
SERVICE_NAME=my-app go run main.go
```
![terminal-go](/tutorials/terminal-go-app.png)
Now, visit http://localhost:8090/books and refresh the page a couple of times. Wait for 1-2 minutes, then check the data on SigLens.

You can search traces:

![search-go](/tutorials/search-traces-go.png)

You can view red-metrics:

![metrics-go](/tutorials/metrics-go.png)

Graph visualization of red-metrics:

![metrics-go-graph-1](/tutorials/go-graph-1.png)

![metrics-go-graph-2](/tutorials/go-graph-2.png)

## Next Steps
Since OpenTelemetry doesn't yet support full auto-instrumentation for Go like it does for some other languages, how you instrument your app will depend on which packages you're currently using.
Checkout the [OpenTelemetry Registry](https://opentelemetry.io/ecosystem/registry/) to find instrumented packages that you can use in place of your existing packages.

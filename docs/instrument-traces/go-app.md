# Go App

### Auto-instrument sample Golang app for traces

In this tutorial we will go through the steps to auto instrument a Go app to send traces to Siglens.

### Prerequisites
- Siglens instance should be running on localhost with ingest port-4318. To do so you need to change the ingest port of Siglens to `4318` in `server.yaml`
- Go app (refer the documentation below if you don't have the setup for go app)

### Set up for Go application

Given below are the instructions for setting up a sample Golang application for a bookstore:

```
# Clone the bookstore repository from GitHub
git clone https://github.com/siglens/bookstore-app

# Change into the cloned directory
cd bookstore-app

# Run the application with the following command:
go run main.go
```
This runs the application at port 8090. Try accessing API at http://localhost:8090/books .
If you see an empty array as the result, it means your application is working:

![go-app](/tutorials/go-app.png)

Below are the APIs available:
```
GET    /books                    
GET    /books/:id               
POST   /books                    
PATCH  /books/:id                
DELETE /books/:id     
```
### Auto instrumentation setup for Go app

Import the following dependencies related to OpenTelemetry exporter and SDK in `main.go` file:
```
import (
    // other imports...

    "go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

```
To configure application to send data we have to create a function to initialise Opentelemetry. Update the code in `main.go` file by adding the code given below:

```
package main

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/siglens/bookstore-app/controllers"
	"github.com/siglens/bookstore-app/models"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	"log"
	"os"
)

var (
	serviceName = os.Getenv("SERVICE_NAME")
)

func initTracer() func(context.Context) error {

	exporter, err := otlptrace.New(
		context.Background(),
		otlptracehttp.NewClient(
			otlptracehttp.WithURLPath("/otlp/v1/traces"),
			otlptracehttp.WithInsecure(),
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

func main() {

	cleanup := initTracer()
	defer cleanup(context.Background())

	r := gin.Default()
	r.Use(otelgin.Middleware(serviceName))
	// Connect to database
	models.ConnectDatabase()

	// Routes
	r.GET("/books", controllers.FindBooks)
	r.GET("/books/:id", controllers.FindBook)
	r.POST("/books", controllers.CreateBook)
	r.PATCH("/books/:id", controllers.UpdateBook)
	r.DELETE("/books/:id", controllers.DeleteBook)

	// Run the server
	r.Run(":8090")
}
```
Note:
- You will have to run `go mod tidy` to download all the packges which are there in the code and populate the `go.sum` file

The endpoint for sending the traces to SigLens is `http://localhost:4318/otlp/v1/traces` which is set in the code using `otlptracehttp.WithURLPath("/otlp/v1/traces")`
. Now, set the environment variable and run the app:

```
SERVICE_NAME=goGinApp go run main.go
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





# Auto-instrument sample Golang app for traces

In this tutorial we will go through the steps to auto instrument a Go app to send traces to Siglens.

### Prerequisites
- Siglens instance should be running on localhost with ingest port-4318. To do so you need to change the ingest port of Siglens to `4318` in `server.yaml`
- Go app (refer the documentation below if you don't have the setup for go app)

### Set up for Go application

Given below are the instructions for setting up a sample Golang application which for a bookstore.

- Create a folder in which you will setup your go application
- Inside that create a folder named `models` and `controllers`. Models folder will contain two files named `book.go` and `setup.go` and controllers will contain file `books.go`
- Create a `main.go` file

Note:
- Initialize the Go Module with a Local Path:
```
go mod init mylocalmodule

// This will create a go.mod file
```

- You will have to run `go mod tidy` to download all the packges which are there in the code and populate the `go.sum` file

`book.go` will have the structure of the book which represents fields in the database table.
```
// Book.go

package models

type Book struct {
	ID     uint   `json:"id" gorm:"primary_key"`
	Title  string `json:"title"`
	Author string `json:"author"`
}
```
`setup.go` will contain the code for connecting to the database.
```
// Setup.go

package models

import (
	"github.com/uptrace/opentelemetry-go-extra/otelgorm"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database!")
	}

	database.AutoMigrate(&Book{})

	DB = database
	if err := DB.Use(otelgorm.NewPlugin()); err != nil {
		panic(err)
	}
}
```
`books.go` in controllers will have all the CRUD operations.

```
// Books.go

package controllers

import (
	"net/http"
	"mylocalmodule/models"
	"github.com/gin-gonic/gin"
)

type CreateBookInput struct {
	Title  string `json:"title" binding:"required"`
	Author string `json:"author" binding:"required"`
}

type UpdateBookInput struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}

// GET /books
// Find all books
func FindBooks(c *gin.Context) {
	var books []models.Book
	models.DB.WithContext(c.Request.Context()).Find(&books)
	c.JSON(http.StatusOK, gin.H{"data": books})
}

// GET /books/:id
// Find a book
func FindBook(c *gin.Context) {
	// Get model if exist
	var book models.Book
	if err := models.DB.WithContext(c.Request.Context()).Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": book})
}

// POST /books
// Create new book
func CreateBook(c *gin.Context) {
	// Validate input
	var input CreateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create book
	book := models.Book{Title: input.Title, Author: input.Author}
	models.DB.WithContext(c.Request.Context()).Create(&book)

	c.JSON(http.StatusOK, gin.H{"data": book})
}

// PATCH /books/:id
// Update a book
func UpdateBook(c *gin.Context) {
	// Get model if exist
	var book models.Book
	if err := models.DB.WithContext(c.Request.Context()).Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input UpdateBookInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.WithContext(c.Request.Context()).Model(&book).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": book})
}

// DELETE /books/:id
// Delete a book
func DeleteBook(c *gin.Context) {
	// Get model if exist
	var book models.Book
	if err := models.DB.WithContext(c.Request.Context()).Where("id = ?", c.Param("id")).First(&book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&book)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
```
`main.go` will contain the following code to run our Go app.
```
// main.go

package main
import (
	"mylocalmodule/controllers"
	"mylocalmodule/models"
	"github.com/gin-gonic/gin"
)

func main() {

	r := gin.Default()
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
Run the application with the following command:

```
go run main.go
```
This runs the application at port 8090. Try accessing API at http://localhost:8090/books .
If you see an empty array as the result, it means your application is working:

![go-app](/tutorials/go-app.png)


Below are the apis available:
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
    .....

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
	"log"
	"os"

	"mylocalmodule/controllers"
	"mylocalmodule/models"

	"github.com/gin-gonic/gin"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
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


The endpoint for sending the traces to Sigens is `http://localhost:4318/otlp/v1/traces` which is set in the code using `otlptracehttp.WithURLPath("/otlp/v1/traces")`
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





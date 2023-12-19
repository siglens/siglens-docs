# .Net App

### Auto-instrument sample Dotnet App for traces

In this tutorial we will go through the steps to auto instrument a .Net app to send traces to Siglens.

### Prerequisites
- Siglens instance should be running on localhost with ingest port-4318. To do so you need to change the ingest port of Siglens to `4318` in `server.yaml`
- .Net app (refer the documentation below if you don't have the setup for .Net app)
- To begin with the setup of .NET app you must have .NET SDK installed locally. You can download it from [here](https://dotnet.microsoft.com/en-us/download/dotnet)

### Set up for .Net application

To begin, set up an environment in a new directory called dotnet-app. Within that directory, execute following command:
```
dotnet new web
```
You will get a sample code in `Program.cs` file
```
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
Build and run the application with the following command:

```
dotnet build
dotnet run
```
In the Properties subdirectory, inside `launchSettings.json` you will get the url for the application:
```
"profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5234",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
}
```
You can see `Hello World!` message when you access the url `http://localhost:5234`:

![dotnet](/tutorials/dotnet-app.png)

### Auto instrumentation setup for .NET app

To automatically instrument the application with OpenTelemetry .NET we use the  `OpenTelemetry.AutoInstrumentation` package.

To automatically create traces the `OpenTelemetry.Instrumentation.AspNetCore` package is used for incoming ASP.NET Core requests.
 
Install the following dependencies:
```
dotnet add package OpenTelemetry
dotnet add package OpenTelemetry.Exporter.OpenTelemetryProtocol 
dotnet add package OpenTelemetry.Extensions.Hosting
dotnet add package OpenTelemetry.Instrumentation.Runtime
dotnet add package OpenTelemetry.Instrumentation.AspNetCore 
dotnet add package OpenTelemetry.AutoInstrumentation
```
In the Program.cs file, we add OpenTelemetry as a service and configure the following variables:

serviceName - Name of the service.                                                   
otlpOptions.Endpoint - Endpoint for sending traces to Siglens- `http://localhost:4318/otlp/v1/traces`

Given below is the updated `Program.cs` file with the configured variables:
```
using System.Diagnostics;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenTelemetry()
    .ConfigureResource(resource => 
        resource.AddService(serviceName: "sample-net-app"))
    .WithTracing(tracing => tracing
        .AddAspNetCoreInstrumentation()
        .AddConsoleExporter()
        .AddOtlpExporter(otlpOptions =>
        {
                        
            otlpOptions.Endpoint = new Uri("http://localhost:4318/otlp/v1/traces");
            otlpOptions.Protocol = OtlpExportProtocol.HttpProtobuf;
        
        }));

var app = builder.Build();

app.MapGet("/", () => $"Hello World! OpenTelemetry Trace: {Activity.Current?.Id}");
app.Run();
```
Now run the application:
```
dotnet build
dotnet run
```
The application gets started on `http://localhost:5234`. Refresh the page to trigger our app to generate and emit a trace of that transaction (repeat that a few times to generate sample traces).

![dotnet-app](/tutorials/dotnet-app-op.png)

You can search traces:

![search-dotnet](/tutorials/dotnet-search.png)

You can view red-metrics:

![metrics-dotnet](/tutorials/dotnet-metrics.png)

Graph visualization of red-metrics:

![dotnet-graph-1](/tutorials/dotnet-graph-1.png)

![dotnet-graph-2](/tutorials/dotnet-graph-2.png)









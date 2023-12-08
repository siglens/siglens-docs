# Auto-instrument sample java app for traces

In this tutorial we will go through the steps to auto instrument a java app to send traces to Siglens.

### Prerequisites
- Siglens instance should be running on localhost with ingest port-4318
- Java app
- Open Telemetry jar agent

### Set up java application

Given below are the commands for setting up a Java application.

```
# Clone the Spring PetClinic repository from GitHub and make sure to comment out the code in docker-compose.yaml file
git clone https://github.com/SigNoz/spring-petclinic

# Change into the cloned directory
cd spring-petclinic

# Use Maven Wrapper to package the Spring PetClinic application
./mvnw package

# Run the Spring PetClinic application using the generated JAR file
java -jar target/*.jar
```
You can access the running app at localhost:8090

![java-app](/tutorials/java-app.png)

### Auto instrumentation setup for java app

To enable automatic instrumentation of the application, the Jar agent must be activated. This helps in generating traces from the java app and these traces are then sent to Siglens for visualization and analysis.

To download the Java Jar agent, run the below command in your terminal. The JAR file contains the agent and all automatic instrumentation packages:
```
curl -L -O https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

Run the following command in terminal to enable auto instrumentation of the application
```
OTEL_TRACES_EXPORTER=otlp OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="http://localhost:4318/otlp/v1/traces" OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf" OTEL_RESOURCE_ATTRIBUTES=service.name=spring-petclinic java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
```
Note:
- Write your path in place of the path -`/path/opentelemetry-javaagent.jar`

The application gets started on the same server - localhost:8090. Make sure that there is no other application running on the same address. If so, then you will have to stop that.

![terminal-java-app](/tutorials/terminal-java-app.png)

You can view the traces:

![siglens-java-app](/tutorials/siglens-java-app.png)






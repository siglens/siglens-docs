# Syslog Ingestion

For syslog ingestion follow the steps given below:

### Prerequisities:

- You need to have Java and Maven installed.

Clone a sample Java app repository from GitHub:
```
git clone https://github.com/siglens/hello-logger.git
```
In your log4j2 config file in the `<Appenders>` section we added an HttpAppender:
```
<Http name="http" url="http://localhost:8081/splunk/services/collector/event">
  <JsonLayout properties="true">
      <KeyValuePair key="index" value="default"/>
  </JsonLayout>
</Http>
```
Note:
Make sure to update http://localhost:8081 with the address where you can access siglens. The port (8081 here), is the ingestPort in the siglens config file server.yaml

In the `<Loggers>` section, inside the `<Root>`section we added the HttpAppender like this:
```
<AppenderRef ref="http"/>
```

Finally, in the pom.xml, we added the log4j-web dependency:
```
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-web</artifactId>
    <version>2.17.1</version>
</dependency>
``````
After cloning this repo, you can build the project using maven:
```
mvn clean package
```
For running the project, use the below command:
```
java -jar target/hello-logger-1.0-SNAPSHOT.jar
```
You can access the Siglens server running at : `http://localhost:5122` and view the logs sent by java app:

![syslog](/tutorials/syslog.png)



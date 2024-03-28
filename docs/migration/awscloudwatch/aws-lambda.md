import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# AWS Lambda

*Migrating/Stream Logs from AWS CloudWatch to SigLens through AWS Lambda.*


### 1. AWS Lambda Function Setup

**Prerequisites**: AWS account with logs in CloudWatch Logs Group.

#### Set IAM Permissions
1. In AWS Lambda Console, create a new Node.js function.
2. Assign custom IAM role with permissions:
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "logs:CreateLogGroup",
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "logs:CreateLogStream",
                    "logs:PutLogEvents"
                ],
                "Resource": "*"
            }
        ]
    }
    ```
3. Click `Create function`.

### 2. CloudWatch Trigger Configuration
1. In your Lambda function, go to Configuration > Triggers.
2. Click `Add Trigger`, choose `CloudWatch Logs` as the source.
3. Select your log group, set a Filter name, and an optional Filter-pattern.
4. Click `Add`.

### 3. Environment Variables Setup
Configure the following environment variables in your AWS Lambda function:
- **SIGLENS_INGEST_URL**: Specify the endpoint for log ingestion, for example, `https://yourhost.com:8081/services/collector/event`.
- **SIGLENS_TOKEN**: This is the ingestion token required for authenticating requests to SigLens. Use this if you are utilizing a SigLens SaaS account. To find your ingestion token, navigate to `My Org` -> `API Keys` -> `Ingest Token` within your SigLens dashboard.


### 4. Lambda Function Deployment
1. In the Code section, navigate to `index.mjs`, replace its contents with the below code, and save.

    <Tabs
    className="bg-light"
    defaultValue="nodejs"
    values={[
        {label: 'Node.js', value: 'nodejs'},
    ]
    }>

    <TabItem value="nodejs">

    <details>
    <summary>index.mjs</summary>

    ```javascript
    /**
     * Stream events from AWS CloudWatch Logs to SigLens
     *
     * This function streams AWS CloudWatch Logs to SigLens using
     * the SigLens HTTP event collector API.
     *
     * Define the following Environment Variables in the console below to configure
     * this function to stream logs to your SigLens host:
     *
     * 1. SIGLENS_INGEST_URL: URL address for your SigLens HTTP event collector endpoint.
     * Default port for event collector is 8081. Example: https://host.com:8081/services/collector/event
     *
     * 2. SIGLENS_TOKEN: Token for your SigLens HTTP event collector.
     */
    import * as zlib from 'node:zlib';
    import { Logger as SiglensLogger } from './lib/siglenslogger.mjs';

    const loggerConfig = {
        url: process.env.SIGLENS_INGEST_URL,
        token: process.env.SIGLENS_TOKEN,
    };
    const logger = new SiglensLogger(loggerConfig);

    export const handler = (event, context, callback) => {
        console.log('Received event:', JSON.stringify(event, null, 2));

        // CloudWatch Logs data is base64 encoded so decode here
        const payload = Buffer.from(event.awslogs.data, 'base64');
        // CloudWatch Logs are gzip compressed so expand here
        zlib.gunzip(payload, (err, result) => {
            if (err) {
                callback(err);
            } else {
                const parsed = JSON.parse(result.toString('ascii'));
                console.log('Decoded payload:', JSON.stringify(parsed, null, 2));
                let count = 0;
                if (parsed.logEvents) {
                    parsed.logEvents.forEach((item) => {
                        /* Log event to SigLens with explicit event timestamp.
                        - Use optional 'context' argument to send Lambda metadata e.g. awsRequestId, functionName.
                        - Change "item.timestamp" below if time is specified in another field in the event.
                        - Change to "logger.log(item.message, context)" if no time field is present in event. */
                        logger.logWithTime(item.timestamp, item.message, context);

                        /* Alternatively, UNCOMMENT logger call below to override default input settings */
                        /* Log event to SigLens with any combination of explicit timestamp, index, source, sourcetype, and host.*/
                        // logger.logEvent({
                        //     timestamp: new Date(item.timestamp).getTime() / 1000,
                        //     host: 'serverless',
                        //     source: `lambda:${context.functionName}`,
                        //     sourcetype: 'httpevent',
                        //     index: 'main',
                        //     event: item.message,
                        // });

                        count += 1;
                    });
                }
                // Send all the events in a single batch to SigLens
                logger.flushAsync((error, response) => {
                    if (error) {
                        callback(error);
                    } else {
                        console.log(`Response from SigLens:\n${response}`);
                        console.log(`Successfully processed ${count} log event(s).`);
                        callback(null, count); // Return number of log events
                    }
                });
            }
        });
    };

    ```
    </details>

    </TabItem>
    </Tabs>

2. Create a `lib` folder and create `siglenslogger.mjs` file inside the `lib` folder, input the below code, and save.

    <Tabs
    className="bg-light"
    defaultValue="nodejs"
    values={[
        {label: 'Node.js', value: 'nodejs'},
    ]
    }>

    <TabItem value="nodejs">

    <details>
    <summary>lib/siglenslogger.mjs</summary>

    ```javascript
    import * as url from 'node:url';
    import { createRequire } from 'node:module';
        
    const require = createRequire(import.meta.url);

    const Logger = function Logger(config) {
        this.url = config.url;
        this.token = config.token;

        this.addMetadata = true;
        this.setSource = true;

        this.parsedUrl = url.parse(this.url);
        // eslint-disable-next-line import/no-dynamic-require
        this.requester = require(this.parsedUrl.protocol.substring(0, this.parsedUrl.protocol.length - 1));
        // Initialize request options which can be overridden & extended by consumer as needed
        this.requestOptions = {
            hostname: this.parsedUrl.hostname,
            path: this.parsedUrl.path,
            port: this.parsedUrl.port,
            method: 'POST',
            headers: {
                Authorization: `${this.token}`,
            },
            rejectUnauthorized: false,
        };

        this.payloads = [];
    };

    // Simple logging API for Lambda functions
    Logger.prototype.log = function log(message, context) {
        this.logWithTime(Date.now(), message, context);
    };

    Logger.prototype.logWithTime = function logWithTime(time, message, context) {
        const payload = {};

        if (Object.prototype.toString.call(message) === '[object Array]') {
            throw new Error('message argument must be a string or a JSON object.');
        }
        payload.event = message;

        // Add Lambda metadata
        if (typeof context !== 'undefined') {
            if (this.addMetadata) {
                // Enrich event only if it is an object
                if (message === Object(message)) {
                    payload.event = JSON.parse(JSON.stringify(message)); // deep copy
                    payload.event.awsRequestId = context.awsRequestId;
                }
            }
            if (this.setSource) {
                payload.source = `lambda:${context.functionName}`;
            }
        }

        payload.timestamp = new Date(time).getTime() / 1000;

        this.logEvent(payload);
    };

    Logger.prototype.logEvent = function logEvent(payload) {
        this.payloads.push(JSON.stringify(payload));
    };

    Logger.prototype.flushAsync = function flushAsync(callback) {
        callback = callback || (() => {}); // eslint-disable-line no-param-reassign

        console.log('Sending event(s)');
        const req = this.requester.request(this.requestOptions, (res) => {
            res.setEncoding('utf8');

            console.log('Response received');
            res.on('data', (data) => {
                let error = null;
                if (res.statusCode !== 200) {
                    error = new Error(`error: statusCode=${res.statusCode}\n\n${data}`);
                    console.error(error);
                }
                this.payloads.length = 0;
                callback(error, data);
            });
        });

        req.on('error', (error) => {
            callback(error);
        });

        req.end(this.payloads.join(''), 'utf8');
    };

    export { Logger };

    ```
    </details>

    </TabItem>
    </Tabs>

3. Click **Deploy**.

### 5. Testing and Verification
1. Generate logs in CloudWatch.
2. Wait 10-15 seconds and verify logs in SigLens UI.

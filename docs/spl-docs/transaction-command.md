# Transaction

## Description

The transaction command finds transactions based on events that meet various constraints. Transactions are made up of the raw text (the raw event) of each member, the time and date fields of the earliest member, as well as the union of all other fields of each member.

Additionally, the `transaction` command adds two fields to the raw events, `duration` and `eventcount`. The values in the `duration` field show the difference between the timestamps for the `first` and `last` events in the transaction. The values in the `eventcount` field show the number of events in the transaction.

In the output, the `events` in a transaction are grouped together as multiple values in the `Events` field. Each event in a transaction starts on a new line by default.


## Syntax

The required syntax is in **bold**.

**transaction** \
[\<field-list>] \
[\<txn_definition-options>...]

## Required Arguments

None.

## Optional Arguments

### fied-list

**Syntax**: `<field>...`
**Description**: One or more field names. The events are grouped into transactions, based on the unique values in the fields. For example, suppose two fields are specified: `client_ip` and `host`. For each `client_ip` value, a separate transaction is returned for each unique `host` value for that `client_ip`.

### txn_definition-options

**Syntax**: `<startswith>` | `<endswith>` \
**Description**: Specify the transaction definition options to define your transactions. You can use multiple options to define your transaction.

### startswith

**Syntax**: `startswith=<filter-string>` \
**Description**: A search or eval filtering expression which if satisfied by an event marks the beginning of a new transaction.


### endswith

**Syntax**: `endswith=<filter-string>` \
**Description**: A search or eval expression which, if satisfied by an event, marks the end of a transaction.



## Filter String Options

These options are used with the `startswith` and `endswith` arguments.

#### \<filter-string>

**Syntax**: `<search-expression> | (<quoted-search-expression>) | eval(<eval-expression>)` \
**Description**: A search or eval filtering expression which if satisfied by an event marks the end of a transaction.

#### \<search-expression>

**Description**: A valid search expression that does not contain quotes.

#### \<quoted-search-expression>

**Description**: A valid search expression that contains quotes.

#### \<eval-expression>

**Description**: A valid eval expression that evaluates to a Boolean.

## Example

### Specifying Multiple Fields

The `transaction` command does not necessarily interpret the multiple fields as a conjunction (`field1 AND field2 AND field3`) or a disjunction (`field1 OR field2 OR field3`) of those fields. If there is a transitive relationship between the fields in the fields list and if the related events appear in the correct sequence, each with a different timestamp, `transaction` command will try to use it. For example, if you searched for

```
... | transaction host cookie
```

You might see the following events grouped into a transaction:

```
event=1 host=a
event=2 host=a cookie=b
event=3 cookie=b
```

**NOTE**: If the `transaction` command does not specify any fields to group by, it will default to using the `timestamp` field to group events.

### Basic Examples

#### Group Events by a Single Field

**Example:** Group events by the `session_id` field.

```
sourcetype=access_combined | transaction session_id
```

This example groups all events with the same `session_id` into a single transaction.

#### Group Events by Multiple Fields

**Example:** Group events by the combination of `client_ip` and `host` fields.

```
sourcetype=access_combined | transaction client_ip host
```

This example groups all events with the same combination of `client_ip` and `host` into a single transaction.

#### Define Transactions with `startswith` and `endswith`

**Example:** Define a transaction where the first event contains the string "login" and the last event contains the string "logout".

```
sourcetype=access_combined | transaction session_id startswith="login" endswith="logout"
```

This example groups events into transactions that start with a "login" event and end with a "logout" event for each `session_id`.

#### Filter Transactions by Duration

**Example:** Define a transaction and filter transactions that took longer than 60 seconds.

```
sourcetype=access_combined | transaction session_id startswith="login" endswith="logout" | where duration > 60
```

This example filters out transactions where the duration between the "login" and "logout" events is less than 60 seconds.

#### Define Transactions with `eval` Expressions

**Example:** Define a transaction where the first event has a `status` field equal to "started" and the last event has a `status` field equal to "completed".

```
sourcetype=access_combined | transaction session_id startswith="eval(status='started')" endswith="eval(status='completed')"
```

This example groups events into transactions that start with a `status` of "started" and end with a `status` of "completed" for each `session_id`.

#### Group Events and Filter by Event Count

**Example:** Define a transaction and filter transactions that have more than 3 events.

```
sourcetype=access_combined | transaction session_id | where eventcount > 3
```

This example filters out transactions that have 3 or fewer events.

#### Combining Multiple Conditions

**Example:** Define a transaction with multiple fields and filter based on start and end conditions.

```
sourcetype=access_combined | transaction client_ip host startswith="GET /start" endswith="POST /end"
```

This example groups events into transactions based on `client_ip` and `host` and starts with a "GET /start" request and ends with a "POST /end" request.

### Use-Case Example

**Identify transactions with the same session ID and IP address**

**Problem:** A user wants to group web access events into transactions based on the same session ID and IP address. Each transaction should start with an event containing the string "view" and end with an event containing the string "purchase." Additionally, the user wants to filter out transactions that took less than a second to complete and display the duration and event count for each transaction.

**Solution:** The `transaction` command can be used to define a transaction based on the session ID (`JSESSIONID`) and IP address (`clientip`). The `startswith` and `endswith` arguments specify the start and end events of the transaction. The `where` command can then be used to filter transactions based on their duration.

Assume the ingested data format is like this:

```
_time, clientip, JSESSIONID, event
2023-07-01T12:00:00Z, 192.168.1.1, ABC123, view
2023-07-01T12:05:00Z, 192.168.1.1, ABC123, add_to_cart
2023-07-01T12:10:00Z, 192.168.1.1, ABC123, purchase
2023-07-01T12:15:00Z, 192.168.1.1, XYZ789, view
2023-07-01T12:20:00Z, 192.168.1.1, XYZ789, browse
2023-07-01T12:25:00Z, 192.168.1.1, XYZ789, purchase
```

For the above data, the query will be:

```
sourcetype=access_* 
| transaction JSESSIONID clientip startswith="view" endswith="purchase" 
| where duration > 0
| table JSESSIONID clientip duration eventcount
```

**Explanation:**
1. The `transaction` command groups events by `JSESSIONID` and `clientip`. It defines the first event in the transaction using the `startswith="view"` argument and the last event using the `endswith="purchase"` argument.
2. The `where` command filters out transactions that took less than a second to complete by using the `duration` field, which is added by the `transaction` command.
3. The `table` command is used to display the relevant fields (`JSESSIONID`, `clientip`, `duration`, `eventcount`).

**Output:**

The output for the above command based on the mentioned data would look like this:

```
JSESSIONID   clientip    duration   eventcount
ABC123       192.168.1.1 600        3
XYZ789       192.168.1.1 600        3
```

This approach groups events into meaningful transactions, filters out any transactions that did not take a significant amount of time, and displays the duration and event count for each transaction, providing a clear view of user interactions.


# inputlookup command

## Description
The `inputlookup` command is used to search the contents of a CSV-based lookup table. This command allows you to retrieve and filter data stored in a lookup table.

## Syntax

Required syntax is in **bold**.

| **inputlookup**\
[append=\<boolean\>]\
[start=\<boolean\>]\
[max=\<boolean\>]\
**\<filename\>**
[WHERE \<search-query\>]

### Required Arguments

#### \<filename\>
**Syntax:** `<string>`\
**Description:**\
The name of the lookup file. It must end with either `.csv` or `.csv.gz`.

### Optional Arguments

#### append
**Syntax:** `append=<boolean>`\
**Description:**\
If set to `true`, the data from the lookup file is appended to the current results instead of replacing them.\
This option must be set to `true` if the `inputlookup` command is not the first command in the search.\
**Default:** `false`

#### start
**Syntax:** `start=<int>`\
**Description:**\
Specify the 0-based offset for the first event to read. For example, if `start=0`, it begins with the first event. If `start=5`, it begins with the sixth event.\
**Default:** 0

#### max
**Syntax:** `max=<int>`\
**Description:**\
Indicate the maximum number of events to read from the file.\
**Default:** 1000000000 (1 billion)

#### WHERE \<search-query\>
**Syntax:** `<boolean-expression>`\
**Description:**
Use this clause to enhance search performance by pre-filtering data from the lookup table.\
It supports a limited set of comparison operators: `=`, `!=`, `<`, `>`, `<=`, `>=`, `AND`, `OR`, `NOT`.\
Any combination of these operators is allowed. The `*` character can be used to perform wildcard string searches.
When used with `max`, the `where` filter applies only to the first `max` number of events fetched. For example, if `max=3` is set along with a `where` condition, it will fetch the first 3 events and filter out those that don't match the `where` condition.


## Usage

The `inputlookup` command is an event-generating command. When used as the first command in the query, a preceding pipe is required. If it's not the first command, it must have `append=true`.

Users can upload local `csv` and `csv.gz` files by navigating to Lookup Tab > Add New Lookup File. All the lookup files will be stored under the `data/lookups` directory. These files can be used for further queries.

## Examples

The following example reads the data.csv lookup file.

```
| inputlookup data.csv
```

## Use-Case Examples

### 43. Analyzing Network Traffic Actions Based on Subnet

**Problem:** A network administrator needs to categorize network traffic to determine whether it originates from internal or external sources. This categorization helps in understanding the distribution of firewall actions (e.g., allowed or blocked traffic) based on the source of the traffic.

**Solution:** Use the `inputlookup` command to load subnet categories from a CSV file and then evaluate whether the source IP addresses belong to internal subnets. Finally, aggregate the data to count the number of actions based on whether the traffic is internal or external.

```
index=network
| inputlookup subnet_categories.csv
| eval is_internal=if(cidrmatch(internal_subnet, src_ip), "yes", "no")
| stats count by is_internal, action
```

#### Explanation

- `inputlookup subnet_categories.csv` loads the subnet categories from the `subnet_categories.csv` file.
- `eval is_internal=if(cidrmatch(internal_subnet, src_ip), "yes", "no")` evaluates whether the source IP (`src_ip`) belongs to an internal subnet (`internal_subnet`). If it does, it sets `is_internal` to "yes"; otherwise, it sets it to "no".
- `stats count by is_internal, action` aggregates the data to count the number of actions (e.g., allowed or blocked) based on whether the traffic is internal or external.



### 44. Categorizing and Analyzing Application Services

**Problem:** A system administrator needs to categorize application services based on their maximum concurrent users and allocated memory. Additionally, the administrator wants to analyze the distribution of services across different tiers and resource allocations, including the presence of load balancers and the average number of maximum concurrent users.

**Solution:** Use the `inputlookup` command to load services data from CSV files, categorize the services based on predefined criteria, and then aggregate and analyze the data to provide insights into the distribution and characteristics of the services.

```
| inputlookup app_services.csv
| inputlookup append=true new_services.csv
| eval service_tier=case(
    max_concurrent_users < 1000, "Basic",
    max_concurrent_users < 5000, "Standard",
    max_concurrent_users >= 5000, "Enterprise"
)
| eval has_load_balancer=if(isnotnull(load_balancer_config), "Yes", "No")
| eval resource_allocation=case(
    allocated_memory < 4, "Low",
    allocated_memory < 16, "Medium",
    allocated_memory >= 16, "High"
)
| stats 
    count as total_services,
    count(eval(has_load_balancer="Yes")) as load_balanced_services,
    avg(max_concurrent_users) as avg_max_users,
    dc(service_type) as unique_service_types
    by service_tier, resource_allocation
| eval percent_load_balanced=round((load_balanced_services/total_services) * 100, 2)
| eval avg_max_users=round(avg_max_users, 0)
| sort service_tier, resource_allocation
| fields service_tier, resource_allocation, total_services, load_balanced_services, percent_load_balanced, avg_max_users, unique_service_types
```

#### Explanation

- `inputlookup append=true new_services.csv` appends additional service data from the `new_services.csv` file to the existing dataset.
- `eval service_tier=case(...)` categorizes services into "Basic", "Standard", or "Enterprise" tiers based on `max_concurrent_users`:
  - `max_concurrent_users < 1000` is categorized as "Basic".
  - `max_concurrent_users < 5000` is categorized as "Standard".
  - `max_concurrent_users >= 5000` is categorized as "Enterprise".
- `eval has_load_balancer=if(isnotnull(load_balancer_config), "Yes", "No")` determines if a service has a load balancer based on the presence of `load_balancer_config`. If `load_balancer_config` is not null, it sets `has_load_balancer` to "Yes"; otherwise, it sets it to "No".
- `eval resource_allocation=case(...)` categorizes services into "Low", "Medium", or "High" resource allocations based on `allocated_memory`:
  - `allocated_memory < 4` is categorized as "Low".
  - `allocated_memory < 16` is categorized as "Medium".
  - `allocated_memory >= 16` is categorized as "High".
- `stats ... by service_tier, resource_allocation` aggregates the data to count the total services, load-balanced services, average maximum concurrent users, and unique service types for each combination of `service_tier` and `resource_allocation`:
  - `count as total_services` counts the total number of services.
  - `count(eval(has_load_balancer="Yes")) as load_balanced_services` counts the number of services that have a load balancer.
  - `avg(max_concurrent_users) as avg_max_users` calculates the average number of maximum concurrent users.
  - `dc(service_type) as unique_service_types` counts the distinct number of service types.
- `eval percent_load_balanced=round((load_balanced_services/total_services) * 100, 2)` calculates the percentage of load-balanced services and rounds it to two decimal places.
- `eval avg_max_users=round(avg_max_users, 0)` rounds the average maximum concurrent users to the nearest whole number.
- `sort service_tier, resource_allocation` sorts the results by `service_tier` and `resource_allocation` to organize the data in a structured manner.
- `fields service_tier, resource_allocation, total_services, load_balanced_services, percent_load_balanced, avg_max_users, unique_service_types` selects and displays only the specified fields in the final output, ensuring that the relevant information is presented clearly.
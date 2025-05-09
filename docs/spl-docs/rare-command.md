
# rare

## Description

Displays the least common values within a specified field.

Identifies the rarest combination of values across all fields listed. When a `<by-clause>` is provided, it yields the least common combinations of values for each unique combination of the group-by fields.

This command functions similarly to the `top` command but focuses on identifying the least common values instead of the most common ones.

## Syntax

**rare** [\<rare-options\>...] \<field-list\> [\<by-clause\>]

### Required Arguments

#### \<field-list\>
**Syntax:** `<string>,...`\
**Description:** Comma-delimited list of field names.

### Optional Arguments

#### \<rare-options\>
**Syntax:** `countfield=<string> or limit=<int> or percentfield=<string> or showcount=<bool> or showperc=<bool>`\
**Description:** Options that specify the type and number of values to display. These are the same as the \<top-options\> used by the top command.

#### \<by-clause\>
**Syntax:** `BY <field-list>`\
**Description:** The name of one or more fields to group by.

### Rare Options

#### countfield
**Syntax:** `countfield=<string>`\
**Description:** The name of a new field to write the value of count into.\
**Default:** "count"

#### limit
**Syntax:** `limit=<int>`\
**Description:** Specifies how many tuples to return. If you specify limit=0, all values up to the maxresultrows are returned. Specifying a value larger than the maxresultrows produces an error. See Usage.\
**Default:** 10

#### percentfield
**Syntax:** `percentfield=<string>`\
**Description:** Name of a new field to write the value of percentage.\
**Default:** "percent"

#### showcount
**Syntax:** `showcount=<bool>`\
**Description:** Specifies whether to add a field to your results with the count of the tuple. The name of the field is controlled by the countfield argument.\
**Default:** true

#### showperc
**Syntax:** `showperc=<bool>`\
**Description:** Specifies whether to add a field to your results with the relative prevalence of that tuple. The name of the field is controlled by the percentfield argument.\
**Default:** true

## Examples

1. **Identifying Rare Devices or Browsers**

Discover the most uncommon user agents in your data. This can help you spot rare devices or browsers that are interacting with your system.

	```spl
	... | rare user_agent
	```

2. **Exploring Rare Cities Within Countries**

Discover the least common cities in each country, along with how often they appear. This information can be useful for creating location-based marketing campaigns or getting a better understanding of where your users are coming from.

	```spl
	... | rare city BY country showcount=true
	```

3. **Analyzing Uncommon Web Traffic Patterns**

Find the rarest pairs of HTTP methods and status codes, organized by weekdays. Showing both the number and percentage of these occurrences helps spot unusual web traffic patterns, which can be useful for detecting anomalies or evaluating website security.

	```spl
	... | rare http_method, http_status BY weekday showcount=true showperc=true
	```

4. **Finding Unique Job Titles by Level**

Find the least common job titles in your company, sorted by job level. This can help you identify unique or specialized positions, which is useful for managing your workforce and planning your organizational structure.

	```spl
	... | rare job_title BY job_level showcount=true showperc=true
	```

5. **Highlighting Less Popular App Versions**

Identify the least frequently used app names along with their version numbers, including how many times they appear. This information is valuable for software teams to understand which versions are not widely adopted and might need more support or promotional activities.

	```spl
	... | rare app_name BY app_version showcount=true
	```
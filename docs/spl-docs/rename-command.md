
# rename

## Description

The `rename` command allows you to update the names of fields to something more descriptive or easier to understand. For instance, changing `app_version` to `Application Version` can make your data more accessible and self-explanatory. This is particularly helpful when dealing with fields that have cryptic or abbreviated names. If there are multiple fields with a common naming pattern, you can leverage a wildcard to rename them in bulk, streamlining the process of making your dataset user-friendly.

## Syntax

rename \<field-name\> AS \<field-name\>...
### Required Arguments

#### \<field-name\>
**Syntax:** `<string>`\
**Description:** This specifies the original field name and the new name it should be changed to. An asterisk \(\*\) can serve as a wildcard, allowing you to target multiple fields that share a common prefix. For instance, to rename all fields beginning with "app", you could use a wildcard like app*.

## Usage

### Rename with a phrase
Use quotation marks when you rename a field with a phrase.

```
... | rename app_name AS "Application Name"
```

### Rename multiple, similarly named fields
Use wildcards to rename multiple fields with similar names. For example, suppose you have the following field names:

- `app_name`
- `app_version`

You can rename the fields to replace EU with EMEA:

```
... | rename app* AS Application*
```

The results show these field names:

- `Application_name`
- `Application_version`

Both the original and renamed fields must include the same number of wildcards, otherwise an error is returned.

### Renaming a field that does not exist
Renaming a field can cause loss of data.

Suppose you rename `appname` to `app_version`, but `appname` does not exist.

- If `app_version` does not exist, nothing happens.
- If `app_version` does exist, the result of the rename is that the data in `app_version` is removed. The data in `app_version` will contain null values.

## Examples

1. Rename a single field
Rename the "user_agent" field to "BrowserInfo".

```spl
... | rename user_agent AS BrowserInfo
```

2. Rename fields with similar names using a wildcard
Rename fields that begin with "app_" to start with "Application".

```spl
... | rename app_* AS Application*
```

3. Specifying a field name that contains spaces
Improve data readability by renaming fields. For fields that are to be renamed with spaces, ensure the new name is enclosed in quotation marks for proper identification.

```spl
... | rename user_email AS "User Email Address"
```
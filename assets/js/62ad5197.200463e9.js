"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[9736],{2030:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var i=s(5893),r=s(1151);const t={},l="Text functions",a={id:"spl-docs/evaluation-functions/text-functions",title:"Text functions",description:"This list includes functions that manipulates text data.",source:"@site/docs/spl-docs/evaluation-functions/text-functions.md",sourceDirName:"spl-docs/evaluation-functions",slug:"/spl-docs/evaluation-functions/text-functions",permalink:"/siglens-docs/spl-docs/evaluation-functions/text-functions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Statistical eval functions",permalink:"/siglens-docs/spl-docs/evaluation-functions/statistical-functions"},next:{title:"Date and Time functions",permalink:"/siglens-docs/spl-docs/evaluation-functions/time-functions"}},c={},d=[{value:"lower(&lt;str&gt;)",id:"lowerstr",level:2},{value:"Usage",id:"usage",level:3},{value:"Example",id:"example",level:3},{value:"Use-Case Example",id:"use-case-example",level:3},{value:"upper(&lt;str&gt;)",id:"upperstr",level:2},{value:"Usage",id:"usage-1",level:3},{value:"Example",id:"example-1",level:3},{value:"trim(&lt;str&gt;, &lt;trim_chars&gt;)",id:"trimstr-trim_chars",level:2},{value:"Usage",id:"usage-2",level:3},{value:"Example",id:"example-2",level:3},{value:"Use-Case Example",id:"use-case-example-1",level:3},{value:"ltrim(&lt;str&gt;, &lt;trim_chars&gt;)",id:"ltrimstr-trim_chars",level:2},{value:"Usage",id:"usage-3",level:3},{value:"Example",id:"example-3",level:3},{value:"rtrim(&lt;str&gt;, &lt;trim_chars&gt;)",id:"rtrimstr-trim_chars",level:2},{value:"Usage",id:"usage-4",level:3},{value:"Example",id:"example-4",level:3},{value:"replace(&lt;str&gt;,&lt;regex&gt;,&lt;replacement&gt;)",id:"replacestrregexreplacement",level:2},{value:"Usage",id:"usage-5",level:3},{value:"Example",id:"example-5",level:3},{value:"Use-Case Example",id:"use-case-example-2",level:3},{value:"substr(&lt;str&gt;,&lt;start&gt;,&lt;length&gt;)",id:"substrstrstartlength",level:2},{value:"Usage",id:"usage-6",level:3},{value:"Example",id:"example-6",level:3},{value:"Use-Case Example",id:"use-case-example-3",level:3},{value:"len(&lt;str&gt;)",id:"lenstr",level:2},{value:"Usage",id:"usage-7",level:3},{value:"Example",id:"example-7",level:3},{value:"urldecode(&lt;url&gt;)",id:"urldecodeurl",level:2},{value:"Usage",id:"usage-8",level:3},{value:"Example",id:"example-8",level:3},{value:"Use-Case Example",id:"use-case-example-4",level:3}];function o(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"text-functions",children:"Text functions"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"This list includes functions that manipulates text data."})}),"\n",(0,i.jsx)(n.h2,{id:"lowerstr",children:"lower(<str>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function returns a new string that is lowercase version of ",(0,i.jsx)(n.code,{children:"<str>"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be a string literal or a field name."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:["The following command returns lowercase version of the string in field ",(0,i.jsx)(n.code,{children:"name"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval lowercase_name=lower(name)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The following command returns lowercase version of the given string i.e. ",(0,i.jsx)(n.code,{children:'"abc z"'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval lowercase_str=lower("Abc Z")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"use-case-example",children:"Use-Case Example"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Normalizing Job Titles for Accurate Count"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Problem:"})," In datasets with job titles, variations in case (uppercase vs lowercase) can lead to discrepancies in data analysis, particularly when counting the number of individuals in each job position. This inconsistency can skew results and affect decision-making processes."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Solution:"})," To address this issue, job titles can be converted to a consistent case (either all lowercase or all uppercase) using ",(0,i.jsx)(n.code,{children:"lower"})," or ",(0,i.jsx)(n.code,{children:"upper"})," functions before performing counts. This normalization ensures that variations in case do not affect the accuracy of the data analysis."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval lowercase_job_title=lower(job_title)\n    | stats count by lowercase_job_title\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"eval"})," command uses the ",(0,i.jsx)(n.code,{children:"lower"})," function to generate a new field ",(0,i.jsx)(n.code,{children:"lowercase_job_title"})," containing the ",(0,i.jsx)(n.code,{children:"job_title"})," values in lowercase."]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"stats"})," command then aggregates data based on ",(0,i.jsx)(n.code,{children:"lowercase_job_title"}),", ensuring accurate grouping and count regardless of case discrepancies in the dataset."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"upperstr",children:"upper(<str>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function returns a new string that is uppercase version of ",(0,i.jsx)(n.code,{children:"<str>"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-1",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be a string literal or a field name."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-1",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:["The following command returns uppercase version of the string in field ",(0,i.jsx)(n.code,{children:"name"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval uppercase_name=upper(name)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The following command returns a uppercase version of the given string i.e. ",(0,i.jsx)(n.code,{children:'"ABC Z"'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval uppercase_str=upper("Abc Z")\n'})}),"\n",(0,i.jsx)(n.h2,{id:"trimstr-trim_chars",children:"trim(<str>, <trim_chars>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function trims the characters present in the ",(0,i.jsx)(n.code,{children:"<trim_chars>"})," from the both sides of the ",(0,i.jsx)(n.code,{children:"<str>"})," and returns this new string."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"<trim_chars>"})," is an optional argument. If not present, it would remove leading and trailing spaces and tabs from ",(0,i.jsx)(n.code,{children:"<str>"})," and return this new string. Other types of whitespace characters would remain unaffected."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-2",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be a string literal or a field name."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<trim_chars>"})," is a string containing characters that needs to be trimmed."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-2",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:["The following command trims the characters ",(0,i.jsx)(n.code,{children:"a"}),", ",(0,i.jsx)(n.code,{children:"Z"})," and space from both sides of the given string and returns this new string ",(0,i.jsx)(n.code,{children:'"BcDe"'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval trimmed_str=trim("  aaBcDeZ ", "aZ ")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"use-case-example-1",children:"Use-Case Example"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Cleaning Address Fields"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Problem:"})," In datasets, address fields often contain leading or trailing spaces and tabs due to inconsistent data entry practices. These inconsistencies can lead to issues in data processing and analysis, such as incorrect matching and sorting of addresses."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Solution:"})," To ensure data consistency and accuracy, it's essential to clean the address fields by removing any leading or trailing spaces and tabs. This preprocessing step makes the data uniform and easier to work with."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval trimmed_address=trim(address)\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Explanation:"}),"\nThe command utilizes the ",(0,i.jsx)(n.code,{children:"eval"})," function to create a new field named ",(0,i.jsx)(n.code,{children:"trimmed_address"}),", which contains the value of the ",(0,i.jsx)(n.code,{children:"address"})," field with all leading and trailing spaces and tabs removed. This operation ensures that address data is consistent and accurately formatted for further processing and analysis."]}),"\n",(0,i.jsx)(n.h2,{id:"ltrimstr-trim_chars",children:"ltrim(<str>, <trim_chars>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function trims the characters present in the ",(0,i.jsx)(n.code,{children:"<trim_chars>"})," from the left side of the ",(0,i.jsx)(n.code,{children:"<str>"})," and returns this new string."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"<trim_chars>"})," is an optional argument. If not present, it would remove leading spaces and tabs from the ",(0,i.jsx)(n.code,{children:"<str>"})," and return this new string. Other types of whitespace characters would remain unaffected."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-3",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be a string literal or a field name."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<trim_chars>"})," is a string containing characters that needs to be trimmed."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-3",children:"Example"}),"\n",(0,i.jsx)(n.p,{children:"The following command returns the address after removing all leading spaces and tabs."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval left_trimmed_address=ltrim(address)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The following command trims the characters ",(0,i.jsx)(n.code,{children:"a"}),", ",(0,i.jsx)(n.code,{children:"Z"})," and space from the left side of the given string and returns this new string ",(0,i.jsx)(n.code,{children:'"BcDeZ "'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval left_trimmed_str=ltrim("  aaBcDeZ ", "aZ ")\n'})}),"\n",(0,i.jsx)(n.h2,{id:"rtrimstr-trim_chars",children:"rtrim(<str>, <trim_chars>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function trims the characters present in the ",(0,i.jsx)(n.code,{children:"<trim_chars>"})," from the right side of the ",(0,i.jsx)(n.code,{children:"<str>"})," and returns this new string."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"<trim_chars>"})," is an optional argument. If not present, it would remove leading spaces and tabs from the ",(0,i.jsx)(n.code,{children:"<str>"})," and return this new string. Other types of whitespace characters would remain unaffected."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-4",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be either a string literal or a field name."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<trim_chars>"})," is a string containing characters that needs to be trimmed."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-4",children:"Example"}),"\n",(0,i.jsx)(n.p,{children:"The following command returns the address after removing all trailing spaces and tabs."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval right_trimmed_address=rtrim(address)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The following command trims the characters ",(0,i.jsx)(n.code,{children:"a"}),", ",(0,i.jsx)(n.code,{children:"Z"})," and space from the right side of the given string and returns this new string ",(0,i.jsx)(n.code,{children:'"  aaBcDe"'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval right_trimmed_str=rtrim("  aaBcDeZ ", "aZ ")\n'})}),"\n",(0,i.jsx)(n.h2,{id:"replacestrregexreplacement",children:"replace(<str>,<regex>,<replacement>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function substitutes every occurrence of the regular expression ",(0,i.jsx)(n.code,{children:"<regex>"})," match in ",(0,i.jsx)(n.code,{children:"<str>"})," with the ",(0,i.jsx)(n.code,{children:"<replacement>"})," string."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-5",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be either a string literal or a field name."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<regex>"})," is a string containing regular expression pattern."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<replacement>"})," is a string literal."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-5",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:['The following command replaces slashes ("/") with dashes ("-") in the given date, resulting in the newly formatted date ',(0,i.jsx)(n.code,{children:"07-10-2024"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval new_format_date=replace("07/10/2024", "/", "-")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"use-case-example-2",children:"Use-Case Example"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Masking Email Addresses"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Problem:"}),' Sensitive information, such as email addresses in datasets, often needs to be anonymized or masked to protect user privacy. Specifically, the prefix of an email address (everything before the "@" symbol) must be hidden or replaced to prevent identification of the individual.']}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Solution:"}),' To address privacy concerns, the prefix of email addresses can be masked by replacing it with a generic string (e.g., "xxxxx"). This process retains the structure of the email address while anonymizing the user\'s identity.']}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval masked_email=replace(email, "^([^@]+)@", "xxxxx@")\n'})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"eval"})," function is used to create a new field ",(0,i.jsx)(n.code,{children:"masked_email"})," that will hold the masked email address."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:'replace(email, "^([^@]+)@", "xxxxx@")'}),": This expression uses a regular expression to identify the prefix of the email address and replaces it with ",(0,i.jsx)(n.code,{children:'"xxxxx"'}),", resulting in a masked email address."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"substrstrstartlength",children:"substr(<str>,<start>,<length>)"}),"\n",(0,i.jsxs)(n.p,{children:["This functions returns a substring of ",(0,i.jsx)(n.code,{children:"<str>"})," starting at index ",(0,i.jsx)(n.code,{children:"<start>"}),". ",(0,i.jsx)(n.code,{children:"<length>"})," denotes the number of characters to return from ",(0,i.jsx)(n.code,{children:"<start>"})," index."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-6",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be a string literal or a field name."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<length>"})," is optional if not present would return the rest of the string."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<start>"})," specifies the starting index for the substring, with index beginning at 1, not 0. Use negative indexes to start from the end of the string."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n",(0,i.jsxs)(n.li,{children:["If ",(0,i.jsx)(n.code,{children:"<start>"})," is past the length of the string, the function will return an empty string."]}),"\n",(0,i.jsxs)(n.li,{children:["If the specified ",(0,i.jsx)(n.code,{children:"<length>"})," exceeds the available number of characters from ",(0,i.jsx)(n.code,{children:"<start>"})," index, the function returns an empty string."]}),"\n",(0,i.jsxs)(n.li,{children:["If ",(0,i.jsx)(n.code,{children:"<str>"})," is ",(0,i.jsx)(n.code,{children:"NULL"}),", this function will not process it and an empty string would be present."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-6",children:"Example"}),"\n",(0,i.jsx)(n.p,{children:"The following command returns the first 4 characters of string in field name."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval substr_name=substr(name, 1, 4)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The following command returns the last 5 characters of the given string i.e. ",(0,i.jsx)(n.code,{children:'"melon"'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval substr_str=substr("Watermelon", -5)\n'})}),"\n",(0,i.jsx)(n.h3,{id:"use-case-example-3",children:"Use-Case Example"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Extracting HTTP Status Codes from Web Server Logs"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Problem:"})," When analyzing web server logs, the HTTP status code is often embedded within a longer status line string. This makes it difficult to quickly filter, group, or analyze based on the status code alone."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Status line format:"}),' "HTTP/1.1 404 Not Found"']}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Solution:"})," Use ",(0,i.jsx)(n.code,{children:"substr"})," function to extract the specific portion of the string containing the status code."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval status_code = substr(status_line, 10, 3)\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"eval"})," command is utilized to create a new field named ",(0,i.jsx)(n.code,{children:"status_code"}),", leveraging the ",(0,i.jsx)(n.code,{children:"substr"})," function to extract specific parts of the ",(0,i.jsx)(n.code,{children:"status_line"})," field."]}),"\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"substr"})," function begins extraction at the 10",(0,i.jsx)("sup",{children:"th"})," character of ",(0,i.jsx)(n.code,{children:"status_line"}),", a choice based on the typical starting position of HTTP status codes within the status line."]}),"\n",(0,i.jsx)(n.li,{children:'By specifying a length of 3 for the substring, the command precisely isolates 3-digit HTTP status codes (e.g., "404", "200"), storing them in the "status_code" field for subsequent analysis or visualization.'}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"This solution allows for more efficient and focused analysis of HTTP status codes without the need to parse or filter the entire status line each time."}),"\n",(0,i.jsx)(n.h2,{id:"lenstr",children:"len(<str>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function returns the length of ",(0,i.jsx)(n.code,{children:"<str>"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-7",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<str>"})," can be a field name."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-7",children:"Example"}),"\n",(0,i.jsx)(n.p,{children:"The following command returns the length of the string in field name."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval len_name=len(name)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"urldecodeurl",children:"urldecode(<url>)"}),"\n",(0,i.jsxs)(n.p,{children:["This function decodes ",(0,i.jsx)(n.code,{children:"<url>"})," and returns this decoded url."]}),"\n",(0,i.jsx)(n.h3,{id:"usage-8",children:"Usage"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"<url>"})," can be a string literal or a field name."]}),"\n",(0,i.jsx)(n.li,{children:"You can use this function with eval and where commands."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"example-8",children:"Example"}),"\n",(0,i.jsxs)(n.p,{children:["The following command decodes the given url and returns ",(0,i.jsx)(n.code,{children:'"https://www.siglens.com/index.html"'}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'... | eval decoded_url=urldecode("https%3A%2F%2Fwww.siglens.com%2Findex.html")\n'})}),"\n",(0,i.jsx)(n.h3,{id:"use-case-example-4",children:"Use-Case Example"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Decoding URL Strings"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Problem:"})," URLs are often encoded for transmission over the Internet, which can make them difficult to read and interpret when analyzing data. Encoded characters (e.g., ",(0,i.jsx)(n.code,{children:"%3A"})," for ",(0,i.jsx)(n.code,{children:":"}),") can obscure the actual content of the URL."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Solution:"})," To make URLs readable and usable for analysis, encoded URLs can be decoded back to their original form. This process involves converting percent-encoded characters back to their corresponding characters."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"... | eval decoded_url=urldecode(url)\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Explanation:"})," The command utilizes the ",(0,i.jsx)(n.code,{children:"eval"})," function to create a new field named ",(0,i.jsx)(n.code,{children:"decoded_url"}),", which contains the decoded URL from the ",(0,i.jsx)(n.code,{children:"url"})," field. This technique is crucial for data analysis involving URLs, as it converts encoded URLs back to their original, human-readable form, facilitating easier analysis and interpretation of web data."]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>l});var i=s(7294);const r={},t=i.createContext(r);function l(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[3873],{6256:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var t=s(5893),r=s(1151);const i={},d="gentimes command",a={id:"spl-docs/gentimes-command",title:"gentimes command",description:"Description",source:"@site/docs/spl-docs/gentimes-command.md",sourceDirName:"spl-docs",slug:"/spl-docs/gentimes-command",permalink:"/siglens-docs/spl-docs/gentimes-command",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"fillnull",permalink:"/siglens-docs/spl-docs/fillnull-command"},next:{title:"head command",permalink:"/siglens-docs/spl-docs/head-command"}},l={},c=[{value:"Description",id:"description",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Required Arguments",id:"required-arguments",level:3},{value:"start",id:"start",level:4},{value:"&lt;timestamp&gt;",id:"timestamp",level:4},{value:"Optional Arguments",id:"optional-arguments",level:3},{value:"end",id:"end",level:4},{value:"increment",id:"increment",level:4},{value:"Usage",id:"usage",level:3},{value:"Example",id:"example",level:2},{value:"Use-Case Examples",id:"use-case-examples",level:2},{value:"Creating Simulated Server Log Data",id:"creating-simulated-server-log-data",level:3},{value:"Explanation",id:"explanation",level:4}];function o(e){const n={br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"gentimes-command",children:"gentimes command"}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"Description"}),"\n",(0,t.jsx)(n.p,{children:"Generates timestamp results beginning at the specified start time. Each result represents an adjacent, non-overlapping time range based on the increment value. This process continues until enough results are generated to pass the end time."}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"gentimes"})," command produces events up to, but not including, the end time."]}),"\n",(0,t.jsx)(n.h2,{id:"syntax",children:"Syntax"}),"\n",(0,t.jsxs)(n.p,{children:["Required syntax is in ",(0,t.jsx)(n.strong,{children:"bold"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["| ",(0,t.jsx)(n.strong,{children:"gentimes"}),(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"start=<timestamp>"}),(0,t.jsx)(n.br,{}),"\n","[end=<timestamp>]",(0,t.jsx)(n.br,{}),"\n","[increment=<increment>]"]}),"\n",(0,t.jsx)(n.h3,{id:"required-arguments",children:"Required Arguments"}),"\n",(0,t.jsx)(n.h4,{id:"start",children:"start"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Syntax:"})," ",(0,t.jsx)(n.code,{children:"start=<timestamp>"}),(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Description:"})," ",(0,t.jsx)(n.br,{}),"\n","Specify the start time."]}),"\n",(0,t.jsx)(n.h4,{id:"timestamp",children:"<timestamp>"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Syntax:"})," ",(0,t.jsx)(n.code,{children:"MM/DD/YYYY[:HH:MM:SS]"})," or ",(0,t.jsx)(n.code,{children:"<int>"}),(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Description:"}),(0,t.jsx)(n.br,{}),"\n","Specify the timeframe using either a timestamp or an integer value.",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.code,{children:"<int>"})," represents the number of days relative to the current date.",(0,t.jsx)(n.br,{}),"\n","For example: ",(0,t.jsx)(n.code,{children:"11/15/2021"})," for November 15, 2021 at 00:00:00, ",(0,t.jsx)(n.code,{children:"05/20/2022:14:30:00"})," for May 20, 2022 at 14:30:00, or ",(0,t.jsx)(n.code,{children:"-7"})," for seven days ago."]}),"\n",(0,t.jsx)(n.h3,{id:"optional-arguments",children:"Optional Arguments"}),"\n",(0,t.jsx)(n.h4,{id:"end",children:"end"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Syntax:"})," ",(0,t.jsx)(n.code,{children:"end=<timestamp>"})," or ",(0,t.jsx)(n.code,{children:"<int>"}),(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Description:"}),(0,t.jsx)(n.br,{}),"\n","Specify the end time.",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Default:"})," midnight before the current local time.",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.code,{children:"<int>"})," represents the number of days relative to the current date.",(0,t.jsx)(n.br,{}),"\n","For example: If the current local time is 13:00:00 on May 20, 2022, the default end time would be 00:00:00 on May 20, 2022, or ",(0,t.jsx)(n.code,{children:"5"})," for five days in the future."]}),"\n",(0,t.jsx)(n.h4,{id:"increment",children:"increment"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Syntax:"})," ",(0,t.jsx)(n.code,{children:"increment=<int>(s | m | h | d)"})," or ",(0,t.jsx)(n.code,{children:"increment=<int>"}),(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Description:"}),(0,t.jsx)(n.br,{}),"\n","Specify the time interval to increment from the ",(0,t.jsx)(n.code,{children:"start"})," time to the ",(0,t.jsx)(n.code,{children:"end"})," time. You can use seconds (s), minutes (m), hours (h), or days (d).",(0,t.jsx)(n.br,{}),"\n","If you only provide an integer without a time unit, it will be assumed to be in seconds.",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Default:"})," 1d"]}),"\n",(0,t.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"gentimes"})," command is an event-generating command. This command uses a leading pipe character and should be the first command in a search."]}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"gentimes"})," command returns the following four fields:"]}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"Field"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"Description"})})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"starttime"}),(0,t.jsx)(n.td,{children:"The starting time range as UNIX epoch in seconds."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"starthuman"}),(0,t.jsxs)(n.td,{children:["The human-readable time for ",(0,t.jsx)(n.code,{children:"starttime"}),"."]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"endtime"}),(0,t.jsx)(n.td,{children:"The ending time range as UNIX epoch in seconds."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"endhuman"}),(0,t.jsxs)(n.td,{children:["The human-readable time for ",(0,t.jsx)(n.code,{children:"endtime"}),"."]})]})]})]}),"\n",(0,t.jsxs)(n.p,{children:["The human-readable time is in the following format:",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Format:"})," Weekday Month Day Hour:Minute",":Second"," Year (Timezone difference with respect to UTC)",(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.strong,{children:"Example:"})," July 4, 2024, at 12:00:00 PM in the NYC timezone would be Thu Jul 4 12:00:00 2024 -0400."]}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.p,{children:"The following example generates daily time ranges from May 1, 2021, to May 5, 2021 (not including the end time)."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| gentimes start=05/01/2021 end=05/05/2021\n"})}),"\n",(0,t.jsx)(n.p,{children:"The output would look as follows, considering the timezone to be Eastern Time."}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"endhuman"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"endtime"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"starthuman"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"starttime"})})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Sat May 1 23:59:59 2021 -0400"}),(0,t.jsx)(n.td,{children:"1619927999"}),(0,t.jsx)(n.td,{children:"Sat May 1 00:00:00 2021 -0400"}),(0,t.jsx)(n.td,{children:"1619841600"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Sun May 2 23:59:59 2021 -0400"}),(0,t.jsx)(n.td,{children:"1620014399"}),(0,t.jsx)(n.td,{children:"Sun May 2 00:00:00 2021 -0400"}),(0,t.jsx)(n.td,{children:"1619928000"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Mon May 3 23:59:59 2021 -0400"}),(0,t.jsx)(n.td,{children:"1620100799"}),(0,t.jsx)(n.td,{children:"Mon May 3 00:00:00 2021 -0400"}),(0,t.jsx)(n.td,{children:"1620014400"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Tue May 4 23:59:59 2021 -0400"}),(0,t.jsx)(n.td,{children:"1620187199"}),(0,t.jsx)(n.td,{children:"Tue May 4 00:00:00 2021 -0400"}),(0,t.jsx)(n.td,{children:"1620100800"})]})]})]}),"\n",(0,t.jsx)(n.p,{children:"The following example generates time ranges from 20 days ago to 15 days ago (not including the end time)."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| gentimes start=-20 end=-15\n"})}),"\n",(0,t.jsx)(n.p,{children:"The following example generates hourly time ranges from November 6, 2022, to November 8, 2022 (not including the end time)."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| gentimes start=11/06/2022 end=11/08/2022 increment=1h\n"})}),"\n",(0,t.jsx)(n.p,{children:"The following example generates daily time ranges starting from April 25, 2022, at 16:17:18 until midnight before the current time in the respective timezone."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| gentimes start=04/25/2022:16:17:18\n"})}),"\n",(0,t.jsx)(n.p,{children:"The following example generates time ranges from January 3, 2023, to February 1, 2023, with an increment of 7 minutes between each timestamp."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| gentimes start=01/03/2023 end=02/01/2023 increment=7m\n"})}),"\n",(0,t.jsx)(n.p,{children:"The following example generates time ranges starting from January 2, 2023, at 12:11:00, with an increment of 20 seconds between each timestamp, until 12:12:11 on the same day."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"| gentimes start=01/02/2023:12:11:00 end=01/02/2023:12:12:11 increment=20\n"})}),"\n",(0,t.jsx)(n.p,{children:"The output would look as follows, considering the timezone to be Eastern Time."}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"endhuman"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"endtime"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"starthuman"})}),(0,t.jsx)(n.th,{children:(0,t.jsx)(n.strong,{children:"starttime"})})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Mon Jan 2 12:11:19 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679479"}),(0,t.jsx)(n.td,{children:"Mon Jan 2 12:11:00 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679460"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Mon Jan 2 12:11:39 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679499"}),(0,t.jsx)(n.td,{children:"Mon Jan 2 12:11:20 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679480"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Mon Jan 2 12:11:59 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679519"}),(0,t.jsx)(n.td,{children:"Mon Jan 2 12:11:40 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679500"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:"Mon Jan 2 12:12:19 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679539"}),(0,t.jsx)(n.td,{children:"Mon Jan 2 12:12:00 2023 -0500"}),(0,t.jsx)(n.td,{children:"1672679520"})]})]})]}),"\n",(0,t.jsx)(n.h2,{id:"use-case-examples",children:"Use-Case Examples"}),"\n",(0,t.jsx)(n.h3,{id:"creating-simulated-server-log-data",children:"Creating Simulated Server Log Data"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Problem:"})," As a system administrator responsible for monitoring server performance, you need to ensure that your monitoring and alerting systems are functioning correctly. However, you don't have access to real production data for testing. You need to create a simulated dataset that represents server logs with various metrics, such as CPU usage, memory usage, network traffic, and different types of events. This dataset will help you test dashboards, alerts, and queries without risking real data exposure."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Solution:"})," To create a simulated dataset, you can use the ",(0,t.jsx)(n.code,{children:"gentimes"})," command to generate timestamps and combine it with ",(0,t.jsx)(n.code,{children:"eval"})," to create random values for different metrics."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'| gentimes start=-2 increment=5m\n| eval server_id = random() % 5 + 1\n| eval cpu_usage = random() % 101\n| eval memory_usage = random() % 101\n| eval network_traffic = random() % 1000\n| eval status = case(\n    cpu_usage > 90 OR memory_usage > 90, "Critical",\n    cpu_usage > 70 OR memory_usage > 70, "Warning",\n    cpu_usage >= 0, "Normal")\n| eval event_type = random() % 4\n| eval event_description = case(\n    event_type = 0, "User Login",\n    event_type = 1, "Config Change",\n    event_type = 2, "Service Restart",\n    event_type = 3, "Backup Completed")\n'})}),"\n",(0,t.jsx)(n.h4,{id:"explanation",children:"Explanation"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"gentimes start=-2 increment=5m"})," generates a series of timestamps starting from 2 days ago, with an increment of 5 minutes between each timestamp."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eval server_id = random() % 5 + 1"})," assigns a random server ID from 1 to 5 to each event."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eval cpu_usage = random() % 101"})," generates a random CPU usage percentage between 0 and 100."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eval memory_usage = random() % 101"})," generates a random memory usage percentage between 0 and 100."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eval network_traffic = random() % 1000"})," generates a random network traffic value between 0 and 999."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'eval status = case(cpu_usage > 90 OR memory_usage > 90, "Critical", cpu_usage > 70 OR memory_usage > 70, "Warning", cpu_usage >= 0, "Normal")'})," assigns a status based on CPU and memory usage:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Critical"})," if CPU or memory usage is above 90%."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Warning"})," if CPU or memory usage is above 70%."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Normal"})," otherwise."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eval event_type = random() % 4"})," generates a random event type between 0 and 3."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:'eval event_description = case(event_type = 0, "User Login", event_type = 1, "Config Change", event_type = 2, "Service Restart", event_type = 3, "Backup Completed")'})," assigns a description based on the event type."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>d});var t=s(7294);const r={},i=t.createContext(r);function d(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:d(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[4872],{9230:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>d,toc:()=>c});var s=i(5893),t=i(1151);const r={},a="bin command",d={id:"spl-docs/bin-command",title:"bin command",description:"The bin command allows you to categorize continuous numerical data into discrete intervals or buckets.\\",source:"@site/docs/spl-docs/bin-command.md",sourceDirName:"spl-docs",slug:"/spl-docs/bin-command",permalink:"/siglens-docs/spl-docs/bin-command",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Common Use-Cases",permalink:"/siglens-docs/spl-docs/common-usecases"},next:{title:"dedup",permalink:"/siglens-docs/spl-docs/dedup-command"}},o={},c=[{value:"Syntax",id:"syntax",level:2},{value:"Required Arguments",id:"required-arguments",level:3},{value:"&lt;field&gt;",id:"field",level:4},{value:"Optional Arguments",id:"optional-arguments",level:3},{value:"&lt;bin-options&gt;",id:"bin-options",level:4},{value:"&lt;newfield&gt;",id:"newfield",level:4},{value:"&lt;bins&gt;",id:"bins",level:4},{value:"&lt;minspan&gt;",id:"minspan",level:4},{value:"&lt;span&gt;",id:"span",level:4},{value:"&lt;start&gt;",id:"start",level:4},{value:"&lt;end&gt;",id:"end",level:4},{value:"&lt;aligntime&gt;",id:"aligntime",level:4},{value:"&lt;log-span&gt;",id:"log-span",level:4},{value:"&lt;span-length&gt;",id:"span-length",level:4},{value:"&lt;timescale&gt;",id:"timescale",level:4},{value:"How does bin work?",id:"how-does-bin-work",level:2},{value:"Examples",id:"examples",level:2},{value:"Use-Case Examples",id:"use-case-examples",level:2},{value:"Analyzing Event Latency in Real-Time",id:"analyzing-event-latency-in-real-time",level:3},{value:"Analyzing Age Distribution in Data",id:"analyzing-age-distribution-in-data",level:3},{value:"Analyzing Price Distribution in Product Data",id:"analyzing-price-distribution-in-product-data",level:3},{value:"Optimizing Network Performance by Analyzing Packet Size Distribution",id:"optimizing-network-performance-by-analyzing-packet-size-distribution",level:3}];function l(e){const n={br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"bin-command",children:"bin command"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"bin"})," command allows you to categorize continuous numerical data into discrete intervals or buckets.",(0,s.jsx)(n.br,{}),"\n","This is useful for:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Data aggregation - grouping values into time intervals, age brackets, etc."}),"\n",(0,s.jsx)(n.li,{children:"Simplifying data presentation - preparing data for visualizations like histograms or bar charts."}),"\n",(0,s.jsx)(n.li,{children:"Streamlining queries - making searches more efficient by working with binned data."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"syntax",children:"Syntax"}),"\n",(0,s.jsxs)(n.p,{children:["The required syntax is in ",(0,s.jsx)(n.strong,{children:"bold"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"bin"}),(0,s.jsx)(n.br,{}),"\n","[<bin-options>...]",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"<field>"})," [AS <newfield>]"]}),"\n",(0,s.jsx)(n.h3,{id:"required-arguments",children:"Required Arguments"}),"\n",(0,s.jsx)(n.h4,{id:"field",children:"<field>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<field>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<field>"})," specifies the name of the field you wish to bin."]}),"\n",(0,s.jsx)(n.h3,{id:"optional-arguments",children:"Optional Arguments"}),"\n",(0,s.jsx)(n.h4,{id:"bin-options",children:"<bin-options>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<bins>"}),", ",(0,s.jsx)(n.code,{children:"<minspan>"}),", ",(0,s.jsx)(n.code,{children:"<span>"}),", ",(0,s.jsx)(n.code,{children:"<start>"}),", ",(0,s.jsx)(n.code,{children:"<end>"})," or ",(0,s.jsx)(n.code,{children:"<aligntime>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n","These are the options for the ",(0,s.jsx)(n.code,{children:"bin"})," command that can be used to create bins for the data in ",(0,s.jsx)(n.code,{children:"<field>"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"newfield",children:"<newfield>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"AS <string>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<string>"})," is the name of the new field that will contain the binned data.",(0,s.jsx)(n.br,{}),"\n","If not provided, the binned data will overwrite the existing data in the specified ",(0,s.jsx)(n.code,{children:"<field>"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"bins",children:"<bins>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<N>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<N>"})," is an integer that specifies the maximum number of bins to create.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Default:"})," 100"]}),"\n",(0,s.jsx)(n.h4,{id:"minspan",children:"<minspan>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<span-length>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n","Specifies the smallest level of granularity for the bins."]}),"\n",(0,s.jsx)(n.h4,{id:"span",children:"<span>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<span-length>"})," or ",(0,s.jsx)(n.code,{children:"<log-span>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n","Specifies the exact size of the bins."]}),"\n",(0,s.jsx)(n.h4,{id:"start",children:"<start>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<N>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<N>"})," is a numeric value that signifies the minimum value to be considered when creating bins.",(0,s.jsx)(n.br,{}),"\n","This value is disregarded if it exceeds the minimum value present in the data distribution.",(0,s.jsx)(n.br,{}),"\n","This option applies only to numerical data and does not apply to time-based data."]}),"\n",(0,s.jsx)(n.h4,{id:"end",children:"<end>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<N>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<N>"})," is a numeric value that signifies the maximum value to be considered when creating bins.",(0,s.jsx)(n.br,{}),"\n","This value is disregarded if it is less than maximum value present in the data distribution.",(0,s.jsx)(n.br,{}),"\n","This option applies only to numerical data and does not apply to time-based data."]}),"\n",(0,s.jsx)(n.h4,{id:"aligntime",children:"<aligntime>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<absolute-time>"}),", ",(0,s.jsx)(n.code,{children:"<relative-time>"})," or ",(0,s.jsx)(n.code,{children:"<N>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<aligntime>"})," is used to align the bin values for time-based data.",(0,s.jsx)(n.br,{}),"\n","The bins created for time data will be aligned to this specific value.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<N>"})," is a positive integer specifying the time as unix epoch in milliseconds."]}),"\n",(0,s.jsxs)(n.p,{children:["Refer to the earliest and latest commands for ",(0,s.jsx)(n.code,{children:"<absolute-time>"})," and ",(0,s.jsx)(n.code,{children:"<relative-time>"}),(0,s.jsx)(n.br,{}),"\n","This option will be ignored if the span has a timescale of ",(0,s.jsx)(n.code,{children:"day, week, month or quarter"}),".",(0,s.jsx)(n.br,{}),"\n","By default, all time bins are aligned to UTC epoch 0."]}),"\n",(0,s.jsx)(n.h4,{id:"log-span",children:"<log-span>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<coefficient>log<base>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n","Sets the span in terms of logarithmic scale.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<coefficient>"})," is an optional positive numeric value that serves as the coefficient of this logarithmic span.",(0,s.jsx)(n.br,{}),"\n","Its value must be less than ",(0,s.jsx)(n.code,{children:"<base>"})," and greater than or equal to ",(0,s.jsx)(n.code,{children:"1.0"}),".",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Default Value:"})," 1.0",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<base>"})," is an optional positive numeric value that serves as the base for the logarithmic span.",(0,s.jsx)(n.br,{}),"\n","Its value must be greater than ",(0,s.jsx)(n.code,{children:"1.0"}),".",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Default Value:"})," 10.0"]}),"\n",(0,s.jsx)(n.h4,{id:"span-length",children:"<span-length>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<N>"})," or ",(0,s.jsx)(n.code,{children:"<int><timescale>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<span-length>"})," specifies the span for each bin.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<N>"})," is a positive numeric value specifying the exact size for creating bins.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<int><timescale>"})," is required for creating bins on time-based data in ",(0,s.jsx)(n.code,{children:"timestamp"}),".",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<int>"})," is a positive integer used to specify the magnitude of the time unit specified by ",(0,s.jsx)(n.code,{children:"timescale"}),"."]}),"\n",(0,s.jsx)(n.h4,{id:"timescale",children:"<timescale>"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Syntax:"})," ",(0,s.jsx)(n.code,{children:"<subsecond>"}),", ",(0,s.jsx)(n.code,{children:"<second>"}),", ",(0,s.jsx)(n.code,{children:"<minute>"}),", ",(0,s.jsx)(n.code,{children:"<hour>"}),", ",(0,s.jsx)(n.code,{children:"<day>"}),", ",(0,s.jsx)(n.code,{children:"<week>"}),", ",(0,s.jsx)(n.code,{children:"<month>"}),", ",(0,s.jsx)(n.code,{children:"<quarter>"})," or ",(0,s.jsx)(n.code,{children:"<year>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Description:"})," ",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<timescale>"})," is a ",(0,s.jsx)(n.code,{children:"<string>"})," that specifies the unit of time.",(0,s.jsx)(n.br,{}),"\n","The magnitude of time represented by ",(0,s.jsx)(n.code,{children:"<int><subsecond>"})," must be less than 1 second and evenly divisible by 1 second.",(0,s.jsx)(n.br,{}),"\n","For ",(0,s.jsx)(n.code,{children:"<month>"}),", the only permissible ",(0,s.jsx)(n.code,{children:"<int>"})," values are ",(0,s.jsx)(n.code,{children:"1, 2, 3, 4, 6, 12"}),".",(0,s.jsx)(n.br,{}),"\n","For ",(0,s.jsx)(n.code,{children:"<quarter>"}),", the only permissible ",(0,s.jsx)(n.code,{children:"<int>"})," values are ",(0,s.jsx)(n.code,{children:"1, 2, 4"}),"."]}),"\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:(0,s.jsx)(n.strong,{children:"Unit"})}),(0,s.jsx)(n.th,{children:(0,s.jsx)(n.strong,{children:"Strings used to specify Unit"})})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<subsecond>"})}),(0,s.jsx)(n.td,{children:"millisecond (ms), centisecond (cs), decisecond (ds)"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<second>"})}),(0,s.jsx)(n.td,{children:"seconds, second, secs, sec, s"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<minute>"})}),(0,s.jsx)(n.td,{children:"minutes, minute, mins, min, m"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<hour>"})}),(0,s.jsx)(n.td,{children:"hours, hour, hrs, hr, h"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<day>"})}),(0,s.jsx)(n.td,{children:"days, day, d"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<week>"})}),(0,s.jsx)(n.td,{children:"weeks, week, w"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<month>"})}),(0,s.jsx)(n.td,{children:"months, month, mon"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<quarter>"})}),(0,s.jsx)(n.td,{children:"quarters, quarter, qtrs, qtr, q"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:(0,s.jsx)(n.code,{children:"<year>"})}),(0,s.jsx)(n.td,{children:"years, year, yrs, yr, y"})]})]})]}),"\n",(0,s.jsx)(n.h2,{id:"how-does-bin-work",children:"How does bin work?"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"<span>"})," option always takes priority. All other options are ignored when ",(0,s.jsx)(n.code,{children:"<span>"})," is explicitly specified."]}),"\n",(0,s.jsxs)(n.p,{children:["If not specified, the span is derived based on the data distribution of the ",(0,s.jsx)(n.code,{children:"<field>"}),".",(0,s.jsx)(n.br,{}),"\n","If ",(0,s.jsx)(n.code,{children:"<minspan>"})," is specified, the derived span must follow this property.",(0,s.jsx)(n.br,{}),"\n","In the absence of an explicitly specified ",(0,s.jsx)(n.code,{children:"<span>"}),", the derived span must strictly adhere to the maximum number of bins specified by ",(0,s.jsx)(n.code,{children:"<bins>"})," or its default value."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"For Numerical Data:"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<span-length>"})," or ",(0,s.jsx)(n.code,{children:"<log-span>"})," can be used to specify the exact span of the bin using ",(0,s.jsx)(n.code,{children:"<span>"})," option.",(0,s.jsx)(n.br,{}),"\n","The derived ",(0,s.jsx)(n.code,{children:"<span-length>"})," for bins will always be in powers of 10."]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Log Span Example:"})}),"\n",(0,s.jsxs)(n.p,{children:["Given ",(0,s.jsx)(n.code,{children:"<log-span>"})," as ",(0,s.jsx)(n.code,{children:"2log3"}),", when calculating the bin for the value 301, the process is as follows:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Divide the Value by the Coefficient:"})," Divide 301 by the coefficient (2), resulting in 150.5."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Calculate Logarithm:"})," Compute the base 3 logarithm of 150.5, which is approximately 4.5639058801."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Find Floor and Ceiling Values:"})," Determine the floor (4) and ceiling (5) of this logarithmic value. If they are equal, increment the ceiling by 1 to ensure a range."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Calculate Lower and Upper Bounds:"})," The lower bound is found by raising the base (3) to the power of the floor value (4) and multiplying by the coefficient (2), resulting in 162. The upper bound is calculated similarly, using the ceiling value, resulting in 486."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Determine Bin Range:"})," The lower (162) and upper bounds (486) represent the bin range for the value 301."]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Some sample bin sizes are presented below for different types of ",(0,s.jsx)(n.code,{children:"<log-span>"}),(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"2log3:"})," 2-6, 6-18, 18-54, 54-162, 162-486, 486-1458 ...",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"log2:"})," 1-2, 2-4, 4-8, 8-16, 6-32, 32-64, 64-128, 128-256, ...",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"3log5:"})," 3-15, 15-75, 75-375, 375-1875, 1875-9375, 9375-46875 ..."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"For Time-Based Data:"}),(0,s.jsx)(n.br,{}),"\n","Currently, SigLens only supports time discretization on the default ",(0,s.jsx)(n.code,{children:"timestamp"})," field.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.code,{children:"<span-length>"})," can be used to specify the exact span of the bin using ",(0,s.jsx)(n.code,{children:"<span>"})," option. The minimum span length that meets all the specified properties will be decided.",(0,s.jsx)(n.br,{}),"\n","All derived ",(0,s.jsx)(n.code,{children:"<span-length>"})," will be aligned to the UTC timezone by default.",(0,s.jsx)(n.br,{}),"\n","The derived ",(0,s.jsx)(n.code,{children:"<span-length>"})," are fixed and are listed below in ascending order:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"1 second"}),"\n",(0,s.jsx)(n.li,{children:"10 seconds"}),"\n",(0,s.jsx)(n.li,{children:"30 seconds"}),"\n",(0,s.jsx)(n.li,{children:"1 minute"}),"\n",(0,s.jsx)(n.li,{children:"5 minutes"}),"\n",(0,s.jsx)(n.li,{children:"10 minutes"}),"\n",(0,s.jsx)(n.li,{children:"30 minutes"}),"\n",(0,s.jsx)(n.li,{children:"1 hour"}),"\n",(0,s.jsx)(n.li,{children:"1 day"}),"\n",(0,s.jsx)(n.li,{children:"1 month"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"<bins>"})," option will be ignored in this case if it is not possible to accommodate all the data into the maximum number of bins specified by the largest derived span, i.e., ",(0,s.jsx)(n.strong,{children:"1 month"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"Examples"}),"\n",(0,s.jsxs)(n.p,{children:["The following example creates bins based on the ",(0,s.jsx)(n.code,{children:"timestamp"})," field and aligns the bins to the UTC time of 1720713887000."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"...| bin aligntime=1720713887000 timestamp\n"})}),"\n",(0,s.jsx)(n.h2,{id:"use-case-examples",children:"Use-Case Examples"}),"\n",(0,s.jsx)(n.h3,{id:"analyzing-event-latency-in-real-time",children:"Analyzing Event Latency in Real-Time"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Problem:"})," The challenge is to understand how the latency of events fluctuates over very short intervals, specifically on a second-by-second basis. This analysis is crucial for identifying performance bottlenecks in real-time systems where even minor delays can impact user experience or system efficiency."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Solution:"})," The solution involves using a command sequence to bin events into one-second intervals based on their timestamps, and then calculate the average latency for events within each interval."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"... | bin span=1s timestamp \n    | stats avg(latency) by timestamp\n    | sort timestamp\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"bin span=1s timestamp"})," command segments the event data into one-second intervals. This step is essential for analyzing how event latency varies from one second to the next, providing a granular view of performance."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"stats avg(latency) by timestamp"})," command computes the average latency for all events within each one-second bin."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"sort timestamp"})," command orders the results by the timestamp of each bin, ensuring that the analysis of latency over time is presented in a chronological sequence. This makes it easier to trace the latency trends and identify specific moments of performance spikes or drops."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This approach offers a detailed analysis of event latency, enabling the identification of specific time intervals that may require optimization to improve overall system performance."}),"\n",(0,s.jsx)(n.h3,{id:"analyzing-age-distribution-in-data",children:"Analyzing Age Distribution in Data"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Problem:"})," A common challenge in data analysis is understanding the distribution of a numerical attribute, such as age, across a dataset. This is crucial for identifying trends, patterns, and outliers in the data, which can inform decision-making in areas like marketing, product development, and policy formulation."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Solution:"})," The solution involves using a command sequence to bin numerical data, such as age, into ten-year intervals, and then count the number of records within each interval."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"... | bin span=10 age AS age_bin\n    | stats count by age_bin \n    | sort age_bin\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"bin span=10 age AS age_bin"})," command segments the age data into bins of ten-year intervals and creates a new field named ",(0,s.jsx)(n.code,{children:"age_bin"})," containing the bin value. This step is essential for categorizing the data into meaningful groups that reflect different age ranges, facilitating the analysis of age distribution within the dataset."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"stats count by age_bin"})," command calculates the number of records within each age bin. This aggregation helps in understanding the distribution of ages across the dataset."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"sort age_bin"})," command orders the results by age bin, making it easier to analyze the age distribution sequentially from the youngest to the oldest groups."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This approach provides a clear view of the age distribution within the dataset, highlighting predominant age groups and potential gaps. It is particularly useful for demographic analysis and understanding the target audience in various contexts."}),"\n",(0,s.jsx)(n.h3,{id:"analyzing-price-distribution-in-product-data",children:"Analyzing Price Distribution in Product Data"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Problem:"})," A frequent challenge in retail and e-commerce analytics is understanding the distribution of product prices within a catalog. This analysis is vital for identifying pricing trends, setting competitive prices, and spotting outliers that could indicate errors or opportunities for special promotions."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Solution:"})," The solution involves using a command sequence to bin product prices into 20 equal intervals, count the number of products within each interval, and then sort the results to analyze the price distribution across the product range."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"... | bin bins=20 price AS price_bin\n    | stats count by price_bin \n    | sort price_bin\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"bin bins=20 price AS price_bin"})," command divides the range of product prices into 20 equal intervals and assigns each product to a bin, creating a new field named ",(0,s.jsx)(n.code,{children:"price_bin"}),". The creation of the ",(0,s.jsx)(n.code,{children:"price_bin"})," field facilitates subsequent analysis by categorizing products into distinct price segments."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"stats count by price_bin"})," command calculates the number of products within each price bin. This aggregation provides insights into how products are distributed across different price ranges, highlighting the most and least populated price segments."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"sort price_bin"})," command orders the results by price bin, facilitating a sequential analysis of the price distribution from the lowest to the highest price segments."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This approach offers a detailed view of the price distribution within the product catalog, enabling businesses to make informed decisions regarding pricing strategies, product positioning, and market competitiveness. It is especially useful for identifying price points that are over or underrepresented in the product range, guiding adjustments to meet market demand and strategic objectives."}),"\n",(0,s.jsx)(n.h3,{id:"optimizing-network-performance-by-analyzing-packet-size-distribution",children:"Optimizing Network Performance by Analyzing Packet Size Distribution"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Problem:"})," Network administrators face challenges in managing network performance due to the wide range and uneven distribution of packet sizes. Small packets like ACKs and large data transfers coexist, affecting throughput and efficiency. Identifying patterns and anomalies in packet size distribution is crucial for network optimization and security."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Solution:"})," The solution involves using a command sequence to bin packet sizes using a logarithmic scale, count the occurrences of each bin, and then sort the results to analyze the distribution of packet sizes across the network."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"... | bin span=log2 packet_size AS bin_packet_size\n    | stats count by bin_packet_size\n    | sort bin_packet_size\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Explanation:"})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"bin span=log2 packet_size AS bin_packet_size"})," command segments packet sizes into bins on a logarithmic scale and assigns each packet to a bin, creating a new field named ",(0,s.jsx)(n.code,{children:"bin_packet_size"}),". This method provides a more nuanced view of packet size distribution, especially useful for analyzing a wide range of sizes from very small to very large packets. The creation of the ",(0,s.jsx)(n.code,{children:"bin_packet_size"})," field facilitates subsequent analysis by categorizing packets into distinct size segments."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"stats count by bin_packet_size"})," command calculates the number of packets within each bin. This aggregation provides insights into the distribution of packet sizes, highlighting the most common sizes and identifying outliers. It helps in understanding how network traffic is composed in terms of packet sizes, which is crucial for optimizing network performance and capacity planning."]}),"\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"sort bin_packet_size"})," command orders the results by the bin of packet sizes, facilitating a sequential analysis of the packet size distribution. This organization allows for an easier identification of patterns, such as the prevalence of small packets that may indicate a large number of control messages or the presence of large packets that suggest data transfers."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This approach offers a detailed view of the packet size distribution across the network, enabling network administrators to make informed decisions regarding network configuration, optimization, and security. It is particularly useful for identifying trends and anomalies in packet size distribution, which can inform strategies to enhance network efficiency and performance."})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>a});var s=i(7294);const t={},r=s.createContext(t);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);
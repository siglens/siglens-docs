"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[4316],{2976:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>o,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var t=n(5893),r=n(1151);const i={},a="tail command",l={id:"spl-docs/tail-command",title:"tail command",description:"Description",source:"@site/docs/spl-docs/tail-command.md",sourceDirName:"spl-docs",slug:"/spl-docs/tail-command",permalink:"/siglens-docs/spl-docs/tail-command",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"search command",permalink:"/siglens-docs/spl-docs/search-command"},next:{title:"timechart",permalink:"/siglens-docs/spl-docs/timechart-command"}},o={},d=[{value:"Description",id:"description",level:2},{value:"Syntax",id:"syntax",level:2},{value:"Required Arguments",id:"required-arguments",level:3},{value:"Optional Arguments",id:"optional-arguments",level:3},{value:"&lt;N&gt;",id:"n",level:4},{value:"Example",id:"example",level:2},{value:"Use-Case Example",id:"use-case-example",level:2}];function c(e){const s={br:"br",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"tail-command",children:"tail command"}),"\n",(0,t.jsx)(s.h2,{id:"description",children:"Description"}),"\n",(0,t.jsxs)(s.p,{children:["This command allows you to fetch the last N records from the search results.",(0,t.jsx)(s.br,{}),"\n","The records are returned in reverse order, meaning that the last record of the search result will be on top.",(0,t.jsx)(s.br,{}),"\n","By default, if N is not specified, it will be considered as 10."]}),"\n",(0,t.jsx)(s.h2,{id:"syntax",children:"Syntax"}),"\n",(0,t.jsxs)(s.p,{children:["The required syntax is in ",(0,t.jsx)(s.strong,{children:"bold"}),"."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"tail"})," [<N>]"]}),"\n",(0,t.jsx)(s.h3,{id:"required-arguments",children:"Required Arguments"}),"\n",(0,t.jsx)(s.p,{children:"None."}),"\n",(0,t.jsx)(s.h3,{id:"optional-arguments",children:"Optional Arguments"}),"\n",(0,t.jsx)(s.h4,{id:"n",children:"<N>"}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Syntax:"})," ",(0,t.jsx)(s.code,{children:"<N>"}),(0,t.jsx)(s.br,{}),"\n",(0,t.jsx)(s.strong,{children:"Description:"})," ",(0,t.jsx)(s.br,{}),"\n",(0,t.jsx)(s.code,{children:"<N>"})," refers to the number of records to be retrieved from the end of the result set.",(0,t.jsx)(s.br,{}),"\n",(0,t.jsx)(s.strong,{children:"Default:"})," 10"]}),"\n",(0,t.jsx)(s.h2,{id:"example",children:"Example"}),"\n",(0,t.jsx)(s.p,{children:"The following example can be used to display the last 50 records of the result set."}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"... | tail 50\n"})}),"\n",(0,t.jsx)(s.h2,{id:"use-case-example",children:"Use-Case Example"}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"Identifying Top Performing Sales Representatives"})}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Problem:"})," In a competitive sales environment, identifying the top-performing sales representatives is crucial for recognizing achievements and understanding the drivers of sales success. This analysis can help in strategic planning, training, and motivating the sales team."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.strong,{children:"Solution:"})," To identify the top 10 performing sales representatives based on their total sales amount, a search command can be utilized. This command aggregates sales data by representative, sorts them by total sales, and then retrieves the bottom 10 records having the highest total sales, displaying them in reverse to prioritize top-performing representatives."]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{children:"index=sales_data \n    | stats sum(sale_amount) as total_sales by sales_rep \n    | sort total_sales \n    | tail\n"})}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"Explanation:"})}),"\n",(0,t.jsxs)(s.ol,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"stats sum(sale_amount) as total_sales by sales_rep"})," aggregates the data by sales representative (",(0,t.jsx)(s.code,{children:"sales_rep"}),"), calculating the total sales amount (",(0,t.jsx)(s.code,{children:"total_sales"}),") for each representative."]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"sort total_sales"})," sorts the aggregated results in ascending order based on the total sales amount (",(0,t.jsx)(s.code,{children:"total_sales"}),")."]}),"\n",(0,t.jsxs)(s.li,{children:["Finally, the ",(0,t.jsx)(s.code,{children:"tail"})," command is correctly used to fetch the bottom 10 records with the highest sales amounts, effectively identifying the top-performing sales representatives based on total sales."]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:"This approach provides a clear and efficient method for recognizing and analyzing the contributions of the highest-performing sales team members."})]})}function h(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>l,a:()=>a});var t=n(7294);const r={},i=t.createContext(r);function a(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);
"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[8460],{5847:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>p});var n=a(5893),s=a(1151);const r={},i="Java App",c={id:"instrument-traces/java-app",title:"Java App",description:"Auto-instrument sample Java app for traces",source:"@site/docs/instrument-traces/java-app.md",sourceDirName:"instrument-traces",slug:"/instrument-traces/java-app",permalink:"/siglens-docs/instrument-traces/java-app",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Go App",permalink:"/siglens-docs/instrument-traces/go-app"},next:{title:"Python App",permalink:"/siglens-docs/instrument-traces/python-app"}},o={},p=[{value:"Auto-instrument sample Java app for traces",id:"auto-instrument-sample-java-app-for-traces",level:2},{value:"Quickstart",id:"quickstart",level:2},{value:"More Details",id:"more-details",level:2}];function l(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"java-app",children:"Java App"}),"\n",(0,n.jsx)(t.h2,{id:"auto-instrument-sample-java-app-for-traces",children:"Auto-instrument sample Java app for traces"}),"\n",(0,n.jsx)(t.p,{children:"In this tutorial, we will go through the steps to auto-instrument a Java app to send traces to SigLens."}),"\n",(0,n.jsx)(t.h2,{id:"quickstart",children:"Quickstart"}),"\n",(0,n.jsx)(t.p,{children:"Start SigLens:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"curl -L https://siglens.com/install.sh | sh\n"})}),"\n",(0,n.jsx)(t.p,{children:"Start a Java app in a separate terminal:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:'git clone https://github.com/spring-projects/spring-petclinic\ncd spring-petclinic\n./mvnw package\ncurl -L -O https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar\n\nOTEL_METRICS_EXPORTER=none \\\nOTEL_LOGS_EXPORTER=none \\\nOTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:8081/otlp" \\\nOTEL_RESOURCE_ATTRIBUTES=service.name=my-service \\\njava -javaagent:opentelemetry-javaagent.jar -jar target/spring-petclinic-3.2.0-SNAPSHOT.jar\n'})}),"\n",(0,n.jsxs)(t.p,{children:["Go to the java app at ",(0,n.jsx)(t.a,{href:"http://localhost:8080",children:"http://localhost:8080"})," and use it a little to send traces to SigLens.\nAfter about 10 seconds, you should see the traces on SigLens on ",(0,n.jsx)(t.a,{href:"http://localhost:5122",children:"http://localhost:5122"})," then going to Tracing -> Search Traces and clicking the Find Traces button."]}),"\n",(0,n.jsx)(t.h2,{id:"more-details",children:"More Details"}),"\n",(0,n.jsx)(t.p,{children:"OpenTelemetry has full auto-instrumentation for Java, so auto-instrumenting your own Java app is easy.\nSimply follow the Quickstart instructions to run SigLens and download opentelemetry-javaagent.jar, then run your app normally but add the opentelemetry-javaagent.jar and the OTEL environment variables as done in the Quickstart."}),"\n",(0,n.jsx)(t.p,{children:"Once you're on the Tracing tab of SigLens, you can search the traces and see health metrics and graphs for each service."}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"search-traces",src:a(7401).Z+"",width:"2871",height:"1633"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"java-app",src:a(5725).Z+"",width:"2880",height:"1618"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"graph-1",src:a(2551).Z+"",width:"2871",height:"1624"})}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"graph-2",src:a(9287).Z+"",width:"2879",height:"1615"})})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},2551:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/java-app-red-metrics-graph-1-c104168a53d73bb3608c9ebeb1e53276.png"},9287:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/java-app-red-metrics-graph-2-5b13125cbfc96be79228a4664a30e738.png"},5725:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/java-app-red-traces-c5931d32ce5a318c835fe9287aad1e62.png"},7401:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/search-traces-java-5f2d4098b42aa4d1bcd48cb61b8bf303.png"},1151:(e,t,a)=>{a.d(t,{Z:()=>c,a:()=>i});var n=a(7294);const s={},r=n.createContext(s);function i(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);
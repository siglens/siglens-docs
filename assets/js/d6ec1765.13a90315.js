"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[2885],{5025:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>r,metadata:()=>s,toc:()=>a});var t=n(5893),l=n(1151);const r={},i="Open Telemetry",s={id:"log-ingestion/open-telemetry",title:"Open Telemetry",description:"Ingesting logs into Siglens using OpenTelemetry",source:"@site/docs/log-ingestion/open-telemetry.md",sourceDirName:"log-ingestion",slug:"/log-ingestion/open-telemetry",permalink:"/siglens-docs/log-ingestion/open-telemetry",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Promtail",permalink:"/siglens-docs/log-ingestion/promtail"},next:{title:"Metric Ingestion",permalink:"/siglens-docs/category/metric-ingestion"}},c={},a=[{value:"1. Pull OTEL Collector Docker Image",id:"1-pull-otel-collector-docker-image",level:3},{value:"2. Configure OTEL Collector",id:"2-configure-otel-collector",level:3},{value:"3. Run OTEL Collector",id:"3-run-otel-collector",level:3}];function d(e){const o={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h3:"h3",p:"p",pre:"pre",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.h1,{id:"open-telemetry",children:"Open Telemetry"}),"\n",(0,t.jsx)(o.p,{children:(0,t.jsx)(o.em,{children:"Ingesting logs into Siglens using OpenTelemetry"})}),"\n",(0,t.jsx)(o.h3,{id:"1-pull-otel-collector-docker-image",children:"1. Pull OTEL Collector Docker Image"}),"\n",(0,t.jsx)(o.p,{children:"Pull the latest Docker image for OpenTelemetry Collector Contrib:"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",children:"docker pull otel/opentelemetry-collector-contrib:latest\n"})}),"\n",(0,t.jsx)(o.h3,{id:"2-configure-otel-collector",children:"2. Configure OTEL Collector"}),"\n",(0,t.jsxs)(o.p,{children:["Download the ",(0,t.jsx)(o.code,{children:"2kevents.json"})," file if you are looking for a sample log file:"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",children:"curl -s -L https://github.com/siglens/pub-datasets/releases/download/v1.0.0/2kevents.json.tar.gz -o 2kevents.json.tar.gz && tar -xvf 2kevents.json.tar.gz\n"})}),"\n",(0,t.jsx)(o.p,{children:"Create a config file:"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-yaml",metastring:'title="otelconfig.yaml"',children:'receivers:\n  filelog:\n    include: [ /var/log/*.log ]  # replace with your log file path\n\nprocessors:\n  batch:\n\nexporters:\n  elasticsearch:\n    endpoints: ["http://host.docker.internal:8081/elastic"]\n    logs_index: "logs-%{+yyyy.MM.dd}"\n\nservice:\n  pipelines:\n    logs:\n      receivers: [filelog]\n      processors: [batch]\n      exporters: [elasticsearch]\n'})}),"\n",(0,t.jsxs)(o.p,{children:["For in-depth information on OpenTelemetry Collector Contrib configuration, visit the ",(0,t.jsx)(o.a,{href:"https://opentelemetry.io/docs/collector/",children:"official OpenTelemetry Collector Contrib documentation"}),"."]}),"\n",(0,t.jsx)(o.h3,{id:"3-run-otel-collector",children:"3. Run OTEL Collector"}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",children:"docker run -v <path_to_your_otel_config_directory>:/etc/otel -v <path_to_your_log_directory>:/var/log -p 4317:4317 -p 8888:8888 otel/opentelemetry-collector-contrib:latest --config /etc/otel/<your_config_file>\n"})}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",metastring:'title="Example command"',children:"docker run -v $HOME/otel:/etc/otel -v /var/log:/var/log -p 4317:4317 -p 8888:8888 otel/opentelemetry-collector-contrib:latest --config /etc/otel/otelconfig.yaml\n"})}),"\n",(0,t.jsx)(o.admonition,{type:"note",children:(0,t.jsx)(o.p,{children:"4317 is the default port for the OTLP gRPC receiver, and 8888 is used for metrics exposition. If you're using different ports in your setup, replace these with your actual ports."})})]})}function g(e={}){const{wrapper:o}={...(0,l.a)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,o,n)=>{n.d(o,{Z:()=>s,a:()=>i});var t=n(7294);const l={},r=t.createContext(l);function i(e){const o=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function s(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),t.createElement(r.Provider,{value:o},e.children)}}}]);
"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[418],{6846:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var o=t(5893),a=t(1151);const s={},i="Vector",r={id:"migration/datadog/vector",title:"Vector",description:"Migrating from Datadog to Siglens using Vector",source:"@site/docs/migration/datadog/vector.md",sourceDirName:"migration/datadog",slug:"/migration/datadog/vector",permalink:"/siglens-docs/migration/datadog/vector",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Migrating from Datadog",permalink:"/siglens-docs/category/migrating-from-datadog"},next:{title:"Splunk Commands",permalink:"/siglens-docs/category/splunk-commands"}},c={},l=[{value:"1. Install Vector and Configure Datadog Agent",id:"1-install-vector-and-configure-datadog-agent",level:2},{value:"Configure Datadog Agent",id:"configure-datadog-agent",level:3},{value:"If you haven&#39;t configured the Datadog Agent to collect logs yet, follow the steps below to set it up:",id:"if-you-havent-configured-the-datadog-agent-to-collect-logs-yet-follow-the-steps-below-to-set-it-up",level:4},{value:"2. Configure Vector",id:"2-configure-vector",level:2},{value:"3. Run Vector",id:"3-run-vector",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components},{Details:t}=n;return t||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"vector",children:"Vector"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"Migrating from Datadog to Siglens using Vector"})}),"\n",(0,o.jsx)(n.h2,{id:"1-install-vector-and-configure-datadog-agent",children:"1. Install Vector and Configure Datadog Agent"}),"\n",(0,o.jsx)(n.p,{children:"Prerequisites:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Datadog Agent (You can follow ",(0,o.jsx)(n.a,{href:"https://docs.datadoghq.com/getting_started/agent/",children:"this guide"})," to install the agent based on your OS)"]}),"\n",(0,o.jsxs)(n.li,{children:["Vector (You can follow ",(0,o.jsx)(n.a,{href:"/siglens-docs/log-ingestion/vector#1-installation",children:"this guide"})," to get started with installing vector)"]}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"configure-datadog-agent",children:"Configure Datadog Agent"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Navigate to the Datadog Agent's configuration file. The default location varies based on your operating system:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["For Linux: ",(0,o.jsx)(n.code,{children:"/etc/datadog-agent/datadog.yaml"})]}),"\n",(0,o.jsxs)(n.li,{children:["For macOS: ",(0,o.jsx)(n.code,{children:"~/.datadog-agent/datadog.yaml"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:["\u26a0\ufe0f"," ",(0,o.jsx)(n.strong,{children:"Note:"})," These paths can change based on the version of the software or the specific configuration of the system.  Refer to the ",(0,o.jsx)(n.a,{href:"https://docs.datadoghq.com/agent/guide/agent-configuration-files",children:"official Datadog documentation"})," for up-to-date information."]}),"\n"]}),"\n",(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["Open the ",(0,o.jsx)(n.code,{children:"datadog.yaml"})," file and set your Datadog API key. You can find your API key by following the instructions at ",(0,o.jsx)(n.a,{href:"https://docs.datadoghq.com/account_management/api-app-keys/#add-an-api-key-or-client-token",children:"this link"}),". Once you have your API key, you can set it in your Datadog Agent's configuration file."]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"## @param api_key - string - required\n## @env DD_API_KEY - string - required\n## The Datadog API key used by your Agent to submit metrics and events to Datadog.\n## Create a new API key here: https://app.datadoghq.com/organization-settings/api-keys .\n## Read more about API keys here: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys .\napi_key : <YOUR_DATADOG_API_KEY>\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"3",children:["\n",(0,o.jsxs)(n.li,{children:["Configure Vector. Replace ",(0,o.jsx)(n.code,{children:"<VECTOR_SOURCE_PORT>"})," with the port that your Vector source is listening on. This is the port that the Datadog Agent will send logs to."]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"## @param observability_pipelines_worker - custom object - optional\n## Configuration for forwarding telemetry to an Observability Pipelines Worker instead of Datadog.\n## https://www.datadoghq.com/product/observability-pipelines/\n## Note: This config is interchangeable with `vector`\nvector:\n    logs.enabled: true\n    logs.url: http://localhost:<VECTOR_SOURCE_PORT>\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"4",children:["\n",(0,o.jsx)(n.li,{children:"Enable log collection in the Datadog Agent's configuration file."}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"## @param logs_enabled - boolean - optional - default: false\n## @env DD_LOGS_ENABLED - boolean - optional - default: false\n## Enable Datadog Agent log collection by setting logs_enabled to true.\nlogs_enabled: true\n"})}),"\n",(0,o.jsxs)(n.ol,{start:"5",children:["\n",(0,o.jsx)(n.li,{children:"Start the Datadog Agent. The command to start the agent varies depending on your operating system. For example, on a Linux system, you would use:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo service datadog-agent start\n"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"For MacOS, you would use:"}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo datadog-agent run\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Remember to replace ",(0,o.jsx)(n.code,{children:"<YOUR_DATADOG_API_KEY>"})," and ",(0,o.jsx)(n.code,{children:"<VECTOR_SOURCE_PORT>"})," with your actual Datadog API key and Vector source host and port."]}),"\n",(0,o.jsx)(n.h4,{id:"if-you-havent-configured-the-datadog-agent-to-collect-logs-yet-follow-the-steps-below-to-set-it-up",children:"If you haven't configured the Datadog Agent to collect logs yet, follow the steps below to set it up:"}),"\n",(0,o.jsxs)(t,{children:[(0,o.jsx)("summary",{children:" Configure the datadog agent to collect logs "}),(0,o.jsx)(n.p,{children:"Here are the general steps to configure the Datadog Agent to collect logs from a file:"}),(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Navigate to the ",(0,o.jsx)(n.code,{children:"conf.d"})," directory inside the Datadog Agent's directory. The default location varies based on your operating system:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["For Linux: ",(0,o.jsx)(n.code,{children:"/etc/datadog-agent/conf.d/"})]}),"\n",(0,o.jsxs)(n.li,{children:["For macOS: ",(0,o.jsx)(n.code,{children:"~/.datadog-agent/conf.d/"})]}),"\n"]}),"\n"]}),"\n"]}),(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Note:"})," This path can change based on the version of the software or the specific configuration of the system. Refer to the ",(0,o.jsx)(n.a,{href:"https://docs.datadoghq.com/agent/guide/agent-configuration-files",children:"official Datadog documentation"})," for up-to-date information."]}),"\n"]}),(0,o.jsxs)(n.ol,{start:"2",children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Inside the ",(0,o.jsx)(n.code,{children:"conf.d"})," directory, create a new ",(0,o.jsx)(n.code,{children:".yaml"})," configuration file for your service. The file name should be ",(0,o.jsx)(n.code,{children:"<YOUR_SERVICE>.yaml"}),", where ",(0,o.jsx)(n.code,{children:"<YOUR_SERVICE>"})," is the name of your service. For example, if your service is named ",(0,o.jsx)(n.code,{children:"my_service"}),", the file name should be ",(0,o.jsx)(n.code,{children:"my_service.yaml"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Open the new configuration file and add the YAML configuration as required:"}),"\n"]}),"\n"]}),(0,o.jsx)(n.p,{children:"Below is a sample YAML Config:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"logs:\n  - type: file\n    path: <PATH_TO_LOG_FILE>\n    service: <SERVICE_NAME>\n    source: <LOG_SOURCE>\n  - type: tcp\n    port: <YOUR_APP_PORT> # Update this with the actual port number that your application is sending logs to\n    service: <SERVICE_NAME>\n    source: <LOG_SOURCE>\n"})}),(0,o.jsxs)(n.p,{children:["Replace ",(0,o.jsx)(n.code,{children:"<PATH_TO_LOG_FILE>"}),", ",(0,o.jsx)(n.code,{children:"<SERVICE_NAME>"}),", and ",(0,o.jsx)(n.code,{children:"<LOG_SOURCE>"})," with the actual path to your log file, the name of your service, and the source of your logs."]}),(0,o.jsxs)(n.p,{children:["You can find more information about different types of log sources and how to configure them in the ",(0,o.jsx)(n.a,{href:"https://docs.datadoghq.com/agent/logs",children:"Datadog Agent Log Collection documentation"}),"."]}),(0,o.jsxs)(n.ol,{start:"4",children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Save and close the configuration file."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Restart the Datadog Agent for the changes to take effect. The command to restart the agent varies depending on your operating system."}),"\n"]}),"\n"]}),(0,o.jsx)(n.p,{children:"For Linux, you would use:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo service datadog-agent restart\n"})}),(0,o.jsx)(n.p,{children:"For MacOS, you would use:"}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo datadog-agent run\n"})}),(0,o.jsx)(n.p,{children:"After following these steps, the Datadog Agent should start collecting logs from the specified file."})]}),"\n",(0,o.jsx)(n.h2,{id:"2-configure-vector",children:"2. Configure Vector"}),"\n",(0,o.jsxs)(n.p,{children:["Below is an example of a Vector configuration file that you can use. You'll need to replace the ",(0,o.jsx)(n.code,{children:"<project_id>"})," and ",(0,o.jsx)(n.code,{children:"<subscription_name>"})," fields with your own values."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:'data_dir: /var/lib/vector\nsources:\n  datadog_agent_logs:\n    type: "datadog_agent"\n    address: "0.0.0.0:<VECTOR_SOURCE_PORT>" # Update this port number to match the one in your Datadog configuration\n\ntransforms:\n  datadog_logs_remap:\n    inputs:\n      - datadog_agent_logs\n    type: remap\n    source: |\n      structured = parse_json!(.message)\n      ., err = merge(., structured)\n\nsinks:\n  elasticsearch_sink:\n    type: elasticsearch\n    inputs:\n      - datadog_logs_remap\n    endpoint: "http://localhost:8081/elastic/"\n    id_key: hostname\n    compression: none\n    mode: bulk\n    query:\n      X-Powered-By: Vector\n    healthcheck:\n      enabled: false\n    request:\n      bulk:\n        index:\n          value: "dd-logs-es"\n          action: "index"\n'})}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["When creating your Vector configuration file, ensure the endpoint has a ",(0,o.jsx)(n.code,{children:"/elastic"})," suffix"]}),"\n",(0,o.jsxs)(n.li,{children:["Remember to adjust the ",(0,o.jsx)(n.code,{children:"transforms"})," section in the configuration to match the format of your data. For detailed information on how to configure transforms for your specific logs, refer to the ",(0,o.jsx)(n.a,{href:"https://vector.dev/docs/reference/configuration/transforms/",children:"Transforms section"})," in the official Vector documentation."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"3-run-vector",children:"3. Run Vector"}),"\n",(0,o.jsxs)(n.p,{children:["Vector needs to be started with the ",(0,o.jsx)(n.code,{children:"--config"})," argument to specify the path to the configuration file. Run the following command:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"vector --config vector.yaml\n"})}),"\n",(0,o.jsx)(n.p,{children:"To ensure successful data ingestion, verify that Siglens, the Datadog Agent, and Vector are all running properly."})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var o=t(7294);const a={},s=o.createContext(a);function i(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);
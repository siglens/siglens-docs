"use strict";(self.webpackChunksiglens_docs=self.webpackChunksiglens_docs||[]).push([[4164],{4425:(n,e,s)=>{s.r(e),s.d(e,{assets:()=>a,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var i=s(5893),t=s(1151);const r={},l="Git",o={id:"installation/git",title:"Git",description:"Installing Siglens using Git",source:"@site/docs/installation/git.md",sourceDirName:"installation",slug:"/installation/git",permalink:"/siglens-docs/installation/git",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Helm",permalink:"/siglens-docs/installation/helm"},next:{title:"Log Ingestion",permalink:"/siglens-docs/category/log-ingestion"}},a={},c=[{value:"System Requirements",id:"system-requirements",level:2},{value:"Windows Support",id:"windows-support",level:2},{value:"Cloning and Running SigLens",id:"cloning-and-running-siglens",level:2},{value:"Configuring SigLens",id:"configuring-siglens",level:2},{value:"Next Steps",id:"next-steps",level:2}];function d(n){const e={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"git",children:"Git"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.em,{children:"Installing Siglens using Git"})}),"\n",(0,i.jsx)(e.p,{children:"The Git approach for installing SigLens is ideal for users who prefer a hands-on experience and want to customize settings directly. Cloning the repository and running locally provides transparency and control, making it ideal for developers and system administrators who enjoy a more involved installation process."}),"\n",(0,i.jsx)(e.h2,{id:"system-requirements",children:"System Requirements"}),"\n",(0,i.jsx)(e.p,{children:"Before getting started, make sure you have the following prerequisites:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"Git:"})," Ensure that Git is installed on your system."]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://git-scm.com/downloads",children:"Download Git"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"Golang:"})," SigLens requires Golang to be installed and configured on your machine."]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"Ubuntu/Debian:"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"sudo apt update && sudo apt install golang-go\n"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"CentOS/RHEL:"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"sudo yum install epel-release\nsudo yum install golang\n"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"MacOS:"}),"\nMake sure you have ",(0,i.jsx)(e.a,{href:"https://docs.brew.sh/Installation#macos-requirements",children:"Homebrew"})," installed, then run:"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"brew update && brew install golang\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"windows-support",children:"Windows Support"}),"\n",(0,i.jsx)(e.p,{children:"Currently, SigLens does not natively support Windows. However, you can choose one of the following workarounds:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["Create a Linux Virtual Machine using VirtualBox or QEMU (",(0,i.jsx)(e.a,{href:"https://www.virtualbox.org/",children:"VirtualBox"}),", ",(0,i.jsx)(e.a,{href:"https://www.qemu.org/",children:"QEMU"}),")"]}),"\n",(0,i.jsxs)(e.li,{children:["Use ",(0,i.jsx)(e.a,{href:"https://learn.microsoft.com/en-us/windows/wsl/install",children:"WSL2"})," to emulate a Linux environment within your Windows system"]}),"\n",(0,i.jsxs)(e.li,{children:["Run SigLens as a Docker container. Refer to the ",(0,i.jsx)(e.a,{href:"https://www.siglens.com/siglens-docs/installation/docker",children:"Docker installation guide"}),"."]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"cloning-and-running-siglens",children:"Cloning and Running SigLens"}),"\n",(0,i.jsx)(e.p,{children:"Follow these steps, Once you have the prerequisites set up and a Linux or MacOS environment. For Windows, you can use Linux Virtual Machine or WSL2:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Clone the SigLens repository:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"git clone https://github.com/siglens/siglens.git\n"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Navigate to the SigLens directory:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"cd siglens\n"})}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"Run the SigLens binary:"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"go run cmd/siglens/main.go --config server.yaml\n"})}),"\n",(0,i.jsx)(e.p,{children:"Please note: If you're running SigLens in a different directory, adjust the commands accordingly."}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["Access the SigLens UI at ",(0,i.jsx)(e.a,{href:"http://localhost:5122/",children:"http://localhost:5122/"}),"."]}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.strong,{children:"Note:"})," Be mindful of port numbers. If you changed the ports, use the correct port number for the UI dashboard."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"configuring-siglens",children:"Configuring SigLens"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"server.yaml"})," config file sets up SigLens to run on ports 5122 (UI and Query Server) and 8081 (Ingestion Server). You can customize these ports as needed."]}),"\n",(0,i.jsx)(e.h2,{id:"next-steps",children:"Next Steps"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:"https://www.siglens.com/siglens-docs/category/log-ingestion",children:"Log Ingestion"})}),"\n",(0,i.jsxs)(e.p,{children:["If you encounter any issues or have questions, feel free to reach out to the ",(0,i.jsx)(e.a,{href:"https://www.siglens.com/slack.html",children:"SigLens community"})," for assistance."]})]})}function h(n={}){const{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},1151:(n,e,s)=>{s.d(e,{Z:()=>o,a:()=>l});var i=s(7294);const t={},r=i.createContext(t);function l(n){const e=i.useContext(r);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:l(n.components),i.createElement(r.Provider,{value:e},n.children)}}}]);
# Helm

This comprehensive guide will help you install SigLens on your local Minikube Kubernetes cluster using Helm. Helm simplifies the deployment of Kubernetes applications, making it a breeze to set up SigLens.

The Helm approach is advantageous for users managing Kubernetes clusters who want a simplified and standardized way to deploy SigLens. Helm simplifies SigLens deployment as a Kubernetes package, providing standardized, scalable, and version-controlled installations. This method is best suited for users who leverage Kubernetes orchestration, offering templating and packaging for easy configuration and sharing within a Kubernetes-native environment.

### Prerequisites

Before installing SigLens, ensure you have the following tools installed on your system:

- [Kubernetes command-line interface (kubectl)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm CLI](https://helm.sh/docs/helm/)
- [Minikube](https://minikube.sigs.k8s.io/)
- [Docker](https://docs.docker.com/get-docker/)

## Step-by-Step Installation Guide

### Step 1: Installing Minikube

Minikube is a tool that helps you set up a single-node Kubernetes cluster within a virtual machine on your local system.

- Follow the instructions [here](https://minikube.sigs.k8s.io/docs/start/) to install Minikube using a package manager or the official installation guide.

### Step 2: Installing Docker, kubectl and Helm

Before proceeding, ensure you have both kubectl and Helm CLI installed. Open your terminal and check the versions of Docker, kubectl, and Helm:

To install Docker, kubectl, and Helm on different operating systems, you can use the following commands:

<details>
<summary>Windows</summary>

#### Docker:
Download and install Docker Desktop from the official Docker website: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

#### kubectl:
You can install kubectl on Windows using the following PowerShell command:

```powershell
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.22.2/bin/windows/amd64/kubectl.exe
Move-Item -Path .\kubectl.exe -Destination C:\Windows\System32\kubectl.exe
```

#### Helm:
- Installing Helm on Windows
- Go to the Helm releases page at https://github.com/helm/helm/releases.
- Download the latest Windows executable file (ending with ".exe").
- Double-click the downloaded file to start the installation wizard.
- Follow the prompts to complete the installation.

</details>

<details>
<summary>MacOS</summary>

#### Docker:
   
Download and install Docker Desktop from the official Docker website: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)

#### kubectl:
   
You can install kubectl on MacOS using Homebrew:

```bash
brew install kubectl
```

#### Helm:
   
You can install Helm on MacOS using Homebrew as well:

1. Open a terminal window.

Install Homebrew by running the following command:
    
 ```bash
 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
 ```

2. Once Homebrew is installed, run the following command to install Helm:
   
```bash
brew install helm
```

</details>

<details>
<summary>Linux</summary>

#### Docker:
Install Docker on Linux by following the official Docker installation guide for your distribution: [Docker Installation Guide](https://docs.docker.com/engine/install/)

#### kubectl:
You can install kubectl on Linux using the following commands:

```bash
sudo apt-get update && sudo apt-get install -y kubectl   # For Debian/Ubuntu
```

Or for other package managers, refer to the official Kubernetes documentation: [Install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

#### Helm:

**Ubuntu/Debian**

Open a terminal window, Run the following commands to download and install Helm:
   
```bash
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

**Red Hat/CentOS/Fedora**
Open a terminal window. Run the following commands to download and install Helm:

```bash
sudo curl -fsSL -o /etc/yum.repos.d/helm.repo https://baltocdn.com/helm/stable/rpm/helm.repo
sudo yum install helm
```

</details>

Note: Make sure to check for the latest versions on the respective official websites or package managers. And follow any additional commands as required in the official documentation

### Step 3: Adding SigLens Helm Repository

To get started, add the SigLens Helm repository to your Helm configuration:

```bash
helm repo add siglens-repo https://siglens.github.io/charts
```

Update the Helm repository to ensure you have the latest charts:

```bash
helm repo update
```

### Step 4: Starting Minikube

Now that we have Minikube, kubectl, and Helm installed, let's start our Minikube cluster. In your terminal, enter the following command:

```
minikube start
```

This command initializes Minikube, and it may take a few minutes as it downloads dependencies and sets up the cluster. Once the initialization is complete, you should see output similar to the following:

```
😄  minikube v1.30.1 on Darwin 12.6 (arm64)
✨  Using the docker driver based on existing profile
👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🏃  Updating the running docker "minikube" container ...
🐳  Preparing Kubernetes v1.26.3 on Docker 23.0.2 ...
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
🌟  Enabled addons: storage-provisioner, default-storageclass
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

```

To verify the status of your Minikube cluster, run:

```bash
minikube status
```

You should see a status indicating that the cluster is running.

```bash
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

### Step 5: Installing SigLens
With everything set up, it's time to install SigLens. Use Helm to install the latest version of the SigLens Helm chart:

```bash
helm install siglens siglens-repo/siglens
```

Once the installation is complete, you'll see an output similar to this example:

```bash
NAME: siglens
LAST DEPLOYED: Fri Jun 16 16:43:51 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
Thank you for installing siglens.
To learn more about the release, try:
  $ helm status siglens
To run tests, try:
  $ helm test siglens
...
```

### Step 6: Accessing SigLens
SigLens is now installed in your local Minikube cluster. To access the SigLens UI, follow these steps:

1. Forward local port 8081 to the ingest service using:

```bash
kubectl port-forward svc/siglens-ingest-svc 8081:8081
```

2. Get data in SigLens by loading sample data, using our supported ingestion methods, or integrating with your existing tools. Forward local port 8000 to the UI / query service using:
   
```bash
kubectl port-forward svc/siglens-query-svc 8000:8000
```

3. Open your web browser and navigate to: http://localhost:8000 to access the SigLens UI.

### Step 7: Clean Up

Once you've finished working with SigLens, you can stop your Minikube cluster to free up resources:

```bash
minikube stop
```

## Next Steps

[Log Ingestion](https://www.siglens.com/siglens-docs/category/log-ingestion)

Explore the features and functionalities of SigLens within your Minikube environment. If you encounter any issues or have questions, refer to the documentation or join the [SigLens community](https://www.siglens.com/slack.html) for assistance.

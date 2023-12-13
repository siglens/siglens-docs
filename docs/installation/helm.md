# Helm 

## Install SigLens locally using Minikube, Helm
 In this tutorial, we will walk you through the process of installing SigLens locally using Minikube and Helm. This setup will enable you to explore the powerful features of SigLens in your local Kubernetes environment. Before we dive in, let's ensure you have all the necessary tools installed.

### Prerequisites
Before we start the installation, make sure you have the following tools installed on your system:
- [Kubernetes command-line interface (CLI)](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Helm CLI](https://helm.sh/docs/helm/)
- [Minikube](https://minikube.sigs.k8s.io/)
- Docker

### Installation
#### Step 1: Installing Minikube
Minikube is a command-line tool that helps you set up a single-node Kubernetes cluster within a virtual machine on your local system. You can install Minikube using a package manager or by following the official installation guide. 
#### Step 2: Installing kubectl and Helm

Before we proceed, let's ensure you have both KubeCTL and HelmCLI installed. 

Open your terminal and check the versions of Docker and Helm with the following commands:

```
$ docker version
```
Example Output:
```
Client:
 Cloud integration: v1.0.31
 Version: 20.10.24
```

```
$ helm version
```
Example Output:
```
version.BuildInfo{Version:"v3.12.0", GitCommit:"c9f554d75773799f72ceef38c51210f1842a1dea", GitTreeState:"clean", GoVersion:"go1.20.4"}
```

Please note these are recommended software versions, and your environment may have different versions.

#### Step 3: Using Homebrew on macOS
If you're using macOS, you can install kubectl and Helm with Homebrew, a popular package manager for macOS.
- Install kubectl:
```
$ brew install kubernetes-cli
```

- Install helm:
```
$ brew install helm
```
#### Step 4: Starting Minikube

Now that we have Minikube, kubectl, and Helm installed, let's start our Minikube cluster. In your terminal, enter the following command:
```
$ minikube start
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
```
$ minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

```

You should see a status indicating that the cluster is running.
#### Step 5: Adding the SigLens Helm Repository

Before installing SigLens, you need to add the SigLens Helm repository. Execute the following command:

```
$ helm repo add siglens-repo https://siglens.github.io/charts
```
You should see a message confirming that "siglens-repo" has been added to your repositories.

#### Step 6: Updating Helm Repositories
Update all Helm repositories to ensure you have access to the latest chart versions:

```
$ helm repo update
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "siglens-helm" chart repository
...Successfully got an update from the "siglens-repo" chart repository
Update Complete. ⎈Happy Helming!⎈
```

#### Step 7: Installing SigLens
With everything set up, it's time to install SigLens. Use Helm to install the latest version of the SigLens Helm chart:
```
$ helm install siglens siglens-repo/siglens
```

Once the installation is complete, you'll see an output similar to this example:

```
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
#### Step 8: Accessing SigLens
SigLens is now installed in your local Minikube cluster. To access the SigLens UI, follow these steps:
Forward local port 8081 to the ingest service using: 
 ```
$ kubectl port-forward svc/siglens-ingest-svc 8081:8081
```
Get data in SigLens by loading sample data, using our supported ingestion methods, or integrating with your existing tools.

Forward local port 8000 to the UI / query service using:
```
 $ kubectl port-forward svc/siglens-query-svc 8000:8000
```
Open your web browser and navigate to: http://localhost:8000 to access the SigLens UI.

#### Step 9: Clean Up
Once you've finished working with SigLens, you can stop your Minikube cluster to free up resources:
```
$ minikube stop

```



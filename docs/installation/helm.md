# Helm 

## Install Sigscalr locally using Minikube, Helm ##

### Prerequisites ###
- Kubernetes command-line interface (CLI)
- Helm CLI
- Minikube

### Installation ###
1. Install Minikube
2. Install kubectl CLI and helm CLI.

Before we proceed, let's ensure you have both KubeCTL and HelmCLI installed. 

Open your terminal and check the versions of Docker and Helm with the following commands:

```
$ docker version
```
Example Output:
```
Client:
 Cloud integration: v1.0.31
 Version:           20.10.24
```
```
$ helm version
```
Example Output:
```
version.BuildInfo{Version:"v3.12.0", GitCommit:"c9f554d75773799f72ceef38c51210f1842a1dea", GitTreeState:"clean", GoVersion:"go1.20.4"}
```
Please note these are recommended software versions, and your environment may have different versions.

3. Using Homebrew on OS X, install kubectl.
```
$ brew install kubernetes-cli
```

4. Install helm.
```
$ brew install helm
```

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

5. Add the Sigscalr Helm repository.
Before installing SigScalr, you need to add the SigScalr Helm repository.
```
$ helm repo add sigscalr-repo https://sigscalr.github.io/helm-chart
```
You should see a message confirming that "sigscalr-repo" has been added to your repositories.

6. Updating Helm Repositories

```
helm repo update
```

Helm will fetch the latest information from the SigScalr repository.
Happy 	Helming!

7. Installing SigScalr

Use Helm to install the latest version of the SigScalr Helm chart:

```
$ helm install sigscalr sigscalr-repo/sigscalr
```
Once the installation is complete, you'll see an output similar to this example:
```
NAME: sigscalr
LAST DEPLOYED: Fri Jun 16 16:43:51 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
NOTES:
Thank you for installing sigscalr.
To learn more about the release, try:
  $ helm status sigscalr
To run tests, try:
  $ helm test sigscalr
...

```

8. Accessing SigScalr

SigScalr is now installed in your local Minikube cluster. To access the SigScalr UI, follow these steps:

- Forward local port 8081 to the ingest service using: 
```
$ kubectl port-forward svc/sigscalr-ingest-svc 8081:8081
```
- Get data in SigScalr by loading sample data, using our supported ingestion methods, or integrating with your existing tools.
- Forward local port 8000 to the UI / query service using:
```
 $ kubectl port-forward svc/sigscalr-query-svc 8000:8000
```

- Open your web browser and navigate to: http://localhost:8000 to access the SigScalr UI.

Access the UI in a browser with: http://localhost:8000
9. Clean up
```
$ minikube stop

```

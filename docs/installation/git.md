# Git

We are going to clone the SigLens repository and run it locally. Please ensure that you have [git](https://git-scm.com/) set up on your system.

## Windows Support
Currently, we do not support running natively on Windows, but there are a couple of workarounds.

1. You can create a Linux Virtual Machine using [VirtualBox](https://www.virtualbox.org/) or QEMU(https://www.qemu.org/)
2. You can use [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) to emulate a Linux environment within your Windows system
3. You can run SigLens as a Docker container. Please refer to the page about Docker installation.

## Installing Golang

In order to run SigLens, please make sure that you have [Golang](https://go.dev/) installed and configured.

If you are on **Ubuntu or any Debian** based Linux distro, run the below command to install Go
```
sudo apt update && sudo apt install golang-go
```

If you are on **CentOS or any RHEL** based Linux distro, run the below command to install Go

```
yum install epel-release

yum install golang

```

If you are on **MacOS**, run the below command to install Go. Make sure you have [Homebrew](https://brew.sh/) installed 

```
brew update&& brew install golang
```

## Cloning and Running SigLens

As mentioned earlier, we do not support running on Windows, but you can use one of the workarounds.

Once you have a Linux or MacOS environment, run the below commands to clone [SigLens](https://github.com/siglens/siglens), and run the binary.


```
git clone https://github.com/siglens/siglens.git

cd siglens

go run cmd/siglens/main.go --config server.yaml
```

Once this is done, you can access the Dashboard at http://localhost:5122/

**Note:-** Please be aware of the port numbers. If you changed the Port numbers, use the correct Port number for the UI dashboard.

The `server.yaml` config file sets up siglens to run on ports 5122 and 8081. You can change the ports to whatever you want.

Here's what's running on the default ports

**5122**: The UI and Query Server

**8081**: The Ingestion Server




---
sidebar_position: 2
---

# Git 

There are **two ways** to get started using git.

## Install using script
Click 👉 <a href="https://github.com/siglens/siglens/releases/latest/download/install_with_git.sh" download>**here**</a> 👈 to download the install script.

Go to the directory where install script is downloaded.

```
chmod +x install_using_git.sh
./install_using_git.sh
```
### OR
## Clone the siglens repo and run it locally
```
git clone git@github.com:siglens/siglens
cd siglens
go run cmd/siglens/main.go --config server.yaml
```

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
### Linux and Mac
```
git clone git@github.com:siglens/siglens
cd siglens
go run cmd/siglens/main.go --config server.yaml
```
The server.yaml config file sets up siglens to run on ports 80 and 8081.
If you're running on linux, you'll need to either run siglens with `sudo` or change port 80 to 1024 or higher, since ports 1-1023 are restricted.

### Windows
We don't support running on Windows.
You can run either run a linux virtual machine or run it through Docker

### Docker
Ensure you have Docker installed and running, then run the following:
```
git clone git@github.com:siglens/siglens
cd siglens
docker build -t siglens-image .
docker run -p 80:80 -p 8081:8081 --name siglens-container siglens-image
```

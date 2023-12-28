# Git
## Clone the siglens repo and run it locally
### Linux and Mac
```
git clone git@github.com:siglens/siglens
cd siglens
go run cmd/siglens/main.go --config server.yaml
```
The server.yaml config file sets up siglens to run on ports 5122 and 8081.

### Windows
We don't support running on Windows.
You can either run a linux virtual machine or run it through Docker


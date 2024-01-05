# Docker

This page will show you how you can run SigLens as a Docker Container. We have created an installation script which will simplify the process.

## Installing Docker

If you are running on Ubuntu or a Red Hat-based Linux distribution, you can skip this step. We have created a script that will automatically install and set up Docker for you.

If you are running on any other Linux Distribution or MacOS, you will need to set up [Docker](https://www.docker.com/) manually

### Linux

You can refer to the official [Docker Documentation](https://docs.docker.com/get-docker/) to learn how to install Docker for your specific distribution.

Alternatively, you can run the below script to automate the process

```
curl -fsSL https://get.docker.com -o get-docker.sh

sh get-docker.sh
```

After installing Docker, please make sure that the Docker service is active and running. 

You can check the status of Docker using the following command:

```
sudo systemctl status docker

# If Docker is inactive then run the below command

sudo systemctl start docker
```


### MacOS

Please refer to the [official Docker documentation](https://docs.docker.com/desktop/install/mac-install/) for installing Docker for MacOS.

It is recommended to download and install Docker using the `Docker.dmg` installer

## Running SigLens on Docker

We have created a script that you can use to easily run SigLens using Docker.

Make sure you have docker installed and active before running the script.

**Note for Windows Users**: The below script can work for Windows users as well but please ensure that you run it in a [WSL environment](https://learn.microsoft.com/en-us/windows/wsl/install) and have Docker installed and running

```
curl -L https://siglens.com/install.sh | sh
```

The SigLens UI can be accessed here: http://localhost:5122

The SigLens Ingestion server will be running here: http://localhost:8081

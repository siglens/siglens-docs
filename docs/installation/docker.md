---
sidebar_position: 3
---

# Docker
- SigLens can be installed on Linux or macOS machine. 
- On macOS, Docker Desktop should be installed before you run the install script. 
- Git clone the SigLens repository and cd into the siglens directory 
```
    git clone git@github.com:siglens/siglens.git
    cd siglens
```
- Run the install_with_docker.sh script:
```
    ./install_with_docker.sh
```

The SigLens backend is deployed independently of the UI. 
To allow the UI to connect to the backend a docker network can be used.
```
    wget "https://github.com/siglens/siglens/releases/download/${SIGLENS_VERSION}/server.yaml"
    docker pull siglens/siglens:${SIGLENS_VERSION} 
    mkdir data
    docker run -it --mount type=bind,source="$(pwd)"/data,target=/siglens/data \
        --mount type=bind,source="$(pwd)"/server.yaml,target=/siglens/server.yaml \
        -p 8081:8081 -p 80:80 siglens/siglens:${SIGLENS_VERSION}
```
To be able to query data across restarts, set `ssInstanceName` in server.yaml.

The target for the data directory mounting should be the same as the data directory (`dataPath` configuration) in server.yaml

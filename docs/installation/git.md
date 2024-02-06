# SigLens Local Installation Guide

This guide will walk you through the process of cloning the SigLens repository and running it locally. Please follow the steps carefully to ensure a smooth setup.

The Git approach for installing SigLens is ideal for users who prefer a hands-on experience and want to customize settings directly. Cloning the repository and running locally provides transparency and control, making it ideal for developers and system administrators who enjoy a more involved installation process.

## System Requirements

Before getting started, make sure you have the following prerequisites:

1. **Git:** Ensure that Git is installed on your system.
   - [Download Git](https://git-scm.com/downloads)

2. **Golang:** SigLens requires Golang to be installed and configured on your machine.

   - **Ubuntu/Debian:**
     ```bash
     sudo apt update && sudo apt install golang-go
     ```

   - **CentOS/RHEL:**
     ```bash
     sudo yum install epel-release
     sudo yum install golang
     ```

   - **MacOS:**
     Make sure you have [Homebrew](https://docs.brew.sh/Installation#macos-requirements) installed, then run:
     ```bash
     brew update && brew install golang
     ```

## Windows Support

Currently, SigLens does not natively support Windows. However, you can choose one of the following workarounds:

1. Create a Linux Virtual Machine using VirtualBox or QEMU ([VirtualBox](https://www.virtualbox.org/), [QEMU](https://www.qemu.org/))
2. Use [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install) to emulate a Linux environment within your Windows system
3. Run SigLens as a Docker container. Refer to the [Docker installation guide](https://www.siglens.com/siglens-docs/installation/docker).

## Cloning and Running SigLens

Follow these steps, Once you have the prerequisites set up and a Linux or MacOS environment. For Windows, you can use Linux Virtual Machine or WSL2:

1. Clone the SigLens repository:
   ```bash
   git clone https://github.com/siglens/siglens.git
   ```

2. Navigate to the SigLens directory:
   ```bash
   cd siglens
   ```

3. Run the SigLens binary:
   ```bash
   go run cmd/siglens/main.go --config server.yaml
   ```

   Please note: If you're running SigLens in a different directory, adjust the commands accordingly.

4. Access the SigLens Dashboard at [http://localhost:5122/](http://localhost:5122/).

   **Note:** Be mindful of port numbers. If you changed the ports, use the correct port number for the UI dashboard.

## Configuring SigLens

The `server.yaml` config file sets up SigLens to run on ports 5122 (UI and Query Server) and 8081 (Ingestion Server). You can customize these ports as needed.

## Next Steps

[Log Ingestion](https://www.siglens.com/siglens-docs/category/log-ingestion)

If you encounter any issues or have questions, feel free to reach out to the [SigLens community](https://www.siglens.com/slack.html) for assistance.

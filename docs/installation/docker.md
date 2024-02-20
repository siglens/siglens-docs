# Docker

*Installing Siglens using Docker*

SigLens can be installed on Linux or macOS machine. 

If you prefer to use Docker for SigLens installation on your Linux or macOS machine, follow this straightforward "one command" guide. Docker provides a convenient and isolated environment for running SigLens.

Installing SigLens with Docker streamlines deployment, encapsulating all dependencies within a container. This method is user-friendly, ensuring consistent environments and efficient resource usage. It's perfect for those who want a straightforward, hassle-free installation.

## Installing SigLens with Docker

To install SigLens using Docker, execute the following command in your terminal:

```bash
curl -L https://siglens.com/install.sh | sh
```

The above command will download and run a setup and installation bash script from the Siglens repository which performs the following tasks:

1. **Extracts SigLens Version:** Retrieves the latest SigLens version from the GitHub API.

2. **Checks Sudo Permissions:** Verifies if the script has sudo privileges and prompts the user if needed. 

> You do not need to run the script as root.

3. **Identifies OS and Package Manager:** Determines the operating system and package manager for Docker installation.

4. **Installs Docker and Docker Compose:** Checks for Docker and Docker Compose and installs them if missing.

5. **Starts Docker:** Initiates Docker and checks for a successful start.

6. **Pulls Docker Image for SigLens:** Fetches the SigLens Docker image from the Docker Hub.

7. **Creates Directories and Sets Permissions:** Establishes necessary directories and sets permissions.

8. **Checks and Allocates Ports:** Ensures availability of specified ports (5122 and 8081) and stops conflicting Docker containers.

9. **Sends Sample Log Dataset:** Downloads and sends a sample log dataset to SigLens.

10. **Starts SigLens using Docker Compose:** Launches SigLens via Docker Compose with specified configurations.

## Accessing SigLens UI

Once the installation is complete, you can access the SigLens UI by visiting http://localhost:5122/ in your web browser.

**Note:** Ensure port `5122` is available before running SigLens in a Docker container.

Feel free to explore its features and functionalities on the user-friendly dashboard.

## Next Steps

[Log Ingestion](https://www.siglens.com/siglens-docs/category/log-ingestion)

If you encounter any issues or have questions, feel free to reach out to the [SigLens slack community](https://www.siglens.com/slack.html) for assistance.

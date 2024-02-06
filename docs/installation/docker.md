# Docker

If you prefer to use Docker for SigLens installation on your Linux or macOS machine, follow this straightforward "one command" guide. Docker provides a convenient and isolated environment for running SigLens.

Installing SigLens with Docker streamlines deployment, encapsulating all dependencies within a container. This method is user-friendly, ensuring consistent environments and efficient resource usage. It's perfect for those who want a straightforward, hassle-free installation.

## System Requirements

Before proceeding, ensure you have Docker installed on your system:

- **Docker:** Install Docker on your machine.
  - [Install Docker](https://docs.docker.com/get-docker/)

## Installing SigLens with Docker

To install SigLens using Docker, execute the following command in your terminal:

```bash
curl -L https://siglens.com/install.sh | sh
```

The above command will download and run the [`install_with_docker.sh`](https://github.com/siglens/siglens/blob/develop/install_with_docker.sh) bash script from Siglens repository.

This `install_with_docker.sh` performs the following task:

1. **Extracts SigLens Version:** Retrieves the latest SigLens version from the GitHub API.

2. **Checks Sudo Permissions:** Verifies if the script has sudo privileges and prompts the user if needed. 
> You do not need to run the script as root.

3. **Identifies OS and Package Manager:** Determines the operating system and package manager for Docker installation.

4. **Fetches IP Information:** Gathers information about your machine's IP, location, and more.

5. **Posts IP Information to Segment.io:** Sends IP-related details to the Segment.io API for tracking purposes.

6. **Defines Text Colors and Helper Functions:** Sets up text colours and functions for better user interaction.

7. **Installs Docker and Docker Compose:** Checks for Docker and Docker Compose and installs them if missing.

8. **Starts Docker:** Initiates Docker and checks for a successful start.

9. **Pulls Docker Image for SigLens:** Fetches the SigLens Docker image from the Docker Hub.

10. **Creates Directories and Sets Permissions:** Establishes necessary directories and sets permissions.

11. **Prints Success Message:** Displays a success message with the installed SigLens version.

12. **Checks and Allocates Ports:** Ensures availability of specified ports (5122 and 8081) and stops conflicting Docker containers.

13. **Sends Sample Log Dataset:** Downloads and sends a sample log dataset to SigLens.

14. **Starts SigLens using Docker Compose:** Launches SigLens via Docker Compose with specified configurations.

15. **Logs SigLens Output and Checks for First Run:** Records output and checks if it's the first run by examining HTTP status codes.

16. **Sends Events and Prints Final Messages:** Sends events to Segment.io, prints messages, and provides information on accessing SigLens.

## Accessing SigLens UI

Once the installation is complete, you can access the SigLens UI by visiting http://localhost:5122/ in your web browser.

**Note:** Ensure that the specified port (5122) is not being used by any other application on your machine. SigLens is now up and running within a Docker container. Feel free to explore its features and functionalities on the user-friendly dashboard.

## Next Steps

[Log Ingestion](https://www.siglens.com/siglens-docs/category/log-ingestion)

If you encounter any issues or have questions, feel free to reach out to the [SigLens slack community](https://www.siglens.com/slack.html) for assistance.

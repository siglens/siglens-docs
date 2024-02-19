# Welcome to SigLens Documentation!

<p align="center">
<img src="https://github.com/siglens/siglens/assets/604069/7dab105b-2102-4a32-85c7-02fbb4604217" width="300">
</p>


Welcome to the official documentation repository for SigLens, the cutting-edge, open-source alternative to Splunk/DataDog. Our mission is to revolutionize the observability landscape by providing a solution that is not only 100x more efficient than Splunk but also significantly reduces your observability costs—by up to 90%.

This repository is the source of the [Official SigLens documentation](https://siglens.github.io/siglens-docs). We appreciate your interest in contributing and welcome your participation in making this resource even better. If you have any questions, please reach out to us on [Slack](https://www.siglens.com/slack.html).

# Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Documentation Workflow](#documentation-workflow)
  - [Markdown structure](#markdown-structure)
- [How to Contribute](#how-to-contribute)
  - [Content Guidelines](#content-guidelines)
  - [First-Time Contributors](#first-time-contributors)
- [Community and Support](#community-and-support)
- [License](#license)

## Introduction

SigLens is engineered for excellence in managing massive volumes of data, from terabytes to petabytes, without compromising on speed or efficiency. At the heart of SigLens is our proprietary microindexing technology, which ensures that micro indices are only 1/100th the size of traditional indices, resulting in smaller index sizes and faster ingestion speeds. Moreover, SigLens utilizes dynamic columnar compression to reduce on-disk storage size to often just 1% of the incoming volume. This innovation not only enhances query times but also substantially lowers storage and compute requirements.

## Getting Started

Before you start contributing to SigLens Documentation, here are a few things you should know:

- **Markdown**: Our documentation is written in Markdown. Familiarity with Markdown syntax is helpful but not required.
- **Git and GitHub**: Contributions are made via GitHub. A basic understanding of how to fork a repository, create branches, and submit pull requests is necessary.

**SigLens Platform**: Having a basic understanding of what SigLens offers will help you write better documentation. We encourage you to try out SigLens using 

- The [Siglens Playground](http://playground.sigscalr.io:5122/), or
- Installing SigLens in your local machine

### &emsp; <a href="https://siglens.github.io/siglens-docs/installation/git" target="_blank">Git</a> &emsp; | &emsp; <a href="https://siglens.github.io/siglens-docs/installation/docker" target="_blank">Docker</a> &emsp;| &emsp; <a href="https://siglens.github.io/siglens-docs/installation/helm" target="_blank">Helm</a>

## Documentation Workflow

SigLens documentation uses [Docusaurus](https://docusaurus.io/docs) for creating and managing [SigLens Documentation](https://siglens.github.io/siglens-docs) website.

To host this documentation on your local machine, follow these steps.

1. Clone the repository
    ```
    git clone https://github.com/<username>/siglens-docs.git
    ```
2. Install the dependencies
    ```
    npm install
    ```
3. Start the document website server
    ```
    npm start
    ```

### Markdown structure

Here's an a detailed overview of the entire markdown file structure of the documentation.

```
|-- /docs
    |-- alerts.md
|-- /benchmarks
|   |-- /benchmarks
|       |-- nyc-taxi-benchmark-runbook.md
    |-- cluster-health.md
    |-- community.md
    |-- contribution-guidelines.md
    |-- dashboards.md
|-- /installation
|   |-- /installation
|       |-- docker.md
|       |-- git.md
|       |-- helm.md
|-- /instrument-traces
|   |-- /instrument-traces
|       |-- dotnet-app.md
|       |-- go-app.md
|       |-- java-app.md
|       |-- js-app.md
|       |-- python-app.md
    |-- introduction.md
    |-- key-concepts.md
|-- /log-ingestion
|   |-- /beats
|   |   |-- /beats
|   |       |-- filebeat-elasticsearch.md
|   |       |-- metricbeat-elasticsearch.md
|   |-- /log-ingestion
|       |-- elastic-search.md
|   |-- /fluentd
|   |   |-- /fluentd
|   |       |-- fluentd-elasticsearch.md
|   |       |-- fluentd-splunk.md
|       |-- fluentd-fluentbit.md
|   |-- /logstash
|   |   |-- /logstash
|   |       |-- logstash-elasticsearch.md
|   |       |-- logstash-splunk.md
|       |-- loki.md
|       |-- open-telemetry.md
|       |-- splunk-hec.md
|   |-- /vector
|   |   |-- /vector
|   |       |-- vector-elasticsearch.md
|   |       |-- vector-install.md
|   |       |-- vector-splunk-hec-logs.md
|   |       |-- vector-splunk-hec-metrics.md
|       |-- vector.md
    |-- log-query-builder.md
    |-- minion-searches.md
    |-- retention.md
    |-- saved-searches.md
    |-- searching-logs.md
```
> [!NOTE]
> When creating new content file or adjusting docs hierarchy, please consult the SigLens team by opening a Github Issue in this repository.

Please ensure your contributions fit into the appropriate section for consistency.

## How to Contribute

If you've encountered any inaccuracy or have suggestion on we can make the documentations better, please open an issue on the [siglens-docs issue tracker](https://github.com/siglens/siglens-docs/issues), or let us about the request on [Slack](https://www.siglens.com/slack.html).

To contribute to the SigLens Documentation, follow these steps:

1. **Fork the Repository**: Start by forking the `siglens-docs` repository to your GitHub account.
2. **Clone Your Fork**: Clone your fork to your local machine for ease of editing.
3. **Create a Branch**: For each piece of work, create a new branch in your fork. Use a clear branch name that describes the work or issue you're addressing.
4. **Make Your Changes**: Add or edit the documentation as needed. Make sure to follow the SigLens style patterns to ensure consistency across the documentation.
5. **Submit a Pull Request (PR)**: Once you've made your changes, submit a pull request to the main `siglens-docs` repository. Please provide a concise and clear description of the changes and why they are necessary.

### Content Guidelines
- Use proper title hierarchy (h1-h6) and valid HTML
- All titles must follow the Chicago style of headline capitalization.
- External links (not https://SigLens.com) should be opened in a new tab (`target="_blank"`)
- External links should have an HTML attribute of `rel="noopener"`.
- All filenames should be dash-based and nested in such a way that makes sense
- All images must be in PNG format and does not contain any sensitive information. Ensure that screenshots of the SigLens user interface are of clear quality, high resolution, and effectively communicate their intended purpose within the given context.
- When creating new content or adjusting docs hierarchy, please consult the SigLens team by opening a Github Issue in this repository.

### First-Time Contributors

If you're new to open-source or this project, look for issues labeled `good first issue`. These are great starting points for your first contribution. Don't hesitate to ask questions or seek guidance by creating an issue or contacting the maintainers.

## Community and Support

Join our community to discuss the documentation and share ideas:

- **GitHub Issues**: For bug reports, feature requests, or submitting feedback.
- **Slack**: If you encounter any difficulties, don't hesitate to join our SigLens [Slack Community Channel](https://www.siglens.com/slack.html) for assistance!

## License

The SigLens Documentation is licensed under the [Apache License 2.0](LICENSE). By contributing to this repository, you agree to license your contributions under the same license.

---

Thank you to all the contributors who have helped grow SigLens. Your efforts are greatly appreciated by the community.

<a href="https://github.com/siglens/siglens" target="_blank">
<img src=https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white alt=SigLens_github style="margin-bottom: 5px;" />
</a>
<a href="https://twitter.com/SigLensHQ" target="_blank">
<img src=https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white alt=SigLens_twitter style="margin-bottom: 5px;" />
</a>
<!-- <a href="#" target="_blank">
<img src=https://img.shields.io/badge/dev.to-%2308090A.svg?&style=for-the-badge&logo=dev.to&logoColor=white alt=SigLens_dev.to style="margin-bottom: 5px;" />
</a> -->
<a href="https://www.linkedin.com/company/sigscalr-io/?miniCompanyUrn=urn%3Ali%3Afs_miniCompany%3A77978282" target="_blank">
<img src=https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white alt=SigLens_linkedin style="margin-bottom: 5px;" />
</a> 
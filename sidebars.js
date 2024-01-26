/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'generated-index',
      },
      items: ['installation/git', 'installation/docker', 'installation/helm'],
    },
    {
      type: 'category',
      label: 'Log Ingestion',
      link: {
        type: 'generated-index',
        description:
          'Siglens default ingestion server runs on port: 8081. The below are the various ways to ingest logs into Siglens.',
      },
      items: [
        {
          type: 'category',
          label: 'Vector',
          link: {
            type: 'generated-index',
            title: 'Ingestion through Vector',
            description: `Vector can be used to ingest logs from various sources. Please check the Vector documentation at https://vector.dev/docs/ for more information.`,
          },
          items: [
            'log-ingestion/vector/vector-install',
            'log-ingestion/vector/vector-elasticsearch',
            'log-ingestion/vector/vector-splunk-hec-logs',
            'log-ingestion/vector/vector-splunk-hec-metrics',
          ],
        },
        {
          type: 'category',
          label: 'Beats',
          link: {
            type: 'generated-index',
            title: 'Ingestion through Beats: Filebeat/Metricbeat',
            description: `Beats can be used to ingest logs from various sources. Please check the Beats documentation at https://www.elastic.co/guide/en/beats/filebeat/7.9/index.html for more information.`,
          },
          items: ['log-ingestion/beats/filebeat-elasticsearch', 'log-ingestion/beats/metricbeat-elasticsearch'],
        },
        {
          type: 'category',
          label: 'Logstash',
          link: {
            type: 'generated-index',
            title: 'Ingestion through Logstash',
            description: `Logstash can be used to ingest logs from various sources. Please check the Logstash documentation at https://www.elastic.co/guide/en/logstash/7.9/introduction.html for more information.`,
          },
          items: ['log-ingestion/logstash/logstash-elasticsearch', 'log-ingestion/logstash/logstash-splunk'],
        },
        {
          type: 'category',
          label: 'Fluentd',
          link: {
            type: 'generated-index',
            title: 'Ingestion through Fluentd',
            description: `Fluentd can be used to ingest logs from various sources. Please check the Fluentd documentation at https://docs.fluentd.org/ for more information.`,
          },
          items: ['log-ingestion/fluentd/fluentd-elasticsearch', 'log-ingestion/fluentd/fluentd-splunk'],
        },
        'log-ingestion/open-telemetry',
        'log-ingestion/loki',
      ],
    },
    {
      type: 'category',
      label: 'Instrumention for Traces',
      link: {
        type: 'generated-index',
      },
      items: [
        'instrument-traces/go-app',
        'instrument-traces/java-app',
        'instrument-traces/python-app',
        'instrument-traces/dotnet-app',
        'instrument-traces/js-app',
      ],
    },
    'searching-logs',
    'log-query-builder',
    'dashboards',
    'saved-searches',
    'alerts',
    'minion-searches',
    'cluster-health',
    'retention',
    'contribution-guidelines',
    'community',
  ],
};

export default sidebars;

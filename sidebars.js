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
    'key-concepts',
    {
      type: 'category',
      label: 'Installation',
      link: {
        type: 'generated-index',
      },
      items: ['installation/docker', 'installation/helm', 'installation/git'],
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
        'log-ingestion/vector',
        'log-ingestion/logstash',
        'log-ingestion/fluentd',
        'log-ingestion/filebeat',
        'log-ingestion/promtail',
      ],
    },
    {
      type: 'category',
      label: 'Metric Ingestion',
      link: {
        type: 'generated-index',
      },
      items: [
        'metric-ingestion/vector-metrics',
        'metric-ingestion/metricbeat',
        'metric-ingestion/open-telemetry',
      ],
    },
    {
      type: 'category',
      label: 'Instrumentation for Traces',
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
    { 
      type: 'category',
      label: 'Migration',
      link: {
        type: 'generated-index',
      },
      items: [
    {
      type: 'category',
      label: 'Migrating from Splunk',
      link: {
        type: 'generated-index',
        title: 'Migrating from Splunk',
        description: `Migrating from Splunk to Siglens is a simple process. Please follow the below steps to migrate from Splunk to Siglens.`,
      },
      items: ['migration/splunk/vector', 'migration/splunk/logstash', 'migration/splunk/fluentd'],
    },
    {
      type: 'category',
      label: 'Migrating from Elastic Search',
      link: {
        type: 'generated-index',
        title: 'Migrating from Elastic Search',
        description: `Migrating from Elastic Search to Siglens is a simple process. Please follow the below steps to migrate from Elastic Search to Siglens.`,
      },
      items: ['migration/elasticsearch/vector', 'migration/elasticsearch/logstash', 'migration/elasticsearch/fluentd'],
    },
    {
      type: 'category',
      label: 'Migrating from Loki',
      link: {
        type: 'generated-index',
        title: 'Migrating from Loki',
        description: `Migrating from Loki to Siglens is a simple process. Please follow the below steps to migrate from Loki to Siglens.`,
      },
      items: ['migration/loki/promtail'],
    },
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

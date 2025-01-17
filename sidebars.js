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
        'log-ingestion/open-telemetry',
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
    {
      type: 'category',
      label: 'Migrating from Google Cloud',
      link: {
        type: 'generated-index',
        title: 'Migrating from Google Cloud',
        description: `Migrating from Google Cloud to Siglens is a simple process. Please follow the below steps to migrate from Loki to Siglens.`,
      },
      items: ['migration/gcloud/vector'],
    },
    {
      type: 'category',
      label: 'Migrating from AWS CloudWatch',
      link: {
        type: 'generated-index',
        title: 'Migrating from AWS CloudWatch',
        description: `Migrating/Streaming Logs from AWS CloudWatch to Siglens is a simple process. Please follow the below steps to migrate to Siglens.`,
      },
      items: ['migration/awscloudwatch/aws-lambda', 'migration/awscloudwatch/fluentd'],
    },
    {
      type: 'category',
      label: 'Migrating from Datadog',
      link: {
        type: 'generated-index',
        title: 'Migrating from Datadog',
        description: `Migrating from Datadog to Siglens is a simple process. Please follow the below steps to migrate from Datadog to Siglens.`,
      },
      items: ['migration/datadog/vector'],
    },
  ],
},
{ 
  type: 'category',
  label: 'Splunk Commands',
  link: {
    type: 'generated-index',
  },
  items: [
  'spl-docs/splunk-commands',
  'spl-docs/common-usecases',
  'spl-docs/bin-command',
  'spl-docs/dedup-command',
  'spl-docs/eval-command',
  'spl-docs/extract-command',
  'spl-docs/fields-command',
  'spl-docs/fillnull-command',
  'spl-docs/gentimes-command',
  'spl-docs/head-command',
  'spl-docs/inputlookup-command',
  'spl-docs/makemv-command',
  'spl-docs/rare-command',
  'spl-docs/regex-command',
  'spl-docs/rename-command',
  'spl-docs/rex-command',
  'spl-docs/search-command',
  'spl-docs/sort-command',
  'spl-docs/stats-command',
  'spl-docs/streamstats-command',
  'spl-docs/tail-command',
  'spl-docs/time-modifiers',
  'spl-docs/timechart-command',
  'spl-docs/top-command',
  'spl-docs/transaction-command',
  'spl-docs/where-command',
{
  type: 'category',
  label: 'Evaluation Functions',
  link: {
    type: 'generated-index',
    title: 'Evaluation Functions',
    description: `Use evaluation functions to evaluate an expression on your events`,
  },
  items: [
    'spl-docs/evaluation-functions/overview', 
    'spl-docs/evaluation-functions/comparison-conditional-functions',
    'spl-docs/evaluation-functions/conversion-functions',
    'spl-docs/evaluation-functions/informational-functions',
    'spl-docs/evaluation-functions/mathematical-functions',
    'spl-docs/evaluation-functions/multivalue-functions',
    'spl-docs/evaluation-functions/statistical-functions',
    'spl-docs/evaluation-functions/text-functions',
    'spl-docs/evaluation-functions/trig-hyperbolic-functions',
    'spl-docs/evaluation-functions/time-functions',
    'spl-docs/evaluation-functions/time-variables',
  ],
},
{
  type: 'category',
  label: 'Aggregate Functions',
  link: {
    type: 'generated-index',
    title: 'Aggregate Functions',
    description: `Use stats functions to perform statistical calculations over your events`,
  },
  items: ['spl-docs/aggregate-functions/agg-functions'],
},
],
},
    'elasticsearch-apis',
    'searching-logs',
    'log-query-builder',
    'dashboards',
    'saved-searches',
    'alerts',
    'minion-searches',
    'cluster-health',
    'retention',
    'oss-vs-enterprise-features',
    'contribution-guidelines',
    'community',
  ],
};

export default sidebars;

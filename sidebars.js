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
      items: [
        'installation/git',
        'installation/binary',
        'installation/docker',
        'installation/helm',
      ],
    },
    {
      type: 'category',
      label: 'Ingestion',
      link: {
        type: 'generated-index',
      },
      items: [
        'ingestion/fluentd-fluentbit',
        'ingestion/vector',
        'ingestion/splunk-hec',
        'ingestion/open-telemetry',
        'ingestion/elastic-search',
        'ingestion/loki'
      ],
    },
    {
      type: 'category',
      label: 'Instrumention for Traces',
      link: {
        type: 'generated-index',
      },
      items: [
        'instrument-traces/java-app',
        'instrument-traces/go-app',
        'instrument-traces/js-app'
      ],
    },
    'logs',
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

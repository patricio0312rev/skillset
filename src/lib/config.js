const TOOLS = {
  'claude-code': {
    name: 'Claude Code',
    folder: '.claude/skills',
    description: 'Skills with native support',
    fileStructure: 'multi-file',
    fileExtension: 'SKILL.md'
  },
  'copilot': {
    name: 'GitHub Copilot (Agent Skills)',
    folder: '.github/skills',
    description: 'Agent Skills for GitHub Copilot',
    fileStructure: 'multi-file',
    fileExtension: 'SKILL.md',
    fallbackFolder: '.claude/skills'
  },
  'cursor': {
    name: 'Cursor',
    folder: '.cursor/rules',
    description: 'Project Rules for Cursor',
    fileStructure: 'multi-file',
    fileExtension: 'RULE.md'
  },
  'other': {
    name: 'Other AI Tools',
    folder: '.claude/skills',
    description: 'Universal skills format',
    fileStructure: 'multi-file',
    fileExtension: 'SKILL.md'
  }
};

const DOMAINS = {
  foundation: {
    name: 'Foundation',
    description: 'Project setup, development environment, and documentation',
    skills: [
      'changelog-writer',
      'code-formatter-installer',
      'codebase-summarizer',
      'conventional-commits',
      'dependency-doctor',
      'dev-environment-bootstrapper',
      'dev-onboarding-builder',
      'docs-starter-kit',
      'eslint-prettier-config',
      'explaining-code',
      'git-hygiene-enforcer',
      'hot-reload-optimizer',
      'jsdoc-typescript-docs',
      'mermaid-diagram-generator',
      'monorepo-setup',
      'pr-template-builder',
      'project-scaffolder',
      'readme-generator',
      'repo-structure-linter',
      'skill-creator',
      'storybook-setup',
      'typescript-strict-migrator',
      'vscode-workspace-setup'
    ]
  },
  frontend: {
    name: 'Frontend',
    description: 'React, UI components, and user experience',
    skills: [
      'accessibility-auditor',
      'animation-micro-interaction-pack',
      'component-scaffold-generator',
      'dark-mode-implementer',
      'design-to-component-translator',
      'form-wizard-builder',
      'framer-motion-animator',
      'frontend-refactor-planner',
      'i18n-frontend-implementer',
      'modal-drawer-system',
      'page-layout-builder',
      'react-hook-builder',
      'react-server-components',
      'responsive-design-system',
      'state-ux-flow-builder',
      'table-builder',
      'tailwind-gradient-builder',
      'tanstack-query-setup',
      'zustand-state-builder'
    ]
  },
  backend: {
    name: 'Backend',
    description: 'APIs, authentication, and server-side logic',
    skills: [
      'api-contract-normalizer',
      'api-docs-generator',
      'api-endpoint-generator',
      'auth-module-builder',
      'background-jobs-designer',
      'caching-strategist',
      'error-handling-standardizer',
      'event-driven-architect',
      'graphql-schema-designer',
      'queue-job-processor',
      'rate-limiting-abuse-protection',
      'rbac-permissions-builder',
      'rest-to-graphql-migrator',
      'service-layer-extractor',
      'webhook-receiver-hardener',
      'websocket-realtime-builder'
    ]
  },
  'ai-engineering': {
    name: 'AI Engineering',
    description: 'LLMs, RAG, agents, and AI systems',
    skills: [
      'agent-orchestration-planner',
      'ai-agent-orchestrator',
      'cost-latency-optimizer',
      'doc-to-vector-dataset-generator',
      'embedding-pipeline-builder',
      'evaluation-harness',
      'guardrails-safety-filter-builder',
      'langchain-workflow-builder',
      'llm-debugger',
      'mcp-server-builder',
      'prompt-regression-tester',
      'prompt-template-builder',
      'rag-pipeline-builder',
      'structured-output-extractor',
      'tool-function-schema-designer',
      'vector-db-setup'
    ]
  },
  architecture: {
    name: 'Architecture',
    description: 'System design, scalability, and technical decisions',
    skills: [
      'adr-writer',
      'api-versioning-deprecation-planner',
      'domain-model-boundaries-mapper',
      'migration-planner',
      'performance-budget-setter',
      'reliability-strategy-builder',
      'rfc-generator',
      'scalability-playbook',
      'system-design-generator',
      'tech-debt-prioritizer'
    ]
  },
  'ci-cd': {
    name: 'CI/CD',
    description: 'Automation, deployments, and release management',
    skills: [
      'artifact-sbom-publisher',
      'caching-strategy-optimizer',
      'deployment-checklist-generator',
      'dockerfile-optimizer',
      'github-actions-pipeline-creator',
      'kubernetes-manifest-generator',
      'monorepo-ci-optimizer',
      'nginx-config-optimizer',
      'preview-environments-builder',
      'quality-gates-enforcer',
      'release-automation-builder',
      'rollback-workflow-builder',
      'secrets-env-manager',
      'terraform-module-builder'
    ]
  },
  'db-management': {
    name: 'Database Management',
    description: 'Migrations, optimization, and data engineering',
    skills: [
      'backup-restore-runbook-generator',
      'data-integrity-auditor',
      'data-retention-archiving-planner',
      'data-seeding-fixtures-builder',
      'db-performance-watchlist',
      'etl-sync-job-builder',
      'multi-tenant-safety-checker',
      'prisma-migration-assistant',
      'schema-consistency-checker',
      'sql-query-optimizer'
    ]
  },
  testing: {
    name: 'Testing',
    description: 'Quality assurance and test coverage',
    skills: [
      'api-docs-generator',
      'api-mock-server',
      'api-test-suite-generator',
      'bruno-collection-generator',
      'contract-testing-builder',
      'coverage-strategist',
      'curl-command-generator',
      'cypress-playwright-setup',
      'e2e-test-builder',
      'flaky-test-detective',
      'insomnia-collection-generator',
      'integration-test-builder',
      'load-test-builder',
      'mocking-assistant',
      'openapi-generator',
      'postman-collection-generator',
      'snapshot-test-refactorer',
      'test-data-factory-builder',
      'test-reporting-triage-skill',
      'unit-test-generator',
      'visual-regression-tester',
      'vscode-rest-client-generator'
    ]
  },
  security: {
    name: 'Security',
    description: 'Security hardening and privacy protection',
    skills: [
      'api-security-hardener',
      'auth-security-reviewer',
      'cors-configuration',
      'dependency-vulnerability-triage',
      'env-secrets-manager',
      'input-validation-sanitization-auditor',
      'oauth2-oidc-implementer',
      'pii-redaction-logging-policy-builder',
      'rbac-policy-tester',
      'secrets-scanner',
      'secure-headers-csp-builder',
      'security-incident-playbook-generator',
      'security-pr-checklist-skill',
      'threat-model-generator'
    ]
  },
  performance: {
    name: 'Performance',
    description: 'Observability, monitoring, and optimization',
    skills: [
      'alerting-dashboard-builder',
      'backend-latency-profiler-helper',
      'caching-cdn-strategy-planner',
      'capacity-planning-helper',
      'core-web-vitals-tuner',
      'incident-runbook-generator',
      'load-test-scenario-builder',
      'observability-setup',
      'postmortem-writer',
      'redis-patterns',
      'structured-logging-standardizer'
    ]
  }
};

module.exports = {
  TOOLS,
  DOMAINS
};

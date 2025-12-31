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
      'dependency-doctor',
      'dev-environment-bootstrapper',
      'dev-onboarding-builder',
      'docs-starter-kit',
      'explaining-code',
      'git-hygiene-enforcer',
      'project-scaffolder',
      'repo-structure-linter'
    ]
  },
  frontend: {
    name: 'Frontend',
    description: 'React, UI components, and user experience',
    skills: [
      'animation-micro-interaction-pack',
      'component-scaffold-generator',
      'design-to-component-translator',
      'form-wizard-builder',
      'frontend-refactor-planner',
      'i18n-frontend-implementer',
      'modal-drawer-system',
      'page-layout-builder',
      'state-ux-flow-builder',
      'table-builder'
    ]
  },
  backend: {
    name: 'Backend',
    description: 'APIs, authentication, and server-side logic',
    skills: [
      'api-contract-normalizer',
      'api-endpoint-generator',
      'auth-module-builder',
      'background-jobs-designer',
      'caching-strategist',
      'error-handling-standardizer',
      'rate-limiting-abuse-protection',
      'rbac-permissions-builder',
      'service-layer-extractor',
      'webhook-receiver-hardener'
    ]
  },
  'ai-engineering': {
    name: 'AI Engineering',
    description: 'LLMs, RAG, agents, and AI systems',
    skills: [
      'agent-orchestration-planner',
      'cost-latency-optimizer',
      'doc-to-vector-dataset-generator',
      'evaluation-harness',
      'guardrails-safety-filter-builder',
      'llm-debugger',
      'prompt-regression-tester',
      'prompt-template-builder',
      'rag-pipeline-builder',
      'tool-function-schema-designer'
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
      'github-actions-pipeline-creator',
      'monorepo-ci-optimizer',
      'preview-environments-builder',
      'quality-gates-enforcer',
      'release-automation-builder',
      'rollback-workflow-builder',
      'secrets-env-manager'
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
      'contract-testing-builder',
      'coverage-strategist',
      'e2e-test-builder',
      'flaky-test-detective',
      'integration-test-builder',
      'mocking-assistant',
      'snapshot-test-refactorer',
      'test-data-factory-builder',
      'test-reporting-triage-skill',
      'unit-test-generator'
    ]
  },
  security: {
    name: 'Security',
    description: 'Security hardening and privacy protection',
    skills: [
      'auth-security-reviewer',
      'dependency-vulnerability-triage',
      'input-validation-sanitization-auditor',
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
      'structured-logging-standardizer'
    ]
  }
};

module.exports = {
  TOOLS,
  DOMAINS
};

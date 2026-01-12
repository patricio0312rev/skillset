# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-01-11

### Added

- **Search command**: `skillset search <query>` to find skills by name
  - Highlights matching text in results
  - `--grouped` flag to organize results by domain
- **List command**: `skillset list` to browse all available skills
  - `--domain <name>` to filter by specific domain
  - `--compact` to show only domain summaries

### Changed

- Updated skill templates to v1.1 from skills repository
- Expanded from 100 to **155 production-ready skills**

### New Skills Added

- **AI Engineering**: `mcp-server-builder`, `vector-db-setup`, `langchain-workflow-builder`, `ai-agent-orchestrator`, `embedding-pipeline-builder`, `structured-output-extractor`
- **Foundation**: `skill-creator`, `monorepo-setup`, `typescript-strict-migrator`, `eslint-prettier-config`, `conventional-commits`, `pr-template-builder`, `storybook-setup`, `vscode-workspace-setup`, `hot-reload-optimizer`, `jsdoc-typescript-docs`, `mermaid-diagram-generator`, `readme-generator`
- **Frontend**: `zustand-state-builder`, `tanstack-query-setup`, `react-server-components`, `accessibility-auditor`, `dark-mode-implementer`, `framer-motion-animator`, `react-hook-builder`, `responsive-design-system`, `tailwind-gradient-builder`
- **Backend**: `websocket-realtime-builder`, `graphql-schema-designer`, `event-driven-architect`, `queue-job-processor`, `api-docs-generator`, `rest-to-graphql-migrator`
- **CI/CD**: `dockerfile-optimizer`, `kubernetes-manifest-generator`, `terraform-module-builder`, `nginx-config-optimizer`
- **Testing**: `cypress-playwright-setup`, `postman-collection-generator`, `load-test-builder`, `visual-regression-tester`, `api-mock-server`, `bruno-collection-generator`, `insomnia-collection-generator`, `curl-command-generator`, `openapi-generator`, `api-test-suite-generator`, `vscode-rest-client-generator`
- **Security**: `oauth2-oidc-implementer`, `cors-configuration`, `api-security-hardener`, `env-secrets-manager`
- **Performance**: `redis-patterns`

## [0.1.3] - 2025-12-31

### Fixed

- Templates naming issue when copying skill files

## [0.1.2] - 2025-12-30

### Fixed

- Remove trailing spaces on path that caused issues on some systems

## [0.1.1] - 2025-12-30

### Fixed

- Add logs for warnings and errors during skill generation
- Include package-lock.json for CI/CD compatibility

## [0.1.0] - 2025-12-30

### Added

- Initial release of SkillSet CLI
- Support for 100+ production-ready development skills
- Interactive CLI for skill selection and import
- Support for Claude Code, Cursor, GitHub Copilot, and other AI tools
- 10 specialized domains: Foundation, Frontend, Backend, AI Engineering, Architecture, CI/CD, Database, Testing, Security, Performance
- Programmatic API for integration with other tools
- Tool-specific folder configurations
- Automatic skill file copying with references and templates
- README generation for imported skills
- Non-interactive mode with command-line flags
- Short alias `ss` for quick access

### Features

- **Claude Code Support**: `.claude/skills/` with automatic loading
- **Cursor Support**: `.cursor/rules/` with @-mention integration
- **GitHub Copilot Support**: `.github/skills/` or `.claude/skills/` for Agent Skills
- **Universal Format**: Works with any AI coding assistant

[0.2.0]: https://github.com/patricio0312rev/skillset/releases/tag/v0.2.0
[0.1.3]: https://github.com/patricio0312rev/skillset/releases/tag/v0.1.3
[0.1.2]: https://github.com/patricio0312rev/skillset/releases/tag/v0.1.2
[0.1.1]: https://github.com/patricio0312rev/skillset/releases/tag/v0.1.1
[0.1.0]: https://github.com/patricio0312rev/skillset/releases/tag/v0.1.0

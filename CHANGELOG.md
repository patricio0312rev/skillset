# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-01

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

[0.1.0]: https://github.com/patricio0312rev/skillset/releases/tag/v0.1.0

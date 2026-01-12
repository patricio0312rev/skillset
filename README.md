# SkillSet 📚

**Import production-ready development skills for Claude Code, Cursor, GitHub Copilot, and other AI coding assistants**

SkillSet is a CLI tool that helps you quickly import and configure development skills from a comprehensive library of 155+ production-ready skills covering every aspect of modern software engineering.

## Features

- **155+ Production-Ready Skills** - From project setup to deployment, security to AI engineering
- **Multi-Tool Support** - Works with Claude Code, Cursor, GitHub Copilot, and more
- **10 Specialized Domains** - Foundation, Frontend, Backend, AI Engineering, Architecture, CI/CD, Database, Testing, Security, Performance
- **Search & Browse** - Find skills by name or browse by domain
- **Interactive CLI** - Easy-to-use interface for selecting and importing skills
- **Programmatic API** - Use SkillSet in your own tools and scripts

## Installation

### Global Installation (Recommended)

```bash
npm install -g @patricio0312rev/skillset
```

### Use with npx (No Installation)

```bash
npx @patricio0312rev/skillset init
```

## Quick Start

Initialize skills in your project:

```bash
skillset init
```

Or use the short alias:

```bash
ss init
```

The interactive CLI will guide you through:

1. **Select your AI tool** - Claude Code, Cursor, GitHub Copilot, or Other
2. **Choose your folder** - Default locations based on your tool
3. **Pick domains** - Select from 10 specialized domains
4. **Select skills** - Choose specific skills from each domain

### Search for Skills

```bash
skillset search api          # Find all API-related skills
skillset search mcp --grouped # Group results by domain
```

### Browse All Skills

```bash
skillset list                    # Show all 155+ skills
skillset list --compact          # Show only domain summaries
skillset list --domain testing   # Filter by domain
```

## Usage Examples

### Interactive Mode (Default)

```bash
skillset init
```

### Non-Interactive Mode

```bash
skillset init \
  --tool claude-code \
  --folder .claude/skills \
  --domains backend,frontend,testing \
  --skills api-endpoint-generator,unit-test-generator
```

### Skip All Prompts

```bash
skillset init \
  --tool cursor \
  --domains backend,testing \
  --skip-prompts
```

## Available Domains

| Domain | Skills | Description |
|--------|--------|-------------|
| 🔧 Foundation | 23 | Project setup, development environment, and documentation |
| 🎨 Frontend | 19 | React, UI components, and user experience |
| ⚙️ Backend | 16 | APIs, authentication, and server-side logic |
| 🤖 AI Engineering | 16 | LLMs, RAG, agents, and AI systems |
| 🏗️ Architecture | 10 | System design, scalability, and technical decisions |
| 🔄 CI/CD | 14 | Automation, deployments, and release management |
| 💾 Database Management | 10 | Migrations, optimization, and data engineering |
| 🧪 Testing | 22 | Quality assurance and test coverage |
| 🔒 Security | 14 | Security hardening and privacy protection |
| 📊 Performance | 11 | Observability, monitoring, and optimization |

## Tool-Specific Configurations

### Claude Code
- **Folder**: `.claude/skills/`
- **Format**: `SKILL.md` with YAML frontmatter
- **Usage**: Skills are automatically loaded

### Cursor
- **Folder**: `.cursor/rules/`
- **Format**: `RULE.md`
- **Usage**: Use @-mentions to reference skills

### GitHub Copilot (Agent Skills)
- **Folder**: `.github/skills/` (also supports `.claude/skills/`)
- **Format**: `SKILL.md` with YAML frontmatter
- **Usage**: Automatically recognized by Copilot

### Other Tools
- **Folder**: `.claude/skills/`
- **Format**: Universal `SKILL.md` format
- **Usage**: Upload or reference in your AI tool

## Programmatic API

Use SkillSet in your own tools:

```javascript
const skillset = require('@patricio0312rev/skillset');

// Generate skills configuration
const result = await skillset.generate({
  tool: 'claude-code',
  folder: '.claude/skills',
  domains: ['backend', 'frontend'],
  skills: ['api-endpoint-generator', 'unit-test-generator']
});

console.log(`Generated ${result.skillsGenerated} skills`);

// Get available domains
const domains = skillset.getDomains();
console.log(Object.keys(domains));

// Get skills for a specific domain
const backendSkills = skillset.getSkillsForDomain('backend');
console.log(backendSkills);
```

## CLI Commands

```bash
# Initialize skills in your project
skillset init [options]
  -t, --tool <tool>        AI tool (claude-code, cursor, copilot, other)
  -f, --folder <name>      Custom folder name
  -d, --domains <list>     Comma-separated list of domains
  --skills <list>          Comma-separated list of specific skills
  --skip-prompts           Skip all interactive prompts (requires all flags)

# Search for skills by name
skillset search <query> [options]
  -g, --grouped            Group results by domain

# List all available skills
skillset list [options]
  -d, --domain <name>      Filter by domain
  -c, --compact            Show only domain names

# General options
  -h, --help               Display help for command
  -V, --version            Output the version number
```

## Contributing

Contributions are welcome! Please check out the [contribution guidelines](https://github.com/patricio0312rev/skillset/blob/main/CONTRIBUTING.md).

## Related Projects

- [Skills Collection](https://github.com/patricio0312rev/skills) - The complete library of 155+ skills
- [AgentKit](https://github.com/patricio0312rev/agentkit) - Scaffold AI agent configurations

## License

MIT License - See [LICENSE](LICENSE) for details

## Author

**Patricio Marroquin**
- Website: [patriciomarroquin.dev](https://www.patriciomarroquin.dev)
- GitHub: [@patricio0312rev](https://github.com/patricio0312rev)

---

Made with 💜 by [Patricio Marroquin](https://www.patriciomarroquin.dev)

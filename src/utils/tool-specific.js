const fs = require('fs-extra');
const path = require('path');
const { TOOLS } = require('../lib/config');

/**
 * Generate tool-specific configuration files
 * @param {Object} config - Configuration object
 * @param {string} targetDir - Target directory path
 * @param {Array} skillsList - List of generated skills
 * @returns {Promise<Array>} Array of created file paths
 */
async function generateToolSpecificFiles(config, targetDir, skillsList) {
  const files = [];

  switch (config.tool) {
    case 'cursor':
      const cursorFiles = await generateCursorFiles(config, targetDir, skillsList);
      files.push(...cursorFiles);
      break;

    case 'copilot':
      const copilotFiles = await generateCopilotFiles(config, targetDir, skillsList);
      files.push(...copilotFiles);
      break;

    case 'claude-code':
    case 'other':
      // These use the multi-file structure as-is
      const indexFile = await generateIndexFile(config, targetDir, skillsList);
      if (indexFile) files.push(indexFile);
      break;
  }

  return files;
}

/**
 * Generate Cursor-specific files
 */
async function generateCursorFiles(config, targetDir, skillsList) {
  const files = [];

  // Create usage instructions file inside the target directory
  const instructionsPath = path.join(targetDir, 'CURSOR_USAGE.md');
  const instructions = generateCursorInstructions(config, skillsList);
  await fs.writeFile(instructionsPath, instructions);
  files.push(instructionsPath);

  return files;
}

/**
 * Generate GitHub Copilot configuration
 */
async function generateCopilotFiles(config, targetDir, skillsList) {
  const files = [];

  // Create usage instructions
  const instructionsPath = path.join(targetDir, 'COPILOT_USAGE.md');
  const instructions = generateCopilotInstructions(config, skillsList);
  await fs.writeFile(instructionsPath, instructions);
  files.push(instructionsPath);

  return files;
}

/**
 * Generate index file listing all skills
 */
async function generateIndexFile(config, targetDir, skillsList) {
  const content = `# Development Skills Index

## Available Skills

${skillsList.map(({ domain, skill }) => {
    return `- **${skill}** (${domain}) - [View](${skill}/${TOOLS[config.tool].fileExtension})`;
  }).join('\n')}

## Quick Reference

${generateQuickReference(skillsList)}
`;

  const indexPath = path.join(targetDir, 'INDEX.md');
  await fs.writeFile(indexPath, content);
  return indexPath;
}

function generateQuickReference(skillsList) {
  const byDomain = {};
  skillsList.forEach(({ domain, skill }) => {
    if (!byDomain[domain]) byDomain[domain] = [];
    byDomain[domain].push(skill);
  });

  return Object.entries(byDomain).map(([domain, skills]) => {
    return `### ${domain}\n${skills.map(s => `- ${s}`).join('\n')}`;
  }).join('\n\n');
}

/**
 * Generate Cursor usage instructions
 */
function generateCursorInstructions(config, skillsList) {
  return `# Using Development Skills with Cursor

## Setup Complete

Your development skills are configured and ready to use.

## How to Use

### 1. @-Mentions (Primary Method)

The most powerful way to use skills in Cursor:

\`\`\`
@${config.folder}/api-endpoint-generator/RULE.md

Create a REST API for user management with:
- Authentication
- CRUD operations
- Rate limiting
\`\`\`

### 2. Multiple Skills

Combine multiple skills for complex tasks:

\`\`\`
@${config.folder}/api-endpoint-generator/RULE.md
@${config.folder}/unit-test-generator/RULE.md

Create and test a payment processing API
\`\`\`

### 3. In Composer

Use skills in Cursor's Composer mode for multi-file changes:

1. Open Composer (Cmd/Ctrl + I)
2. Add skill with @-mention
3. Describe your task
4. Cursor will apply changes across files

## Tips

- **Specific Skills**: Use the most relevant skill for your task
- **Combine Skills**: Multiple skills can collaborate on complex tasks
- **Context**: Skills have access to your codebase context
- **Iterations**: Refine results by providing feedback

## Available Skills

${skillsList.map(({ domain, skill }) => `- **${skill}** (${domain})`).join('\n')}

## Troubleshooting

**Skills not appearing in @-mentions?**
- Ensure files are in \`${config.folder}/\` directory
- Restart Cursor
- Check Cursor settings for custom rule paths

**Need different skills?**
Run: \`skillset init\` to reconfigure

---

Happy coding with development skills!
`;
}

/**
 * Generate GitHub Copilot instructions
 */
function generateCopilotInstructions(config, skillsList) {
  return `# GitHub Copilot - Development Skills

This project uses specialized development skills for different aspects of engineering.

## Agent Skills

GitHub Copilot automatically recognizes and uses Agent Skills in this directory.

${skillsList.map(({ domain, skill }) => {
    return `### ${skill} (${domain})

Specialized skill for ${domain} tasks. See detailed instructions in \`${config.folder}/${skill}/SKILL.md\`
`;
  }).join('\n')}

## General Development Guidelines

When working on this project, follow these principles:

### Code Quality
- Write clean, maintainable code
- Follow existing patterns in the codebase
- Add appropriate comments for complex logic
- Ensure code is self-documenting where possible

### Testing
- Write tests for new features
- Maintain high test coverage
- Include edge cases in tests
- Follow testing patterns established in the project

### Documentation
- Update documentation when adding features
- Keep README files current
- Document API changes
- Add inline documentation for public APIs

## Getting Skill Details

For specific guidance on any aspect of development, refer to the detailed skill files:

\`\`\`
${config.folder}/
${skillsList.map(({ domain, skill }) => `  ${skill}/SKILL.md`).join('\n')}
\`\`\`

---

*Generated by SkillSet - https://github.com/patricio0312rev/skillset*
`;
}

module.exports = {
  generateToolSpecificFiles,
  generateCursorFiles,
  generateCopilotFiles
};

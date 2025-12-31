const fs = require("fs-extra");
const path = require("path");
const { TOOLS, DOMAINS } = require("./config");
const { generateReadme } = require("../utils/readme");
const { generateToolSpecificFiles } = require("../utils/tool-specific");

/**
 * Main generator function that creates skill configuration
 * @param {Object} config - Configuration object
 * @returns {Promise<Object>} Generation result
 */
async function generateSkills(config) {
  const targetDir = path.join(process.cwd(), config.folder);
  const result = {
    success: false,
    targetDir,
    skillsGenerated: 0,
    filesCreated: [],
    errors: [],
  };

  try {
    // Ensure target directory exists
    await fs.ensureDir(targetDir);

    // Generate domain folders and skill files
    const skillResult = await generateDomainSkills(config, targetDir);
    result.skillsGenerated = skillResult.count;
    result.filesCreated.push(...skillResult.files);

    // Generate README
    const readmePath = path.join(targetDir, "README.md");
    const readmeContent = generateReadme(config, result);
    await fs.writeFile(readmePath, readmeContent);
    result.filesCreated.push(readmePath);

    // Generate tool-specific files
    const toolFiles = await generateToolSpecificFiles(
      config,
      targetDir,
      skillResult.skillsList
    );
    result.filesCreated.push(...toolFiles);

    result.success = true;
    return result;
  } catch (error) {
    result.errors.push(error.message);
    throw error;
  }
}

/**
 * Generate domain folders and copy skill files
 * @param {Object} config - Configuration object
 * @param {string} targetDir - Target directory path
 * @returns {Promise<Object>} Result with count and file list
 */
async function generateDomainSkills(config, targetDir) {
  let count = 0;
  const files = [];
  const skillsList = [];

  for (const domain of config.domains) {
    const domainInfo = DOMAINS[domain];
    if (!domainInfo) continue;

    // Determine which skills to generate
    let skillsToGenerate = domainInfo.skills;

    // Filter if specific skills were selected
    if (config.skills && config.skills.length > 0) {
      skillsToGenerate = skillsToGenerate.filter((skill) => {
        // Support both "skill-name" and "domain/skill-name" formats
        return (
          config.skills.includes(skill) ||
          config.skills.includes(`${domain}/${skill}`)
        );
      });
    }

    // Copy/generate each skill file directly in target directory
    for (const skill of skillsToGenerate) {
      const skillFile = await generateSkillFile(domain, skill, targetDir, config);
      if (skillFile) {
        files.push(skillFile);
        skillsList.push({ domain, skill, file: skillFile });
        count++;
      }
    }
  }

  return { count, files, skillsList };
}

/**
 * Generate or copy an individual skill file
 * @param {string} domain - Domain name
 * @param {string} skill - Skill name
 * @param {string} domainDir - Domain directory path
 * @param {Object} config - Configuration object
 * @returns {Promise<string|null>} Path to created file or null
 */
async function generateSkillFile(domain, skill, domainDir, config) {
  const toolInfo = TOOLS[config.tool];
  const fileExtension = toolInfo.fileExtension || 'SKILL.md';

  // Source file in templates (always SKILL.md)
  const sourceDir = path.join(
    __dirname,
    "../../templates",
    domain,
    skill
  );

  let sourceFile = path.join(sourceDir, "SKILL.md");

  if (!await fs.pathExists(sourceFile)) {
    sourceFile = path.join(sourceDir, " SKILL.md");
  }

  // Target file with appropriate extension
  const targetSkillDir = path.join(domainDir, skill);
  const targetFile = path.join(targetSkillDir, fileExtension);

  try {
    // Ensure target skill directory exists
    await fs.ensureDir(targetSkillDir);

    // Check if template exists
    const templateExists = await fs.pathExists(sourceFile);

    if (templateExists) {
      let content = await fs.readFile(sourceFile, "utf8");

      // Process content based on tool (e.g., rename SKILL.md to RULE.md for Cursor)
      if (config.tool === 'cursor') {
        // For Cursor, change the filename reference in frontmatter if needed
        content = content.replace(/SKILL\.md/g, 'RULE.md');
      }

      await fs.writeFile(targetFile, content);

      // Copy references and other folders if they exist
      const referencesDir = path.join(sourceDir, "references");
      if (await fs.pathExists(referencesDir)) {
        const targetReferencesDir = path.join(targetSkillDir, "references");
        await fs.copy(referencesDir, targetReferencesDir);
      }

      // Copy templates folder if it exists
      const templatesDir = path.join(sourceDir, "templates");
      if (await fs.pathExists(templatesDir)) {
        const targetTemplatesDir = path.join(targetSkillDir, "templates");
        await fs.copy(templatesDir, targetTemplatesDir);
      }

      return targetFile;
    } else {
      console.warn(`⚠️  Warning: Template not found for ${domain}/${skill}`);
      console.warn(`    Expected at: ${sourceFile}`);
      console.warn(`    Creating placeholder skill file...`);

      // Create a basic placeholder so the folder isn't empty
      const placeholderContent = `# ${skill}\n\nThis skill template is not yet available.\n\nDomain: ${domain}`;
      await fs.writeFile(targetFile, placeholderContent);
      console.log(`  ✓ Created placeholder file: ${targetFile}`);

      return targetFile;
    }
  } catch (error) {
    console.error(`❌ Error generating skill ${skill}:`, error.message);
    console.error(`   Source: ${sourceFile}`);
    console.error(`   Target: ${targetFile}`);
    console.error(`   Full error:`, error);
    return null;
  }
}

module.exports = {
  generateSkills,
  generateDomainSkills,
  generateSkillFile,
};

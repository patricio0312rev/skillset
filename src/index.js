/**
 * SkillSet - Programmatic API
 *
 * This module exports the main functions for use by:
 * - CLI (this package)
 * - VSCode Extension
 * - Other integrations
 */

const { generateSkills } = require('./lib/generator');
const { TOOLS, DOMAINS } = require('./lib/config');

/**
 * Generate development skills configuration programmatically
 * @param {Object} config - Configuration object
 * @param {string} config.tool - AI tool (claude-code, cursor, copilot, other)
 * @param {string} config.folder - Target folder name
 * @param {string[]} config.domains - List of domains to include
 * @param {string[]} [config.skills] - Optional: specific skills to include
 * @returns {Promise<Object>} Result object with success status and details
 *
 * @example
 * const skillset = require('@patricio0312rev/skillset');
 *
 * const result = await skillset.generate({
 *   tool: 'claude-code',
 *   folder: '.claude/skills',
 *   domains: ['backend', 'frontend', 'testing'],
 *   skills: ['api-endpoint-generator', 'unit-test-generator']
 * });
 *
 * console.log(`Generated ${result.skillsGenerated} skills`);
 */
async function generate(config) {
  // Validate config
  const validation = validateConfig(config);
  if (!validation.isValid) {
    throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
  }

  return await generateSkills(config);
}

/**
 * Get list of available tools
 * @returns {Object} Tools configuration
 *
 * @example
 * const tools = skillset.getTools();
 * console.log(Object.keys(tools)); // ['claude-code', 'cursor', 'copilot', 'other']
 */
function getTools() {
  return { ...TOOLS };
}

/**
 * Get list of available domains
 * @returns {Object} Domains configuration
 *
 * @example
 * const domains = skillset.getDomains();
 * console.log(domains.backend.skills); // ['api-endpoint-generator', ...]
 */
function getDomains() {
  return { ...DOMAINS };
}

/**
 * Get skills for a specific domain
 * @param {string} domain - Domain name
 * @returns {string[]} List of skill names
 *
 * @example
 * const skills = skillset.getSkillsForDomain('backend');
 * console.log(skills); // ['api-endpoint-generator', 'auth-module-builder', ...]
 */
function getSkillsForDomain(domain) {
  return DOMAINS[domain]?.skills || [];
}

/**
 * Get all available skills across all domains
 * @returns {Object} Object with domain as key and skills array as value
 *
 * @example
 * const allSkills = skillset.getAllSkills();
 * console.log(allSkills.backend); // ['api-endpoint-generator', ...]
 */
function getAllSkills() {
  const result = {};
  Object.entries(DOMAINS).forEach(([domain, info]) => {
    result[domain] = [...info.skills];
  });
  return result;
}

/**
 * Validate configuration
 * @param {Object} config - Configuration to validate
 * @returns {Object} Validation result with isValid and errors
 *
 * @example
 * const validation = skillset.validateConfig({
 *   tool: 'claude-code',
 *   folder: '.claude/skills',
 *   domains: ['backend']
 * });
 *
 * if (!validation.isValid) {
 *   console.error(validation.errors);
 * }
 */
function validateConfig(config) {
  const errors = [];

  // Validate tool
  if (!config.tool) {
    errors.push('Tool is required');
  } else if (!TOOLS[config.tool]) {
    errors.push(`Invalid tool: ${config.tool}. Valid options: ${Object.keys(TOOLS).join(', ')}`);
  }

  // Validate folder
  if (!config.folder) {
    errors.push('Folder is required');
  } else if (typeof config.folder !== 'string') {
    errors.push('Folder must be a string');
  } else if (config.folder.includes(' ')) {
    errors.push('Folder name cannot contain spaces');
  }

  // Validate domains
  if (!config.domains) {
    errors.push('Domains are required');
  } else if (!Array.isArray(config.domains)) {
    errors.push('Domains must be an array');
  } else if (config.domains.length === 0) {
    errors.push('At least one domain is required');
  } else {
    config.domains.forEach(domain => {
      if (!DOMAINS[domain]) {
        errors.push(`Invalid domain: ${domain}. Valid options: ${Object.keys(DOMAINS).join(', ')}`);
      }
    });
  }

  // Validate skills if provided
  if (config.skills && !Array.isArray(config.skills)) {
    errors.push('Skills must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Export all functions
module.exports = {
  generate,
  getTools,
  getDomains,
  getSkillsForDomain,
  getAllSkills,
  validateConfig,
  TOOLS,
  DOMAINS
};

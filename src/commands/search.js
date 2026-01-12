const chalk = require("chalk");
const { DOMAINS } = require("../lib/config");

/**
 * Search for skills by name
 * @param {string} query - Search query
 * @param {Object} options - Command options
 */
function searchCommand(query, options) {
  if (!query || query.trim().length === 0) {
    console.log(chalk.yellow("\nPlease provide a search term.\n"));
    console.log(chalk.dim("Usage: skillset search <query>"));
    console.log(chalk.dim("Example: skillset search api\n"));
    return;
  }

  const searchTerm = query.toLowerCase().trim();
  const results = [];

  for (const [domainKey, domainInfo] of Object.entries(DOMAINS)) {
    for (const skill of domainInfo.skills) {
      if (skill.toLowerCase().includes(searchTerm)) {
        results.push({
          skill,
          domain: domainKey,
          domainName: domainInfo.name,
        });
      }
    }
  }

  if (results.length === 0) {
    console.log(chalk.yellow(`\nNo skills found matching "${query}"\n`));
    console.log(chalk.dim("Try a different search term or run 'skillset list' to see all skills.\n"));
    return;
  }

  console.log(chalk.cyan(`\n🔍 Found ${results.length} skill${results.length > 1 ? "s" : ""} matching "${query}":\n`));

  if (options.grouped) {
    const grouped = {};
    for (const result of results) {
      if (!grouped[result.domain]) {
        grouped[result.domain] = {
          name: result.domainName,
          skills: [],
        };
      }
      grouped[result.domain].skills.push(result.skill);
    }

    for (const [_domain, info] of Object.entries(grouped)) {
      console.log(chalk.bold.blue(`  ${info.name}`));
      for (const skill of info.skills) {
        const highlighted = highlightMatch(skill, searchTerm);
        console.log(`    ${chalk.dim("•")} ${highlighted}`);
      }
      console.log();
    }
  } else {
    for (const result of results) {
      const highlighted = highlightMatch(result.skill, searchTerm);
      const domainTag = chalk.dim(`[${result.domainName}]`);
      console.log(`  ${chalk.dim("•")} ${highlighted} ${domainTag}`);
    }
    console.log();
  }

  console.log(chalk.dim(`💡 Run 'skillset init' to install these skills\n`));
}

/**
 * Highlight matching portion of skill name
 * @param {string} skill - Skill name
 * @param {string} term - Search term
 * @returns {string} Highlighted string
 */
function highlightMatch(skill, term) {
  const index = skill.toLowerCase().indexOf(term);
  if (index === -1) return skill;

  const before = skill.slice(0, index);
  const match = skill.slice(index, index + term.length);
  const after = skill.slice(index + term.length);

  return before + chalk.yellow.bold(match) + after;
}

module.exports = searchCommand;

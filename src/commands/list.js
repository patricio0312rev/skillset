const chalk = require("chalk");
const { DOMAINS } = require("../lib/config");

/**
 * List all available skills
 * @param {Object} options - Command options
 */
function listCommand(options) {
  const totalSkills = Object.values(DOMAINS).reduce(
    (sum, domain) => sum + domain.skills.length,
    0
  );

  console.log(chalk.cyan(`\n📚 Available Skills (${totalSkills} total)\n`));

  const domainsToShow = options.domain
    ? { [options.domain]: DOMAINS[options.domain] }
    : DOMAINS;

  if (options.domain && !DOMAINS[options.domain]) {
    console.log(chalk.red(`Unknown domain: ${options.domain}\n`));
    console.log(chalk.dim("Available domains:"));
    for (const key of Object.keys(DOMAINS)) {
      console.log(chalk.dim(`  • ${key}`));
    }
    console.log();
    return;
  }

  for (const [_domainKey, domainInfo] of Object.entries(domainsToShow)) {
    const skillCount = domainInfo.skills.length;
    console.log(
      chalk.bold.blue(`  ${domainInfo.name}`) +
        chalk.dim(` (${skillCount} skills)`) +
        chalk.gray(` - ${domainInfo.description}`)
    );

    if (!options.compact) {
      for (const skill of domainInfo.skills) {
        console.log(`    ${chalk.dim("•")} ${skill}`);
      }
      console.log();
    }
  }

  if (options.compact) {
    console.log();
  }

  console.log(chalk.dim("💡 Tips:"));
  console.log(chalk.dim("   • Run 'skillset search <query>' to filter skills"));
  console.log(chalk.dim("   • Run 'skillset list --domain <name>' to filter by domain"));
  console.log(chalk.dim("   • Run 'skillset init' to install skills\n"));
}

module.exports = listCommand;

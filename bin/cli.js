#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const packageJson = require("../package.json");
const { displayBanner } = require("../src/utils/display");
const initCommand = require("../src/commands/init");
const searchCommand = require("../src/commands/search");
const listCommand = require("../src/commands/list");

// Display banner
displayBanner();

program
  .name("skillset")
  .description(
    "Import production-ready development skills for Claude Code, Cursor, Copilot, and more"
  )
  .version(packageJson.version);

program
  .command("init")
  .description("Initialize development skills in current directory")
  .option(
    "-t, --tool <tool>",
    "AI tool (claude-code, cursor, copilot, other)"
  )
  .option("-f, --folder <name>", "Custom folder name")
  .option("-d, --domains <list>", "Comma-separated list of domains")
  .option("--skills <list>", "Comma-separated list of specific skills")
  .option("--skip-prompts", "Skip all interactive prompts (requires all flags)")
  .action(initCommand);

program
  .command("search <query>")
  .description("Search for skills by name")
  .option("-g, --grouped", "Group results by domain")
  .action(searchCommand);

program
  .command("list")
  .description("List all available skills")
  .option("-d, --domain <name>", "Filter by domain")
  .option("-c, --compact", "Show only domain names, not individual skills")
  .action(listCommand);

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

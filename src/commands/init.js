const inquirer = require("inquirer");
const chalk = require("chalk");
const ora = require("ora");
const { generateSkills } = require("../lib/generator");
const { TOOLS, DOMAINS } = require("../lib/config");
const { displayError, displayBox } = require("../utils/display");

async function initCommand(options) {
  console.log(chalk.cyan("\n📚 Let's import your development skills!\n"));

  try {
    let config = {};

    // Check if all required options provided (non-interactive mode)
    if (options.skipPrompts) {
      if (!options.tool || !options.domains) {
        displayError("--skip-prompts requires --tool and --domains flags");
        process.exit(1);
      }
      config = buildConfigFromFlags(options);
    } else {
      // Interactive mode
      config = await promptUser(options);
    }

    // Validate configuration
    const validation = validateConfiguration(config);
    if (!validation.isValid) {
      displayError("Configuration validation failed:");
      validation.errors.forEach((err) => console.log(chalk.red(`  • ${err}`)));
      process.exit(1);
    }

    // Generate the configuration
    await generateConfiguration(config);
  } catch (error) {
    displayError(`Failed to initialize: ${error.message}`);
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

function buildConfigFromFlags(options) {
  return {
    tool: options.tool,
    folder: options.folder || TOOLS[options.tool]?.folder || ".claude/skills",
    domains: options.domains.split(",").map((d) => d.trim()),
    skills: options.skills
      ? options.skills.split(",").map((s) => s.trim())
      : [],
  };
}

async function promptUser(options) {
  const answers = {};

  // Step 1: Select AI tool
  if (!options.tool) {
    const toolChoices = Object.entries(TOOLS).map(([key, value]) => ({
      name: `${chalk.bold(value.name)} ${chalk.dim("→")} ${chalk.gray(value.description)}`,
      value: key,
      short: value.name,
    }));

    const toolAnswer = await inquirer.prompt([
      {
        type: "list",
        name: "tool",
        message: "Which AI tool are you using?",
        choices: toolChoices,
        default: "claude-code",
      },
    ]);
    answers.tool = toolAnswer.tool;
  } else {
    answers.tool = options.tool;
  }

  // Step 2: Custom folder name
  const defaultFolder = TOOLS[answers.tool].folder;
  if (!options.folder) {
    const folderAnswer = await inquirer.prompt([
      {
        type: "input",
        name: "folder",
        message: "Folder name for skills:",
        default: defaultFolder,
        validate: (input) => {
          if (!input.trim()) return "Folder name cannot be empty";
          if (input.includes(" ")) return "Folder name cannot contain spaces";
          if (input.includes("\\"))
            return "Folder name cannot contain backslashes";
          return true;
        },
      },
    ]);
    answers.folder = folderAnswer.folder;
  } else {
    answers.folder = options.folder;
  }

  // Step 3: Select domains
  if (!options.domains) {
    const domainChoices = Object.entries(DOMAINS).map(([key, value]) => ({
      name: `${chalk.bold(value.name)} ${chalk.dim(`(${value.skills.length} skills)`)} ${chalk.gray("→ " + value.description)}`,
      value: key,
      short: value.name,
      checked: ["foundation"].includes(key), // Default selections
    }));

    const domainAnswer = await inquirer.prompt([
      {
        type: "checkbox",
        name: "domains",
        message: "Select domains to include:",
        choices: domainChoices,
        pageSize: 12,
        validate: (input) => {
          if (input.length === 0)
            return "Please select at least one domain";
          return true;
        },
      },
    ]);
    answers.domains = domainAnswer.domains;
  } else {
    answers.domains = options.domains.split(",").map((d) => d.trim());
  }

  // Step 4: Select specific skills per domain
  answers.skills = [];

  if (!options.skills) {
    console.log(chalk.cyan("\n📋 Select skills for each domain:\n"));

    for (const domain of answers.domains) {
      const domainInfo = DOMAINS[domain];

      const skillChoices = domainInfo.skills.map((skill) => ({
        name: skill,
        value: `${domain}/${skill}`,
        checked: true, // All selected by default
      }));

      const skillAnswer = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedSkills",
          message: `${chalk.bold(domainInfo.name)} skills:`,
          choices: skillChoices,
          pageSize: 15,
          validate: (input) => {
            if (input.length === 0) {
              return `Please select at least one skill from ${domainInfo.name} (or deselect the domain)`;
            }
            return true;
          },
        },
      ]);

      answers.skills.push(...skillAnswer.selectedSkills);
    }
  } else {
    answers.skills = options.skills.split(",").map((s) => s.trim());
  }

  // Count total skills selected
  const totalSkills = answers.skills.length;
  console.log(
    chalk.dim(`\n  → Total skills selected: ${chalk.bold(totalSkills)}\n`)
  );

  return answers;
}

function validateConfiguration(config) {
  const errors = [];

  // Validate tool
  if (!config.tool || !TOOLS[config.tool]) {
    errors.push(
      `Invalid tool: ${config.tool}. Valid options: ${Object.keys(TOOLS).join(", ")}`
    );
  }

  // Validate folder
  if (!config.folder || typeof config.folder !== "string") {
    errors.push("Folder name is required and must be a string");
  }

  // Validate domains
  if (
    !config.domains ||
    !Array.isArray(config.domains) ||
    config.domains.length === 0
  ) {
    errors.push("At least one domain is required");
  }

  config.domains?.forEach((domain) => {
    if (!DOMAINS[domain]) {
      errors.push(
        `Invalid domain: ${domain}. Valid options: ${Object.keys(DOMAINS).join(", ")}`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

async function generateConfiguration(config) {
  const spinner = ora("Generating skills configuration...").start();

  try {
    const result = await generateSkills(config);

    spinner.succeed(chalk.green("✓ Configuration generated successfully!"));

    // Display results
    displayResults(config, result);
  } catch (error) {
    spinner.fail(chalk.red("Failed to generate configuration"));
    throw error;
  }
}

function displayResults(config, result) {
  const tool = TOOLS[config.tool];

  // Format file location with proper coloring
  const locationLine = `Location: ${chalk.yellow(config.folder + "/")}`;
  const toolLine = `Tool: ${chalk.cyan(tool.name)}`;
  const domainLine = `Domains: ${config.domains.length}`;
  const skillsLine = `Skills: ${result.skillsGenerated || 0}`;

  displayBox(
    "📁 Generated Files",
    `${locationLine}\n${toolLine}\n${domainLine}\n${skillsLine}`
  );

  displayBox("📚 Usage Instructions", getUsageInstructions(config.tool, config.folder));

  const step1 = `1. Review files in ${chalk.yellow(config.folder + "/")}`;
  const step2 = `2. Read ${chalk.yellow(config.folder + "/README.md")}`;
  const step3 = `3. ${getToolSpecificNextStep(config.tool)}`;
  const step4 = `4. Commit to version control to share with team`;

  displayBox("🚀 Next Steps", `${step1}\n${step2}\n${step3}\n${step4}`);

  console.log(
    chalk.dim("💡 Tip: Run ") +
      chalk.cyan("skillset init") +
      chalk.dim(" again to regenerate\n")
  );
}

function getUsageInstructions(tool, folder) {
  const instructions = {
    "claude-code":
      `With Claude Code:\n` +
      `Skills are automatically loaded from \`${folder}/\`\n` +
      `Reference them naturally in your prompts:\n` +
      chalk.gray("  \"Use the api-endpoint-generator skill...\""),

    cursor:
      `With Cursor:\n` +
      `1. Use @-mentions in chat:\n` +
      chalk.gray(`     @${folder}/api-endpoint-generator/RULE.md\n`) +
      `2. Or reference in prompts naturally`,

    copilot:
      `With GitHub Copilot:\n` +
      `Skills in \`${folder}/\` are automatically recognized\n` +
      `Copilot will use them for code suggestions`,

    other:
      `With any AI tool:\n` +
      `Upload relevant skill files to your AI chat\n` +
      `and reference them in your prompts.`,
  };

  return instructions[tool] || instructions.other;
}

function getToolSpecificNextStep(tool) {
  const steps = {
    "claude-code": "Start coding - Skills are automatically available",
    cursor: "Open Cursor and use @-mentions to reference skills",
    copilot: "Start coding - Copilot will use the skills automatically",
    other: "Open your AI tool and upload the skill files",
  };

  return steps[tool] || steps.other;
}

module.exports = initCommand;

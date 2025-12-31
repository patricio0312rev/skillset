const chalk = require("chalk");

function displayBanner() {
  const version = require("../../package.json").version;
  console.log(
    chalk.cyan(
      "\n" +
        "  ╔═══════════════════════════════════════════╗\n" +
        "  ║                                           ║\n" +
        "  ║      📚  SkillSet CLI v" +
        version.padEnd(19) +
        "║\n" +
        "  ║                                           ║\n" +
        "  ║     Import development skills for         ║\n" +
        "  ║     Claude Code, Cursor, Copilot & more   ║\n" +
        "  ║                                           ║\n" +
        "  ╚═══════════════════════════════════════════╝\n"
    )
  );
}

function displaySuccess(message) {
  console.log(chalk.green(`\n✓ ${message}\n`));
}

function displayError(message) {
  console.log(chalk.red(`\n✗ ${message}\n`));
}

function displayWarning(message) {
  console.log(chalk.yellow(`\n⚠ ${message}\n`));
}

function displayInfo(message) {
  console.log(chalk.blue(`\nℹ ${message}\n`));
}

/**
 * Display content in a nice box with consistent formatting
 * @param {string} title - Box title
 * @param {string} content - Box content
 */
function displayBox(title, content) {
  const lines = content.split("\n");

  // Calculate max width needed
  const contentWidth = Math.max(
    ...lines.map((line) => stripAnsi(line).length),
    stripAnsi(title).length
  );

  // Set minimum and maximum width
  const minWidth = 50;
  const maxWidth = 80;
  const width = Math.min(Math.max(contentWidth, minWidth), maxWidth);

  // Top border
  console.log(chalk.cyan("┌" + "─".repeat(width + 2) + "┐"));

  // Title
  const titlePadded = title + " ".repeat(width - stripAnsi(title).length);
  console.log(chalk.cyan("│ ") + chalk.bold(titlePadded) + chalk.cyan(" │"));

  // Separator
  console.log(chalk.cyan("├" + "─".repeat(width + 2) + "┤"));

  // Content lines
  lines.forEach((line) => {
    const lineLength = stripAnsi(line).length;
    const padding = " ".repeat(width - lineLength);
    console.log(chalk.cyan("│ ") + line + padding + chalk.cyan(" │"));
  });

  // Bottom border
  console.log(chalk.cyan("└" + "─".repeat(width + 2) + "┘\n"));
}

/**
 * Strip ANSI color codes to get actual string length
 * @param {string} str - String with potential ANSI codes
 * @returns {string} Clean string
 */
function stripAnsi(str) {
  // eslint-disable-next-line no-control-regex
  return str.replace(/\x1B\[\d+m/g, "");
}

module.exports = {
  displayBanner,
  displaySuccess,
  displayError,
  displayWarning,
  displayInfo,
  displayBox,
};

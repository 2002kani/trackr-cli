import chalk from "chalk";
import inquirer from "inquirer";
import { setPrompt, setReturnMode } from "../utils/state.js";
import { showHeader } from "../header.js";
import { mainMenu } from "../index.js";

const truncateStr = (str, maxLength) => {
  if (!str) return "";
  return str.length > maxLength ? str.substring(0, maxLength - 3) + "..." : str;
};

const INQUIRER_OFFSET = "  ";

export async function showTickets(tickets) {
  setReturnMode(true);
  console.clear();
  console.log(chalk.bgGray("Press 'ESC' to cancel and return to menu.\n"));

  if (tickets.length === 0) {
    console.log("\n No Tickets created yet.. :-( \n");
    return await mainMenu();
  }

  const maxIdLen = Math.max(...tickets.map((t) => String(t.id).length), 2);
  const maxTitleLen = 30;
  const maxCostLen = Math.max(...tickets.map((t) => String(t.cost).length), 4);
  const maxComplexityLen = Math.max(
    ...tickets.map((t) => String(t.complexity).length),
    10
  );
  const maxUrgencyLen = Math.max(
    ...tickets.map((t) => String(t.urgency).length),
    8
  );

  const pad = (str, len) => str.toString().padEnd(len, " ");

  const header =
    pad(chalk.bold("ID"), maxIdLen) +
    " || " +
    pad(chalk.bold("Title"), 39) +
    " || " +
    pad(chalk.bold("Cost"), maxCostLen) +
    " || " +
    pad(chalk.bold("Complexity"), maxComplexityLen) +
    " || " +
    pad(chalk.bold("Urgency"), maxUrgencyLen);

  console.log(chalk.underline(INQUIRER_OFFSET, header));

  const allTickets = tickets.map((t) => ({
    name:
      pad(t.id, maxIdLen) +
      " || " +
      pad(truncateStr(t.title, 30), maxTitleLen) +
      " || " +
      pad(t.cost, maxCostLen) +
      " || " +
      pad(t.complexity, maxComplexityLen) +
      " || " +
      pad(t.urgency, maxUrgencyLen),
    value: t.id,
  }));

  const prompt = inquirer.prompt([
    {
      type: "checkbox",
      name: "selected",
      message: "",
      choices: allTickets,
      pageSize: 10,
    },
  ]);

  setPrompt(prompt);

  const { selected } = await prompt;

  console.clear();
  await showHeader();
  await mainMenu();
  if (selected.length !== 0) {
    console.log("Deleted tickets:", selected.join(", "));
  }
}

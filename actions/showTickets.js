import chalk from "chalk";
import inquirer from "inquirer";

import { setPrompt, setReturnMode } from "../utils/state.js";
import { showHeader } from "../header.js";
import { mainMenu } from "../index.js";

export async function showTickets(tickets) {
  setReturnMode(true);
  console.clear();
  console.log(chalk.bgGray("Press 'ESC' to cancel and return to menu.\n"));

  if (tickets.length === 0) {
    console.log("\n No Tickets created yet.. :-( \n");
  }

  const allTickets = tickets.map((t) => ({
    name: `${t.id} | ${t.title} | ${t.cost} | ${t.complexity} | ${t.urgency}`,
    value: t.id,
  }));

  const prompt = inquirer.prompt([
    {
      type: "checkbox",
      name: "selected",
      message: "Tickets to delete",
      choices: allTickets,
    },
  ]);

  setPrompt(prompt);

  const { selected } = await prompt;

  console.clear();
  await showHeader();
  await mainMenu();
  if (selected.length !== 0) {
    console.log("Deleted tickets: ", selected);
  }
}

import ora from "ora";
import inquirer from "inquirer";
import chalk from "chalk";

import { ticketChoices } from "../constants/choices.js";
import { saveTicket } from "../utils/storage.js";

import { sleep } from "../utils/asyncTimeout.js";
import { fullCleanup, setPrompt, setReturnMode } from "../utils/state.js";

export async function createTicket(tickets) {
  // setReturnMode(true); Comment out, because it leads to bugs. FIX THAT!
  console.clear();

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  console.log(chalk.bgGray("Press 'ESC' to cancel and return to menu.\n"));

  try {
    const prompt = inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Title of ticket: ",
      },
      {
        type: "list",
        name: "cost",
        message: "Cost: ",
        choices: ticketChoices.cost.map((c) => ({
          name: c.label,
          value: c.value,
        })),
      },
      {
        type: "list",
        name: "complexity",
        message: "Complexity: ",
        choices: ticketChoices.complexity,
      },
      {
        type: "list",
        name: "urgency",
        message: "Urgency: ",
        choices: ticketChoices.urgency,
      },
    ]);

    setPrompt(prompt);
    const ticket = await prompt;

    ticket.id = tickets.length + 1;
    tickets.push(ticket);
    saveTicket(tickets);

    const spinner = ora("Done - Ticket created!").start();
    await sleep(1000);
    spinner.succeed("Done!");
  } catch (err) {
    if (err.name === "AbortPromptError") {
      // catches inquiries abort err message, does nothing instead
    } else {
      throw err;
    }
  } finally {
    fullCleanup();
    console.clear();
  }
}

#!/usr/bin/nodes

import inquirer from "inquirer";
import chalk from "chalk";
import { table, getBorderCharacters } from "table";

import { showHeader } from "./header.js";
import { createTicket } from "./actions/createTicket.js";

import { menuChoices } from "./constants/choices.js";
import { showMenuActions } from "./constants/choices.js";

import { loadTickets } from "./utils/storage.js";
import { exit } from "./utils/exitPrompt.js";
import { hardClear } from "./utils/hardClear.js";
import { setReturnMode, ticketPrompt, returnMode } from "./utils/state.js";

let tickets = loadTickets();

process.stdin.setEncoding("utf8");

// "data" because of utf8 (maybe change it in future?)
process.stdin.on("data", (key) => {
  if (key === "\u001b" && returnMode) {
    setReturnMode(false);
    exit(ticketPrompt);
    hardClear();
    showHeader();
  }
});

process.on("uncaughtException", (err) => {
  if (err instanceof Error && err.name === "ExitPromptError") {
    console.log("👋 until next time!");
  }
});

async function mainMenu() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: menuChoices,
    },
  ]);

  switch (answer.action) {
    case "Create ticket":
      await createTicket(tickets);
      break;
    case "Show tickets":
      await showTickets();
      await showTicketsMenu();
      break;
    case "Clean menu":
      console.clear();
      await showHeader();
      break;
    case "Leave":
      console.log("👋 until next time!");
      process.exit(0);
  }

  await mainMenu();
}

// TODO: refactor that
async function showTickets() {
  console.clear();
  console.log(chalk.bgGray("Press 'ESC' to cancel and return to menu.\n"));

  if (tickets.length === 0) {
    console.log("\n No Tickets created yet. \n");
  } else {
    const data = [
      [
        `${chalk.bgCyan("ID")}`,
        `${chalk.bgCyan("Title")}`,
        `${chalk.bgCyan("Cost")}`,
        `${chalk.bgCyan("Complexity")}`,
        `${chalk.bgCyan("Urgency")}`,
      ],
      ...tickets.map((t) => [
        t.id,
        t.title || "-",
        t.cost,
        t.complexity,
        t.urgency,
      ]),
    ];
    const config = {
      border: getBorderCharacters("honeywell"),
    };

    console.log(table(data, config));
  }
}

// TODO: refactor that
async function showTicketsMenu() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose your actions: ",
      choices: showMenuActions,
    },
  ]);

  switch (answers.action) {
    case "Edit Mode":
      // TODO: Implement this
      break;
    case "Return to menu":
      hardClear();
      showHeader();
      return;
  }
}

async function startCli() {
  await showHeader();
  await mainMenu();
}

startCli();

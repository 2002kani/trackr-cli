#!/usr/bin/nodes

import inquirer from "inquirer";
import chalk from "chalk";
import { table, getBorderCharacters } from "table";
import ora from "ora";

import { showHeader } from "./components/header.js";
import { menuChoices } from "./constants/index.js";
import { ticketChoices } from "./constants/index.js";
import { loadTickets, saveTicket } from "./utils/storage.js";

let tickets = loadTickets();
let ticketPrompt;
let returnMode = false;

process.stdin.setEncoding("utf8");

// TODO: refactor that too
function exit() {
  ticketPrompt.ui.close();
}

// "data" because of utf8 (maybe change it in future?)
process.stdin.on("data", (key) => {
  if (key === "\u001b" && returnMode) {
    returnMode = false;
    exit();
    console.clear();
    showHeader();
  }
});

process.on("uncaughtException", (err) => {
  if (err instanceof Error && err.name === "ExitPromptError") {
    console.log("👋 until next time!");
  }
});

// TODO: refactor that somewhere
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
      await createTicket();
      break;
    case "Show tickets":
      console.log(returnMode);
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

async function createTicket() {
  returnMode = true;
  console.clear();

  console.log(chalk.bgGray("Press 'ESC' to cancel and return to menu.\n"));

  // Create Ticket
  try {
    ticketPrompt = inquirer.prompt([
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

    const ticket = await ticketPrompt;

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
    console.clear();
    returnMode = false;
    await showHeader();
  }
}

// Show Ticket
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

// ShowTicket Menu
async function showTicketsMenu() {
  //refactor that somewhere too
  const showMenuActions = ["Edit Mode", "Return to menu"];

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
      console.log("EDIT MODE ACTIVE");
      break;
    case "Return to menu":
      // das hier mit console.clear() zu einer function machen und dann IMMER die aufrufen wenn etwas gecleart werden muss dementsprechend müssen die anderen stellen auch verändert werden wo nur console.clear ist

      // UPDATE: schau dir claude doc dazu an, vorgehen: am besten in die readme packen wann was ausgeführt werden soll, also einmal diesen hard reset mit console.clear und process.stdout.write etc.. und einmal nur console.clear
      process.stdout.write("\x1Bc");
      console.clear();

      showHeader();
      return;
  }
}

async function startCli() {
  await showHeader();
  await mainMenu();
}

startCli();

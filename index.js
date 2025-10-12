#!/usr/bin/nodes

import inquirer from "inquirer";
import chalk from "chalk";

import { showHeader } from "./components/header.js";
import { menuChoices } from "./constants/index.js";
import { ticketChoices } from "./constants/index.js";

let tickets = [];

async function mainMenu() {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Was möchtest du tun?",
      choices: menuChoices,
    },
  ]);

  switch (answer.action) {
    case "Create ticket":
      await createTicket();
      break;
    case "Show tickets":
      await showTickets();
      break;
    case "Clean menu":
      console.clear();
      await showHeader();
      break;
    case "End":
      process.exit(0);
  }

  await mainMenu();
}

async function createTicket() {
  const ticket = await inquirer.prompt([
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

  ticket.id = tickets.length + 1;
  tickets.push(ticket);

  console.log("\n Done - Ticket created! \n");
}

async function showTickets() {
  if (tickets.length === 0) {
    console.log("\n No Tickets created yet. \n");
  } else {
    console.table(tickets);
  }
}

async function startCli() {
  await showHeader();
  await mainMenu();
}

startCli();

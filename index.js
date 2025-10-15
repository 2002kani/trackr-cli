#!/usr/bin/nodes

import inquirer from "inquirer";

import { showHeader } from "./header.js";
import { createTicket } from "./actions/createTicket.js";
import { showTickets } from "./actions/showTickets.js";
import { showTicketsMenu } from "./actions/showTicketsMenu.js";

import { menuChoices } from "./constants/choices.js";
import { loadTickets } from "./utils/storage.js";
import { setPrompt } from "./utils/state.js";
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

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }
  }
});

process.on("uncaughtException", (err) => {
  if (err instanceof Error && err.name === "ExitPromptError") {
    console.log("👋 until next time!");
  }
});

async function mainMenu() {
  const prompt = inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: menuChoices,
    },
  ]);

  setPrompt(prompt);

  const answer = await prompt;

  switch (answer.action) {
    case "Create ticket":
      await createTicket(tickets);
      break;
    case "Show tickets":
      await showTickets(tickets);
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

async function startCli() {
  await showHeader();
  await mainMenu();
}

startCli();

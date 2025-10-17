#!/usr/bin/nodes

import inquirer from "inquirer";

import { showHeader } from "./header.js";
import { createTicket } from "./actions/createTicket.js";
import { showTickets } from "./actions/showTickets.js";

import { menuChoices } from "./constants/choices.js";
import { loadTickets } from "./utils/storage.js";
import { setPrompt } from "./utils/state.js";
import { exit } from "./utils/exitPrompt.js";
import { hardClear } from "./utils/hardClear.js";
import {
  ticketPrompt,
  returnMode,
  cleanupPrompt,
  isHandlingEscape,
  setIsHandlingEscape,
} from "./utils/state.js";

let tickets = loadTickets();
process.stdin.setEncoding("utf8");

function handleEscapeKey(key) {
  if (key === "\u001b" && returnMode && ticketPrompt && !isHandlingEscape) {
    setIsHandlingEscape(true);

    try {
      exit(ticketPrompt);
    } catch (err) {
      // ignore
    }

    cleanupPrompt();
    hardClear();

    (async () => {
      setIsHandlingEscape(false);
      await showHeader();
      await mainMenu();
    })();
  }
}

process.stdin.on("data", handleEscapeKey);

process.on("uncaughtException", (err) => {
  if (err instanceof Error && err.name === "ExitPromptError") {
    console.log("👋 until next time!");
    process.exit(0);
  }
});

export async function mainMenu() {
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
      await showHeader();
      await mainMenu();
      break;
    case "Show tickets":
      await showTickets(tickets);
      await showHeader();
      await mainMenu();
      break;
    case "Clean menu":
      console.clear();
      await showHeader();
      await mainMenu();
      break;
    case "Leave":
      console.log("👋 until next time!");
      process.exit(0);
  }
}

async function startCli() {
  await showHeader();
  await mainMenu();
}

startCli();

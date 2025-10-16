import inquirer from "inquirer";

import { showHeader } from "../header.js";
import { hardClear } from "../utils/hardClear.js";

import { showMenuActions } from "../constants/choices.js";
import { setReturnMode } from "../utils/state.js";
import { setPrompt } from "../utils/state.js";

export async function showTicketsMenu() {
  setReturnMode(true);

  if (process.stdin.isTTY) {
    process.stdin.resume();
    process.stdin.setRawMode(true);
  }

  try {
    const prompt = inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose your actions: ",
        choices: showMenuActions,
      },
    ]);

    setPrompt(prompt);
    const answers = await prompt;

    switch (answers.action) {
      case "Edit Mode":
        // TODO: Implement this
        break;
      case "Return to menu":
        // fail it for finally
        break;
    }
  } catch (err) {
  } finally {
    hardClear();
    setReturnMode(false);
    await showHeader();
  }
}

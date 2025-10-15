import inquirer from "inquirer";

import { showHeader } from "../header.js";
import { hardClear } from "../utils/hardClear.js";

import { showMenuActions } from "../constants/choices.js";

export async function showTicketsMenu() {
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

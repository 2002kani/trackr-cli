import chalk from "chalk";
import { table, getBorderCharacters } from "table";

export async function showTickets(tickets) {
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

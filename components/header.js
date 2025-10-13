import figlet from "figlet";
import chalk from "chalk";

export async function showHeader() {
  const title = await figlet.text("Tickr", {
    font: "Ansi shadow",
  });
  const subtitle = chalk.bgCyan(
    " ✦ Welcome to tickr — Your cli ticket tracker ✦ "
  );

  console.log("");
  console.log(title);
  console.log(subtitle);
  console.log("");
}

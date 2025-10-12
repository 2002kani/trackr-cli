import figlet from "figlet";
import chalk from "chalk";

export async function showHeader() {
  const title = await figlet.text("Tickr", {
    font: "Ansi shadow",
  });
  const subtitle = chalk.bgGray(
    "✦ Welcome to tickr — Your cli ticket tracker. ✦"
  );

  console.log(""); // top padding
  console.log(title);
  console.log(subtitle);
  console.log("");
}

export function hardClear() {
  process.stdout.write("\x1Bc");
  console.clear();
}

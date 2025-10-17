/* Handles Global states */
export let returnMode = false;
export let ticketPrompt = null;
export let isHandlingEscape = false;

export function setReturnMode(value) {
  returnMode = value;
  if (value === true) {
    isHandlingEscape = false;
  }
}

export function setPrompt(prompt) {
  ticketPrompt = prompt;
}

export function cleanupPrompt() {
  if (process.stdin.isTTY && process.stdin.isRaw) {
    process.stdin.setRawMode(false);
  }
}

export function setIsHandlingEscape(value) {
  isHandlingEscape = value;
}

export function fullCleanup() {
  cleanupPrompt();

  if (process.stdin.isTTY && process.stdin.isRaw) {
    process.stdin.setRawMode(false);
  }
}

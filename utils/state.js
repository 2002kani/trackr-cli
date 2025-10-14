/* Handles Global states */
export let returnMode = false;
export let ticketPrompt = null;

export function setReturnMode(value) {
  returnMode = value;
}

export function setPrompt(prompt) {
  ticketPrompt = prompt;
}

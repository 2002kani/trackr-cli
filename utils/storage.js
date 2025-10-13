import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "tickets.json");

// TODO: find a different solutions to store tickets
export function loadTickets() {
  if (!fs.existsSync(filePath)) return [];

  const data = fs.readFileSync(filePath, "utf-8");
  if (!data.trim()) return [];

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Error while reading ticket.json: ", err.message);
    return [];
  }
}

export function saveTicket(ticket) {
  fs.writeFileSync(filePath, JSON.stringify(ticket, null, 2));
}

export function deleteTicket(id) {
  const tickets = loadTickets();

  const doesExist = tickets.some((t) => t.id == id);
  if (!doesExist) {
    console.log(`No Ticket with ID ${id}.`);
    return;
  }

  const updatedTickets = tickets.filter((t) => t.id != id);
  saveTicket(updatedTickets);

  console.log(`Ticket with ID ${id} has been deleted!`);
}

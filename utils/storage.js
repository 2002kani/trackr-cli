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

export function deleteTicket(ids) {
  const tickets = loadTickets();

  const idsToDelete = Array.isArray(ids) ? ids : [ids];

  const updatedTickets = tickets.filter((t) => !idsToDelete.includes(t.id));

  saveTicket(updatedTickets);

  console.log(
    `Deleted ${idsToDelete.length} ticket(s): ${idsToDelete.join(", ")}`
  );
}

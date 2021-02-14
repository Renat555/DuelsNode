import { ws } from "./socketClient.js";

export function endMuve() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  let message = { header: "endMuve" };
  ws.send(JSON.stringify(message));
}

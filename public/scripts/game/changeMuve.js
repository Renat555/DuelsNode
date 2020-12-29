"use strict";

function endMuve() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  let message = { header: "endMuve" };
  ws.send(JSON.stringify(message));
}

let buttonMuve = document.getElementsByName("buttonMuve")[0];
buttonMuve.addEventListener("click", endMuve);

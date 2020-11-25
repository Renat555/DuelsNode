"use strict";

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  let gameInformation = localStorage.getItem("gameInformation");
  ws.send(gameInformation);
};

ws.onmessage = (message) => {
  message = JSON.parse(message.data);

  console.log(message);
  switch (message.header) {
    case "createGame":
      fillInterface(message);
      break;
    case "processingSpell":
    case "changeMuve":
    case "processingBattlefieldSpell":
      changeInterface(message);
      changeBattlefield(message);
      break;
    case "processingMuve":
      muveEnemy(message);
      break;
  }
};

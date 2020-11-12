"use strict";

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  let gameInformation = localStorage.getItem("gameInformation");
  ws.send(gameInformation);
};

ws.onmessage = (message) => {
  message = JSON.parse(message.data);

  switch (message.header) {
    case "createGame":
      fillInterface(message);
      break;
    case "processingSpell":
    case "changeMuve":
      changeInterface(message);
      break;
    case "processingBattlefieldSpell":
      changeBattlefield(message);
      break;
    case "processingMuve":
      muveEnemy(message);
      break;
  }
  console.log(message);
};

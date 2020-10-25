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
    case "enemyMuve":
      muveEnemy(message["row"], message["col"]);
      break;
  }
  console.log(message);
};

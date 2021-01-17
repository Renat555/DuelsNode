import { fillInterface } from "./fillInterface.js";
import { changeInterface } from "./changeInterface.js";
import { changeBattlefield } from "./changeBattlefield.js";
import { clearUserSpell } from "./clearUserSpell.js";
import { muveEnemy } from "./muveEnemy.js";

const ws = new WebSocket("ws://duelsnode:3000");

ws.onopen = () => {
  let gameInformation = localStorage.getItem("gameInformation");

  if (gameInformation == "gameIsStart") return;

  ws.send(gameInformation);
  gameInformation = "gameIsStart";
  localStorage.setItem("gameInformation", gameInformation);
};

ws.onmessage = (message) => {
  message = JSON.parse(message.data);

  console.log(message);
  switch (message.header) {
    case "createGame":
      fillInterface(message);
      break;
    case "processingSpell":
    case "processingBattlefieldSpell":
      changeInterface(message);
      changeBattlefield(message);
      break;
    case "changeMuve":
      changeInterface(message);
      changeBattlefield(message);
      clearUserSpell();
      break;
    case "processingMuve":
      muveEnemy(message);
      break;
    case "enemyIsLeft":
      alert("Противник вышел. Вы победили!");
      window.location.href = "../";
      break;
  }
};

export { ws };

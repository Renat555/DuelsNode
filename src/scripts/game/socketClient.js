import "../../css/game/game";
import "../../css/game/gameOtherScreens";
import "../../css/game/showHints";
import "../../css/game/spells";
import "../../css/game/heroes";
import "../../css/game/searchEnemy";

import { fillInterface } from "./fillInterface";
import { changeInterface } from "./changeInterface";
import { changeBattlefield } from "./changeBattlefield";
import { clearUserSpell } from "./clearUserSpell";
import { muveEnemy } from "./muving/muveEnemy";

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
      changeBattlefield(message);
      changeInterface(message);
      clearUserSpell();
      break;
    case "processingMuve":
      muveEnemy(message["user"]["position"]["enemy"]);
      changeInterface(message);
      break;
    case "enemyIsLeft":
      alert("Противник вышел. Вы победили!");
      window.location.href = "/createHero";
      break;
  }
};

export { ws };

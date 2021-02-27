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

const ws = new WebSocket("ws://a00.kz:3000");

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
      changeInterface(message, ws);
      changeBattlefield(message);
      break;
    case "changeMuve":
      changeBattlefield(message);
      changeInterface(message, ws);
      clearUserSpell();
      break;
    case "processingMuve":
      muveEnemy(message["user"]["position"]["enemy"]);
      changeInterface(message, ws);
      break;
    case "enemyIsLeft":
      alert("Противник вышел. Вы победили!");
      window.location.href = "/createHero";
      break;
  }
};

export { ws };

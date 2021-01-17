import { isClearPath } from "./isClearPath.js";
import { ws } from "./socketClient.js";

function sendSpell() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  if (!isClearPath()) {
    alert("Нельзя применить заклинание. Между вами и целью перепятствие.");
    return;
  }

  let divActionPointsNeed = document.getElementById("actionPointsNeed");
  let divEnergyPointsNeed = document.getElementById("energyPointsNeed");
  let divActionPointsHave = document.getElementById("actionPoints");
  let divEnergyPointsHave = document.getElementById("energyPoints");

  if (
    divActionPointsHave.innerHTML - divActionPointsNeed.innerHTML < 0 ||
    divEnergyPointsHave.innerHTML - divEnergyPointsNeed.innerHTML < 0
  ) {
    return;
  }

  if (localStorage.getItem("complete") == "yes") {
    ws.send(localStorage.getItem("spellInformation"));
  }
}

let buttonActivationSpell = document.getElementsByName("buttonActiveSpell")[0];
buttonActivationSpell.addEventListener("click", sendSpell);

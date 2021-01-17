import {
  earthshildMuve,
  earthshildPreparing,
  earthshildApproval,
  watersphereMuve,
  waterspherePreparing,
  watersphereApproval,
} from "./spells.js";
import * as sounds from "./sounds.js";
import { clearForms, clearElements } from "./fillInterface.js";

function clearEffects() {
  let divEffects = document.querySelectorAll("[data-duration]");

  for (let item of divEffects) {
    item.dataset.status = "notSelected";
    item.classList.remove("selectedEffect");
  }
}

function removeBattlefieldObjects() {
  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      battlefield[i].className = "battleSquare";
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.state = "";
    }
  }
}

function removeBattlefieldSpell() {
  document.removeEventListener("mouseover", earthshildMuve);
  document.removeEventListener("click", earthshildPreparing);
  document.removeEventListener("mouseover", watersphereMuve);
  document.removeEventListener("click", waterspherePreparing);

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];

  buttonActivationSpell.removeEventListener("click", earthshildApproval);
  buttonActivationSpell.removeEventListener("click", watersphereApproval);
}

function removeSounds() {
  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];

  buttonActivationSpell.removeEventListener("click", sounds.soundFire);
  buttonActivationSpell.removeEventListener("click", sounds.soundWater);
  buttonActivationSpell.removeEventListener("click", sounds.soundEarth);
  buttonActivationSpell.removeEventListener("click", sounds.soundAir);
  buttonActivationSpell.removeEventListener("click", sounds.soundLife);
  buttonActivationSpell.removeEventListener("click", sounds.soundDeath);
}

function clearUserSpell() {
  clearForms();
  clearElements();
  removeBattlefieldObjects();
  removeBattlefieldSpell();
  removeSounds();

  localStorage.setItem("complete", "no");

  let divActionPointsNeed = document.getElementById("actionPointsNeed");
  let divEnergyPointsNeed = document.getElementById("energyPointsNeed");
  divActionPointsNeed.innerHTML = 0;
  divEnergyPointsNeed.innerHTML = 0;

  let divUserSpell = document.getElementsByClassName("userSpell")[0];
  divUserSpell.dataset.spellelement = "";
  divUserSpell.dataset.spellform = "";
  divUserSpell.dataset.spell = "";
  divUserSpell.innerHTML = "";
}

export {
  clearEffects,
  removeBattlefieldObjects,
  removeBattlefieldSpell,
  removeSounds,
  clearUserSpell,
};

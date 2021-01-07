"use strict";

function clearForms() {
  let divForms = document.querySelectorAll("[data-form]");

  for (let item of divForms) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function clearElements() {
  let divElements = document.querySelectorAll("[data-element]");

  for (let item of divElements) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

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

  buttonActivationSpell.removeEventListener("click", soundFire);
  buttonActivationSpell.removeEventListener("click", soundWater);
  buttonActivationSpell.removeEventListener("click", soundEarth);
  buttonActivationSpell.removeEventListener("click", soundAir);
  buttonActivationSpell.removeEventListener("click", soundLife);
  buttonActivationSpell.removeEventListener("click", soundDeath);
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

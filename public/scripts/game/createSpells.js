"use strict";

function chooseForm(event) {
  let target = event.target;
  if (!target.dataset.form) return;

  clearForms();

  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");
  divSpell.dataset.spellform = target.dataset.form;

  createSpell();
}

function clearForms() {
  let divForms = document.querySelectorAll("[data-form]");

  for (let item of divForms) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function chooseElement(event) {
  let target = event.target;
  if (!target.dataset.element) return;

  clearElements();

  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");
  divSpell.dataset.spellelement = target.dataset.element;

  createSpell();
}

function clearElements() {
  let divElements = document.querySelectorAll("[data-element]");

  for (let item of divElements) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function chooseEffect(event) {
  clearEffects();

  let target = event.target;
  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");

  let spellInformation = {
    header: "despell",
    spell: divSpell.dataset.spell,
    despell: target.dataset.spell,
  };

  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");
}

function clearEffects() {
  let divEffects = document.querySelectorAll("[data-duration]");

  for (let item of divEffects) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function firekey(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["firekey"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }
}

function watersource(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["watersource"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }
}

function waterkey(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["waterkey"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }
}

function earthkey(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["earthkey"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }
}

function airkey(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["airkey"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }
}

function lifespear(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["lifespear"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }
}

function lifekey(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["lifekey"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }
}

function deathspear(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (enemyEffects[i].dataset.spell == "lifepower") {
      enemyEffects[i].addEventListener("click", chooseEffect);
      return;
    }
  }

  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["deathspear"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }
}

function deathpower(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["deathpower"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }
}

function earthshildMuve(event) {
  removeBattlefieldObjects();

  let target = event.target;
  if (!target.dataset.row) return;
  if (target.dataset.player) return;
  if (target.dataset.spell) return;

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  target.classList.add("earthshild");
  target.style.opacity = 0.5;
  target.dataset.state = "preparing";

  let divSquareLeft = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${+target.dataset.col - 1}"]`
  );

  if (
    divSquareLeft &&
    !divSquareLeft.dataset.player &&
    !divSquareLeft.dataset.spell
  ) {
    divSquareLeft.classList.add("earthshild");
    divSquareLeft.style.opacity = 0.5;
    divSquareLeft.dataset.state = "preparing";
  }

  let divSquareRight = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${+target.dataset.col + 1}"]`
  );

  if (
    divSquareRight &&
    !divSquareRight.dataset.player &&
    !divSquareRight.dataset.spell
  ) {
    divSquareRight.classList.add("earthshild");
    divSquareRight.style.opacity = 0.5;
    divSquareRight.dataset.state = "preparing";
  }
}

function earthshildPreparing(event) {
  let target = event.target;
  if (!target.dataset.row) return;

  document.removeEventListener("mouseover", earthshildMuve);

  let earthshild = { header: "battlefieldSpell", spell: ["earthshild", 5] };

  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      let coord = [];
      coord[0] = battlefield[i].dataset.row;
      coord[1] = battlefield[i].dataset.col;
      earthshild["spell"].push(coord);
    }
  }

  localStorage.setItem("spellInformation", JSON.stringify(earthshild));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", earthshildApproval);

  divBattleField.addEventListener("click", muveUser);
}

function earthshildApproval() {
  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].classList.contains("earthshild")) {
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.spell = "earthshild";
      battlefield[i].dataset.state = "approval";
      battlefield[i].dataset.duration = "5";
    }
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.removeEventListener("click", earthshildApproval);
}

function watersphereMuve(event) {
  removeBattlefieldObjects();

  let target = event.target;

  if (target.dataset.hero == "user") {
    target = document.querySelector("[data-player='user']");
  } else if (target.dataset.hero == "enemy") {
    target = document.querySelector("[data-player='enemy']");
  }

  if (!target.dataset.row) return;
  if (target.dataset.spell) return;

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  target.classList.add("watersphere");
  target.style.opacity = 0.5;
  target.dataset.state = "preparing";

  let divSquareBottom = document.querySelector(
    `[data-row="${+target.dataset.row - 1}"][data-col="${target.dataset.col}"]`
  );

  if (divSquareBottom && !divSquareBottom.dataset.spell) {
    divSquareBottom.classList.add("watersphere");
    divSquareBottom.style.opacity = 0.5;
    divSquareBottom.dataset.state = "preparing";
  }

  let divSquareRight = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${+target.dataset.col + 1}"]`
  );

  if (divSquareRight && !divSquareRight.dataset.spell) {
    divSquareRight.classList.add("watersphere");
    divSquareRight.style.opacity = 0.5;
    divSquareRight.dataset.state = "preparing";
  }

  let divSquareRightBottom = document.querySelector(
    `[data-row="${+target.dataset.row - 1}"][data-col="${
      +target.dataset.col + 1
    }"]`
  );

  if (divSquareRightBottom && !divSquareRightBottom.dataset.spell) {
    divSquareRightBottom.classList.add("watersphere");
    divSquareRightBottom.style.opacity = 0.5;
    divSquareRightBottom.dataset.state = "preparing";
  }
}

function waterspherePreparing(event) {
  let target = event.target;

  if (target.dataset.hero == "user") {
    target = document.querySelector("[data-player='user']");
  } else if (target.dataset.hero == "enemy") {
    target = document.querySelector("[data-player='enemy']");
  }

  if (!target.dataset.row) return;

  document.removeEventListener("mouseover", watersphereMuve);

  let watersphere = { header: "battlefieldSpell", spell: ["watersphere", 3] };

  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      let coord = [];
      coord[0] = battlefield[i].dataset.row;
      coord[1] = battlefield[i].dataset.col;
      watersphere["spell"].push(coord);
    }
  }

  localStorage.setItem("spellInformation", JSON.stringify(watersphere));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", watersphereApproval);

  divBattleField.addEventListener("click", muveUser);
}

function watersphereApproval() {
  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.spell = "watersphere";
      battlefield[i].dataset.state = "approval";
      battlefield[i].dataset.duration = "3";
    }
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.removeEventListener("click", watersphereApproval);
}

function removeBattlefieldObjects() {
  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      battlefield[i].className = "col battleSquare";
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.state = "";
    }
  }
}

function removeSpells() {
  removeBattlefieldObjects();
  localStorage.setItem("complete", "no");

  document.removeEventListener("mouseover", earthshildMuve);
  document.removeEventListener("click", earthshildPreparing);
  document.removeEventListener("mouseover", watersphereMuve);
  document.removeEventListener("click", waterspherePreparing);
}

function spell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");
}

function effect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");
}

function createSpell() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  removeSpells();

  let divSpell = document.querySelector(".userSpell");
  let divActionPointsNeed = document.getElementById("actionPointsNeed");
  let divEnergyPointsNeed = document.getElementById("energyPointsNeed");

  if (divSpell.dataset.spellelement != "" && divSpell.dataset.spellform != "") {
    divSpell.dataset.spell =
      divSpell.dataset.spellelement + divSpell.dataset.spellform;
    divSpell.innerHTML = spellbook[divSpell.dataset.spell][0];

    divActionPointsNeed.innerHTML = spellbook[divSpell.dataset.spell][1];
    divEnergyPointsNeed.innerHTML = spellbook[divSpell.dataset.spell][2];
  }

  let divEnemyEffect = document.getElementById("enemyEffects");
  let enemyEffects = divEnemyEffect.querySelectorAll("[data-duration]");
  let divUserEffect = document.getElementById("userEffects");
  let userEffects = divUserEffect.querySelectorAll("[data-duration]");

  switch (divSpell.dataset.spell) {
    case "firespear":
      spell(divSpell.dataset.spell);
      break;
    case "fireshild":
      effect(divSpell.dataset.spell);
      break;
    case "firecrown":
      effect(divSpell.dataset.spell);
      break;
    case "firesource":
      effect(divSpell.dataset.spell);
      break;
    case "firesphere":
      effect(divSpell.dataset.spell);
      break;
    case "firestamp":
      spell(divSpell.dataset.spell);
      break;
    case "firekey":
      firekey(enemyEffects);
      break;
    case "fireflow":
      spell(divSpell.dataset.spell);
      break;
    case "firepower":
      effect(divSpell.dataset.spell);
      break;
    case "waterspear":
      spell(divSpell.dataset.spell);
      break;
    case "watershild":
      effect(divSpell.dataset.spell);
      break;
    case "watercrown":
      effect(divSpell.dataset.spell);
      break;
    case "watersource":
      watersource(userEffects);
      break;
    case "watersphere":
      document.addEventListener("mouseover", watersphereMuve);
      document.addEventListener("click", waterspherePreparing);
      break;
    case "waterstamp":
      effect(divSpell.dataset.spell);
      break;
    case "waterkey":
      waterkey(userEffects);
      break;
    case "waterflow":
      spell(divSpell.dataset.spell);
      break;
    case "waterpower":
      effect(divSpell.dataset.spell);
      break;
    case "earthspear":
      spell(divSpell.dataset.spell);
      break;
    case "earthshild":
      document.addEventListener("mouseover", earthshildMuve);
      document.addEventListener("click", earthshildPreparing);
    case "earthcrown":
      effect(divSpell.dataset.spell);
      break;
    case "earthsource":
      effect(divSpell.dataset.spell);
      break;
    case "earthsphere":
      effect(divSpell.dataset.spell);
      break;
    case "earthstamp":
      effect(divSpell.dataset.spell);
      break;
    case "earthkey":
      earthkey(userEffects);
      break;
    case "earthflow":
      spell(divSpell.dataset.spell);
      break;
    case "earthpower":
      effect(divSpell.dataset.spell);
      break;
    case "airspear":
      spell(divSpell.dataset.spell);
      break;
    case "airshild":
      effect(divSpell.dataset.spell);
      break;
    case "aircrown":
      effect(divSpell.dataset.spell);
      break;
    case "airsource":
      effect(divSpell.dataset.spell);
      break;
    case "airsphere":
      effect(divSpell.dataset.spell);
      break;
    case "airstamp":
      effect(divSpell.dataset.spell);
      break;
    case "airkey":
      airkey(enemyEffects);
      break;
    case "airflow":
      spell(divSpell.dataset.spell);
      break;
    case "airpower":
      effect(divSpell.dataset.spell);
      break;
    case "lifespear":
      lifespear(userEffects);
      break;
    case "lifeshild":
      effect(divSpell.dataset.spell);
      break;
    case "lifecrown":
      spell(divSpell.dataset.spell);
      break;
    case "lifesource":
      spell(divSpell.dataset.spell);
      break;
    case "lifesphere":
      effect(divSpell.dataset.spell);
      break;
    case "lifestamp":
      effect(divSpell.dataset.spell);
      break;
    case "lifekey":
      lifekey(userEffects);
      break;
    case "lifeflow":
      effect(divSpell.dataset.spell);
      break;
    case "lifepower":
      effect(divSpell.dataset.spell);
      break;
    case "deathspear":
      deathspear(enemyEffects);
      break;
    case "deathshild":
      effect(divSpell.dataset.spell);
      break;
    case "deathcrown":
      spell(divSpell.dataset.spell);
      break;
    case "deathsource":
      spell(divSpell.dataset.spell);
      break;
    case "deathsphere":
      effect(divSpell.dataset.spell);
      break;
    case "deathstamp":
      effect(divSpell.dataset.spell);
      break;
    case "deathkey":
      effect(divSpell.dataset.spell);
      break;
    case "deathflow":
      effect(divSpell.dataset.spell);
      break;
    case "deathpower":
      deathpower(enemyEffects);
      break;
  }
}

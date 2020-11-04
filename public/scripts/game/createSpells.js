"use strict";

function chooseEffect(event) {
  clearEffects();

  let target = event.target;
  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");

  let spellInformation = {
    header: "despell",
    spell: divSpell.dataset.spell,
    despell: target.dataset.despell,
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

function deathpower(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["lifekey"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }
}

function earthshildMuve(event) {
  removeEarthshild();

  let target = event.target;
  if (!target.dataset.row) return;

  if (target.dataset.availability != "free") return;

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  target.classList.add("earthshild");
  target.style.opacity = 0.5;
  target.dataset.spell = "earthshild";

  let colLeft = +target.dataset.col - 1;
  let divSquareLeft = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${colLeft}"]`
  );

  if (divSquareLeft && divSquareLeft.dataset.availability == "free") {
    if (divSquareLeft.dataset.availability == "free") {
      divSquareLeft.classList.add("earthshild");
      divSquareLeft.style.opacity = 0.5;
      divSquareLeft.dataset.spell = "earthshild";
    }
  }

  let colRight = +target.dataset.col + 1;
  let divSquareRight = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${colRight}"]`
  );

  if (divSquareRight && divSquareRight.dataset.availability == "free") {
    if (divSquareRight.dataset.availability == "free") {
      divSquareRight.classList.add("earthshild");
      divSquareRight.style.opacity = 0.5;
      divSquareRight.dataset.spell = "earthshild";
    }
  }
}

function earthshildPreparing(event) {
  let target = event.target;
  if (!target.dataset.row) return;

  document.removeEventListener("mouseover", earthshildMuve);

  let earthshild = { header: "battlefieldSpell", spell: ["earthshild"] };

  let battlefield = document.querySelectorAll("[data-availability]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.spell == "earthshild") {
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
  let battlefield = document.querySelectorAll("[data-availability]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.spell == "earthshild") {
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.availability = "block";
    }
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.removeEventListener("click", earthshildApproval);
}

function removeEarthshild() {
  let battlefield = document.querySelectorAll("[data-availability]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.spell == "earthshild") {
      battlefield[i].classList.remove("earthshild");
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.spell = "";
    }
  }
}

function createSpell() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  removeSpells();
  localStorage.setItem("complete", "no");

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

  let divBattlefield = document.getElementsByClassName("battlefield")[0];

  switch (divSpell.dataset.spell) {
    case "firekey":
      firekey(enemyEffects);
      break;
    case "watersource":
      watersource(enemyEffects);
      break;
    case "waterkey":
      waterkey(userEffects);
      break;
    case "earthshild":
      document.addEventListener("mouseover", earthshildMuve);
      divBattlefield.addEventListener("click", earthshildPreparing);
    case "earthkey":
      earthkey(userEffects);
      break;
    case "airkey":
      airkey(enemyEffects);
      break;
    case "lifespear":
      lifespear(userEffects);
      break;
    case "lifekey":
      lifekey(userEffects);
      break;
    case "deathpower":
      deathpower(enemyEffects);
      break;
    default:
      let spellInformation = {
        header: "spell",
        spell: divSpell.dataset.spell,
      };
      localStorage.setItem(
        "spellInformation",
        JSON.stringify(spellInformation)
      );
      localStorage.setItem("complete", "yes");
      break;
  }
}

function removeSpells() {
  document.removeEventListener("mouseover", earthshildMuve);
  document.removeEventListener("mouseover", earthshildPreparing);
}

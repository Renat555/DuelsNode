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
  divSpell.dataset.despell = target.dataset.spell;
}

function clearEffects() {
  let divEffects = document.querySelectorAll("[data-duration]");

  for (let item of divEffects) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function sendSpell() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

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

  let divSpell = document.querySelector(".userSpell");

  if (!divSpell.dataset.spell) {
    return;
  }

  if (divSpell.dataset.spell != "") {
    let spellInformation = {
      header: "spell",
      spell: divSpell.dataset.spell,
      despell: divSpell.dataset.despell,
    };
    ws.send(JSON.stringify(spellInformation));
  }
}

document.addEventListener("click", chooseForm);
document.addEventListener("click", chooseElement);

let buttonSend = document.getElementsByName("buttonActiveSpell")[0];
buttonSend.addEventListener("click", sendSpell);

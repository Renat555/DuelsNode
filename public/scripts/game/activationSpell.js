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

  if (localStorage.getItem("complete") == "yes") {
    ws.send(localStorage.getItem("spellInformation"));
  }
}

document.addEventListener("click", chooseForm);
document.addEventListener("click", chooseElement);

let buttonActivationSpell = document.getElementsByName("buttonActiveSpell")[0];
buttonActivationSpell.addEventListener("click", sendSpell);

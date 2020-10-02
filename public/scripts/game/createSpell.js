"use strict";

function fillSpell() {
  let divSpell = document.querySelector(".userSpell");
  let divActionPointsNeed = document.getElementById('actionPointsNeed');
  let divEnergyPointsNeed = document.getElementById('energyPointsNeed');

  if (divSpell.dataset.spellelement != "" && divSpell.dataset.spellform != "") {
    divSpell.dataset.spell = divSpell.dataset.spellelement + divSpell.dataset.spellform;
    divSpell.innerHTML = spellbook[divSpell.dataset.spell][0];

    divActionPointsNeed.innerHTML = spellbook[divSpell.dataset.spell][1];
    divEnergyPointsNeed.innerHTML = spellbook[divSpell.dataset.spell][2];
  }
}

function chooseForm(event) {
  let target = event.target;
  if (!target.dataset.form) return;

  clearForms();

  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");
  divSpell.dataset.spellform = target.dataset.form;

  fillSpell();
  addChooseEffectFunction();
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

  fillSpell();
  addChooseEffectFunction();
}

function clearElements() {
  let divElements = document.querySelectorAll("[data-element]");

  for (let item of divElements) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function addChooseEffectFunction() {
  let divSpell = document.querySelector(".userSpell");
  let divEffects = document.querySelectorAll("[data-duration]");

  switch(divSpell.dataset.spell) {
    case 'firekey':
      let divEnemyEffect = document.getElementById('enemyEffects');
      let divEffects = divEnemyEffect.querySelectorAll('[data-duration]');
      for (let i = 0; i < divEffects.length; i++) {
        divEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'watersource':
    case 'waterkey':
    case 'earthkey':
    case 'airkey':
    case 'lifespear':
    case 'lifekey':
    case 'deathpower':
      for (let i = 0; i < divEffects.length; i++) {
        divEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    default:
      for (let i = 0; i < divEffects.length; i++) {
        divEffects[i].removeEventListener("click", chooseEffect);
      }
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
  let divSpell = document.querySelector(".userSpell");

  if (!divSpell.dataset.spell) {
    alert('Создайте заклинание.');
    return;
  }


  

  if (divSpell.dataset.spell != '') {
    let spellInformation = {
      header: 'spell',
      spell: divSpell.dataset.spell,
      despell: divSpell.dataset.despell
    }
    ws.send(JSON.stringify(spellInformation));
  }

}

document.addEventListener("click", chooseForm);
document.addEventListener("click", chooseElement);

let buttonSend = document.getElementsByName('buttonActiveSpell')[0];
buttonSend.addEventListener("click", sendSpell);

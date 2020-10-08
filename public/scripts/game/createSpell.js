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

function addChooseEffectFunction() {
  let divSpell = document.querySelector(".userSpell");
  let divEffects = document.querySelectorAll('[data-duration]');
  let divEnemyEffect = document.getElementById('enemyEffects');
  let divEnemyEffects = divEnemyEffect.querySelectorAll('[data-duration]');
  let divUserEffect = document.getElementById('userEffects'); 
  let divUserEffects = divUserEffect.querySelectorAll('[data-duration]');

  switch(divSpell.dataset.spell) {
    case 'firekey':
      for (let i = 0; i < divEnemyEffects.length; i++) {
        if (spellbook['firekey'][4].indexOf(divEnemyEffects[i].dataset.spell) == -1) continue;
        divEnemyEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'watersource':
      for (let i = 0; i < divUserEffects.length; i++) {
        if (spellbook['watersource'][4].indexOf(divUserEffects[i].dataset.spell) == -1) continue;
        divUserEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'waterkey':
      for (let i = 0; i < divUserEffects.length; i++) {
        if (spellbook['waterkey'][4].indexOf(divUserEffects[i].dataset.spell) == -1) continue;
        divUserEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'earthkey':
      for (let i = 0; i < divUserEffects.length; i++) {
        if (spellbook['earthkey'][4].indexOf(divUserEffects[i].dataset.spell) == -1) continue;
        divUserEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'airkey':
      for (let i = 0; i < divEnemyEffects.length; i++) {
        if (spellbook['airkey'][4].indexOf(divEnemyEffects[i].dataset.spell) == -1) continue;
        divEnemyEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'lifespear':
      for (let i = 0; i < divUserEffects.length; i++) {
        if (spellbook['lifespear'][4].indexOf(divUserEffects[i].dataset.spell) == -1) continue;
        divUserEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'lifekey':
      for (let i = 0; i < divUserEffects.length; i++) {
        if (spellbook['lifekey'][4].indexOf(divUserEffects[i].dataset.spell) == -1) continue;
        divUserEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    case 'deathpower':
      for (let i = 0; i < divEnemyEffects.length; i++) {
        if (spellbook['lifekey'][4].indexOf(divEnemyEffects[i].dataset.spell) == -1) continue;
        divEnemyEffects[i].addEventListener("click", chooseEffect);
      }
      break;
    default:
      for (let i = 0; i < divEffects.length; i++) {
        divEffects[i].removeEventListener("click", chooseEffect);
      }
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

function endMuve() {
  let message = {header: 'endMuve'};
  ws.send(JSON.stringify(message));
}

document.addEventListener("click", chooseForm);
document.addEventListener("click", chooseElement);

let buttonSend = document.getElementsByName('buttonActiveSpell')[0];
buttonSend.addEventListener("click", sendSpell);

let buttonMuve = document.getElementsByName('buttonMuve')[0];
buttonMuve.addEventListener("click", endMuve);
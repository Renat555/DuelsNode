"use strict";

function fillSpell() {
  let divSpell = document.querySelector(".userSpell");
  let divActionPointsNeed = document.getElementById('actionPointsNeed');
  let divEnergyPointsNeed = document.getElementById('energyPointsNeed');

  if (divSpell.dataset.spellelement != "undefind" && divSpell.dataset.spellform != "undefind") {
    divSpell.innerHTML = spellbook[divSpell.dataset.spellelement + divSpell.dataset.spellform][0];

    divActionPointsNeed.innerHTML = spellbook[divSpell.dataset.spellelement + divSpell.dataset.spellform][1];
    divEnergyPointsNeed.innerHTML = spellbook[divSpell.dataset.spellelement + divSpell.dataset.spellform][2];
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
}

function clearElements() {
  let divElements = document.querySelectorAll("[data-element]");

  for (let item of divElements) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function sendSpell() {
  let divSpell = document.querySelector(".userSpell");

  if (divSpell.dataset.spellelement != 'undefind' && divSpell.dataset.spellform != 'undefind') {
    let spellInformation = {
      header: 'spell',
      element: divSpell.dataset.spellelement,
      form: divSpell.dataset.spellform
    }
    ws.send(JSON.stringify(spellInformation));
  }

}

document.addEventListener("click", chooseForm);
document.addEventListener("click", chooseElement);

let buttonSend = document.getElementsByName('buttonActiveSpell')[0];
buttonSend.addEventListener("click", sendSpell);














function clearAllDebuffs () {
  for (let item of divDebuffs) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function clearAllEnemyBuffs () {
  for (let item of divEnemyBuffs) {
    item.dataset.status = "notSelected";
    item.classList.remove("selected");
  }
}

function clearAll () {
  clearAllForms();
  clearAllElements();
  clearAllDebuffs();
  clearAllEnemyBuffs();
  clearRedForms();
  clearRedElements();

  for (let item of divSpells) {
      item.dataset.status = "notSelected";
      item.classList.remove("selected");
  }
}


function createSpell (event) {
  let target = event.target;

  if (!target.dataset.spellform) return;

  if (target.dataset.status == "notSelected") {

    clearAll();

    target.dataset.status = "selected";
    target.classList.add("selected");

    document.addEventListener("click", addForm);
    document.addEventListener("click", addElement);

    if (target.dataset.spellform != "undefind") {
        for (let item of divForms) {
          if (item.dataset.form == target.dataset.spellform) {
            let click = new Event("click", {bubbles: true});
            item.dispatchEvent(click);
          }
        }
    }

    if (target.dataset.spellelement != "undefind") {
      for (let item of divElements) {
        if (item.dataset.element == target.dataset.spellelement) {
          let click = new Event("click", {bubbles: true});
          item.dispatchEvent(click);
        }
      }
    }

  } else if (target.dataset.status == "selected") {
    clearAll();
    document.removeEventListener("click", addForm);
    document.removeEventListener("click", addElement);
  }
  fillSpell();
}

function addDebuff(event) {
  let target = event.target;

  if (!target.dataset.debuffform) return;

  for (let item of divSpells) {
    if (item.dataset.status == "selected") {
      let spell = item.dataset.spellelement + item.dataset.spellform;
      switch (spell) {
        case "waterkey":
          if (target.dataset.debuffelement != "fire" && target.dataset.debuffelement != "air") return;
          break;
        case "watersource":
          if (target.dataset.debuffelement == "life" && target.dataset.debuffelement == "death") return;
          break;
        case "lifespear":
          if (target.dataset.debuffelement != "death") return;
          break;
        case "lifekey":
          if (target.dataset.buffenemyelement == "undefind") return;
          break;
        default:
          return;
      }

      clearAllDebuffs();
      target.dataset.status = "selected";
      target.classList.add("selected");
      gameInformation['spells'][item.dataset.spell+"DespellForm"] = target.dataset.debuffform;
      gameInformation['spells'][item.dataset.spell+"DespellElement"] = target.dataset.debuffelement;
    }
  }

}

function addEnemyBuff(event) {
  let target = event.target;

  if (!target.dataset.buffenemyform) return;

  for (let item of divSpells) {
    if (item.dataset.status == "selected") {
      let spell = item.dataset.spellelement + item.dataset.spellform;

      switch (spell) {
        case "firekey":
        case "airkey":
          if (target.dataset.buffenemyelement != "water" && target.dataset.buffenemyelement != "earth") return;
          break;
        case "deathspear":
          if (target.dataset.buffenemyelement == "undefind") return;
          for (let buff of divEnemyBuffs) {
            if (buff.dataset.buffenemyelement + buff.dataset.buffenemyform == "lifepower") {
              clearAllEnemyBuffs();
              buff.dataset.status = "selected";
              buff.classList.add("selected");
              gameInformation['spells'][item.dataset.spell+"DespellForm"] = "power";
              gameInformation['spells'][item.dataset.spell+"DespellElement"] = "life";
              return;
            }
          }
          break;
        case "deathpower":
          if (target.dataset.buffenemyelement != "life") return;
          for (let buff of divEnemyBuffs) {
            if (buff.dataset.buffenemyelement + buff.dataset.buffenemyform == "lifepower") {
              clearAllEnemyBuffs();
              buff.dataset.status = "selected";
              buff.classList.add("selected");
              gameInformation['spells'][item.dataset.spell+"DespellForm"] = "power";
              gameInformation['spells'][item.dataset.spell+"DespellElement"] = "life";
              return;
            }
          }
          break;
        default:
          return;
      }

      clearAllEnemyBuffs();
      target.dataset.status = "selected";
      target.classList.add("selected");
      gameInformation['spells'][item.dataset.spell+"DespellForm"] = target.dataset.buffenemyform;
      gameInformation['spells'][item.dataset.spell+"DespellElement"] = target.dataset.buffenemyelement;
    }
  }

}

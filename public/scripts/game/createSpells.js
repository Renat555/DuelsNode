"use strict";
import gameInformation from './../gameInformation.js';

let divSpells = document.querySelectorAll("[data-spellform]");
let divForms = document.querySelectorAll("[data-form]");
let divElements = document.querySelectorAll("[data-element]");
let divDebuffs = document.querySelectorAll("[data-debuffForm]");
let divEnemyBuffs = document.querySelectorAll("[data-buffEnemyForm]");

function clearAllForms () {
  for (let item of divForms) {
    item.dataset.status = (item.dataset.status == "forbidden") ? "forbidden" : "notSelected";
    item.classList.remove("selected");
  }
}

function clearRedForms() {
  for (let item of divForms) {
    item.dataset.status = (item.dataset.status == "selected") ? "selected" : "notSelected";
    item.classList.remove("red");
  }
}

function clearAllElements () {
  for (let item of divElements) {
    item.dataset.status = (item.dataset.status == "forbidden") ? "forbidden" : "notSelected";
    item.classList.remove("selected");
  }
}

function clearRedElements() {
  for (let item of divElements) {
    item.dataset.status = (item.dataset.status == "selected") ? "selected" : "notSelected";
    item.classList.remove("red");
  }
}

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

function fillSpell () {
  for (let item of divSpells) {
    if (item.dataset.status == "selected" && item.dataset.spellelement != "undefind" && item.dataset.spellform != "undefind") {
      item.innerHTML = gameInformation['dictionary'][item.dataset.spellelement + item.dataset.spellform];
    }
  }
}

function forbidForm(element) {
  clearRedForms();
  for (let item of divSpells) {
    if (item.dataset.status == "notSelected" && item.dataset.spellelement == element) {
      let forbiddenForm = item.dataset.spellform;
      for (let form of divForms) {
        if (form.dataset.form == forbiddenForm) {
          form.classList.add("red");
          form.dataset.status = "forbidden";
        }
      }
    }
  }
}

function forbidElement(form) {
  clearRedElements();
  for (let item of divSpells) {
    if (item.dataset.status == "notSelected" && item.dataset.spellform == form) {
      let forbiddenElement = item.dataset.spellelement;
      for (let element of divElements) {
        if (element.dataset.element == forbiddenElement) {
          element.classList.add("red");
          element.dataset.status = "forbidden";
        }
      }
    }
  }
}

function addForm (event) {
  let target = event.target;

  if (!target.dataset.form || target.dataset.status == "forbidden") return;
  forbidElement(target.dataset.form);
  clearAllForms();

  target.dataset.status = "selected";
  target.classList.add("selected");

  for (let item of divSpells) {
    if (item.dataset.status == "selected") {
      item.dataset.spellform = target.dataset.form;
      gameInformation['spells'][item.dataset.spell+"Form"] = target.dataset.form;
    }
  }
  fillSpell();
}

function addElement (event) {
  let target = event.target;

  if (!target.dataset.element || target.dataset.status == "forbidden") return;
  forbidForm(target.dataset.element);
  clearAllElements();

  target.dataset.status = "selected";
  target.classList.add("selected");

  for (let item of divSpells) {
    if (item.dataset.status == "selected") {
      item.dataset.spellelement = target.dataset.element;
      gameInformation['spells'][item.dataset.spell+"Element"] = target.dataset.element;
    }
  }
  fillSpell();
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

document.addEventListener("click", addEnemyBuff);
document.addEventListener("click", addDebuff);
document.addEventListener("click", createSpell);

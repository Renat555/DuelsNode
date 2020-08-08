"use strict";
import gameInformation from './../gameInformation.js';

let dictionary = {
  fire: "Огонь",
  water: "Вода",
  earth: "Земля",
  air: "Воздух",
  life: "Жизнь",
  death: "Смерть",
  spear: "Копье",
  shild: "Щит",
  crown: "Корона",
  source: "Источник",
  sphere: "Сфера",
  stamp: "Печать",
  key: "Ключ",
  flow: "Поток",
  power: "Власть"
}

function deleteBr(string) {
  if (string == null) return "";

  while (true) {
		let pos = string.indexOf("<br><br>");
		if (pos == -1) break;
		let first = string.slice(0, pos);
		let second = string.slice(pos+8);
		string = first + "<br>" + second;
	}

	let letters = string.slice(0, 4);
	if (letters == "<br>") string = string.slice(4);
	letters = string.slice(- 4);
	if (letters == "<br>") string = string.slice(0, -4);

	return string;
}

function fillDescription() {
  let divDescription = document.getElementsByClassName("description")[0];
  divDescription.innerHTML = "Активность за ход: <br>" + deleteBr(gameInformation['muveInformation']['description']);
}

export default function fillInterface() {
  console.log(gameInformation['muveInformation']);

  let enemyName = document.getElementById('enemyName');
  enemyName.innerHTML = "Противник: " + gameInformation['muveInformation']['enemyName'];

  let divDebuffsEnemy = document.querySelectorAll("[data-debuffEnemyElement]");
  for (let i = 0; i < divDebuffsEnemy.length; i++) {
    let debuffEnemyElement = gameInformation['muveInformation']['debuffsEnemy'][i]['debuffElement'];
    let debuffEnemyForm = gameInformation['muveInformation']['debuffsEnemy'][i]['debuffForm'];
    divDebuffsEnemy[i].setAttribute("data-debuffEnemyElement", debuffEnemyElement);
    divDebuffsEnemy[i].setAttribute("data-debuffEnemyForm", debuffEnemyForm);
    divDebuffsEnemy[i].setAttribute("data-duration", gameInformation['muveInformation']['debuffsEnemy'][i]['duration']);
    divDebuffsEnemy[i].innerHTML = gameInformation['dictionary'][debuffEnemyElement + debuffEnemyForm];
    if (gameInformation['dictionary'][debuffEnemyElement + debuffEnemyForm] === undefined) {
      divDebuffsEnemy[i].innerHTML = "";
    }
  }

  let divBuffsEnemy = document.querySelectorAll("[data-buffEnemyElement]");
  for (let i = 0; i < divBuffsEnemy.length; i++) {
    let buffEnemyElement = gameInformation['muveInformation']['buffsEnemy'][i]['buffElement'];
    let buffEnemyForm = gameInformation['muveInformation']['buffsEnemy'][i]['buffForm'];
    divBuffsEnemy[i].setAttribute("data-buffEnemyElement", buffEnemyElement);
    divBuffsEnemy[i].setAttribute("data-buffEnemyForm", buffEnemyForm);
    divBuffsEnemy[i].setAttribute("data-duration", gameInformation['muveInformation']['buffsEnemy'][i]['duration']);
    divBuffsEnemy[i].innerHTML = gameInformation['dictionary'][buffEnemyElement + buffEnemyForm];
    if (gameInformation['dictionary'][buffEnemyElement + buffEnemyForm] === undefined) {
      divBuffsEnemy[i].innerHTML = "";
    }
  }

  let divBuffs = document.querySelectorAll("[data-buffElement]");
  for (let i = 0; i < divBuffs.length; i++) {
    let buffElement = gameInformation['muveInformation']['buffs'][i]['buffElement'];
    let buffForm = gameInformation['muveInformation']['buffs'][i]['buffForm'];
    divBuffs[i].setAttribute("data-buffElement", buffElement);
    divBuffs[i].setAttribute("data-buffForm", buffForm);
    divBuffs[i].setAttribute("data-duration", gameInformation['muveInformation']['buffs'][i]['duration']);
    divBuffs[i].innerHTML = gameInformation['dictionary'][buffElement + buffForm];
    if (gameInformation['dictionary'][buffElement + buffForm] === undefined) {
      divBuffs[i].innerHTML = "";
    }
  }

  let divDebuffs = document.querySelectorAll("[data-debuffElement]");
  for (let i = 0; i < divDebuffs.length; i++) {
    let debuffElement = gameInformation['muveInformation']['debuffs'][i]['debuffElement'];
    let debuffForm = gameInformation['muveInformation']['debuffs'][i]['debuffForm'];
    divDebuffs[i].setAttribute("data-debuffElement", debuffElement);
    divDebuffs[i].setAttribute("data-debuffForm", debuffForm);
    divDebuffs[i].setAttribute("data-duration", gameInformation['muveInformation']['debuffs'][i]['duration']);
    divDebuffs[i].innerHTML = gameInformation['dictionary'][debuffElement + debuffForm];
    if (gameInformation['dictionary'][debuffElement + debuffForm] === undefined) {
      divDebuffs[i].innerHTML = "";
    }
  }

  let divEnemySpells = document.querySelectorAll("[data-spell]");
  for (let i = 0; i < gameInformation['muveInformation']['spells'].length; i++) {
    let spellElement = gameInformation['muveInformation']['spells'][i]['spellElement'];
    let spellForm = gameInformation['muveInformation']['spells'][i]['spellForm'];
    divEnemySpells[i].innerHTML = gameInformation['dictionary'][spellElement + spellForm];
  }

  let elements = document.querySelectorAll("[data-element]");
  for (let i = 0; i < gameInformation['muveInformation']['elements'].length; i++) {
    elements[i].innerHTML = dictionary[gameInformation['muveInformation']['elements'][i]['element']];
    elements[i].setAttribute("data-element", gameInformation['muveInformation']['elements'][i]['element']);
  }

  let forms = document.querySelectorAll("[data-form]");
  for (let i = 0; i < gameInformation['muveInformation']['forms'].length; i++) {
    forms[i].innerHTML = dictionary[gameInformation['muveInformation']['forms'][i]['form']];
    forms[i].setAttribute("data-form", gameInformation['muveInformation']['forms'][i]['form']);
  }

  let healthEnemy = document.getElementById('healthEnemy');
  let percentHealthEnemy = Math.round(gameInformation['muveInformation']['currentHealthEnemy']*100/gameInformation['muveInformation']['maxHealthEnemy']);
  healthEnemy.style.width = percentHealthEnemy + "%";
  healthEnemy.style.marginLeft = 100 - percentHealthEnemy + "%";
  healthEnemy.innerHTML = gameInformation['muveInformation']['currentHealthEnemy'];

  let healthUser = document.getElementById('health');
  let percentHealth = Math.round(gameInformation['muveInformation']['currentHealth']*100/gameInformation['muveInformation']['maxHealth']);
  healthUser.style.width = percentHealth + "%";
  healthUser.style.marginLeft = 100 - percentHealth + "%";
  healthUser.innerHTML = gameInformation['muveInformation']['currentHealth'];

  fillDescription();

  if (gameInformation['muveInformation']['currentHealth'] <= 0) {
    alert("Вы проиграли! Победил: " + gameInformation['muveInformation']['enemyName'] + "!");
    window.location.href = '../createHero/createHero.html';
  } else if (gameInformation['muveInformation']['currentHealthEnemy'] <= 0) {
    alert("Вы победили! " + gameInformation['muveInformation']['enemyName'] + " проиграл!");
    window.location.href = '../createHero/createHero.html';
  } else if (gameInformation['muveInformation']['currentHealthEnemy'] <= 0 && gameInformation['muveInformation']['currentHealth'] <= 0) {
    alert("Ничья!");
    window.location.href = '../createHero/createHero.html';
  }

}

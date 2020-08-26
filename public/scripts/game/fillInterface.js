"use strict";

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

function fillInterface1() {
  console.log(gameInformation['muveInformation']);

  let enemyName = document.getElementById('enemyName');
  enemyName.innerHTML = "Противник: " + gameInformation['muveInformation']['enemyName'];

  let divEnemySpells = document.querySelectorAll("[data-spell]");
  for (let i = 0; i < gameInformation['muveInformation']['spells'].length; i++) {
    let spellElement = gameInformation['muveInformation']['spells'][i]['spellElement'];
    let spellForm = gameInformation['muveInformation']['spells'][i]['spellForm'];
    divEnemySpells[i].innerHTML = gameInformation['dictionary'][spellElement + spellForm];
  }

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







function createBattleField() {
  let battleField = document.getElementById('battleField');

  for (let i = 0; i < 80; i++) {
    let div = document.createElement('div');
    div.classList.add('battleSquare');
    battleField.append(div);
  }
}

function fillForms(forms) {
  let divForms = document.querySelectorAll("[data-form]");
  for (let i = 0; i < 5; i++) {
    divForms[i].innerHTML = dictionaryForms[forms[i]];
    divForms[i].setAttribute("data-form", forms[i]);
  }
}

function fillElements(elements) {
  let divElements = document.querySelectorAll("[data-element]");
  for (let i = 0; i < 3; i++) {
    divElements[i].innerHTML = dictionaryElements[elements[i]];
    divElements[i].setAttribute("data-element", elements[i]);
  }
}

function fillHealth(users) {
  let healthEnemy = document.getElementById('healthEnemy');
  let percentHealthEnemy = Math.round(users['enemy']['health']*100/users['enemy']['maxHealth']);
  healthEnemy.style.width = percentHealthEnemy + "%";
  healthEnemy.style.marginLeft = 100 - percentHealthEnemy + "%";
  healthEnemy.innerHTML = users['enemy']['health'];

  let healthUser = document.getElementById('health');
  let percentHealth = Math.round(users['user']['health']*100/users['user']['maxHealth']);
  healthUser.style.width = percentHealth + "%";
  healthUser.style.marginLeft = 100 - percentHealth + "%";
  healthUser.innerHTML = users['user']['health'];
}

function fillEffects(userBuffs, userDebuffs, enemyBuffs, enemyDebuffs) {
  let divUserEffects = document.getElementById("userEffects");
  let divEnemyEffect = document.getElementById("enemyEffects");

  for (let i = 0; i < userBuffs.length; i++) {
    let divBuff = document.createElement('div');
    divBuff.setAttribute('data-buffElement', userBuffs[i][0]);
    divBuff.setAttribute('data-buffForm', userBuffs[i][1]);
    divBuff.setAttribute('data-duration', userBuffs[i][2]);
    divBuff.setAttribute('data-status', 'notSelected');
    divBuff.classList.add('spell');
    divBuff.classList.add('effect');
    divBuff.innerHTML = dictionarySpells[userBuffs[i][0] + userBuffs[i][1]];
    divUserEffects.append(divBuff);
  }

  for (let i = 0; i < userDebuffs.length; i++) {
    let divDebuff = document.createElement('div');
    divDebuff.setAttribute('data-debuffElement', userDebuffs[i][0]);
    divDebuff.setAttribute('data-debuffForm', userDebuffs[i][1]);
    divDebuff.setAttribute('data-duration', userDebuffs[i][2]);
    divDebuff.setAttribute('data-status', 'notSelected');
    divDebuff.classList.add('spell');
    divDebuff.classList.add('effect');
    divDebuff.innerHTML = dictionarySpells[userDebuffs[i][0] + userDebuffs[i][1]];
    divUserEffects.append(divDebuff);
  }

  for (let i = 0; i < enemyBuffs.length; i++) {
    let divBuff = document.createElement('div');
    divBuff.setAttribute('data-buffElement', enemyBuffs[i][0]);
    divBuff.setAttribute('data-buffForm', enemyBuffs[i][1]);
    divBuff.setAttribute('data-duration', enemyBuffs[i][2]);
    divBuff.setAttribute('data-status', 'notSelected');
    divBuff.classList.add('spell');
    divBuff.classList.add('effect');
    divBuff.innerHTML = dictionarySpells[enemyBuffs[i][0] + enemyBuffs[i][1]];
    divEnemyEffect.append(divBuff);
  }

  for (let i = 0; i < enemyDebuffs.length; i++) {
    let divDebuff = document.createElement('div');
    divDebuff.setAttribute('data-debuffElement', enemyDebuffs[i][0]);
    divDebuff.setAttribute('data-debuffForm', enemyDebuffs[i][1]);
    divDebuff.setAttribute('data-duration', enemyDebuffs[i][2]);
    divDebuff.setAttribute('data-status', 'notSelected');
    divDebuff.classList.add('spell');
    divDebuff.classList.add('effect');
    divDebuff.innerHTML = dictionarySpells[enemyDebuffs[i][0] + enemyDebuffs[i][1]];
    divEnemyEffect.append(divDebuff);
  }

}

function hideMuveText(muveUser) {
  let divUserMuve = document.getElementById('userMuve');
  let divEnemyMuve = document.getElementById('enemyMuve');
  if (muveUser === 1) {
    divUserMuve.hidden = false;
    divEnemyMuve.hidden = true;
  } else {
    divUserMuve.hidden = true;
    divEnemyMuve.hidden = false;
  }
}

function hideWaitingScreen() {
  let divWaitingScreen = document.getElementById('fixed');
  divWaitingScreen.hidden = true;
}

function fillInterface(users) {
  createBattleField();
  fillForms(users['user']['forms']);
  fillElements(users['user']['elements']);
  fillHealth(users);
  fillEffects(users['user']['buffs'], users['user']['debuffs'], users['enemy']['buffs'], users['enemy']['debuffs']);
  hideMuveText(users['user']['muve'], users['enemy']['muve'])
  hideWaitingScreen();
}

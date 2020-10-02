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






function fillEnemyName(enemy) {
  let enemyName = document.getElementById('enemyName');
  enemyName.innerHTML = "Противник: " + enemy['name'];
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

function fillPoints(user) {
  let divActionPoints = document.getElementById('actionPoints');
  let divEnergyPoints = document.getElementById('energyPoints');

  divActionPoints.innerHTML = user['actionPoints'];
  divEnergyPoints.innerHTML = user['energyPoints'];
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
  fillEnemyName(users['enemy']);
  fillForms(users['user']['forms']);
  fillElements(users['user']['elements']);
  fillHealth(users);
  fillEffects(users['user']['buffs'], users['user']['debuffs'], users['enemy']['buffs'], users['enemy']['debuffs']);
  fillPoints(users['user']);
  hideMuveText(users['user']['muve'], users['enemy']['muve']);
  showHints();
  
  let gameInformation = users;
  gameInformation['header'] = 'restoreGame';
  localStorage.setItem('gameInformation', JSON.stringify(gameInformation));

  hideWaitingScreen();
}

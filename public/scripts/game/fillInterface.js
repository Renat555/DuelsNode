"use strict";

function fillEnemyName(enemy) {
  let enemyName = document.getElementById("enemyName");
  enemyName.innerHTML = "Противник: " + enemy["name"];
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
  let healthEnemy = document.getElementById("healthEnemy");
  let percentHealthEnemy = Math.round(
    (users["enemy"]["health"] * 100) / users["enemy"]["maxHealth"]
  );
  healthEnemy.style.width = percentHealthEnemy + "%";
  healthEnemy.style.marginLeft = 100 - percentHealthEnemy + "%";
  healthEnemy.innerHTML = users["enemy"]["health"];

  let healthUser = document.getElementById("health");
  let percentHealth = Math.round(
    (users["user"]["health"] * 100) / users["user"]["maxHealth"]
  );
  healthUser.style.width = percentHealth + "%";
  healthUser.style.marginLeft = 100 - percentHealth + "%";
  healthUser.innerHTML = users["user"]["health"];
}

function firstFillPoints(users) {
  let divActionPoints = document.getElementById("actionPoints");
  let divEnergyPoints = document.getElementById("energyPoints");
  let divEnemyActionPoints = document.getElementById("enemyActionPoints");
  let divEnemyEnergyPoints = document.getElementById("enemyEnergyPoints");

  divEnemyActionPoints.innerHTML = users["enemy"]["actionPoints"];
  divEnemyEnergyPoints.innerHTML = users["enemy"]["energyPoints"];
  divActionPoints.innerHTML = users["user"]["actionPoints"];
  divEnergyPoints.innerHTML = users["user"]["energyPoints"];
}

function fillBattlfield(userMuve) {
  let divUser = document.createElement("div");
  divUser.style.cssText = `
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  `;

  let divEnemy = document.createElement("div");
  divEnemy.style.cssText = `
  position: absolute;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  `;

  if (userMuve === 1) {
    divUser.style.backgroundImage = "url(../../img/game/heroes/a1.png)";
    divUser.dataset.hero = "user";
    divUser.dataset.picture = "a";
    divEnemy.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
    divEnemy.dataset.hero = "enemy";
    divEnemy.dataset.picture = "c";
  } else {
    divUser.style.backgroundImage = "url(../../img/game/heroes/c1.png)";
    divUser.dataset.hero = "user";
    divUser.dataset.picture = "c";
    divEnemy.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
    divEnemy.dataset.hero = "enemy";
    divEnemy.dataset.picture = "a";
  }

  let divSquareUser = document.querySelector(`[data-row="0"][data-col="3"]`);
  divSquareUser.dataset.player = "user";
  let coordSquareUser = divSquareUser.getBoundingClientRect();
  divUser.style.height =
    coordSquareUser.height - coordSquareUser.height / 10 + "px";
  divUser.style.width =
    coordSquareUser.width - coordSquareUser.width / 10 + "px";
  divUser.style.left = coordSquareUser.left + coordSquareUser.width / 20 + "px";
  divUser.style.top = coordSquareUser.top + coordSquareUser.height / 20 + "px";

  let divSquareEnemy = document.querySelector(`[data-row="6"][data-col="3"]`);
  divSquareEnemy.dataset.player = "enemy";
  let coordSquareEnemy = divSquareEnemy.getBoundingClientRect();
  divEnemy.style.height =
    coordSquareEnemy.height - coordSquareEnemy.height / 10 + "px";
  divEnemy.style.width =
    coordSquareEnemy.width - coordSquareEnemy.width / 10 + "px";
  divEnemy.style.left =
    coordSquareEnemy.left + coordSquareEnemy.width / 20 + "px";
  divEnemy.style.top =
    coordSquareEnemy.top + coordSquareEnemy.height / 20 + "px";

  document.body.append(divUser);
  document.body.append(divEnemy);
}

function hideMuveText(muveUser) {
  let divUserMuve = document.getElementById("userMuve");
  let divEnemyMuve = document.getElementById("enemyMuve");
  if (muveUser === 1) {
    divUserMuve.hidden = false;
    divEnemyMuve.hidden = true;
  } else {
    divUserMuve.hidden = true;
    divEnemyMuve.hidden = false;
  }
}

function hideWaitingScreen() {
  let divWaitingScreen = document.getElementsByClassName("backdrop")[0];
  divWaitingScreen.hidden = true;
}

function fillInterface(users) {
  fillEnemyName(users["enemy"]);
  fillForms(users["user"]["forms"]);
  fillElements(users["user"]["elements"]);
  firstFillPoints(users);
  fillHealth(users);
  fillBattlfield(users["user"]["muve"]);
  hideMuveText(users["user"]["muve"], users["enemy"]["muve"]);
  showHints();

  let gameInformation = users;
  gameInformation["header"] = "restoreGame";
  localStorage.setItem("gameInformation", JSON.stringify(gameInformation));

  hideWaitingScreen();
}

function fillHealth(users) {
  let healthEnemy = document.getElementById("healthEnemy");
  let percentHealthEnemy = Math.round(
    (users["enemy"]["health"] * 100) / users["enemy"]["maxHealth"]
  );
  healthEnemy.style.width = percentHealthEnemy + "%";
  healthEnemy.style.marginLeft = 100 - percentHealthEnemy + "%";
  healthEnemy.innerHTML = users["enemy"]["health"] + "&nbsp";

  let healthUser = document.getElementById("health");
  let percentHealth = Math.round(
    (users["user"]["health"] * 100) / users["user"]["maxHealth"]
  );
  healthUser.style.width = percentHealth + "%";
  healthUser.style.marginLeft = 100 - percentHealth + "%";
  healthUser.innerHTML = users["user"]["health"] + "&nbsp";
}

function fillEffects(userBuffs, userDebuffs, enemyBuffs, enemyDebuffs) {
  let divUserEffects = document.getElementById("userEffects");
  let divEnemyEffects = document.getElementById("enemyEffects");

  while (divUserEffects.childNodes[0]) {
    divUserEffects.childNodes[0].remove();
  }

  while (divEnemyEffects.childNodes[0]) {
    divEnemyEffects.childNodes[0].remove();
  }

  for (let i = 0; i < userBuffs.length; i++) {
    let divBuff = document.createElement("div");
    divBuff.setAttribute("data-spell", userBuffs[i][0]);
    divBuff.setAttribute("data-duration", userBuffs[i][1]);
    divBuff.setAttribute("data-status", "notSelected");
    divBuff.classList.add("spell");
    divBuff.classList.add("effect");
    divBuff.innerHTML = spellbook[userBuffs[i][0]][0];
    divUserEffects.append(divBuff);
  }

  for (let i = 0; i < userDebuffs.length; i++) {
    let divDebuff = document.createElement("div");
    divDebuff.setAttribute("data-spell", userDebuffs[i][0]);
    divDebuff.setAttribute("data-duration", userDebuffs[i][1]);
    divDebuff.setAttribute("data-status", "notSelected");
    divDebuff.classList.add("spell");
    divDebuff.classList.add("effect");
    divDebuff.innerHTML = spellbook[userDebuffs[i][0]][0];
    divUserEffects.append(divDebuff);
  }

  for (let i = 0; i < enemyBuffs.length; i++) {
    let divBuff = document.createElement("div");
    divBuff.setAttribute("data-spell", enemyBuffs[i][0]);
    divBuff.setAttribute("data-duration", enemyBuffs[i][1]);
    divBuff.setAttribute("data-status", "notSelected");
    divBuff.classList.add("spell");
    divBuff.classList.add("effect");
    divBuff.innerHTML = spellbook[enemyBuffs[i][0]][0];
    divEnemyEffects.append(divBuff);
  }

  for (let i = 0; i < enemyDebuffs.length; i++) {
    let divDebuff = document.createElement("div");
    divDebuff.setAttribute("data-spell", enemyDebuffs[i][0]);
    divDebuff.setAttribute("data-duration", enemyDebuffs[i][1]);
    divDebuff.setAttribute("data-status", "notSelected");
    divDebuff.classList.add("spell");
    divDebuff.classList.add("effect");
    divDebuff.innerHTML = spellbook[enemyDebuffs[i][0]][0];
    divEnemyEffects.append(divDebuff);
  }

  if (divUserEffects.innerHTML == "") {
    divUserEffects.innerHTML = "Нет активных эффектов.";
  }

  if (divEnemyEffects.innerHTML == "") {
    divEnemyEffects.innerHTML = "Нет активных эффектов.";
  }
}

function fillPoints(user) {
  let divActionPoints = document.getElementById("actionPoints");
  let divEnergyPoints = document.getElementById("energyPoints");

  divActionPoints.innerHTML = user["actionPoints"];
  divEnergyPoints.innerHTML = user["energyPoints"];
}

function fillDescription(description, header) {
  let divDescription = document.getElementsByClassName("description")[0];

  if (header == "changeMuve") {
    if (description) description += "<br>";

    divDescription.innerHTML =
      description +
      "&#9884;&#9884;&#9884;&#9884;&#9884;&#9884;&#9884;" +
      "<br>" +
      divDescription.innerHTML;
  } else {
    divDescription.innerHTML = description + "<br>" + divDescription.innerHTML;
  }
}

function recreateBattlefieldSpell() {
  let divSpell = document.getElementsByClassName("userSpell")[0];
  let spell = divSpell.dataset.spell;

  let divEnemyEffect = document.getElementById("enemyEffects");
  let enemyEffects = divEnemyEffect.querySelectorAll("[data-duration]");
  let divUserEffect = document.getElementById("userEffects");
  let userEffects = divUserEffect.querySelectorAll("[data-duration]");

  let spellInformation = localStorage.getItem("spellInformation");
  spellForDelete = JSON.parse(spellInformation)["despell"];

  switch (spell) {
    case "firekey":
      firekey(enemyEffects);
      break;
    case "watersource":
      watersource(userEffects);
      break;
    case "waterkey":
      waterkey(userEffects);
      break;
    case "watersphere":
      document.addEventListener("mouseover", watersphereMuve);
      break;
    case "earthshild":
      document.addEventListener("mouseover", earthshildMuve);
      break;
    case "earthkey":
      earthkey(userEffects);
      break;
    case "airkey":
      airkey(enemyEffects);
      break;
    case "lifespear":
      lifespear(userEffects);
      break;
    case "lifekey":
      lifekey(userEffects);
      break;
    case "deathspear":
      deathspear(enemyEffects);
      break;
    case "deathpower":
      deathpower(enemyEffects);
      break;
  }
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

function isGameOver(userHealth, enemyHealth, enemyName) {
  if (userHealth <= 0 && enemyHealth > 0) {
    ws.close(1000, "gameOver");
    alert("Вы проиграли! Победил " + enemyName + "!");
  } else if (enemyHealth <= 0 && userHealth > 0) {
    ws.close(1000, "gameOver");
    alert("Вы победили! " + enemyName + " проиграл!");
  } else if (userHealth <= 0 && enemyHealth <= 0) {
    ws.close(1000, "gameOver");
    alert("Ничья!");
  }
}

function changeInterface(users) {
  fillHealth(users);
  fillEffects(
    users["user"]["buffs"],
    users["user"]["debuffs"],
    users["enemy"]["buffs"],
    users["enemy"]["debuffs"]
  );
  fillPoints(users["user"]);
  fillDescription(users["user"]["description"], users["header"]);
  recreateBattlefieldSpell();
  hideMuveText(users["user"]["muve"], users["enemy"]["muve"]);
  showHints();
  isGameOver(
    users["user"]["health"],
    users["enemy"]["health"],
    users["enemy"]["name"]
  );
}

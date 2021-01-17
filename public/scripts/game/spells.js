import { spellbook } from "./dictionaries.js";
import { chooseEffect } from "./createSpells.js";
import * as sounds from "./sounds.js";
import { removeBattlefieldObjects } from "./clearUserSpell.js";
import { muveUser } from "./muveUser.js";

export function firekey(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["firekey"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundFire);
}

export function watersource(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["watersource"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundWater);
}

export function waterkey(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["waterkey"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundWater);
}

export function earthkey(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["earthkey"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundEarth);
}

export function airkey(enemyEffects) {
  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["airkey"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundAir);
}

export function lifespear(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["lifespear"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundLife);
}

export function lifekey(userEffects) {
  for (let i = 0; i < userEffects.length; i++) {
    if (spellbook["lifekey"][4].indexOf(userEffects[i].dataset.spell) == -1)
      continue;
    userEffects[i].addEventListener("click", chooseEffect);
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundLife);
}

export function deathspear(enemyEffects) {
  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];

  for (let i = 0; i < enemyEffects.length; i++) {
    if (enemyEffects[i].dataset.spell == "lifepower") {
      enemyEffects[i].addEventListener("click", chooseEffect);
      buttonActivationSpell.addEventListener("click", sounds.soundDeath);
      return;
    }
  }

  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["deathspear"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
  }

  buttonActivationSpell.addEventListener("click", sounds.soundDeath);
}

export function deathpower(enemyEffects) {
  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];

  for (let i = 0; i < enemyEffects.length; i++) {
    if (enemyEffects[i].dataset.spell == "lifepower") {
      enemyEffects[i].addEventListener("click", chooseEffect);
      buttonActivationSpell.addEventListener("click", sounds.soundDeath);
      return;
    }
  }

  for (let i = 0; i < enemyEffects.length; i++) {
    if (spellbook["deathpower"][4].indexOf(enemyEffects[i].dataset.spell) == -1)
      continue;
    enemyEffects[i].addEventListener("click", chooseEffect);
    buttonActivationSpell.addEventListener("click", sounds.soundDeath);
  }
}

export function earthshildMuve(event) {
  removeBattlefieldObjects();

  let target = event.target;
  if (!target.dataset.row) return;
  if (target.dataset.player) return;
  if (target.dataset.spell) return;

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  target.classList.add("earthshild");
  target.style.opacity = 0.7;
  target.dataset.state = "preparing";

  let divSquareLeft = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${+target.dataset.col - 1}"]`
  );

  if (
    divSquareLeft &&
    !divSquareLeft.dataset.player &&
    !divSquareLeft.dataset.spell
  ) {
    divSquareLeft.classList.add("earthshild");
    divSquareLeft.style.opacity = 0.7;
    divSquareLeft.dataset.state = "preparing";
  }

  let divSquareRight = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${+target.dataset.col + 1}"]`
  );

  if (
    divSquareRight &&
    !divSquareRight.dataset.player &&
    !divSquareRight.dataset.spell
  ) {
    divSquareRight.classList.add("earthshild");
    divSquareRight.style.opacity = 0.7;
    divSquareRight.dataset.state = "preparing";
  }
}

export function earthshildPreparing(event) {
  let target = event.target;
  if (!target.dataset.row) return;

  document.removeEventListener("mouseover", earthshildMuve);

  let earthshild = { header: "battlefieldSpell", spell: ["earthshild", 5] };

  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      let coord = [];
      coord[0] = battlefield[i].dataset.row;
      coord[1] = battlefield[i].dataset.col;
      earthshild["spell"].push(coord);
    }
  }

  localStorage.setItem("spellInformation", JSON.stringify(earthshild));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", earthshildApproval);
  buttonActivationSpell.addEventListener("click", sounds.soundEarth);

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.addEventListener("click", muveUser);
}

export function earthshildApproval() {
  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].classList.contains("earthshild")) {
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.spell = "earthshild";
      battlefield[i].dataset.state = "approval";
      battlefield[i].dataset.duration = "5";
    }
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.removeEventListener("click", earthshildApproval);
}

export function watersphereMuve(event) {
  removeBattlefieldObjects();

  let target = event.target;

  if (target.dataset.hero == "user") {
    target = document.querySelector("[data-player='user']");
  } else if (target.dataset.hero == "enemy") {
    target = document.querySelector("[data-player='enemy']");
  }

  if (!target.dataset.row) return;
  if (target.dataset.spell) return;

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  target.classList.add("watersphere");
  target.style.opacity = 0.7;
  target.dataset.state = "preparing";

  let divSquareBottom = document.querySelector(
    `[data-row="${+target.dataset.row - 1}"][data-col="${target.dataset.col}"]`
  );

  if (divSquareBottom && !divSquareBottom.dataset.spell) {
    divSquareBottom.classList.add("watersphere");
    divSquareBottom.style.opacity = 0.7;
    divSquareBottom.dataset.state = "preparing";
  }

  let divSquareRight = document.querySelector(
    `[data-row="${target.dataset.row}"][data-col="${+target.dataset.col + 1}"]`
  );

  if (divSquareRight && !divSquareRight.dataset.spell) {
    divSquareRight.classList.add("watersphere");
    divSquareRight.style.opacity = 0.7;
    divSquareRight.dataset.state = "preparing";
  }

  let divSquareRightBottom = document.querySelector(
    `[data-row="${+target.dataset.row - 1}"][data-col="${
      +target.dataset.col + 1
    }"]`
  );

  if (divSquareRightBottom && !divSquareRightBottom.dataset.spell) {
    divSquareRightBottom.classList.add("watersphere");
    divSquareRightBottom.style.opacity = 0.7;
    divSquareRightBottom.dataset.state = "preparing";
  }
}

export function waterspherePreparing(event) {
  let target = event.target;

  if (target.dataset.hero == "user") {
    target = document.querySelector("[data-player='user']");
  } else if (target.dataset.hero == "enemy") {
    target = document.querySelector("[data-player='enemy']");
  }

  if (!target.dataset.row) return;

  document.removeEventListener("mouseover", watersphereMuve);

  let watersphere = { header: "battlefieldSpell", spell: ["watersphere", 3] };

  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      let coord = [];
      coord[0] = battlefield[i].dataset.row;
      coord[1] = battlefield[i].dataset.col;
      watersphere["spell"].push(coord);
    }
  }

  localStorage.setItem("spellInformation", JSON.stringify(watersphere));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", watersphereApproval);
  buttonActivationSpell.addEventListener("click", sounds.soundWater);

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.addEventListener("click", muveUser);
}

export function watersphereApproval() {
  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    if (battlefield[i].dataset.state == "preparing") {
      battlefield[i].style.opacity = 1;
      battlefield[i].dataset.spell = "watersphere";
      battlefield[i].dataset.state = "approval";
      battlefield[i].dataset.duration = "3";
    }
  }

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.removeEventListener("click", watersphereApproval);
}

export function fireSpell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundFire);
}

export function waterSpell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundWater);
}

export function earthSpell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundEarth);
}

export function airSpell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundAir);
}

export function lifeSpell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundLife);
}

export function deathSpell(spellName) {
  let spellInformation = {
    header: "spell",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundDeath);
}

export function fireEffect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundFire);
}

export function waterEffect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundWater);
}

export function earthEffect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundEarth);
}

export function airEffect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundAir);
}

export function lifeEffect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundLife);
}

export function deathEffect(spellName) {
  let spellInformation = {
    header: "effect",
    spell: spellName,
  };
  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");

  let buttonActivationSpell = document.getElementsByName(
    "buttonActiveSpell"
  )[0];
  buttonActivationSpell.addEventListener("click", sounds.soundDeath);
}

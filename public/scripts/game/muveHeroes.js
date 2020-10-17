"use strict";

function muveHero (event) {
  let target = event.target;
  if (!target.dataset.row) return;
  console.log(target);
  let divUser = document.querySelector(`[data-hero="user"]`);
}

let divBattleField = document.getElementsByClassName('battleField')[0];
divBattleField.addEventListener('click', muveHero);
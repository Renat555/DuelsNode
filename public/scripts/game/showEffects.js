"use strict";

function showEffects() {
  let divEffects = document.getElementsByClassName("effects")[0];
  divEffects.hidden = false;

  let divClose = document.getElementsByClassName("close")[0];
  divClose.addEventListener("click", hideEffects);
}

function addShowEffectsOnButton() {
  let buttonShowEffects = document.getElementsByName("buttonShowEffects")[0];
  buttonShowEffects.addEventListener("click", showEffects);
}

addShowEffectsOnButton();

"use strict";

function soundFire() {
  let click = new Audio();
  click.src = "../../public/audio/fire.mp3";
  click.autoplay = true;
}

function soundWater() {
  let click = new Audio();
  click.src = "../../public/audio/water.mp3";
  click.autoplay = true;
}

function soundEarth() {
  let click = new Audio();
  click.src = "../../public/audio/earth.mp3";
  click.autoplay = true;
}

function soundAir() {
  let click = new Audio();
  click.src = "../../public/audio/air.mp3";
  click.autoplay = true;
}

function soundLife() {
  let click = new Audio();
  click.src = "../../public/audio/life.mp3";
  click.autoplay = true;
}

function soundDeath() {
  let click = new Audio();
  click.src = "../../public/audio/death.mp3";
  click.autoplay = true;
}

function buttonClick() {
  let click = new Audio();
  click.src = "../../public/audio/click.mp3";
  click.autoplay = true;
}

buttonMuve.addEventListener("click", buttonClick);

let buttonShowEffects = document.getElementsByName("buttonShowEffects")[0];
buttonShowEffects.addEventListener("click", buttonClick);

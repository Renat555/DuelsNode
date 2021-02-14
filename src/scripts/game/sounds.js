import { isMyMuve } from "./isMyMuve.js";

export function soundFire() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./src/audio/fire.mp3";
  click.autoplay = true;
}

export function soundWater() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./src/audio/water.mp3";
  click.autoplay = true;
}

export function soundEarth() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./src/audio/earth.mp3";
  click.autoplay = true;
}

export function soundAir() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./src/audio/air.mp3";
  click.autoplay = true;
}

export function soundLife() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./src/audio/life.mp3";
  click.autoplay = true;
}

export function soundDeath() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./src/audio/death.mp3";
  click.autoplay = true;
}

export function buttonClick() {
  let click = new Audio();
  click.src = "./src/audio/click.mp3";
  click.autoplay = true;
}

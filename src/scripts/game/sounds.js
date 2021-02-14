import { isMyMuve } from "./isMyMuve.js";

export function soundFire() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./fire.mp3";
  click.autoplay = true;
}

export function soundWater() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./water.mp3";
  click.autoplay = true;
}

export function soundEarth() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./earth.mp3";
  click.autoplay = true;
}

export function soundAir() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./air.mp3";
  click.autoplay = true;
}

export function soundLife() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./life.mp3";
  click.autoplay = true;
}

export function soundDeath() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "./death.mp3";
  click.autoplay = true;
}

export function buttonClick() {
  let click = new Audio();
  click.src = "./click.mp3";
  click.autoplay = true;
}

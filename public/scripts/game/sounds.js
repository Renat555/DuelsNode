export function isMyMuve() {
  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return false;
  return true;
}

export function soundFire() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "../../public/audio/fire.mp3";
  click.autoplay = true;
}

export function soundWater() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "../../public/audio/water.mp3";
  click.autoplay = true;
}

export function soundEarth() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "../../public/audio/earth.mp3";
  click.autoplay = true;
}

export function soundAir() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "../../public/audio/air.mp3";
  click.autoplay = true;
}

export function soundLife() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "../../public/audio/life.mp3";
  click.autoplay = true;
}

export function soundDeath() {
  if (!isMyMuve()) return;
  let click = new Audio();
  click.src = "../../public/audio/death.mp3";
  click.autoplay = true;
}

export function buttonClick() {
  let click = new Audio();
  click.src = "../../public/audio/click.mp3";
  click.autoplay = true;
}

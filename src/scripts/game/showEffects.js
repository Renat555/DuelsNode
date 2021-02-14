import { hideEffects } from "./fillInterface.js";

export function showEffects() {
  let divEffects = document.getElementsByClassName("effects")[0];
  divEffects.hidden = false;

  let divClose = document.getElementsByClassName("close")[0];
  divClose.addEventListener("click", hideEffects);
}

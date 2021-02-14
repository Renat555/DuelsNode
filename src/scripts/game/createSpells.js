import { spellbook } from "./dictionaries";
import * as spells from "./spells";
import { trajectoryCalculationOrMuveUser } from "./muving/trajectoryCalculationOrMuveUser";
import {
  clearEffects,
  removeBattlefieldObjects,
  removeBattlefieldSpell,
  removeSounds,
} from "./clearUserSpell.js";

function chooseEffect(event) {
  clearEffects();

  let target = event.target;
  target.dataset.status = "selected";
  target.classList.add("selectedEffect");

  let divSpell = document.querySelector(".userSpell");

  let spellInformation = {
    header: "despell",
    spell: divSpell.dataset.spell,
    despell: target.dataset.spell,
  };

  localStorage.setItem("spellInformation", JSON.stringify(spellInformation));
  localStorage.setItem("complete", "yes");
}

function createSpell() {
  clearEffects();
  removeBattlefieldObjects();
  removeBattlefieldSpell();
  removeSounds();
  localStorage.setItem("complete", "no");

  let divSpell = document.querySelector(".userSpell");
  let divActionPointsNeed = document.getElementById("actionPointsNeed");
  let divEnergyPointsNeed = document.getElementById("energyPointsNeed");

  if (divSpell.dataset.spellelement != "" && divSpell.dataset.spellform != "") {
    divSpell.dataset.spell =
      divSpell.dataset.spellelement + divSpell.dataset.spellform;
    divSpell.innerHTML = spellbook[divSpell.dataset.spell][0];

    divActionPointsNeed.innerHTML = spellbook[divSpell.dataset.spell][1];
    divEnergyPointsNeed.innerHTML = spellbook[divSpell.dataset.spell][2];
  }

  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden == true) return;

  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.addEventListener("click", trajectoryCalculationOrMuveUser);

  let divEnemyEffect = document.getElementById("enemyEffects");
  let enemyEffects = divEnemyEffect.querySelectorAll("[data-duration]");
  let divUserEffect = document.getElementById("userEffects");
  let userEffects = divUserEffect.querySelectorAll("[data-duration]");

  switch (divSpell.dataset.spell) {
    case "firespear":
      spells.fireSpell(divSpell.dataset.spell);
      break;
    case "fireshild":
      spells.fireEffect(divSpell.dataset.spell);
      break;
    case "firecrown":
      spells.fireEffect(divSpell.dataset.spell);
      break;
    case "firesource":
      spells.fireEffect(divSpell.dataset.spell);
      break;
    case "firesphere":
      spells.fireEffect(divSpell.dataset.spell);
      break;
    case "firestamp":
      spells.fireSpell(divSpell.dataset.spell);
      break;
    case "firekey":
      spells.firekey(enemyEffects);
      break;
    case "fireflow":
      spells.fireSpell(divSpell.dataset.spell);
      break;
    case "firepower":
      spells.fireEffect(divSpell.dataset.spell);
      break;
    case "waterspear":
      spells.waterSpell(divSpell.dataset.spell);
      break;
    case "watershild":
      spells.waterEffect(divSpell.dataset.spell);
      break;
    case "watercrown":
      spells.waterEffect(divSpell.dataset.spell);
      break;
    case "watersource":
      spells.watersource(userEffects);
      break;
    case "watersphere":
      document.addEventListener("mouseover", spells.watersphereMuve);
      document.addEventListener("click", spells.waterspherePreparing);
      break;
    case "waterstamp":
      spells.waterEffect(divSpell.dataset.spell);
      break;
    case "waterkey":
      spells.waterkey(userEffects);
      break;
    case "waterflow":
      spells.waterSpell(divSpell.dataset.spell);
      break;
    case "waterpower":
      spells.waterEffect(divSpell.dataset.spell);
      break;
    case "earthspear":
      spells.earthSpell(divSpell.dataset.spell);
      break;
    case "earthshild":
      document.addEventListener("mouseover", spells.earthshildMuve);
      document.addEventListener("click", spells.earthshildPreparing);
    case "earthcrown":
      spells.earthEffect(divSpell.dataset.spell);
      break;
    case "earthsource":
      spells.earthEffect(divSpell.dataset.spell);
      break;
    case "earthsphere":
      spells.earthEffect(divSpell.dataset.spell);
      break;
    case "earthstamp":
      spells.earthEffect(divSpell.dataset.spell);
      break;
    case "earthkey":
      spells.earthkey(userEffects);
      break;
    case "earthflow":
      spells.earthSpell(divSpell.dataset.spell);
      break;
    case "earthpower":
      spells.earthEffect(divSpell.dataset.spell);
      break;
    case "airspear":
      spells.airSpell(divSpell.dataset.spell);
      break;
    case "airshild":
      spells.airEffect(divSpell.dataset.spell);
      break;
    case "aircrown":
      spells.airEffect(divSpell.dataset.spell);
      break;
    case "airsource":
      spells.airEffect(divSpell.dataset.spell);
      break;
    case "airsphere":
      spells.airEffect(divSpell.dataset.spell);
      break;
    case "airstamp":
      spells.airEffect(divSpell.dataset.spell);
      break;
    case "airkey":
      spells.airkey(enemyEffects);
      break;
    case "airflow":
      spells.airSpell(divSpell.dataset.spell);
      break;
    case "airpower":
      spells.airEffect(divSpell.dataset.spell);
      break;
    case "lifespear":
      spells.lifespear(userEffects);
      break;
    case "lifeshild":
      spells.lifeEffect(divSpell.dataset.spell);
      break;
    case "lifecrown":
      spells.lifeSpell(divSpell.dataset.spell);
      break;
    case "lifesource":
      spells.lifeSpell(divSpell.dataset.spell);
      break;
    case "lifesphere":
      spells.lifeEffect(divSpell.dataset.spell);
      break;
    case "lifestamp":
      spells.lifeEffect(divSpell.dataset.spell);
      break;
    case "lifekey":
      spells.lifekey(userEffects);
      break;
    case "lifeflow":
      spells.lifeEffect(divSpell.dataset.spell);
      break;
    case "lifepower":
      spells.lifeEffect(divSpell.dataset.spell);
      break;
    case "deathspear":
      spells.deathspear(enemyEffects);
      break;
    case "deathshild":
      spells.deathEffect(divSpell.dataset.spell);
      break;
    case "deathcrown":
      spells.deathSpell(divSpell.dataset.spell);
      break;
    case "deathsource":
      spells.deathSpell(divSpell.dataset.spell);
      break;
    case "deathsphere":
      spells.deathEffect(divSpell.dataset.spell);
      break;
    case "deathstamp":
      spells.deathEffect(divSpell.dataset.spell);
      break;
    case "deathkey":
      spells.deathEffect(divSpell.dataset.spell);
      break;
    case "deathflow":
      spells.deathEffect(divSpell.dataset.spell);
      break;
    case "deathpower":
      spells.deathpower(enemyEffects);
      break;
  }
}

export { chooseEffect, createSpell };

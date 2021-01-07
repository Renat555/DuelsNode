"use strict";

function chooseForm(event) {
  let target = event.target;
  if (!target.dataset.form) return;

  clearForms();

  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");
  divSpell.dataset.spellform = target.dataset.form;

  createSpell();
}

function chooseElement(event) {
  let target = event.target;
  if (!target.dataset.element) return;

  clearElements();

  target.dataset.status = "selected";
  target.classList.add("selected");

  let divSpell = document.querySelector(".userSpell");
  divSpell.dataset.spellelement = target.dataset.element;

  createSpell();
}

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

  let divEnemyEffect = document.getElementById("enemyEffects");
  let enemyEffects = divEnemyEffect.querySelectorAll("[data-duration]");
  let divUserEffect = document.getElementById("userEffects");
  let userEffects = divUserEffect.querySelectorAll("[data-duration]");

  switch (divSpell.dataset.spell) {
    case "firespear":
      fireSpell(divSpell.dataset.spell);
      break;
    case "fireshild":
      fireEffect(divSpell.dataset.spell);
      break;
    case "firecrown":
      fireEffect(divSpell.dataset.spell);
      break;
    case "firesource":
      fireEffect(divSpell.dataset.spell);
      break;
    case "firesphere":
      fireEffect(divSpell.dataset.spell);
      break;
    case "firestamp":
      fireSpell(divSpell.dataset.spell);
      break;
    case "firekey":
      firekey(enemyEffects);
      break;
    case "fireflow":
      fireSpell(divSpell.dataset.spell);
      break;
    case "firepower":
      fireEffect(divSpell.dataset.spell);
      break;
    case "waterspear":
      waterSpell(divSpell.dataset.spell);
      break;
    case "watershild":
      waterEffect(divSpell.dataset.spell);
      break;
    case "watercrown":
      waterEffect(divSpell.dataset.spell);
      break;
    case "watersource":
      watersource(userEffects);
      break;
    case "watersphere":
      document.addEventListener("mouseover", watersphereMuve);
      document.addEventListener("click", waterspherePreparing);
      break;
    case "waterstamp":
      waterEffect(divSpell.dataset.spell);
      break;
    case "waterkey":
      waterkey(userEffects);
      break;
    case "waterflow":
      waterSpell(divSpell.dataset.spell);
      break;
    case "waterpower":
      waterEffect(divSpell.dataset.spell);
      break;
    case "earthspear":
      earthSpell(divSpell.dataset.spell);
      break;
    case "earthshild":
      document.addEventListener("mouseover", earthshildMuve);
      document.addEventListener("click", earthshildPreparing);
    case "earthcrown":
      earthEffect(divSpell.dataset.spell);
      break;
    case "earthsource":
      earthEffect(divSpell.dataset.spell);
      break;
    case "earthsphere":
      earthEffect(divSpell.dataset.spell);
      break;
    case "earthstamp":
      earthEffect(divSpell.dataset.spell);
      break;
    case "earthkey":
      earthkey(userEffects);
      break;
    case "earthflow":
      earthSpell(divSpell.dataset.spell);
      break;
    case "earthpower":
      earthEffect(divSpell.dataset.spell);
      break;
    case "airspear":
      airSpell(divSpell.dataset.spell);
      break;
    case "airshild":
      airEffect(divSpell.dataset.spell);
      break;
    case "aircrown":
      airEffect(divSpell.dataset.spell);
      break;
    case "airsource":
      airEffect(divSpell.dataset.spell);
      break;
    case "airsphere":
      airEffect(divSpell.dataset.spell);
      break;
    case "airstamp":
      airEffect(divSpell.dataset.spell);
      break;
    case "airkey":
      airkey(enemyEffects);
      break;
    case "airflow":
      airSpell(divSpell.dataset.spell);
      break;
    case "airpower":
      airEffect(divSpell.dataset.spell);
      break;
    case "lifespear":
      lifespear(userEffects);
      break;
    case "lifeshild":
      lifeEffect(divSpell.dataset.spell);
      break;
    case "lifecrown":
      lifeSpell(divSpell.dataset.spell);
      break;
    case "lifesource":
      lifeSpell(divSpell.dataset.spell);
      break;
    case "lifesphere":
      lifeEffect(divSpell.dataset.spell);
      break;
    case "lifestamp":
      lifeEffect(divSpell.dataset.spell);
      break;
    case "lifekey":
      lifekey(userEffects);
      break;
    case "lifeflow":
      lifeEffect(divSpell.dataset.spell);
      break;
    case "lifepower":
      lifeEffect(divSpell.dataset.spell);
      break;
    case "deathspear":
      deathspear(enemyEffects);
      break;
    case "deathshild":
      deathEffect(divSpell.dataset.spell);
      break;
    case "deathcrown":
      deathSpell(divSpell.dataset.spell);
      break;
    case "deathsource":
      deathSpell(divSpell.dataset.spell);
      break;
    case "deathsphere":
      deathEffect(divSpell.dataset.spell);
      break;
    case "deathstamp":
      deathEffect(divSpell.dataset.spell);
      break;
    case "deathkey":
      deathEffect(divSpell.dataset.spell);
      break;
    case "deathflow":
      deathEffect(divSpell.dataset.spell);
      break;
    case "deathpower":
      deathpower(enemyEffects);
      break;
  }
}

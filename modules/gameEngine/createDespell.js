const spellClasses = require("./spellClasses");

function createDespell(spellName, despellName) {
  let spell;

  switch (spellName) {
    case "firekey":
      const Firekey = spellClasses.Firekey;
      spell = new Firekey(despellName);
      break;
    case "watersource":
      const Watersource = spellClasses.Watersource;
      spell = new Watersource(despellName);
      break;
    case "waterkey":
      const Waterkey = spellClasses.Waterkey;
      spell = new Waterkey(despellName);
      break;
    case "earthkey":
      const Earthkey = spellClasses.Earthkey;
      spell = new Earthkey(despellName);
      break;
    case "airkey":
      const Airkey = spellClasses.Airkey;
      spell = new Airkey(despellName);
      break;
    case "lifespear":
      const Lifespear = spellClasses.Lifespear;
      spell = new Lifespear(despellName);
      break;
    case "lifekey":
      const Lifekey = spellClasses.Lifekey;
      spell = new Lifekey(despellName);
      break;
    case "deathspear":
      const Deathspear = spellClasses.Deathspear;
      spell = new Deathspear(despellName);
      break;
    case "deathpower":
      const Deathpower = spellClasses.Deathpower;
      spell = new Deathpower(despellName);
      break;
  }
  return spell;
}

module.exports = createDespell;

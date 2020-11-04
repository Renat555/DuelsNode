const spellClasses = require("../spellClasses");

function createSpell(spellName, duration) {
  let spell;

  switch (spellName) {
    case "firespear":
      const Firespear = spellClasses.Firespear;
      spell = new Firespear();
      break;
    case "fireflow":
      const Fireflow = spellClasses.Fireflow;
      spell = new Fireflow();
      break;
    case "waterspear":
      const Waterspear = spellClasses.Waterspear;
      spell = new Waterspear();
      break;
    case "waterflow":
      const Waterflow = spellClasses.Waterflow;
      spell = new Waterflow();
      break;
    case "earthspear":
      const Earthspear = spellClasses.Earthspear;
      spell = new Earthspear();
      break;
    case "earthflow":
      const Earthflow = spellClasses.Earthflow;
      spell = new Earthflow();
      break;
    case "airspear":
      const Airspear = spellClasses.Airspear;
      spell = new Airspear();
      break;
    case "airflow":
      const Airflow = spellClasses.Airflow;
      spell = new Airflow();
      break;
    case "lifecrown":
      const Lifecrown = spellClasses.Lifecrown;
      spell = new Lifecrown();
      break;
    case "lifesource":
      const Lifesource = spellClasses.Lifesource;
      spell = new Lifesource();
      break;
    case "deathcrown":
      const Deathcrown = spellClasses.Deathcrown;
      spell = new Deathcrown();
      break;
    case "deathsource":
      const Deathsource = spellClasses.Deathsource;
      spell = new Deathsource();
      break;
  }

  return spell;
}

module.exports = createSpell;

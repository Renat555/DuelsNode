const spellClasses = require("../spellClasses");

function createEffect(spellName, duration) {
  let spell;

  switch (spellName) {
    case "fireshild":
      const Fireshild = spellClasses.Fireshild;
      spell = new Fireshild(duration);
      break;
    case "firecrown":
      const Firecrown = spellClasses.Firecrown;
      spell = new Firecrown(duration);
      break;
    case "firesource":
      const Firesource = spellClasses.Firesource;
      spell = new Firesource(duration);
      break;
    case "firesphere":
      const Firesphere = spellClasses.Firesphere;
      spell = new Firesphere(duration);
      break;
    case "firepower":
      const Firepower = spellClasses.Firepower;
      spell = new Firepower(duration);
      break;
    case "watershild":
      const Watershild = spellClasses.Watershild;
      spell = new Watershild(duration);
      break;
    case "watercrown":
      const Watercrown = spellClasses.Watercrown;
      spell = new Watercrown(duration);
      break;
    case "watersphere":
      const Watersphere = spellClasses.Watersphere;
      spell = new Watersphere(duration);
      break;
    case "waterstamp":
      const Waterstamp = spellClasses.Waterstamp;
      spell = new Waterstamp(duration);
      break;
    case "waterpower":
      const Waterpower = spellClasses.Waterpower;
      spell = new Waterpower(duration);
      break;
    case "earthshild":
      const Earthshild = spellClasses.Earthshild;
      spell = new Earthshild(duration);
      break;
    case "earthcrown":
      const Earthcrown = spellClasses.Earthcrown;
      spell = new Earthcrown(duration);
      break;
    case "earthsource":
      const Earthsource = spellClasses.Earthsource;
      spell = new Earthsource(duration);
      break;
    case "earthsphere":
      const Earthsphere = spellClasses.Earthsphere;
      spell = new Earthsphere(duration);
      break;
    case "earthstamp":
      const Earthstamp = spellClasses.Earthstamp;
      spell = new Earthstamp(duration);
      break;
    case "earthpower":
      const Earthpower = spellClasses.Earthpower;
      spell = new Earthpower(duration);
      break;
    case "airshild":
      const Airshild = spellClasses.Airshild;
      spell = new Airshild(duration);
      break;
    case "aircrown":
      const Aircrown = spellClasses.Aircrown;
      spell = new Aircrown(duration);
      break;
    case "airsource":
      const Airsource = spellClasses.Airsource;
      spell = new Airsource(duration);
      break;
    case "airsphere":
      const Airsphere = spellClasses.Airsphere;
      spell = new Airsphere(duration);
      break;
    case "airstamp":
      const Airstamp = spellClasses.Airstamp;
      spell = new Airstamp(duration);
      break;
    case "airpower":
      const Airpower = spellClasses.Airpower;
      spell = new Airpower(duration);
      break;
    case "lifeshild":
      const Lifeshild = spellClasses.Lifeshild;
      spell = new Lifeshild(duration);
      break;
    case "lifesphere":
      const Lifesphere = spellClasses.Lifesphere;
      spell = new Lifesphere(duration);
      break;
    case "lifestamp":
      const Lifestamp = spellClasses.Lifestamp;
      spell = new Lifestamp(duration);
      break;
    case "lifeflow":
      const Lifeflow = spellClasses.Lifeflow;
      spell = new Lifeflow(duration);
      break;
    case "lifepower":
      const Lifepower = spellClasses.Lifepower;
      spell = new Lifepower(duration);
      break;
    case "deathshild":
      const Deathshild = spellClasses.Deathshild;
      spell = new Deathshild(duration);
      break;
    case "deathsphere":
      const Deathsphere = spellClasses.Deathsphere;
      spell = new Deathsphere(duration);
      break;
    case "deathstamp":
      const Deathstamp = spellClasses.Deathstamp;
      spell = new Deathstamp(duration);
      break;
    case "deathkey":
      const Deathkey = spellClasses.Deathkey;
      spell = new Deathkey(duration);
      break;
    case "deathflow":
      const Deathflow = spellClasses.Deathflow;
      spell = new Deathflow(duration);
      break;
  }

  return spell;
}

module.exports = createEffect;

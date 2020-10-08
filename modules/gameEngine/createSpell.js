
const spellClasses = require('./spellClasses');

function createSpell(spellName, despellName, duration) {
  let spell;
  
  switch (spellName) {
    case 'firespear':
      const Firespear = spellClasses.Firespear;
      spell = new Firespear();
      break;
    case 'fireshild':
      const Fireshild = spellClasses.Fireshild;
      spell = new Fireshild(duration);
      break;
    case 'firecrown':
    const Firecrown = spellClasses.Firecrown;
      spell = new Firecrown(duration);
      break;
    case 'firesource':
      const Firesource = spellClasses.Firesource;
      spell = new Firesource(duration);
      break;
    case 'firesphere':
      const Firesphere = spellClasses.Firesphere;
      spell = new Firesphere(duration);
      break;
    case 'firestamp':
      const Firestamp = spellClasses.Firestamp;
      spell = new Firestamp();
      break;
    case 'firekey':
      const Firekey = spellClasses.Firekey;
      spell = new Firekey(despellName);
      break;
    case 'fireflow':
      const Fireflow = spellClasses.Fireflow;
      spell = new Fireflow();
      break;
    case 'firepower':
      const Firepower = spellClasses.Firepower;
      spell = new Firepower(duration);
      break;
    case 'waterspear':
      const Waterspear = spellClasses.Waterspear;
      spell = new Waterspear();
      break;
    case 'watershild':
      const Watershild = spellClasses.Watershild;
      spell = new Watershild(duration);
      break;
    case 'watercrown':
      const Watercrown = spellClasses.Watercrown;
      spell = new Watercrown(duration);
      break;
    case 'watersource':
      const Watersource = spellClasses.Watersource;
      spell = new Watersource(despellName);
      break;
    case 'watersphere':
      const Watersphere = spellClasses.Watersphere;
      spell = new Watersphere(duration);
      break;
    case 'waterstamp':
      const Waterstamp = spellClasses.Waterstamp;
      spell = new Waterstamp(duration);
      break;
    case 'waterkey':
      const Waterkey = spellClasses.Waterkey;
      spell = new Waterkey(despellName);
      break;
    case 'waterflow':
      const Waterflow = spellClasses.Waterflow;
      spell = new Waterflow();
      break;
    case 'waterpower':
      const Waterpower = spellClasses.Waterpower;
      spell = new Waterpower(duration);
      break;
    case 'earthspear':
      const Earthspear = spellClasses.Earthspear;
      spell = new Earthspear();
      break;
    case 'earthshild':
      const Earthshild = spellClasses.Earthshild;
      spell = new Earthshild(duration);
      break;
    case 'earthcrown':
      const Earthcrown = spellClasses.Earthcrown;
      spell = new Earthcrown(duration);
      break;
    case 'earthsource':
      const Earthsource = spellClasses.Earthsource;
      spell = new Earthsource(duration);
      break;
    case 'earthsphere':
      const Earthsphere = spellClasses.Earthsphere;
      spell = new Earthsphere(duration);
      break;
    case 'earthstamp':
      const Earthstamp = spellClasses.Earthstamp;
      spell = new Earthstamp(duration);
      break;
    case 'earthkey':
      const Earthkey = spellClasses.Earthkey;
      spell = new Earthkey(despellName);
      break;
    case 'earthflow':
      const Earthflow = spellClasses.Earthflow;
      spell = new Earthflow();
      break;
    case 'earthpower':
      const Earthpower = spellClasses.Earthpower;
      spell = new Earthpower(duration);
      break;
    case 'airspear':
      const Airspear = spellClasses.Airspear;
      spell = new Airspear();
      break;
    case 'airshild':
      const Airshild = spellClasses.Airshild;
      spell = new Airshild(duration);
      break;
    case 'aircrown':
      const Aircrown = spellClasses.Aircrown;
      spell = new Aircrown(duration);
      break;
    case 'airsource':
      const Airsource = spellClasses.Airsource;
      spell = new Airsource(duration);
      break;
    case 'airsphere':
      const Airsphere = spellClasses.Airsphere;
      spell = new Airsphere(duration);
      break;
    case 'airstamp':
      const Airstamp = spellClasses.Airstamp;
      spell = new Airstamp(duration);
      break;
    case 'airkey':
      const Airkey = spellClasses.Airkey;
      spell = new Airkey(despellName);
      break;
    case 'airflow':
      const Airflow = spellClasses.Airflow;
      spell = new Airflow();
      break;
    case 'airpower':
      const Airpower = spellClasses.Airpower;
      spell = new Airpower(duration);
      break;
    case 'lifespear':
      const Lifespear = spellClasses.Lifespear;
      spell = new Lifespear(despellName);
      break;
    case 'lifeshild':
      const Lifeshild = spellClasses.Lifeshild;
      spell = new Lifeshild(duration);
      break;
    case 'lifecrown':
      const Lifecrown = spellClasses.Lifecrown;
      spell = new Lifecrown();
      break;
    case 'lifesource':
      const Lifesource = spellClasses.Lifesource;
      spell = new Lifesource();
      break;
    case 'lifesphere':
      const Lifesphere = spellClasses.Lifesphere;
      spell = new Lifesphere(duration);
      break;
    case 'lifestamp':
      const Lifestamp = spellClasses.Lifestamp;
      spell = new Lifestamp(duration);
      break;
    case 'lifekey':
      const Lifekey = spellClasses.Lifekey;
      spell = new Lifekey(despellName);
      break;
    case 'lifeflow':
      const Lifeflow = spellClasses.Lifeflow;
      spell = new Lifeflow(duration);
      break;
    case 'lifepower':
      const Lifepower = spellClasses.Lifepower;
      spell = new Lifepower(duration);
      break;
    case 'deathspear':
      const Deathspear = spellClasses.Deathspear;
      spell = new Deathspear(despellName);
      break;
    case 'deathshild':
      const Deathshild = spellClasses.Deathshild;
      spell = new Deathshild(duration);
      break;
    case 'deathcrown':
      const Deathcrown = spellClasses.Deathcrown;
      spell = new Deathcrown();
      break;
    case 'deathsource':
      const Deathsource = spellClasses.Deathsource;
      spell = new Deathsource();
      break;
    case 'deathsphere':
      const Deathsphere = spellClasses.Deathsphere;
      spell = new Deathsphere(duration);
      break;
    case 'deathstamp':
      const Deathstamp = spellClasses.Deathstamp;
      spell = new Deathstamp(duration);
      break;
    case 'deathkey':
      const Deathkey = spellClasses.Deathkey;
      spell = new Deathkey(duration);
      break;
    case 'deathflow':
      const Deathflow = spellClasses.Deathflow;
      spell = new Deathflow(duration);
      break;
    case 'deathpower':
      const Deathpower = spellClasses.Deathpower;
      spell = new Deathpower(despellName);
      break;
  }
  return spell;
}

module.exports = createSpell;

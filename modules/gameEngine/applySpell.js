
function applySpell(spell, user, enemy) {
  let spellName = spell['spell'];
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  switch (spellName) {
      case 'firespear':
        spell.decreasePlayerHealth(enemy);
        break;
      case 'fireshild':
        spell.saveEffect(user);
        break;
      case 'firecrown':
        spell.saveEffect(user);
        break;
      case 'firesource':
        spell.saveEffect(enemy);
        break;
      case 'firesphere':
        spell.saveEffect(enemy);
        break; case 'firestamp': spell.increaseSpellDuration(enemy); break; case 'firekey': spell.deleteEffect(enemy); break; case 'fireflow': spell.decreasePlayerHealth(enemy); break; case 'firepower': spell.saveEffect(user); break; case 'waterspear': spell.decreasePlayerHealth(enemy); break; case 'watershild':
        spell.saveEffect(user);
        break;
      case 'watercrown':
        spell.saveEffect(user);
        break;
      case 'watersource':
        spell.deleteEffect(user);
        break;
      case 'watersphere':
        spell.saveEffect(user);
        break;
      case 'waterstamp':
        spell.saveEffect(user);
        break;
      case 'waterkey':
        spell.deleteEffect(user);
        break;
      case 'waterflow':
        spell.decreasePlayerHealth(enemy);
        break;
      case 'waterpower':
        spell.saveEffect(user);
        break;
      case 'earthspear':
        spell.decreasePlayerHealth(enemy);
        break;
      case 'earthshild':
        spell.saveEffect(user);
        break;
      case 'earthcrown':
        spell.saveEffect(user);
        break;
      case 'earthsource':
        spell.saveEffect(user);
        break;
      case 'earthsphere':
        spell.saveEffect(enemy);
        break;
      case 'earthstamp':
        spell.saveEffect(user);
        break;
      case 'earthkey':
        spell.deleteEffect(user);
        break;
      case 'earthflow':
        spell.decreasePlayerHealth(enemy);
        break;
      case 'earthpower':
        spell.saveEffect(user);
        break;
      case 'airspear':
        spell.decreasePlayerHealth(enemy); 
        break; 
      case 'airshild': 
        spell.saveEffect(enemy);
        break; 
      case 'aircrown': 
        spell.saveEffect(enemy);
        break; 
      case 'airsource': 
        spell.saveEffect(user);
        break; 
      case 'airsphere': 
        spell.saveEffect(enemy);
        break;
      case 'airstamp':
        spell.saveEffect(enemy);
        break;
      case 'airkey':
        spell.deleteEffect(enemy);
        break;
      case 'airflow':
        spell.decreasePlayerHealth(enemy);
        break;
      case 'airpower':
        spell.saveEffect(user);
        break;
      case 'lifespear':
        spell.deleteEffect(user);
        break;
      case 'lifeshild':
        spell.saveEffect(user);
        break;
      case 'lifecrown': 
        spell.increasePlayerMaxHealth(user); 
        break; 
      case 'lifesource': 
        spell.increasePlayerHealth(user); 
        break; 
      case 'lifesphere': 
        spell.saveEffect(user); 
        break; 
      case 'lifestamp': 
        spell.saveEffect(user); 
        break; 
      case 'lifekey': 
        spell.deleteEffect(user); 
        break; 
      case 'lifeflow': 
        spell.saveEffect(user); 
        break; 
      case 'lifepower': 
        spell.saveEffect(user); 
        break; 
      case 'deathspear': 
        spell.deleteEffect(enemy); 
        break; 
      case 'deathshild': 
        spell.saveEffect(enemy); 
        break; 
      case 'deathcrown': 
        spell.decreasePlayerMaxHealth(enemy); 
        break; 
      case 'deathsource': 
        spell.decreasePlayerHealth(enemy); 
        break; 
      case 'deathsphere': 
        spell.saveEffect(enemy); 
        break; 
      case 'deathstamp': 
        spell.saveEffect(enemy); 
        break; 
      case 'deathkey': 
        spell.saveEffect(user); 
        break; 
      case 'deathflow': 
        spell.saveEffect(enemy); 
        break; 
      case 'deathpower': 
        spell.deleteEffect(enemy); 
        break; 
      } 
    } 
    
module.exports = applySpell;

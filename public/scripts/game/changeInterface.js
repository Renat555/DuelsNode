
function fillHealth(users) {
  let healthEnemy = document.getElementById('healthEnemy');
  let percentHealthEnemy = Math.round(users['enemy']['health']*100/users['enemy']['maxHealth']);
  healthEnemy.style.width = percentHealthEnemy + "%";
  healthEnemy.style.marginLeft = 100 - percentHealthEnemy + "%";
  healthEnemy.innerHTML = users['enemy']['health'];

  let healthUser = document.getElementById('health');
  let percentHealth = Math.round(users['user']['health']*100/users['user']['maxHealth']);
  healthUser.style.width = percentHealth + "%";
  healthUser.style.marginLeft = 100 - percentHealth + "%";
  healthUser.innerHTML = users['user']['health'];
}

function fillEffects(userBuffs, userDebuffs, enemyBuffs, enemyDebuffs) {
  let divUserEffects = document.getElementById("userEffects");
  let divEnemyEffect = document.getElementById("enemyEffects");

  for (let i = 0; i < userBuffs.length; i++) {
    let divBuff = document.createElement('div');
    divBuff.setAttribute('data-buffElement', userBuffs[i][0]);
    divBuff.setAttribute('data-buffForm', userBuffs[i][1]);
    divBuff.setAttribute('data-duration', userBuffs[i][2]);
    divBuff.setAttribute('data-status', 'notSelected');
    divBuff.classList.add('spell');
    divBuff.classList.add('effect');
    divBuff.innerHTML = spellbook[userBuffs[i][0] + userBuffs[i][1]];
    divUserEffects.append(divBuff);
  }

  for (let i = 0; i < userDebuffs.length; i++) {
    let divDebuff = document.createElement('div');
    divDebuff.setAttribute('data-debuffElement', userDebuffs[i][0]);
    divDebuff.setAttribute('data-debuffForm', userDebuffs[i][1]);
    divDebuff.setAttribute('data-duration', userDebuffs[i][2]);
    divDebuff.setAttribute('data-status', 'notSelected');
    divDebuff.classList.add('spell');
    divDebuff.classList.add('effect');
    divDebuff.innerHTML = spellbook[userDebuffs[i][0] + userDebuffs[i][1]];
    divUserEffects.append(divDebuff);
  }

  for (let i = 0; i < enemyBuffs.length; i++) {
    let divBuff = document.createElement('div');
    divBuff.setAttribute('data-buffElement', enemyBuffs[i][0]);
    divBuff.setAttribute('data-buffForm', enemyBuffs[i][1]);
    divBuff.setAttribute('data-duration', enemyBuffs[i][2]);
    divBuff.setAttribute('data-status', 'notSelected');
    divBuff.classList.add('spell');
    divBuff.classList.add('effect');
    divBuff.innerHTML = spellbook[enemyBuffs[i][0] + enemyBuffs[i][1]];
    divEnemyEffect.append(divBuff);
  }

  for (let i = 0; i < enemyDebuffs.length; i++) {
    let divDebuff = document.createElement('div');
    divDebuff.setAttribute('data-debuffElement', enemyDebuffs[i][0]);
    divDebuff.setAttribute('data-debuffForm', enemyDebuffs[i][1]);
    divDebuff.setAttribute('data-duration', enemyDebuffs[i][2]);
    divDebuff.setAttribute('data-status', 'notSelected');
    divDebuff.classList.add('spell');
    divDebuff.classList.add('effect');
    divDebuff.innerHTML = spellbook[enemyDebuffs[i][0] + enemyDebuffs[i][1]];
    divEnemyEffect.append(divDebuff);
  }

}

function fillPoints(user) {
  let divActionPoints = document.getElementById('actionPoints');
  let divEnergyPoints = document.getElementById('energyPoints');

  divActionPoints.innerHTML = user['actionPoints'];
  divEnergyPoints.innerHTML = user['energyPoints'];
}

function hideMuveText(muveUser) {
  let divUserMuve = document.getElementById('userMuve');
  let divEnemyMuve = document.getElementById('enemyMuve');
  if (muveUser === 1) {
    divUserMuve.hidden = false;
    divEnemyMuve.hidden = true;
  } else {
    divUserMuve.hidden = true;
    divEnemyMuve.hidden = false;
  }
}

function changeInterface(users) {
  fillHealth(users);
  fillEffects(users['user']['buffs'], users['user']['debuffs'], users['enemy']['buffs'], users['enemy']['debuffs']);
  fillPoints(users['user']);
  hideMuveText(users['user']['muve'], users['enemy']['muve']);

  let gameInformation = users;
  gameInformation['header'] = 'restoreGame';
  localStorage.setItem('gameInformation', JSON.stringify(gameInformation));

}

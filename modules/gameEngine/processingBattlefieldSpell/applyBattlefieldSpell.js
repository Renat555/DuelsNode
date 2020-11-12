function coordTransform(spell) {
  let spellForEnemy = [];
  spellForEnemy[0] = spell[0];
  spellForEnemy[1] = spell[1];

  for (let i = 2; i < spell.length; i++) {
    spellForEnemy[i] = spell[i];

    switch (spell[i][0]) {
      case "0":
        spellForEnemy[i][0] = "4";
        break;
      case "1":
        spellForEnemy[i][0] = "3";
        break;
      case "3":
        spellForEnemy[i][0] = "1";
        break;
      case "4":
        spellForEnemy[i][0] = "0";
        break;
    }
  }

  return spellForEnemy;
}

function applyBattlefieldSpell(spell, user, enemy) {
  user.battlefield.push(spell);

  let spellForEnemy = coordTransform(spell);
  enemy.battlefield.push(spellForEnemy);
}

module.exports = applyBattlefieldSpell;

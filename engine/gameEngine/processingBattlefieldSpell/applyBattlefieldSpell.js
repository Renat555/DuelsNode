function copyNestedArr(arr) {
  let arrCopy = [];

  for (let i = 0; i < arr.length; i++) {
    arrCopy[i] = arr[i].slice(0);
  }

  return arrCopy;
}

function coordTransform(coordinates) {
  let coordinatesForEnemy = copyNestedArr(coordinates);

  for (let i = 0; i < coordinates.length; i++) {
    switch (coordinates[i][0]) {
      case "0":
        coordinatesForEnemy[i][0] = "6";
        break;
      case "1":
        coordinatesForEnemy[i][0] = "5";
        break;
      case "2":
        coordinatesForEnemy[i][0] = "4";
        break;
      case "4":
        coordinatesForEnemy[i][0] = "2";
        break;
      case "5":
        coordinatesForEnemy[i][0] = "1";
        break;
      case "6":
        coordinatesForEnemy[i][0] = "0";
        break;
    }
  }

  return coordinatesForEnemy;
}

function applyBattlefieldSpell(spell, coordinates, user, enemy) {
  user.actionPoints = user.actionPoints - spell.actionPoints;
  user.energyPoints = user.energyPoints - spell.energyPoints;

  let coordinatesForEnemy = coordTransform(coordinates);

  spell.placement(spell, coordinates, coordinatesForEnemy, user, enemy);
}

module.exports = applyBattlefieldSpell;

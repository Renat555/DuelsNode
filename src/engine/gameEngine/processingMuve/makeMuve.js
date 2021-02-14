function coordTransform(arr) {
  let result = [];

  result[1] = arr[1];

  switch (arr[0]) {
    case "0":
      result[0] = "6";
      break;
    case "1":
      result[0] = "5";
      break;
    case "2":
      result[0] = "4";
      break;
    case "3":
      result[0] = "3";
      break;
    case "4":
      result[0] = "2";
      break;
    case "5":
      result[0] = "1";
      break;
    case "6":
      result[0] = "0";
      break;
  }

  return result;
}

function makeMuve(muve, user, enemy) {
  user.actionPoints = user.actionPoints - (muve.length - 1);
  user["position"]["user"] = muve;

  let coordForEnemy = [];
  for (let i = 0; i < muve.length; i++) {
    coordForEnemy[i] = coordTransform(muve[i]);
  }

  enemy["position"]["enemy"] = coordForEnemy;
}

module.exports = makeMuve;

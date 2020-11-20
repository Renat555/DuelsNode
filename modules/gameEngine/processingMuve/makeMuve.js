function coordTransform(row, col) {
  let arr = { row: "", col: col };

  switch (row) {
    case "0":
      arr["row"] = "6";
      break;
    case "1":
      arr["row"] = "5";
      break;
    case "2":
      arr["row"] = "4";
      break;
    case "4":
      arr["row"] = "2";
      break;
    case "5":
      arr["row"] = "1";
      break;
    case "6":
      arr["row"] = "0";
      break;
  }

  return arr;
}

function makeMuve(muve, user, enemy) {
  let distanceRow = muve["row"] - user.position.user.row;
  let distanceCol = muve["col"] - user.position.user.col;
  let distance = Math.abs(distanceRow) + Math.abs(distanceCol);

  user.actionPoints = user.actionPoints - distance;

  user["position"]["user"]["row"] = muve["row"];
  user["position"]["user"]["col"] = muve["col"];
  user["position"]["user"]["pathType"] = muve["pathType"];

  let coordForEnemy = coordTransform(muve["row"], muve["col"]);

  enemy["position"]["enemy"]["row"] = coordForEnemy["row"];
  enemy["position"]["enemy"]["col"] = coordForEnemy["col"];
  enemy["position"]["enemy"]["pathType"] = muve["pathType"];
}

module.exports = makeMuve;

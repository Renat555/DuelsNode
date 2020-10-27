function coordinateTransform(row, col) {
  let arr = { row: "", col: col };

  switch (row) {
    case "0":
      arr["row"] = "4";
      break;
    case "1":
      arr["row"] = "3";
      break;
    case "2":
      arr["row"] = "2";
      break;
    case "3":
      arr["row"] = "1";
      break;
    case "4":
      arr["row"] = "0";
      break;
  }

  return arr;
}

function muveHero(muve, mongoCollection, ws, wss) {
  mongoCollection
    .findOneAndUpdate(
      { id: ws["id"] },
      { $set: { "position.row": muve["row"], "position.col": muve["col"] } }
    )
    .then((result) => {
      let coordForEnemy = coordinateTransform(muve["row"], muve["col"]);
      wss.clients.forEach(function each(client) {
        if (client.readyState == 1 && client["id"] == ws["idEnemy"]) {
          let responseForEnemy = {
            header: "enemyMuve",
            row: coordForEnemy["row"],
            col: coordForEnemy["col"],
          };
          client.send(JSON.stringify(responseForEnemy));
        }
      });
    });
}

module.exports = muveHero;

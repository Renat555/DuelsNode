function muveHero(muve, mongoCollection, ws, wss) {
  mongoCollection
    .findOneAndUpdate(
      { id: ws["id"] },
      { $set: { "position.row": muve["row"], "position.col": muve["col"] } }
    )
    .then((result) => {
      wss.clients.forEach(function each(client) {
        if (client.readyState == 1 && client["id"] == ws["idEnemy"]) {
          let responseForEnemy = {
            header: "enemyMuve",
            row: muve["row"],
            col: muve["col"],
          };
          client.send(JSON.stringify(responseForEnemy));
        }
      });
    });
}

module.exports = muveHero;

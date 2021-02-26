function savePlayer(player, mongoCollection, ws) {
  return new Promise((resolve, reject) => {
    ws["id"] = player["id"];
    mongoCollection.insertOne(player, function (err, doc) {
      resolve();
    });
  });
}

module.exports = savePlayer;

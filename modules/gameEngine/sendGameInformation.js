
function sendGameInformation(mongoCollection, ws, wss) {
  let response = {header: 'processingSpell'};

  mongoCollection.findOne({'id': ws['id']})
      .then(doc => {
        response['user'] = doc;
      })
        .then(() => {
          mongoCollection.findOne({'id': ws['idEnemy']}, function (err, doc) {
            response['enemy'] = doc;
            ws.send(JSON.stringify(response));
            wss.clients.forEach(function each(client) {
            if (client.readyState == 1 && client['id'] == ws['idEnemy']) {
              let responseForEnemy = {'header': 'processingSpell'};
			        responseForEnemy['user'] = response['enemy'];
			        responseForEnemy['enemy'] = response['user'];
			        client.send(JSON.stringify(responseForEnemy));
            }
            });
          });
        });
}

module.exports = sendGameInformation;
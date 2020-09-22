
function randomString() {
	let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
	let result = "";

	for (let i = 0; i < 10; i++) {
		result += string[Math.floor(Math.random()*Math.floor(62))];
	}

	return result;
}

function checkPlayer(player, mongoCollection) {

	mongoCollection.findOne({'id': player['id']}
		).then((user) => {
			if (user === null) return;
			if (user['idGame'] === '') {
				mongoCollection.deleteOne({'id': player['id']});
		}
	});

}

function savePlayer(player, mongoCollection, ws) {
		ws['id'] = player['id'];
    mongoCollection.insertOne(player, function (err, result){
			console.log(err);
		});
}

function sendGameInformation(player, mongoCollection, ws, response) {
		mongoCollection.findOne({'id': player['id']}, function (err, doc) {
		    response['user'] = doc;
		    mongoCollection.findOne({$and: [{'id': {$not: {$eq: player['id']} } }, {'idGame': doc['idGame']}] }, function (err, doc) {
		      response['enemy'] = doc;
		      ws.send(JSON.stringify(response));
		    });
		});
}

function setMuve(player, mongoCollection) {

	let userHealth, enemyHealth, userMuve, enemyMuve;
	if (Math.random() < 0.5) {
		userHealth = 250;
		enemyHealth = 200;
		userMuve = 0;
		enemyMuve = 1;
	} else {
		userHealth = 200;
		enemyHealth = 250;
		userMuve = 1;
		enemyMuve = 0;
	}

	mongoCollection.findOneAndUpdate({'id': player['id']}, {$set: {'health': userHealth, 'maxHealth': userHealth, 'muve': userMuve}}
		).then((res) => {
			mongoCollection.updateOne(
				{$and: [{'id': {$not: {$eq: res['value']['id']} } }, {'idGame': res['value']['idGame']}] },
				{$set: {'health': enemyHealth, 'maxHealth': enemyHealth, 'muve': enemyMuve}}
			);
		});

}

function searchEnemy(player, mongoCollection, ws) {
		console.log('searchEnemy');
		let response = {'header': 'createGame'};

	mongoCollection.findOne({'id': player['id']}, function (err, doc) {
      if (doc['idGame'] !== '') {
        sendGameInformation(player, mongoCollection, ws, response);
      } else {
        mongoCollection.findOneAndUpdate(
          {$and: [{'id': {$not: {$eq: player['id']} } }, {'idGame': ''}] }, {$set: {'idGame': randomString()}}, {returnOriginal: false}
          ).then(res => {
            if (res['value'] === null) {
    					setTimeout(searchEnemy, 5000, player, mongoCollection, ws);
            } else {
	            mongoCollection.findOneAndUpdate({'id': player['id']}, {$set: {'idGame': res['value']['idGame']}}, {returnOriginal: false}
								).then((res) => {
									setMuve(player, mongoCollection);
									sendGameInformation(player, mongoCollection, ws, response);
								});
						}
          });

      }
    });

}

function createGame(player, mongoCollection, ws) {
	checkPlayer(player, mongoCollection);
	savePlayer(player, mongoCollection, ws);
	searchEnemy(player, mongoCollection, ws);
}

module.exports = createGame;


function randomString() {
	let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
	let result = "";

	for (let i = 0; i < 10; i++) {
		result += string[Math.floor(Math.random()*Math.floor(62))];
	}

	return result;
}

async function savePlayer(playerInformation, mongoCollection, session) {
    playerInformation['state'] = 'pending';
    playerInformation['id'] = randomString();
    session.userId = playerInformation['id'];

    mongoCollection.insertOne(playerInformation, function(err, result) {
			session.userId = result.insertedId;
		});
}


async function searchEnemy(mongoCollection, session) {

    const findResult = await mongoCollection.findOne({$and: [{'id': {$not: {$eq: session.userId} } }, {'state': 'pending'}] }
      )
      .then(res => {
				session.enemyId = res['id'];
				console.log(res['id']);
			});
}

function createGame(playerInformation, mongoCollection, session, ws) {
	savePlayer(playerInformation, mongoCollection, session);
	searchEnemy(mongoCollection, session);
	ws.send(JSON.stringify(session['test']));
}

module.exports = createGame;

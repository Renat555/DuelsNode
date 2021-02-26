const endMuve = require("./gameEngine/endMuve/endMuve");
const processingSpell = require("./gameEngine/processingSpell/processingSpell");

function computerMuve(collection, ws, wss) {
  setTimeout(() => {
    collection.findOne({ id: ws["idEnemy"] }, (err, doc) => {
      console.log(ws["muve"]);
      if (ws["muve"] == 1) return;

      let count = 0;

      let timerId = setInterval(() => {
        count++;
        processingSpell("firespear", collection, ws, wss);
        if (count == 5) {
          setTimeout(() => {
            endMuve(collection, ws, wss);
          }, 2000);
          clearInterval(timerId);
        }
      }, 1000);
    });
  }, 2000);
}

module.exports = computerMuve;

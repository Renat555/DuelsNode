"use strict";
import gameInformation from './../gameInformation.js';
import requestInformation from './../requestInformation/requestInformation.js';

let buttonMuve = document.getElementsByName('buttonMuve')[0];

function sendData () {

  for (let key in gameInformation['spells']) {
    if (gameInformation['spells'][key] == "undefined") {
      alert("Создайте три заклинания.");
      return;
    }
  }

  showEnemyMuve();

  buttonMuve.removeEventListener("click", sendData);

  let formDataMuve = new FormData();
  formDataMuve.append("makeMuve", "makeMuve");

  fetch ("exchangeMuves/exchangeMuves.php", {
    method: 'POST',
    body: formDataMuve
  })
    .then(response => response.text())
    .then(result => {console.log(result)});

    let formDataSpells = new FormData();
    let spells = JSON.stringify(gameInformation['spells']);
    formDataSpells.append("spells", spells);

    fetch ("processingSpells/processingSpells.php", {
      method: 'POST',
      body: formDataSpells
    })
      .then(response => response.text())
      .then(result => console.log(result))

}

function showUserMuve() {
  let divMyMuve = document.getElementById("userMuve");
  let divEnemyMuve = document.getElementById("enemyMuve");
  divMyMuve.hidden = false;
  divEnemyMuve.hidden = true;
}

function showEnemyMuve() {
  let divMyMuve = document.getElementById("userMuve");
  let divEnemyMuve = document.getElementById("enemyMuve");
  divMyMuve.hidden = true;
  divEnemyMuve.hidden = false;
}

export default function exchangeMuves() {

  let timerId = setInterval(() => {

    let formData = new FormData();
    formData.append("requestMuve", "requestMuve");

    fetch ("exchangeMuves/exchangeMuves.php", {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(result => {

        if (result === "1") {

          showUserMuve();

          requestInformation();

          buttonMuve.addEventListener("click", exchangeMuves);
          buttonMuve.addEventListener("click", sendData);

          clearInterval(timerId);

        } else if (result === "0") {

          if (gameInformation['firstMuve'] == "yes") {
            requestInformation();
            gameInformation['firstMuve'] = "no";
          }

          showEnemyMuve();

          buttonMuve.removeEventListener("click", exchangeMuves);
        }
        let divSearch = document.getElementById("fixed");
        divSearch.hidden = true;
      });
  }, 3000);
}

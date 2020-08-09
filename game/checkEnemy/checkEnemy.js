"use strict";
import requestInformation from './../requestInformation/requestInformation.js';

function sendMark () {

  let mark = 1;

  setInterval(() => {
    let formData = new FormData();
    formData.append("mark", mark);
    mark++;

    fetch ("checkEnemy/checkEnemy.php", {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => console.log(result))
  }, 1000);

}

function checkMark () {

    let timerId = setInterval(() => {

      let formData = new FormData();
      formData.append("check", "check");

      fetch ("checkEnemy/checkEnemy.php", {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(result => {
          requestInformation();
          if (result == "left") {
            clearInterval(timerId);
            alert("Противник вышел!");
            window.location.href = '../createHero/createHero.html';
          }

        });
    }, 6000);
}

sendMark();
checkMark();

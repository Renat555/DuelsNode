"use strict";
import gameInformation from './../gameInformation.js';
import exchangeMuves from './../exchangeMuves/exchangeMuves.js';

function searchEnemy () {

  let timerId = setInterval(() => {
    let formData = new FormData();
    formData.append("search", "search");

    fetch ("searchEnemy/searchEnemy.php", {
      method: 'POST',
      body: formData
    })
      .then(response => response.text())
      .then(result => {
        console.log(result);
        if (result == "done") {
          console.log(result);
          gameInformation['firstMuve'] = "yes";
          exchangeMuves();
          clearInterval(timerId);
        }
      });
  }, 5000);

}

searchEnemy();

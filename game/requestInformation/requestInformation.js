"use strict";
import gameInformation from './../gameInformation.js';
import fillInterface from './../fillInterface/fillInterface.js';

export default function requestInformation() {

  let formData = new FormData();
  formData.append("requestMuve", "requestMuve");

  fetch ("requestInformation/requestInformation.php", {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(result => {
      gameInformation['muveInformation'] = result;
      fillInterface();
    });

}

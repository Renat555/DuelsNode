"use strict";

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  let gameInformation = localStorage.getItem('gameInformation');
  ws.send(gameInformation);
}

ws.onmessage = (message) => {
  let users = JSON.parse(message.data);

  switch (users.header) {
    case 'createGame':
      fillInterface(users);
      break;
    case 'processingSpell':
      changeInterface(users);
      break;
  }
  console.log(JSON.parse(message.data));

};

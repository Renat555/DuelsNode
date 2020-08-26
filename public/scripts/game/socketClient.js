"use strict";

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  let playerInformation = localStorage.getItem('hero');
  ws.send(playerInformation);
}

ws.onmessage = (message) => {
  let users = JSON.parse(message.data);

  switch (users.header) {
    case 'createGame':
      fillInterface(users);
      break;
  }
  console.log(JSON.parse(message.data));

};

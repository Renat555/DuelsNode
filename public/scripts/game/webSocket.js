"use strict";

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  let playerInformation = localStorage.getItem('hero');
  ws.send(playerInformation);
}

ws.onmessage = (message) => {
  console.log(message.data);
};

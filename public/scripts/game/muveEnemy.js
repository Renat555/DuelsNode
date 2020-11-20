"use strict";

function muveEnemy(users) {
  let userActionPoints = document.getElementById("actionPoints");
  userActionPoints.innerHTML = users.user.actionPoints;

  let userMuve = document.getElementById("userMuve");
  if (!userMuve.hidden) return;

  let enemyActionPoints = document.getElementById("enemyActionPoints");
  enemyActionPoints.innerHTML = users.enemy.actionPoints;

  let divEnemy = document.querySelector(`[data-hero="enemy"]`);
  let divSquareEnemy = document.querySelector(`[data-player="enemy"]`);
  let target = document.querySelector(
    `[data-row="${users["user"]["position"]["enemy"]["row"]}"][data-col="${users["user"]["position"]["enemy"]["col"]}"]`
  );

  let coordDivEnemy = divEnemy.getBoundingClientRect();
  let coordTarget = target.getBoundingClientRect();

  let distanceRow = divSquareEnemy.dataset.row - target.dataset.row;
  let distanceCol = target.dataset.col - divSquareEnemy.dataset.col;

  let verticalStart = coordDivEnemy.top;
  let verticalEnd = coordDivEnemy.top + coordTarget.height * distanceRow;
  let horizontalStart = coordDivEnemy.left;
  let horzontalEnd = coordDivEnemy.left + coordTarget.width * distanceCol;

  divSquareEnemy.dataset.player = "free";
  target.dataset.player = "enemy";

  if (users["user"]["position"]["enemy"]["pathType"] == "general") {
    muveGeneralPath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divEnemy
    );
  } else if (users["user"]["position"]["enemy"]["pathType"] == "alternative") {
    muveAlternativePath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divEnemy
    );
  }
}

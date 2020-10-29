"use strict";

function muveEnemy(muve) {
  let divEnemy = document.querySelector(`[data-hero="enemy"]`);
  let divSquareEnemy = document.querySelector(`[data-state="enemy"]`);
  let target = document.querySelector(
    `[data-row="${muve["row"]}"][data-col="${muve["col"]}"]`
  );

  let coordDivEnemy = divEnemy.getBoundingClientRect();
  let coordTarget = target.getBoundingClientRect();

  let distanceRow = divSquareEnemy.dataset.row - target.dataset.row;
  let distanceCol = target.dataset.col - divSquareEnemy.dataset.col;

  let verticalStart = coordDivEnemy.top;
  let verticalEnd = coordDivEnemy.top + coordTarget.height * distanceRow;
  let horizontalStart = coordDivEnemy.left;
  let horzontalEnd = coordDivEnemy.left + coordTarget.width * distanceCol;

  divSquareEnemy.dataset.state = "free";
  target.dataset.state = "enemy";

  if (muve["pathType"] == "general") {
    muveGeneralPath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divEnemy
    );
  } else if (muve["pathType"] == "alternative") {
    muveAlternativePath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divEnemy
    );
  }

  let actionPointsEnemy = document.getElementById("enemyActionPoints");
  actionPointsEnemy.innerHTML = muve["actionPoints"];
}

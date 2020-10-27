"use strict";

function muveGeneralPath(
  verticalStart,
  verticalEnd,
  horizontalStart,
  horzontalEnd,
  divUser,
  target,
  divSquareUser
) {
  let divBattleField = document.getElementsByClassName("battleField")[0];
  divBattleField.removeEventListener("click", muveUser);

  let shift = verticalStart;
  let counter = 0;
  let toggle = "a";

  let idInterval = setInterval(function () {
    if (shift - 1 > verticalEnd) {
      divUser.style.top = shift + "px";
      shift -= 1;

      counter++;
      if (counter % 70 === 0) {
        console.log(shift, verticalEnd);
        if (toggle == "a") {
          let pictureUrl =
            "url(../../img/game/heroes/" + divUser.dataset.picture + "2.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(../../img/game/heroes/" + divUser.dataset.picture + "1.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (shift + 1 < verticalEnd) {
      divUser.style.top = shift + "px";
      shift += 1;

      counter++;
      if (counter % 70 === 0) {
        console.log(shift, verticalEnd);
        if (toggle == "a") {
          let pictureUrl =
            "url(../../img/game/heroes/" + divUser.dataset.picture + "3.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(../../img/game/heroes/" + divUser.dataset.picture + "4.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else {
      clearInterval(idInterval);
      divSquareUser.dataset.state = "free";
      target.dataset.state = "user";
      divBattleField.addEventListener("click", muveUser);
    }
  }, 5);
}

function isClearGeneralPath(divUser, divTarget) {
  let arrDiv = [];

  if (divUser.dataset.row < divTarget.dataset.row) {
    for (let i = +divUser.dataset.row + 1; i <= divTarget.dataset.row; i++) {
      let divSquare = document.querySelector(
        `[data-row="${i}"][data-col="${divUser.dataset.col}"]`
      );
      arrDiv.push(divSquare);
    }
  } else if (divUser.dataset.row > divTarget.dataset.row) {
    for (let i = +divUser.dataset.row - 1; i >= divTarget.dataset.row; i--) {
      let divSquare = document.querySelector(
        `[data-row="${i}"][data-col="${divUser.dataset.col}"]`
      );
      arrDiv.push(divSquare);
    }
  }

  if (divUser.dataset.col < divTarget.dataset.col) {
    for (let i = +divUser.dataset.col + 1; i <= divTarget.dataset.col; i++) {
      let divSquare = document.querySelector(
        `[data-row="${divTarget.dataset.row}"][data-col="${i}"]`
      );
      arrDiv.push(divSquare);
    }
  } else if (divUser.dataset.col > divTarget.dataset.col) {
    for (let i = +divUser.dataset.col - 1; i >= divTarget.dataset.col; i--) {
      let divSquare = document.querySelector(
        `[data-row="${divTarget.dataset.row}"][data-col="${i}"]`
      );
      arrDiv.push(divSquare);
    }
  }

  for (let i = 0; i < arrDiv.length; i++) {
    if (
      arrDiv[i].dataset.state == "block" ||
      arrDiv[i].dataset.state == "enemy"
    ) {
      return false;
    }
  }

  return true;
}

function isClearAlternativePath(divUser, divTarget) {
  let arrDiv = [];

  if (divUser.dataset.col < divTarget.dataset.col) {
    for (let i = +divUser.dataset.col + 1; i <= divTarget.dataset.col; i++) {
      let divSquare = document.querySelector(
        `[data-row="${divUser.dataset.row}"][data-col="${i}"]`
      );
      arrDiv.push(divSquare);
    }
  } else if (divUser.dataset.col > divTarget.dataset.col) {
    for (let i = +divUser.dataset.col - 1; i >= divTarget.dataset.col; i--) {
      let divSquare = document.querySelector(
        `[data-row="${divUser.dataset.row}"][data-col="${i}"]`
      );
      arrDiv.push(divSquare);
    }
  }

  if (divUser.dataset.row < divTarget.dataset.row) {
    for (let i = +divUser.dataset.row + 1; i <= divTarget.dataset.row; i++) {
      let divSquare = document.querySelector(
        `[data-row="${i}"][data-col="${divTarget.dataset.col}"]`
      );
      arrDiv.push(divSquare);
    }
  } else if (divUser.dataset.row > divTarget.dataset.row) {
    for (let i = +divUser.dataset.row - 1; i >= divTarget.dataset.row; i--) {
      let divSquare = document.querySelector(
        `[data-row="${i}"][data-col="${divTarget.dataset.col}"]`
      );
      arrDiv.push(divSquare);
    }
  }

  for (let i = 0; i < arrDiv.length; i++) {
    if (
      arrDiv[i].dataset.state == "block" ||
      arrDiv[i].dataset.state == "enemy"
    ) {
      return false;
    }
  }

  return true;
}

function isEnoughActivePoints(distanceRow, distanceCol) {
  distanceRow = Math.abs(distanceRow);
  distanceCol = Math.abs(distanceCol);

  let divActionPointsHave = document.getElementById("actionPoints");
  let path = distanceCol + distanceRow;

  if (path > divActionPointsHave.innerHTML) return false;

  return true;
}

function muveUser(event) {
  let target = event.target;
  if (!target.dataset.row) return;

  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  let divUser = document.querySelector(`[data-hero="user"]`);
  let divSquareUser = document.querySelector(`[data-state="user"]`);

  let coordDivUser = divUser.getBoundingClientRect();
  let coordTarget = target.getBoundingClientRect();

  let distanceRow = divSquareUser.dataset.row - target.dataset.row;
  let distanceCol = divSquareUser.dataset.col - target.dataset.col;

  if (!isEnoughActivePoints(distanceRow, distanceCol)) return;

  let verticalStart = coordDivUser.top;
  let verticalEnd = coordDivUser.top + coordTarget.height * distanceRow;
  let horizontalStart = coordDivUser.top - coordTarget.height * distanceRow;
  let horzontalEnd = coordDivUser.top - coordTarget.height * distanceRow;

  if (isClearGeneralPath(divSquareUser, target)) {
    muveGeneralPath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divUser,
      target,
      divSquareUser
    );
  } else if (isClearAlternativePath(divSquareUser, target)) {
    muveAlternativePath(
      divUser,
      target,
      divSquareUser,
      coordDivUser,
      coordTarget,
      falseTarget,
      distanceRow,
      distanceCol
    );
  } else {
    return;
  }
}

let divBattleField = document.getElementsByClassName("battleField")[0];
divBattleField.addEventListener("click", muveUser);

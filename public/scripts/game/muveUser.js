"use strict";

function muveGeneralPath(
  verticalStart,
  verticalEnd,
  horizontalStart,
  horizontalEnd,
  divUser
) {
  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  let verticalShift = verticalStart;
  let horizontalShift = horizontalStart;
  let counter = 0;
  let toggle = "a";

  let idInterval = setInterval(function () {
    if (verticalShift - 1 > verticalEnd) {
      divUser.style.top = verticalShift + "px";
      verticalShift -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "2.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "1.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (verticalShift + 1 < verticalEnd) {
      divUser.style.top = verticalShift + "px";
      verticalShift += 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "3.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "4.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (horizontalShift - 1 > horizontalEnd) {
      divUser.style.left = horizontalShift + "px";
      horizontalShift -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "5.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "6.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (horizontalShift + 1 < horizontalEnd) {
      divUser.style.left = horizontalShift + "px";
      horizontalShift += 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "7.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "8.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else {
      clearInterval(idInterval);
      faceToEnemy();
      divBattleField.addEventListener("click", muveUser);
    }
  }, 5);
}

function muveAlternativePath(
  verticalStart,
  verticalEnd,
  horizontalStart,
  horizontalEnd,
  divUser
) {
  let divBattleField = document.getElementsByClassName("battlefield")[0];
  divBattleField.removeEventListener("click", muveUser);

  let verticalShift = verticalStart;
  let horizontalShift = horizontalStart;
  let counter = 0;
  let toggle = "a";

  let idInterval = setInterval(function () {
    if (horizontalShift - 1 > horizontalEnd) {
      divUser.style.left = horizontalShift + "px";
      horizontalShift -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "5.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "6.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (horizontalShift + 1 < horizontalEnd) {
      divUser.style.left = horizontalShift + "px";
      horizontalShift += 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "7.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "8.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (verticalShift - 1 > verticalEnd) {
      divUser.style.top = verticalShift + "px";
      verticalShift -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "2.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "1.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else if (verticalShift + 1 < verticalEnd) {
      divUser.style.top = verticalShift + "px";
      verticalShift += 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "3.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "b";
        } else {
          let pictureUrl =
            "url(./../../../public/img/game/heroes/" +
            divUser.dataset.picture +
            "4.png)";
          divUser.style.backgroundImage = pictureUrl;
          toggle = "a";
        }
      }
    } else {
      clearInterval(idInterval);
      faceToEnemy();
      divBattleField.addEventListener("click", muveUser);
    }
  }, 5);
}

function faceToEnemy() {
  let divUser = document.querySelector(`[data-hero="user"]`);
  let divEnemy = document.querySelector(`[data-hero="enemy"]`);
  let divSquareUser = document.querySelector(`[data-player="user"]`);
  let divSquareEnemy = document.querySelector(`[data-player="enemy"]`);

  if (divSquareEnemy.dataset.row > divSquareUser.dataset.row) {
    divUser.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divUser.dataset.picture +
      "1.png)";
    divEnemy.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divEnemy.dataset.picture +
      "3.png)";
  } else if (divSquareEnemy.dataset.row < divSquareUser.dataset.row) {
    divUser.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divUser.dataset.picture +
      "3.png)";
    divEnemy.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divEnemy.dataset.picture +
      "1.png)";
  } else if (divSquareEnemy.dataset.col < divSquareUser.dataset.col) {
    divUser.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divUser.dataset.picture +
      "6.png)";
    divEnemy.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divEnemy.dataset.picture +
      "8.png)";
  } else if (divSquareEnemy.dataset.col > divSquareUser.dataset.col) {
    divUser.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divUser.dataset.picture +
      "8.png)";
    divEnemy.style.backgroundImage =
      "url(./../../../public/img/game/heroes/" +
      divEnemy.dataset.picture +
      "6.png)";
  }
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
      arrDiv[i].dataset.spell == "earthshild" ||
      arrDiv[i].dataset.player == "enemy"
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
      arrDiv[i].dataset.spell == "earthshild" ||
      arrDiv[i].dataset.player == "enemy"
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

function sendMuve(div, pathType) {
  let actionPoints = document.getElementById("actionPoints").innerHTML;

  let muve = {
    header: "muveHero",
    row: div.dataset.row,
    col: div.dataset.col,
    pathType: pathType,
  };

  ws.send(JSON.stringify(muve));
}

function muveUser(event) {
  let target = event.target;

  if (!target.dataset.row) return;
  if (target.dataset.player) return;
  if (target.dataset.spell == "earthshild") return;

  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  clearUserSpell();

  let divUser = document.querySelector(`[data-hero="user"]`);
  let divSquareUser = document.querySelector(`[data-player="user"]`);

  let coordDivUser = divUser.getBoundingClientRect();
  let coordTarget = target.getBoundingClientRect();

  let distanceRow = divSquareUser.dataset.row - target.dataset.row;
  let distanceCol = target.dataset.col - divSquareUser.dataset.col;

  if (!isEnoughActivePoints(distanceRow, distanceCol)) return;

  divSquareUser.dataset.player = "";
  target.dataset.player = "user";

  let verticalStart = window.pageYOffset + coordDivUser.top;
  let verticalEnd =
    window.pageYOffset + coordDivUser.top + coordTarget.height * distanceRow;
  let horizontalStart = coordDivUser.left;
  let horzontalEnd = coordDivUser.left + coordTarget.width * distanceCol;

  let pathType = "";

  if (isClearGeneralPath(divSquareUser, target)) {
    muveGeneralPath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divUser
    );

    pathType = "general";
  } else if (isClearAlternativePath(divSquareUser, target)) {
    muveAlternativePath(
      verticalStart,
      verticalEnd,
      horizontalStart,
      horzontalEnd,
      divUser
    );

    pathType = "alternative";
  } else {
    return;
  }

  sendMuve(target, pathType);
}

let divBattleField = document.getElementsByClassName("battlefield")[0];
divBattleField.addEventListener("click", muveUser);

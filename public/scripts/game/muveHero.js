"use strict";

function muveUp(start, end, divUser, target) {
  let divBattleField = document.getElementsByClassName("battleField")[0];
  divBattleField.removeEventListener("click", muveUser);

  let top = start;
  let counter = 0;
  let toggle = "a";

  if (divUser.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (top <= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.row - target.dataset.row;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.top = top + "px";
      top -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a2.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a1.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (top <= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.row - target.dataset.row;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.top = top + "px";
      top -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c2.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c1.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function muveDown(start, end, divUser, target) {
  let divBattleField = document.getElementsByClassName("battleField")[0];
  divBattleField.removeEventListener("click", muveUser);

  let top = start;
  let counter = 0;
  let toggle = "a";

  if (divUser.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (top >= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.row - target.dataset.row;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.top = top + "px";
      top += 1;

      counter++;
      if (counter == 1) {
        divUser.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a4.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (top >= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.row - target.dataset.row;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.top = top + "px";
      top += 1;

      counter++;
      if (counter == 1) {
        divUser.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c4.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function muveRight(start, end, divUser, target) {
  let divBattleField = document.getElementsByClassName("battleField")[0];
  divBattleField.removeEventListener("click", muveUser);

  let left = start;
  let counter = 0;
  let toggle = "a";

  if (divUser.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (left >= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.col - target.dataset.col;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.left = left + "px";
      left += 1;

      counter++;
      if (counter == 1) {
        divUser.style.backgroundImage = "url(../../img/game/heroes/a7.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a7.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a8.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (left >= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.col - target.dataset.col;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.left = left + "px";
      left += 1;

      counter++;
      if (counter == 1) {
        divUser.style.backgroundImage = "url(../../img/game/heroes/c7.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c7.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c8.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function muveLeft(start, end, divUser, target) {
  let divBattleField = document.getElementsByClassName("battleField")[0];
  divBattleField.removeEventListener("click", muveUser);

  let left = start;
  let counter = 0;
  let toggle = "a";

  if (divUser.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (left <= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.col - target.dataset.col;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.left = left + "px";
      left -= 1;

      counter++;
      if (counter == 1) {
        divUser.style.backgroundImage = "url(../../img/game/heroes/a5.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a5.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/a6.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (left <= end) {
        clearInterval(idInterval);
        faceToEnemy(divUser);

        let divSquareUser = document.querySelector(`[data-state="user"]`);
        let distance = divSquareUser.dataset.col - target.dataset.col;
        distance = Math.abs(distance);
        let divActionPointsHave = document.getElementById("actionPoints");
        divActionPointsHave.innerHTML =
          divActionPointsHave.innerHTML - distance;

        divBattleField.addEventListener("click", muveUser);

        let click = new Event("click", { bubbles: true });
        target.dispatchEvent(click);
        return;
      }

      divUser.style.left = left + "px";
      left -= 1;

      counter++;
      if (counter == 1) {
        divUser.style.backgroundImage = "url(../../img/game/heroes/c5.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c5.png)";
          toggle = "b";
        } else {
          divUser.style.backgroundImage = "url(../../img/game/heroes/c6.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function isEnoughActivePoints(distanceRow, distanceCol) {
  let divActionPointsHave = document.getElementById("actionPoints");
  let path = distanceCol + distanceRow;

  if (path > divActionPointsHave.innerHTML) return false;

  return true;
}

function faceToEnemy(divUser) {
  let divSquareEnemy = document.querySelector(`[data-state="enemy"]`);
  let divSquareUser = document.querySelector(`[data-state="user"]`);

  if (divUser.dataset.picture === "a") {
    if (divSquareEnemy.dataset.row > divSquareUser.dataset.row) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/a1.png)";
    } else if (divSquareEnemy.dataset.row < divSquareUser.dataset.row) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
    } else if (divSquareEnemy.dataset.col < divSquareUser.dataset.col) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/a6.png)";
    } else if (divSquareEnemy.dataset.col > divSquareUser.dataset.col) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/a8.png)";
    }
  } else {
    if (divSquareEnemy.dataset.row > divSquareUser.dataset.row) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/c1.png)";
    } else if (divSquareEnemy.dataset.row < divSquareUser.dataset.row) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
    } else if (divSquareEnemy.dataset.col < divSquareUser.dataset.col) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/c6.png)";
    } else if (divSquareEnemy.dataset.col > divSquareUser.dataset.col) {
      divUser.style.backgroundImage = "url(../../img/game/heroes/c8.png)";
    }
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

function muveGeneralPath(
  divUser,
  divTarget,
  divSquareUser,
  coordDivUser,
  coordTarget,
  falseTarget,
  distanceRow,
  distanceCol
) {
  if (divSquareUser.dataset.row > divTarget.dataset.row) {
    let end = coordDivUser.top + coordTarget.height * distanceRow;
    muveDown(coordDivUser.top, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    falseTarget.dataset.state = "user";
    return;
  }

  if (divSquareUser.dataset.row < divTarget.dataset.row) {
    let end = coordDivUser.top - coordTarget.height * distanceRow;
    muveUp(coordDivUser.top, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    falseTarget.dataset.state = "user";
    return;
  }

  if (divSquareUser.dataset.col < divTarget.dataset.col) {
    let end = coordDivUser.left + coordTarget.width * distanceCol;
    muveRight(coordDivUser.left, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    divTarget.dataset.state = "user";
    return;
  }

  if (divSquareUser.dataset.col > divTarget.dataset.col) {
    let end = coordDivUser.left - coordTarget.width * distanceCol;
    muveLeft(coordDivUser.left, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    divTarget.dataset.state = "user";
    return;
  }
}

function muveAlternativePath(
  divUser,
  divTarget,
  divSquareUser,
  coordDivUser,
  coordTarget,
  falseTarget,
  distanceRow,
  distanceCol
) {
  if (divSquareUser.dataset.col < divTarget.dataset.col) {
    let end = coordDivUser.left + coordTarget.width * distanceCol;
    muveRight(coordDivUser.left, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    falseTarget.dataset.state = "user";
    return;
  }

  if (divSquareUser.dataset.col > divTarget.dataset.col) {
    let end = coordDivUser.left - coordTarget.width * distanceCol;
    muveLeft(coordDivUser.left, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    falseTarget.dataset.state = "user";
    return;
  }

  if (divSquareUser.dataset.row > divTarget.dataset.row) {
    let end = coordDivUser.top + coordTarget.height * distanceRow;
    muveDown(coordDivUser.top, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    divTarget.dataset.state = "user";
    return;
  }

  if (divSquareUser.dataset.row < divTarget.dataset.row) {
    let end = coordDivUser.top - coordTarget.height * distanceRow;
    muveUp(coordDivUser.top, end, divUser, divTarget);
    divSquareUser.dataset.state = "free";
    divTarget.dataset.state = "user";
    return;
  }
}

function sendMuve(div) {
  let muves = {
    header: "muveHero",
    row: div.dataset.row,
    col: div.dataset.col,
  };

  ws.send(JSON.stringify(muves));
}

function muveUser(event) {
  let target = event.target;
  if (!target.dataset.row) return;

  let userMuve = document.getElementById("userMuve");
  if (userMuve.hidden) return;

  let divSquareUser = document.querySelector(`[data-state="user"]`);
  let divUser = document.querySelector(`[data-hero="user"]`);
  let coordDivUser = divUser.getBoundingClientRect();
  let coordTarget = target.getBoundingClientRect();

  let distanceRow = divSquareUser.dataset.row - target.dataset.row;
  distanceRow = Math.abs(distanceRow);
  let distanceCol = divSquareUser.dataset.col - target.dataset.col;
  distanceCol = Math.abs(distanceCol);

  if (!isEnoughActivePoints(distanceRow, distanceCol)) return;

  if (isClearGeneralPath(divSquareUser, target)) {
    let falseTarget = document.querySelector(
      `[data-row="${target.dataset.row}"][data-col="${divSquareUser.dataset.col}"]`
    );

    muveGeneralPath(
      divUser,
      target,
      divSquareUser,
      coordDivUser,
      coordTarget,
      falseTarget,
      distanceRow,
      distanceCol
    );

    sendMuve(falseTarget);
  } else if (isClearAlternativePath(divSquareUser, target)) {
    let falseTarget = document.querySelector(
      `[data-row="${divSquareUser.dataset.row}"][data-col="${target.dataset.col}"]`
    );

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

    sendMuve(falseTarget);
  } else {
    return;
  }
}

let divBattleField = document.getElementsByClassName("battleField")[0];
divBattleField.addEventListener("click", muveUser);

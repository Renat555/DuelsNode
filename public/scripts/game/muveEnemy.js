"use strict";

function muveEnemyUp(start, end, divHero) {
  let top = start;
  let counter = 0;
  let toggle = "a";

  if (divHero.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (top <= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.top = top + "px";
      top -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a2.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a1.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (top <= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.top = top + "px";
      top -= 1;

      counter++;
      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c2.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c1.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function muveEnemyDown(start, end, divHero) {
  let top = start;
  let counter = 0;
  let toggle = "a";

  if (divHero.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (top >= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.top = top + "px";
      top += 1;

      counter++;
      if (counter == 1) {
        divHero.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a4.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (top >= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.top = top + "px";
      top += 1;

      counter++;
      if (counter == 1) {
        divHero.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c4.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function muveEnemyRight(start, end, divHero) {
  let left = start;
  let counter = 0;
  let toggle = "a";

  if (divHero.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (left >= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.left = left + "px";
      left += 1;

      counter++;
      if (counter == 1) {
        divHero.style.backgroundImage = "url(../../img/game/heroes/a7.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a7.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a8.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (left >= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.left = left + "px";
      left += 1;

      counter++;
      if (counter == 1) {
        divHero.style.backgroundImage = "url(../../img/game/heroes/c7.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c7.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c8.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function muveEnemyLeft(start, end, divHero) {
  let left = start;
  let counter = 0;
  let toggle = "a";

  if (divHero.dataset.picture === "a") {
    let idInterval = setInterval(function () {
      if (left <= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.left = left + "px";
      left -= 1;

      counter++;
      if (counter == 1) {
        divHero.style.backgroundImage = "url(../../img/game/heroes/a5.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a5.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/a6.png)";
          toggle = "a";
        }
      }
    }, 5);
  } else {
    let idInterval = setInterval(function () {
      if (left <= end) {
        clearInterval(idInterval);
        faceToUser(divHero);
        return;
      }

      divHero.style.left = left + "px";
      left -= 1;

      counter++;
      if (counter == 1) {
        divHero.style.backgroundImage = "url(../../img/game/heroes/c5.png)";
      }

      if (counter % 70 === 0) {
        if (toggle == "a") {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c5.png)";
          toggle = "b";
        } else {
          divHero.style.backgroundImage = "url(../../img/game/heroes/c6.png)";
          toggle = "a";
        }
      }
    }, 5);
  }
}

function faceToUser(divEnemy) {
  let divSquareEnemy = document.querySelector(`[data-state="enemy"]`);
  let divSquareUser = document.querySelector(`[data-state="user"]`);

  if (divEnemy.dataset.picture === "a") {
    if (divSquareUser.dataset.row > divSquareEnemy.dataset.row) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/a1.png)";
    } else if (divSquareUser.dataset.row < divSquareEnemy.dataset.row) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/a3.png)";
    } else if (divSquareUser.dataset.col < divSquareEnemy.dataset.col) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/a6.png)";
    } else if (divSquareUser.dataset.col > divSquareEnemy.dataset.col) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/a8.png)";
    }
  } else {
    if (divSquareUser.dataset.row > divSquareEnemy.dataset.row) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/c1.png)";
    } else if (divSquareUser.dataset.row < divSquareEnemy.dataset.row) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/c3.png)";
    } else if (divSquareUser.dataset.col < divSquareEnemy.dataset.col) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/c6.png)";
    } else if (divSquareUser.dataset.col > divSquareEnemy.dataset.col) {
      divEnemy.style.backgroundImage = "url(../../img/game/heroes/c8.png)";
    }
  }
}

function muveEnemy(row, col) {
  let divSquareEnemy = document.querySelector(`[data-state="enemy"]`);
  let divEnemy = document.querySelector(`[data-hero="enemy"]`);
  let target = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  let coordDivEnemy = divEnemy.getBoundingClientRect();
  let coordTarget = target.getBoundingClientRect();

  let distanceRow = divSquareEnemy.dataset.row - target.dataset.row;
  distanceRow = Math.abs(distanceRow);
  let distanceCol = divSquareEnemy.dataset.col - target.dataset.col;
  distanceCol = Math.abs(distanceCol);

  if (divSquareEnemy.dataset.row > row) {
    let end = coordDivEnemy.top + coordTarget.height * distanceRow;
    muveEnemyDown(coordDivEnemy.top, end, divEnemy);
    divSquareEnemy.dataset.state = "free";
    target.dataset.state = "enemy";
    return;
  }

  if (divSquareEnemy.dataset.row < row) {
    let end = coordDivEnemy.top - coordTarget.height * distanceRow;
    muveEnemyUp(coordDivEnemy.top, end, divEnemy);
    divSquareEnemy.dataset.state = "free";
    target.dataset.state = "enemy";
    return;
  }

  if (divSquareEnemy.dataset.col < col) {
    let end = coordDivEnemy.left + coordTarget.width * distanceCol;

    muveEnemyRight(coordDivEnemy.left, end, divEnemy);
    divSquareEnemy.dataset.state = "free";
    target.dataset.state = "enemy";
    return;
  }

  if (divSquareEnemy.dataset.col > col) {
    let end = coordDivEnemy.left - coordTarget.width * distanceCol;
    muveEnemyLeft(coordDivEnemy.left, end, divEnemy);
    divSquareEnemy.dataset.state = "free";
    target.dataset.state = "enemy";
    return;
  }
}

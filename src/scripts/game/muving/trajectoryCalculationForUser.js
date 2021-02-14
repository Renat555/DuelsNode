import { isSquareFree } from "./isSquareFree.js";

function bypassObstacleMuvingUp(startSquare, offset) {
  let pathRight = [];
  pathRight[0] = startSquare;

  let square = document.querySelector(
    `[data-row="${startSquare[0]}"][data-col="${startSquare[1]}"]`
  );

  while (true) {
    let lastSquare = pathRight[pathRight.length - 1];

    square = document.querySelector(
      `[data-row="${+lastSquare[0] + 1}"][data-col="${lastSquare[1]}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] + 1}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathRight.push(squareCoord);
        continue;
      } else {
        pathRight = [];
        break;
      }
    } else {
      break;
    }
  }

  let pathLeft = [];
  pathLeft[0] = startSquare;

  while (true) {
    let lastSquare = pathLeft[pathLeft.length - 1];

    square = document.querySelector(
      `[data-row="${+lastSquare[0] + 1}"][data-col="${lastSquare[1]}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] - 1}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathLeft.push(squareCoord);
        continue;
      } else {
        pathLeft = [];
        break;
      }
    } else {
      break;
    }
  }

  if (pathRight.length == 0 && pathLeft.length == 0) return "pathIsBloked";
  if (pathRight.length == 0) return pathLeft;
  if (pathLeft.length == 0) return pathRight;

  let rightLength = pathRight.length + offset;
  let leftLength = pathLeft.length - offset;

  if (rightLength > leftLength) return pathLeft;
  if (rightLength < leftLength) return pathRight;
  if (rightLength == leftLength) return pathLeft;
}

function bypassObstacleMuvingDown(startSquare, offset) {
  let pathRight = [];
  pathRight[0] = startSquare;

  let square = document.querySelector(
    `[data-row="${startSquare[0]}"][data-col="${startSquare[1]}"]`
  );

  while (true) {
    let lastSquare = pathRight[pathRight.length - 1];

    square = document.querySelector(
      `[data-row="${+lastSquare[0] - 1}"][data-col="${lastSquare[1]}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] + 1}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathRight.push(squareCoord);
        continue;
      } else {
        pathRight = [];
        break;
      }
    } else {
      break;
    }
  }

  let pathLeft = [];
  pathLeft[0] = startSquare;

  while (true) {
    let lastSquare = pathLeft[pathLeft.length - 1];

    square = document.querySelector(
      `[data-row="${+lastSquare[0] - 1}"][data-col="${lastSquare[1]}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] - 1}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathLeft.push(squareCoord);
        continue;
      } else {
        pathLeft = [];
        break;
      }
    } else {
      break;
    }
  }

  if (pathRight.length == 0 && pathLeft.length == 0) return "pathIsBloked";
  if (pathRight.length == 0) return pathLeft;
  if (pathLeft.length == 0) return pathRight;

  let rightLength = pathRight.length + offset;
  let leftLength = pathLeft.length - offset;

  if (rightLength > leftLength) return pathLeft;
  if (rightLength < leftLength) return pathRight;
  if (rightLength == leftLength) return pathLeft;
}

function bypassObstacleMuvingLeft(startSquare, offset) {
  let pathUp = [];
  pathUp[0] = startSquare;

  let square = document.querySelector(
    `[data-row="${startSquare[0]}"][data-col="${startSquare[1]}"]`
  );

  while (true) {
    let lastSquare = pathUp[pathUp.length - 1];

    square = document.querySelector(
      `[data-row="${lastSquare[0]}"][data-col="${lastSquare[1] - 1}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${+lastSquare[0] + 1}"][data-col="${lastSquare[1]}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathUp.push(squareCoord);
        continue;
      } else {
        pathUp = [];
        break;
      }
    } else {
      break;
    }
  }

  let pathDown = [];
  pathDown[0] = startSquare;

  while (true) {
    let lastSquare = pathDown[pathDown.length - 1];

    square = document.querySelector(
      `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] - 1}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${+lastSquare[0] - 1}"][data-col="${lastSquare[1]}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathDown.push(squareCoord);
        continue;
      } else {
        pathDown = [];
        break;
      }
    } else {
      break;
    }
  }

  if (pathUp.length == 0 && pathDown.length == 0) return "pathIsBloked";
  if (pathUp.length == 0) return pathDown;
  if (pathDown.length == 0) return pathUp;

  let upLength = pathUp.length + offset;
  let downLength = pathDown.length - offset;

  if (upLength > downLength) return pathDown;
  if (upLength < downLength) return pathUp;
  if (upLength == downLength) return pathDown;
}

function bypassObstacleMuvingRight(startSquare, offset) {
  let pathUp = [];
  pathUp[0] = startSquare;

  let square = document.querySelector(
    `[data-row="${startSquare[0]}"][data-col="${startSquare[1]}"]`
  );

  while (true) {
    let lastSquare = pathUp[pathUp.length - 1];

    square = document.querySelector(
      `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] + 1}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${+lastSquare[0] + 1}"][data-col="${lastSquare[1]}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathUp.push(squareCoord);
        continue;
      } else {
        pathUp = [];
        break;
      }
    } else {
      break;
    }
  }

  let pathDown = [];
  pathDown[0] = startSquare;

  while (true) {
    let lastSquare = pathDown[pathDown.length - 1];

    square = document.querySelector(
      `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] + 1}"]`
    );

    if (!isSquareFree(square)) {
      square = document.querySelector(
        `[data-row="${+lastSquare[0] - 1}"][data-col="${lastSquare[1]}"]`
      );

      if (isSquareFree(square)) {
        let squareCoord = [];
        squareCoord[0] = square.dataset.row;
        squareCoord[1] = square.dataset.col;
        pathDown.push(squareCoord);
        continue;
      } else {
        pathDown = [];
        break;
      }
    } else {
      break;
    }
  }

  if (pathUp.length == 0 && pathDown.length == 0) return "pathIsBloked";
  if (pathUp.length == 0) return pathDown;
  if (pathDown.length == 0) return pathUp;

  let upLength = pathUp.length + offset;
  let downLength = pathDown.length - offset;

  if (upLength > downLength) return pathDown;
  if (upLength < downLength) return pathUp;
  if (upLength == downLength) return pathDown;
}

function trajectoryUp(trajectory, end) {
  let square = document.querySelector(
    `[data-row="${trajectory[trajectory.length - 1][0]}"][data-col="${
      trajectory[trajectory.length - 1][1]
    }"]`
  );

  while (true) {
    if (square.dataset.row == end[0] && square.dataset.col == end[1])
      return trajectory;
    if (square.dataset.row == end[0] && square.dataset.col > end[1])
      return trajectoryLeft(trajectory, end);
    if (square.dataset.row == end[0] && square.dataset.col < end[1])
      return trajectoryRight(trajectory, end);

    let lastSquare = trajectory[trajectory.length - 1];

    square = document.querySelector(
      `[data-row="${+lastSquare[0] + 1}"][data-col="${lastSquare[1]}"]`
    );

    if (isSquareFree(square)) {
      let squareCoord = [];
      squareCoord[0] = square.dataset.row;
      squareCoord[1] = square.dataset.col;
      trajectory.push(squareCoord);
    } else {
      let offset = lastSquare[1] - end[1];
      let shortPath = bypassObstacleMuvingUp(lastSquare, offset);
      if (shortPath == "pathIsBloked") return shortPath;
      trajectory.pop();
      trajectory = trajectory.concat(shortPath);
    }
  }
}

function trajectoryDown(trajectory, end) {
  let square = document.querySelector(
    `[data-row="${trajectory[trajectory.length - 1][0]}"][data-col="${
      trajectory[trajectory.length - 1][1]
    }"]`
  );

  while (true) {
    if (square.dataset.row == end[0] && square.dataset.col == end[1])
      return trajectory;
    if (square.dataset.row == end[0] && square.dataset.col > end[1])
      return trajectoryLeft(trajectory, end);
    if (square.dataset.row == end[0] && square.dataset.col < end[1])
      return trajectoryRight(trajectory, end);

    let lastSquare = trajectory[trajectory.length - 1];

    square = document.querySelector(
      `[data-row="${+lastSquare[0] - 1}"][data-col="${lastSquare[1]}"]`
    );

    if (isSquareFree(square)) {
      let squareCoord = [];
      squareCoord[0] = square.dataset.row;
      squareCoord[1] = square.dataset.col;
      trajectory.push(squareCoord);
    } else {
      let offset = lastSquare[1] - end[1];
      let shortPath = bypassObstacleMuvingDown(lastSquare, offset);
      if (shortPath == "pathIsBloked") return shortPath;
      trajectory.pop();
      trajectory = trajectory.concat(shortPath);
    }
  }
}

function trajectoryRight(trajectory, end) {
  let square = document.querySelector(
    `[data-row="${trajectory[trajectory.length - 1][0]}"][data-col="${
      trajectory[trajectory.length - 1][1]
    }"]`
  );

  while (true) {
    if (square.dataset.row == end[0] && square.dataset.col == end[1])
      return trajectory;
    if (square.dataset.row < end[0] && square.dataset.col == end[1])
      return trajectoryUp(trajectory, end);
    if (square.dataset.row > end[0] && square.dataset.col == end[1])
      return trajectoryDown(trajectory, end);

    let lastSquare = trajectory[trajectory.length - 1];

    square = document.querySelector(
      `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] + 1}"]`
    );

    if (isSquareFree(square)) {
      let squareCoord = [];
      squareCoord[0] = square.dataset.row;
      squareCoord[1] = square.dataset.col;
      trajectory.push(squareCoord);
    } else {
      let offset = lastSquare[0] - end[0];
      let shortPath = bypassObstacleMuvingRight(lastSquare, offset);
      if (shortPath == "pathIsBloked") return shortPath;
      trajectory.pop();
      trajectory = trajectory.concat(shortPath);
    }
  }
}

function trajectoryLeft(trajectory, end) {
  let square = document.querySelector(
    `[data-row="${trajectory[trajectory.length - 1][0]}"][data-col="${
      trajectory[trajectory.length - 1][1]
    }"]`
  );

  while (true) {
    if (square.dataset.row == end[0] && square.dataset.col == end[1])
      return trajectory;
    if (square.dataset.row < end[0] && square.dataset.col == end[1])
      return trajectoryUp(trajectory, end);
    if (square.dataset.row > end[0] && square.dataset.col == end[1])
      return trajectoryDown(trajectory, end);

    let lastSquare = trajectory[trajectory.length - 1];

    square = document.querySelector(
      `[data-row="${lastSquare[0]}"][data-col="${+lastSquare[1] - 1}"]`
    );

    if (isSquareFree(square)) {
      let squareCoord = [];
      squareCoord[0] = square.dataset.row;
      squareCoord[1] = square.dataset.col;
      trajectory.push(squareCoord);
    } else {
      let offset = lastSquare[0] - end[0];
      let shortPath = bypassObstacleMuvingLeft(lastSquare, offset);
      if (shortPath == "pathIsBloked") return shortPath;
      trajectory.pop();
      trajectory = trajectory.concat(shortPath);
    }
  }
}

export function trajectoryCalculationForUser(target) {
  let trajectory = [];

  let squareUser = document.querySelector(`[data-player="user"]`);
  let start = [];
  start[0] = squareUser.dataset.row;
  start[1] = squareUser.dataset.col;

  let end = [];
  end[0] = target.dataset.row;
  end[1] = target.dataset.col;

  trajectory.push(start);

  if (start[0] < end[0]) return trajectoryUp(trajectory, end);
  if (start[0] > end[0]) return trajectoryDown(trajectory, end);
  if (start[1] < end[1]) return trajectoryRight(trajectory, end);
  if (start[1] > end[1]) return trajectoryLeft(trajectory, end);
}

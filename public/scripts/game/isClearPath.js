"use strict";

function isClearPathToLeftAndTop(start, end) {
  let horizontalPath = start[0] - end[0];
  let verticalPath = start[1] - end[1];
  let horizontalStep;
  let verticalStep;

  if (horizontalPath == 0) {
    horizontalStep = 0;
    verticalStep = 1;
  } else if (verticalPath == 0) {
    horizontalStep = 1;
    verticalStep = 0;
  } else if (horizontalPath > verticalPath) {
    horizontalStep = horizontalPath / verticalPath;
    verticalStep = 1;
  } else if (horizontalPath < verticalPath) {
    verticalStep = verticalPath / horizontalPath;
    horizontalStep = 1;
  }

  while (start[0] >= end[0] && start[1] >= end[1]) {
    start[0] -= horizontalStep;
    start[1] -= verticalStep;

    let element = document.elementFromPoint(start[0], start[1]);
    if (element.dataset.spell == "earthshild") return false;
  }

  return true;
}

function isClearPathToRightAndTop(start, end) {
  let horizontalPath = end[0] - start[0];
  let verticalPath = start[1] - end[1];
  let horizontalStep;
  let verticalStep;

  if (horizontalPath == 0) {
    horizontalStep = 0;
    verticalStep = 1;
  } else if (verticalPath == 0) {
    horizontalStep = 1;
    verticalStep = 0;
  } else if (horizontalPath >= verticalPath) {
    horizontalStep = horizontalPath / verticalPath;
    verticalStep = 1;
  } else {
    verticalStep = verticalPath / horizontalPath;
    horizontalStep = 1;
  }

  while (start[0] <= end[0] && start[1] >= end[1]) {
    start[0] += horizontalStep;
    start[1] -= verticalStep;

    let element = document.elementFromPoint(start[0], start[1]);
    if (element.dataset.spell == "earthshild") return false;
  }

  return true;
}

function isClearPathToRightAndBottom(start, end) {
  let horizontalPath = end[0] - start[0];
  let verticalPath = end[1] - start[1];
  let horizontalStep;
  let verticalStep;

  if (horizontalPath == 0) {
    horizontalStep = 0;
    verticalStep = 1;
  } else if (verticalPath == 0) {
    horizontalStep = 1;
    verticalStep = 0;
  } else if (horizontalPath >= verticalPath) {
    horizontalStep = horizontalPath / verticalPath;
    verticalStep = 1;
  } else {
    verticalStep = verticalPath / horizontalPath;
    horizontalStep = 1;
  }

  while (start[0] <= end[0] && start[1] <= end[1]) {
    start[0] += horizontalStep;
    start[1] += verticalStep;

    let element = document.elementFromPoint(start[0], start[1]);
    if (element.dataset.spell == "earthshild") return false;
  }

  return true;
}

function isClearPathToLeftAndBottom(start, end) {
  let horizontalPath = start[0] - end[0];
  let verticalPath = end[1] - start[1];
  let horizontalStep;
  let verticalStep;

  if (horizontalPath == 0) {
    horizontalStep = 0;
    verticalStep = 1;
  } else if (verticalPath == 0) {
    horizontalStep = 1;
    verticalStep = 0;
  } else if (horizontalPath >= verticalPath) {
    horizontalStep = horizontalPath / verticalPath;
    verticalStep = 1;
  } else {
    verticalStep = verticalPath / horizontalPath;
    horizontalStep = 1;
  }

  while (start[0] >= end[0] && start[1] <= end[1]) {
    start[0] -= horizontalStep;
    start[1] += verticalStep;

    let element = document.elementFromPoint(start[0], start[1]);
    if (element.dataset.spell == "earthshild") return false;
  }

  return true;
}

function isClearPath() {
  let divSquareUser = document.querySelector('[data-player="user"]');
  let divSquareEnemy = document.querySelector('[data-player="enemy"]');
  let userCoord = divSquareUser.getBoundingClientRect();
  let enemyCoord = divSquareEnemy.getBoundingClientRect();

  let start = [];
  start[0] = Math.round(userCoord.left + userCoord.width / 2);
  start[1] = Math.round(userCoord.top + userCoord.height / 2);

  let end = [];
  end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
  end[1] = Math.round(enemyCoord.top + enemyCoord.height / 2);

  if (start[0] >= end[0] && start[1] >= end[1]) {
    if (isClearPathToLeftAndTop(start, end)) return true;
  } else if (start[0] <= end[0] && start[1] >= end[1]) {
    if (isClearPathToRightAndTop(start, end)) return true;
  } else if (start[0] <= end[0] && start[1] <= end[1]) {
    if (isClearPathToRightAndBottom(start, end)) return true;
  } else if (start[0] >= end[0] && start[1] <= end[1]) {
    if (isClearPathToLeftAndBottom(start, end)) return true;
  }

  return false;
}

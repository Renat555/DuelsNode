"use strict";

function isBlock(left, top, coordBatlefield) {
  for (let i = 0; i < coordBatlefield.length; i++) {
    if (
      left > coordBatlefield[i]["left"] &&
      left < coordBatlefield[i]["right"] &&
      top > coordBatlefield[i]["top"] + window.pageYOffset &&
      top < coordBatlefield[i]["bottom"] + window.pageYOffset
    ) {
      if (coordBatlefield[i]["spell"] == "earthshild") {
        return true;
      }
    }
  }

  return false;
}

function isClearPathToLeftAndTop(start, end, coordBatlefield) {
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

    if (isBlock(start[0], start[1], coordBatlefield)) return false;
  }

  return true;
}

function isClearPathToRightAndTop(start, end, coordBatlefield) {
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

    if (isBlock(start[0], start[1], coordBatlefield)) return false;
  }

  return true;
}

function isClearPathToRightAndBottom(start, end, coordBatlefield) {
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

    if (isBlock(start[0], start[1], coordBatlefield)) return false;
  }

  return true;
}

function isClearPathToLeftAndBottom(start, end, coordBatlefield) {
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

    if (isBlock(start[0], start[1], coordBatlefield)) return false;
  }

  return true;
}

function isClearPath() {
  let divSpell = document.getElementsByClassName("userSpell")[0];
  let spell = divSpell.dataset.spell;

  let divSquareUser = document.querySelector('[data-player="user"]');
  let divSquareEnemy = document.querySelector('[data-player="enemy"]');
  let userCoord = divSquareUser.getBoundingClientRect();
  let enemyCoord = divSquareEnemy.getBoundingClientRect();

  let start = [];
  let end = [];

  switch (spell) {
    case "firespear":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "fireshild":
      return true;
    case "firecrown":
      return true;
    case "firesource":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "firesphere":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "firestamp":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "firekey":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "fireflow":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "firepower":
      return true;
    case "waterspear":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "watershild":
      return true;
    case "watercrown":
      return true;
    case "watersource":
      return true;
    case "watersphere":
      return true;
    case "waterstamp":
      return true;
    case "waterkey":
      return true;
    case "waterflow":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "waterpower":
      return true;
    case "earthspear":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "earthshild":
      return true;
    case "earthcrown":
      return true;
    case "earthsource":
      return true;
    case "earthsphere":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "earthstamp":
      return true;
    case "earthkey":
      return true;
    case "earthflow":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "earthpower":
      return true;
    case "airspear":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "airshild":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "aircrown":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "airsource":
      return true;
    case "airsphere":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "airstamp":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "airkey":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "airflow":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "airpower":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "lifespear":
      return true;
    case "lifeshild":
      return true;
    case "lifecrown":
      return true;
    case "lifesource":
      return true;
    case "lifesphere":
      return true;
    case "lifestamp":
      return true;
    case "lifekey":
      return true;
    case "lifeflow":
      return true;
    case "lifepower":
      return true;
    case "deathspear":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathshild":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathcrown":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathsource":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathsphere":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathstamp":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathkey":
      return true;
    case "deathflow":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    case "deathpower":
      start[0] = Math.round(userCoord.left + userCoord.width / 2);
      start[1] =
        window.pageYOffset + Math.round(userCoord.top + userCoord.height / 2);
      end[0] = Math.round(enemyCoord.left + enemyCoord.width / 2);
      end[1] =
        window.pageYOffset + Math.round(enemyCoord.top + enemyCoord.height / 2);
      break;
    default:
      return true;
  }

  let battlefield = document.querySelectorAll("[data-row]");
  let coordBatlefield = [];
  for (let i = 0; i < battlefield.length; i++) {
    coordBatlefield.push(battlefield[i].getBoundingClientRect());
    coordBatlefield[i]["spell"] = battlefield[i].dataset.spell;
  }

  if (start[0] >= end[0] && start[1] >= end[1]) {
    if (isClearPathToLeftAndTop(start, end, coordBatlefield)) return true;
  } else if (start[0] <= end[0] && start[1] >= end[1]) {
    if (isClearPathToRightAndTop(start, end, coordBatlefield)) return true;
  } else if (start[0] <= end[0] && start[1] <= end[1]) {
    if (isClearPathToRightAndBottom(start, end, coordBatlefield)) return true;
  } else if (start[0] >= end[0] && start[1] <= end[1]) {
    if (isClearPathToLeftAndBottom(start, end, coordBatlefield)) return true;
  }

  return false;
}

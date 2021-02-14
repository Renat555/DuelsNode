import { clearLightningPath } from "./lightningPath.js";
import { faceToEnemy } from "./faceToEnemy.js";
import { clearStyles } from "./clearStyles.js";

function muveUp(trajectory) {
  let divUser = document.querySelector(`[data-hero="user"]`);
  let coordUser = divUser.getBoundingClientRect();

  let divSquareUser = document.querySelector(`[data-player="user"]`);

  let destinationSquare = document.querySelector(
    `[data-row="${+divSquareUser.dataset.row + 1}"][data-col="${
      divSquareUser.dataset.col
    }"]`
  );
  let coordDestination = destinationSquare.getBoundingClientRect();

  let counter = 0;
  let pathLength =
    coordUser.top - (coordDestination.top + coordDestination.height / 20);
  const ONE_STEP = pathLength / 2;

  let idInterval = setInterval(function () {
    divUser.style.top = coordUser.top - counter + "px";

    counter++;

    if (counter > ONE_STEP) {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroBack1");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroBack1");
      }
    } else {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroBack2");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroBack2");
      }
    }

    if (counter >= pathLength) {
      destinationSquare.dataset.player = "user";
      divSquareUser.dataset.player = "";
      trajectory.shift();
      muveUser(trajectory);
      clearInterval(idInterval);
    }
  }, 6);
}

function muveDown(trajectory) {
  let divUser = document.querySelector(`[data-hero="user"]`);
  let coordUser = divUser.getBoundingClientRect();

  let divSquareUser = document.querySelector(`[data-player="user"]`);

  let destinationSquare = document.querySelector(
    `[data-row="${+divSquareUser.dataset.row - 1}"][data-col="${
      divSquareUser.dataset.col
    }"]`
  );
  let coordDestination = destinationSquare.getBoundingClientRect();

  let counter = 0;
  let pathLength =
    coordDestination.top + coordDestination.height / 20 - coordUser.top;
  const ONE_STEP = pathLength / 2;

  let idInterval = setInterval(function () {
    divUser.style.top = coordUser.top + counter + "px";

    counter++;

    if (counter > ONE_STEP) {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroFront1");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroFront1");
      }
    } else {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroFront2");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroFront2");
      }
    }

    if (counter >= pathLength) {
      destinationSquare.dataset.player = "user";
      divSquareUser.dataset.player = "";
      trajectory.shift();
      muveUser(trajectory);
      clearInterval(idInterval);
    }
  }, 6);
}

function muveRight(trajectory) {
  let divUser = document.querySelector(`[data-hero="user"]`);
  let coordUser = divUser.getBoundingClientRect();
  let divSquareUser = document.querySelector(`[data-player="user"]`);

  let destinationSquare = document.querySelector(
    `[data-row="${divSquareUser.dataset.row}"][data-col="${
      +divSquareUser.dataset.col + 1
    }"]`
  );
  let coordDestination = destinationSquare.getBoundingClientRect();

  let counter = 0;
  let stepCounter = 0;
  let pathLength =
    coordDestination.left + coordDestination.width / 20 - coordUser.left;
  const ONE_STEP = pathLength / 2;

  let idInterval = setInterval(function () {
    divUser.style.left = coordUser.left + counter + "px";
    counter++;

    if (counter > ONE_STEP) {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroRight1");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroRight1");
      }
    } else {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroRight2");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroRight2");
      }
    }

    if (counter >= pathLength) {
      destinationSquare.dataset.player = "user";
      divSquareUser.dataset.player = "";
      trajectory.shift();
      muveUser(trajectory);
      clearInterval(idInterval);
    }
  }, 6);
}

function muveLeft(trajectory) {
  let divUser = document.querySelector(`[data-hero="user"]`);
  let coordUser = divUser.getBoundingClientRect();

  let divSquareUser = document.querySelector(`[data-player="user"]`);

  let destinationSquare = document.querySelector(
    `[data-row="${divSquareUser.dataset.row}"][data-col="${
      +divSquareUser.dataset.col - 1
    }"]`
  );
  let coordDestination = destinationSquare.getBoundingClientRect();

  let counter = 0;
  let pathLength =
    coordUser.left - (coordDestination.left + coordDestination.width / 20);
  const ONE_STEP = pathLength / 2;

  let idInterval = setInterval(function () {
    divUser.style.left = coordUser.left - counter + "px";

    counter++;

    if (counter > ONE_STEP) {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroLeft1");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroLeft1");
      }
    } else {
      clearStyles(divUser);

      if (divUser.dataset.picture == "a") {
        divUser.classList.add("AHeroLeft2");
      } else if (divUser.dataset.picture == "c") {
        divUser.classList.add("CHeroLeft2");
      }
    }

    if (counter >= pathLength) {
      destinationSquare.dataset.player = "user";
      divSquareUser.dataset.player = "";
      trajectory.shift();
      muveUser(trajectory);
      clearInterval(idInterval);
    }
  }, 6);
}

export function muveUser(trajectory) {
  clearLightningPath();

  if (trajectory.length == 1) {
    faceToEnemy();
    return;
  }

  if (trajectory[0][0] < trajectory[1][0]) {
    muveUp(trajectory);
  } else if (trajectory[0][0] > trajectory[1][0]) {
    muveDown(trajectory);
  } else if (trajectory[0][1] < trajectory[1][1]) {
    muveRight(trajectory);
  } else if (trajectory[0][1] > trajectory[1][1]) {
    muveLeft(trajectory);
  }
}

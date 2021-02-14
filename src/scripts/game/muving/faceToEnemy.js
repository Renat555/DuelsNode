import {clearStyles} from './clearStyles.js';

export function faceToEnemy() {
  let divUser = document.querySelector(`[data-hero="user"]`);
  let divEnemy = document.querySelector(`[data-hero="enemy"]`);
  let divSquareUser = document.querySelector(`[data-player="user"]`);
  let divSquareEnemy = document.querySelector(`[data-player="enemy"]`);

  clearStyles(divUser);
  clearStyles(divEnemy);

  if (divSquareEnemy.dataset.row > divSquareUser.dataset.row) {

    if (divUser.dataset.picture == 'a') {
      divUser.classList.add('AHeroBack1');
      divEnemy.classList.add('CHeroFront1');
    } else {
      divUser.classList.add('CHeroBack1');
      divEnemy.classList.add('AHeroFront1');
    }

  } else if (divSquareEnemy.dataset.row < divSquareUser.dataset.row) {

    if (divUser.dataset.picture == 'a') {
      divUser.classList.add('AHeroFront1');
      divEnemy.classList.add('CHeroBack1');
    } else {
      divUser.classList.add('CHeroFront1');
      divEnemy.classList.add('AHeroBack1');
    }

  } else if (divSquareEnemy.dataset.col < divSquareUser.dataset.col) {

    if (divUser.dataset.picture == 'a') {
      divUser.classList.add('AHeroLeft1');
      divEnemy.classList.add('CHeroRight1');
    } else {
      divUser.classList.add('CHeroLeft1');
      divEnemy.classList.add('AHeroRight1');
    }

  } else if (divSquareEnemy.dataset.col > divSquareUser.dataset.col) {

    if (divUser.dataset.picture == 'a') {
      divUser.classList.add('AHeroRight1');
      divEnemy.classList.add('CHeroLeft1');
    } else {
      divUser.classList.add('CHeroRight1');
      divEnemy.classList.add('AHeroLeft1');
    }

  }

}

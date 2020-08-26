"use strict";

let hero = {
  name: "undefined",
  maxHealth: '',
  health: '',
  muve: '',
  elements: [],
  forms: [],
  buffs: [],
  debuffs: []
}

hero['id'] = randomString();

function randomString() {
	let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
	let result = "";

	for (let i = 0; i < 10; i++) {
		result += string[Math.floor(Math.random()*Math.floor(62))];
	}

	return result;
}

function selectElement(div, elements) {
    if (elements.length < 3) {
      div.setAttribute("data-status", "selected");
      div.classList.add("highlight");
      elements.push(div.dataset.value);
      return;
    }
}

function selectForm(div, forms) {
    if (forms.length < 5) {
      div.setAttribute("data-status", "selected");
      div.classList.add("highlight");
      forms.push(div.dataset.value);
      return;
    }
}

function clearElement(div, elements) {
  for (let i = 0; i < 3; i++) {
    if (elements[i] == div.dataset.value) {
      elements.splice(i, 1);
      div.classList.remove("highlight");
      div.setAttribute("data-status", "notSelected");
      return;
    }
  }
}

function clearForm(div, forms) {
  for (let i = 0; i < 5; i++) {
    if (forms[i] == div.dataset.value) {
      forms.splice(i, 1);
      div.classList.remove("highlight");
      div.setAttribute("data-status", "notSelected");
      return;
    }
  }
}

function choose(event) {
  let div = event.currentTarget;
  let classElement = div.classList[0];

  if (div.dataset.status == "notSelected") {

    switch (classElement) {
      case "wrapperElement":
        selectElement(div, hero['elements']);
        break;
      case "wrapperForm":
        selectForm(div, hero['forms']);
    }

  } else if (div.dataset.status == "selected") {

    switch (classElement) {
      case "wrapperElement":
        clearElement(div, hero['elements']);
        break;
      case "wrapperForm":
        clearForm(div, hero['forms']);
    }

  }
}

let selectedDivs = document.querySelectorAll('[data-status]');
for (let div of selectedDivs) {
  div.addEventListener("click", choose);
}

let buttonStartGame = document.getElementsByName("startGame")[0];

buttonStartGame.onclick = async () => {

  hero.name = document.getElementsByName("userName")[0].value;

    if (hero['elements'].length < 3) {
      alert("Выберите три стихии.");
      return;
    }

  if (hero['forms'].length < 5) {
      alert("Выберите пять форм.");
      return;
    }

  hero['header'] = 'createPlayer';

  localStorage.setItem('hero', JSON.stringify(hero));

  window.location.href = '../game';
};

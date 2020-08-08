"use strict";

let hero = {
  name: "undefined"
}

let elements = {
  element1: "undefined",
  element2: "undefined",
  element3: "undefined"
}

let forms = {
  form1: "undefined",
  form2: "undefined",
  form3: "undefined",
  form4: "undefined",
  form5: "undefined"
}

let divWait = document.getElementById("fixed");
divWait.hidden = true;

function selectDiv(element, obj) {
  for (let key in obj) {
    if (obj[key] == "undefined") {
      element.setAttribute("data-status", "selected");
      element.classList.add("highlight");
      obj[key] = element.dataset.value;
      return;
    }
  }
}

function clearDiv(element, obj) {
  for (let key in obj) {
    if (obj[key] == element.dataset.value) {
      obj[key] = "undefined";
      element.classList.remove("highlight");
      element.setAttribute("data-status", "notSelected");
      return;
    }
  }
}

function choose(event) {
  let element = event.currentTarget;
  let classElement = element.classList[0];

  if (element.dataset.status == "notSelected") {

    switch (classElement) {
      case "wrapperElement":
        selectDiv(element, elements);
        break;
      case "wrapperForm":
        selectDiv(element, forms);
    }

  } else if (element.dataset.status == "selected") {

    switch (classElement) {
      case "wrapperElement":
        clearDiv(element, elements);
        break;
      case "wrapperForm":
        clearDiv(element, forms);
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

  for (let item in elements) {
    if (elements[item] == "undefined") {
      alert("Выберите три стихии.");
      return;
    }
  }

  for (let item in forms) {
    if (forms[item] == "undefined") {
      alert("Выберите пять форм.");
      return;
    }
  }

  Object.assign(hero, elements, forms);
  hero['header'] = 'createPlayer';

  localStorage.setItem('hero', JSON.stringify(hero));

  window.location.href = '../game';
};

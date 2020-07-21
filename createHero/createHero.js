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

function chooseElement (event) {
  let target = event.currentTarget;

  if (target.dataset.status == "notSelected") {

    for (let key in elements) {
      if (elements[key] == "undefined") {
        target.setAttribute("data-status", "selected");
        target.classList.add("highlight");
        elements[key] = target.dataset.element;
        return;
      }
    }

  } else if (target.dataset.status == "selected") {

    for (let key in elements) {
      if (elements[key] == target.dataset.element) {
        elements[key] = "undefined";
        target.classList.remove("highlight");
        target.setAttribute("data-status", "notSelected");
        return;
      }
    }

  }

}

let divElements = document.querySelectorAll('.wrapper');
for (let elem of divElements) {
  elem.addEventListener("click", chooseElement);
}


let formCounter = 0;

function chooseForm (event) {
  let target = event.currentTarget;

  if (target.dataset.status == "notSelected") {

    for (let key in forms) {
      if (forms[key] == "undefined") {
        target.setAttribute("data-status", "selected");
        target.classList.add("highlight");
        forms[key] = target.dataset.form;
        return;
      }
    }

  } else if (target.dataset.status == "selected") {

    for (let key in forms) {
      if (forms[key] == target.dataset.form) {
        forms[key] = "undefined";
        target.classList.remove("highlight");
        target.setAttribute("data-status", "notSelected");
        return;
      }
    }

  }

}

let divForms = document.querySelectorAll('.wrapperForm');
for (let elem of divForms) {
  elem.addEventListener("click", chooseForm);
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

  divWait.hidden = false;

  let formData = new FormData();
  let parameters = JSON.stringify(hero);
  formData.append("parameters", parameters);

    let response = await fetch("createHero.php", {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(result => {
      console.log(result);
    })

  window.location.href = '../game/game.html';
};

function createBattlefieldSpell(divSquare, effects) {
  divSquare.dataset.spell = "";
  divSquare.className = "col battleSquare";

  for (let i = 0; i < effects.length; i++) {
    for (let j = 0; j < effects[i][2].length; j++) {
      if (
        divSquare.dataset.row == effects[i][2][j][0] &&
        divSquare.dataset.col == effects[i][2][j][1]
      ) {
        divSquare.classList.add(effects[i][0]);
        divSquare.dataset.spell = effects[i][0];
        divSquare.dataset.duration = effects[i][1];
      }
    }
  }
}

function changeBattlefield(users) {
  let userActionPoints = document.getElementById("actionPoints");
  let userEnergyPoints = document.getElementById("energyPoints");
  userActionPoints.innerHTML = users["user"]["actionPoints"];
  userEnergyPoints.innerHTML = users["user"]["energyPoints"];

  let battlefield = document.querySelectorAll("[data-row]");

  for (let i = 0; i < battlefield.length; i++) {
    createBattlefieldSpell(battlefield[i], users.user.battlefield);
  }

  let userMuve = document.getElementById("userMuve");
  if (!userMuve.hidden) return;

  let enemyActionPoints = document.getElementById("enemyActionPoints");
  let enemyEnergyPoints = document.getElementById("enemyEnergyPoints");
  enemyActionPoints.innerHTML = users["enemy"]["actionPoints"];
  enemyEnergyPoints.innerHTML = users["enemy"]["energyPoints"];
}

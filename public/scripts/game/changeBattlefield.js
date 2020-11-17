function createBattlefieldSpell(spell) {
  let battlefield = document.querySelectorAll("[data-row]");
  let coord = spell[2];

  for (let i = 0; i < coord.length; i++) {
    for (let j = 0; j < battlefield.length; j++) {
      if (
        battlefield[j].dataset.row == coord[i][0] &&
        battlefield[j].dataset.col == coord[i][1]
      ) {
        battlefield[j].classList.add(spell[0]);
        battlefield[j].dataset.spell = spell[0];
      }
    }
  }
}

function changeBattlefield(users) {
  let userMuve = document.getElementById("userMuve");
  if (!userMuve.hidden) return;

  let battlefield = users.user.battlefield;

  for (let i = 0; i < battlefield.length; i++) {
    createBattlefieldSpell(battlefield[i]);
  }
}

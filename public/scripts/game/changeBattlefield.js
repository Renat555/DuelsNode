function createBattlefieldSpell(spell) {
  let battlefield = document.querySelectorAll("[data-availability]");

  for (let i = 2; i < spell.length; i++) {
    for (let j = 0; j < battlefield.length; j++) {
      if (
        battlefield[j].dataset.row == spell[i][0] &&
        battlefield[j].dataset.col == spell[i][1]
      ) {
        battlefield[j].classList.add(spell[0]);
        battlefield[j].dataset.availability = "block";
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


function isHaveDependences(effect, spell) {
  for (let i = 0; i < effect['dependences'].length; i++) {
    if (effect['dependences'][i] == spell['spellName']) return true;
  }
  return false;
}

module.exports = isHaveDependences;
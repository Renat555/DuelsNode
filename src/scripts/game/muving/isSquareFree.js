export function isSquareFree(square) {
  if (square === null) return false;
  if (!square.classList.contains("battleSquare")) return false;
  if (square.dataset.player) return false;
  if (square.dataset.spell == "earthshild") return false;

  return true;
}

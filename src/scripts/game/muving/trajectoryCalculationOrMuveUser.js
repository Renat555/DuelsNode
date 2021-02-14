import { trajectoryCalculationForUser } from "./trajectoryCalculationForUser";
import { isSquareFree } from "./isSquareFree";
import { muveUser } from "./muveUser";
import { lightningPath, clearLightningPath } from "./lightningPath";
import { isMyMuve } from "../isMyMuve";
import { ws } from "../socketClient";

export function trajectoryCalculationOrMuveUser(event) {
  let target = event.target;

  if (target.classList.contains("pathPoint")) {
    target = target.parentNode;
  }

  if (!isMyMuve()) return;
  if (!isSquareFree(target)) return;

  if (
    target.childNodes[0] != undefined &&
    target.childNodes[0].classList.contains("pathPoint")
  ) {
    let trajectory = localStorage.getItem("trajectory");
    trajectory = JSON.parse(trajectory);

    let lastSquare = trajectory[trajectory.length - 1];

    if (
      target.dataset.row == lastSquare[0] &&
      target.dataset.col == lastSquare[1]
    ) {
      muveUser(trajectory);
      let muveInformation = { header: "muveHero", muve: trajectory };
      ws.send(JSON.stringify(muveInformation));
      return;
    }
  }

  clearLightningPath();

  let trajectory = trajectoryCalculationForUser(target);
  if (trajectory == "pathIsBloked") return;

  let availableDistance = document.getElementById("actionPoints").innerHTML;
  if (availableDistance < trajectory.length - 1) return;

  lightningPath(trajectory);

  localStorage.setItem("trajectory", JSON.stringify(trajectory));
}

"use strict";

function showHints() {
  let divSpells = document.querySelectorAll("[data-spell]");

  for (let i = 0; i < divSpells.length; i++) {
    divSpells[i].addEventListener("mouseenter", showHint);
  }
}

function showHint(event) {
  let target = event.target;
  if (!target.dataset.spell) return;
  if (target.dataset.availability) return;

  let duration = target.dataset.duration;
  let hint;

  let divHint = document.createElement("div");
  divHint.classList.add("hint");
  document.body.append(divHint);

  switch (target.dataset.spell) {
    case "fireshild":
      hint = "(огонь, баф) Cнижает на 40% урон от дебафов.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "firecrown":
      hint = "(огонь, баф) Усиливает ваши атакующие заклинания на 25%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "firesource":
      hint = "(огонь, дебаф) Наносит от 5 до 12 единиц урона.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "firesphere":
      hint =
        "(огонь, дебаф) При получении прямого урона наносит 5-10 единиц урона от клетки.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "firepower":
      hint =
        "(огонь, баф) Увеличивает урон от атакующих огненных заклинаний на 5 единиц.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "watershild":
      hint = "(вода, баф) Снижает урон от атакующих заклинаний на 20%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "watercrown":
      hint = "(вода, баф) Снижает урон от дебафов на 50%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "watersphere":
      hint = "(вода, баф) Полностью блокирует урон от атакующих заклинаний.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "waterstamp":
      hint = "(вода, баф) Блокирует треть урона от атакующих заклинаний.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "waterpower":
      hint = "(вода, баф) Увеличивает срок действия водных бафов на два хода.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "earthshild":
      hint =
        "(земля, баф) Снижает урон от дебафов и атакующих заклинаний на 10 единиц.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "earthcrown":
      hint =
        "(земля, баф) Увеличивает вероятность попаданя по противнику атакующими заклинаниями на 15%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "earthsource":
      hint =
        "(земля, баф) Увеличивает урон от атакующих земных заклинаний на 15 единиц, увеличивает длительность дебафов земли на один ход.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "earthsphere":
      hint =
        "(земля, дебаф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями урона на 5%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "earthstamp":
      hint = "(земля, баф) Блокирует половину урона от атакующих заклинаний.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "earthpower":
      hint =
        "(земля, баф) Увелчивает срок действия бафов земли на четыре хода, срабатывает на каждом бафе с вероятностью 50%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "airshild":
      hint =
        "(воздух, дебаф) Снижает вероятность пападания по противнику заклинаниями урона на 33%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "aircrown":
      hint =
        "(воздух, дебаф) Снижает вероятность успешного наложения бафа на 33%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "airsource":
      hint =
        "(воздух, баф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями прямого урона на 10%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "airsphere":
      hint = "(воздух, дебаф) Снижает вероятность попадания дебафом на 33%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "airstamp":
      hint =
        "(воздух, дебаф) Снижает вероятность успешного наложения бафа на 10%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "airpower":
      hint =
        "(воздух, баф) Уменьшает вероятность попадания по вам заклинаниями урона, на 20%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "lifeshild":
      hint = "(жизнь, баф) Не позволяет уменьшать максимальный запас здоровья.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "lifesphere":
      hint = "(жизнь, баф) Восстанавливает 10 единиц здоровья.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "lifestamp":
      hint = "(жизнь, баф) Не позволяет наклдывать дебафы смерти.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "lifeflow":
      hint = "(жизнь, баф) Восстанавливает по 25 единиц здоровья.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "lifepower":
      hint =
        "(жизнь, баф) Не позволяет противнику снимать с вас бафы жизни, до тех пока не будет снят этот баф.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "deathshild":
      hint =
        "(смерть, дебаф) Снижает вероятность успешного наложения бафов на 50%.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "deathsphere":
      hint =
        "(смерть, дебаф) Увеличивает урон от накладываемых дебафов на 15 единиц.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "deathstamp":
      hint = "(смерть, дебаф) Не позволяет накладывать бафы.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "deathkey":
      hint =
        "(смерть, баф) С вероятностью 50%, при получении смертельного урона от атакующего заклинания, ваше здоровье восстановиться до единицы.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
    case "deathflow":
      hint =
        "(смерть, дебаф) Отнимает пять единиц здоровья и восстанавливает пять единиц здоровья наложившему дебаф.";
      if (duration == -1) duration = "действует постоянно.";
      hint += " Осталось ходов: " + duration;
      divHint.innerHTML = hint;
      break;
  }

  if (!target.dataset.duration) {
    divHint.innerHTML = spellbook[target.dataset.spell][3];
  }

  let coordSpell = target.getBoundingClientRect();
  let coordHint = divHint.getBoundingClientRect();
  let top, left;

  if (coordSpell["top"] < 300) {
    top = coordSpell["top"] + coordSpell["height"] + 10;
  } else {
    top = coordSpell["top"] - coordHint["height"] - 10;
  }

  if (coordSpell["left"] < 150) {
    left = coordSpell["left"];
  } else if (document.documentElement.clientWidth - coordSpell["right"] < 150) {
    left = coordSpell["right"] - coordHint["width"];
  } else {
    left =
      coordSpell["left"] + coordSpell["width"] / 2 - coordHint["width"] / 2;
  }

  divHint.style.top = top + "px";
  divHint.style.left = left + "px";

  target.addEventListener("mouseleave", deleteHint);

  function deleteHint() {
    divHint.remove();
  }
}

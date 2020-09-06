"use strict";

function addEvent() {
  let divSpell = document.querySelector(".userSpell");
  let divEnemyDebuffs = document.querySelectorAll("[data-debuffEnemyElement]");
  let divEnemyBuffs = document.querySelectorAll("[data-buffEnemyElement]");
  let divBuffs = document.querySelectorAll("[data-buffElement]");
  let divDebuffs = document.querySelectorAll("[data-debuffElement]");

  for (let i = 0; i < divEnemyDebuffs.length; i++) {
    divEnemyDebuffs[i].addEventListener("mouseenter", showHint);
  }

  for (let i = 0; i < divEnemyBuffs.length; i++) {
    divEnemyBuffs[i].addEventListener("mouseenter", showHint);
  }

  divSpell.addEventListener("mouseenter", showHint);

  for (let i = 0; i < divBuffs.length; i++) {
    divBuffs[i].addEventListener("mouseenter", showHint);
  }

  for (let i = 0; i < divDebuffs.length; i++) {
    divDebuffs[i].addEventListener("mouseenter", showHint);
  }

}

addEvent();

function showHint(event) {
  let target = event.target;
  let text = target.innerHTML;
  let duration = target.dataset.duration;
  let hint;

  let divHint = document.createElement('div');
  divHint.classList.add('hint');
  document.body.append(divHint);

  if (target.dataset.spellelement) {

    divHint.innerHTML = spellbook[target.dataset.spellelement + target.dataset.spellform][3];
    
  } else {
    switch (text) {
      case "Огненный щит":
        hint = "(огонь, баф) Cнижает на 40% урон от дебафов.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Огненный венец":
        hint = "(огонь, баф) Усиливает ваши атакующие заклинания на 25%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Вулкан":
        hint = "(огонь, дебаф) Наносит от 5 до 12 единиц урона.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Огненная клетка":
        hint = "(огонь, дебаф) При получении прямого урона наносит 5-10 единиц урона от клетки.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Власть огня":
        hint = "(огонь, баф) Увеличивает урон от атакующих огненных заклинаний на 5 единиц.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Ледяная стена":
        hint = "(вода, баф) Снижает урон от атакующих заклинаний на 20%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Корона воды":
        hint = "(вода, баф) Снижает урон от накладываемых на вас дебафов на 50%. Не влияет на дебафы наложенные ранее.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Ледяная сфера":
        hint = "(вода, баф) Полностью блокирует урон от атакующих заклинаний.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Печать воды":
        hint = "(вода, баф) Блокирует треть урона от атакующих заклинаний.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Власть воды":
        hint = "(вода, баф) Увеличивает срок действия водных бафов на два хода.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Скала":
        hint = "(земля, баф) Снижает урон от дебафов и атакующих заклинаний на 10 единиц.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Корона земли":
        hint = "(земля, баф) Увеличивает вероятность попаданя по противнику атакующими заклинаниями на 15%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Земные недра":
        hint = "(земля, баф) Увеличивает урон от атакующих земных заклинаний на 15 единиц, увеличивает длительность дебафов земли на один ход.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Склеп":
        hint = "(земля, дебаф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями урона на 5%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Печать земли":
        hint = "(земля, баф) Блокирует половину урона от атакующих заклинаний.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Власть земли":
        hint = "(земля, баф) Увелчивает срок действия бафов земли на четыре хода, срабатывает на каждом бафе с вероятностью 50%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Вихрь":
        hint = "(воздух, дебаф) Снижает вероятность пападания по противнику заклинаниями урона на 33%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Корона воздуха":
        hint = "(воздух, дебаф) Снижает вероятность успешного наложения бафа на 33%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Врата воздуха":
        hint = "(воздух, баф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями прямого урона на 10%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Воздушный кокон":
        hint = "(воздух, дебаф) Снижает вероятность попадания дебафом на 33%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Печать воздуха":
        hint = "(воздух, дебаф) Снижает вероятность успешного наложения бафа на 10%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Власть воздуха":
        hint = "(воздух, баф) Уменьшает вероятность попадания по вам заклинаниями урона, на 20%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Щит жизни":
        hint = "(жизнь, баф) Не позволяет уменьшать максимальный запас здоровья.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Сфера восстановления":
        hint = "(жизнь, баф) Восстанавливает 10 единиц здоровья.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Печать жизни":
        hint = "(жизнь, баф) Не позволяет наклдывать дебафы смерти.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Поток жизни":
        hint = "(жизнь, баф) Восстанавливает по 25 единиц здоровья.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Власть жизни":
        hint = "(жизнь, баф) Не позволяет противнику снимать с вас бафы жизни, до тех пока не будет снят этот баф.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Пелена смерти":
        hint = "(смерть, дебаф) Снижает вероятность успешного наложения бафов на 50%.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Круг смерти":
        hint = "(смерть, дебаф) Увеличивает урон от накладываемых дебафов на 15 единиц.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Печать смерти":
        hint = "(смерть, дебаф) Не позволяет накладывать бафы.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Ключ от смерти":
        hint = "(смерть, баф) Если у вас закончится запас здоровья, с вероятностью 50% оно восстановится до единицы.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      case "Поток смерти":
        hint = "(смерть, дебаф) Отнимает пять единиц здоровья и восстанавливает пять единиц здоровья наложившему дебаф.";
        if (duration > 100) duration = "действует постоянно.";
        hint += " Осталось ходов: " + duration;
        divHint.innerHTML = hint;
        break;
      default:
        deleteHint();
    }
  }



  let coordSpell = target.getBoundingClientRect();
  let coordHint = divHint.getBoundingClientRect();
  let top, left;

  if (coordSpell['top'] < 300) {
    top = coordSpell['top'] + coordSpell['height'] + 10;
  } else {
    top = coordSpell['top'] - coordHint['height'] - 10;
  }

  if (coordSpell['left'] < 150) {
    left = coordSpell['left'];
  } else if (document.documentElement.clientWidth - coordSpell['right'] < 150) {
    left = coordSpell['right'] - coordHint['width'];
  } else {
    left = (coordSpell['left'] + coordSpell['width']/2) - coordHint['width']/2;
  }

  divHint.style.top = top + "px";
  divHint.style.left = left + "px";

  target.addEventListener("mouseleave", deleteHint);

  function deleteHint() {
    divHint.remove();
  }
}

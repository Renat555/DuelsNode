"use strict";

let divSpells = document.querySelectorAll("[data-spellElement]");
let divEnemySpells = document.querySelectorAll("[data-spell]");
let divEnemyDebuffs = document.querySelectorAll("[data-debuffEnemyElement]");
let divEnemyBuffs = document.querySelectorAll("[data-buffEnemyElement]");
let divBuffs = document.querySelectorAll("[data-buffElement]");
let divDebuffs = document.querySelectorAll("[data-debuffElement]");

for (let i = 0; i < divEnemySpells.length; i++) {
  divEnemySpells[i].addEventListener("mouseenter", showHint);
}

for (let i = 0; i < divEnemyDebuffs.length; i++) {
  divEnemyDebuffs[i].addEventListener("mouseenter", showHint);
}

for (let i = 0; i < divEnemyBuffs.length; i++) {
  divEnemyBuffs[i].addEventListener("mouseenter", showHint);
}

for (let i = 0; i < divSpells.length; i++) {
  divSpells[i].addEventListener("mouseenter", showHint);
}

for (let i = 0; i < divBuffs.length; i++) {
  divBuffs[i].addEventListener("mouseenter", showHint);
}

for (let i = 0; i < divDebuffs.length; i++) {
  divDebuffs[i].addEventListener("mouseenter", showHint);
}

function showHint(event) {
  let target = event.target;
  let text = target.innerHTML;
  let duration = target.dataset.duration;
  let hint;

  let divHint = document.createElement('div');
  divHint.classList.add('hint');
  document.body.append(divHint);

  if (target.dataset.spellelement || target.dataset.spell) {

    switch (text) {
      case "Метеор":
        divHint.innerHTML = "(огонь, прямой урон) Наносит урон противнику от 20 до 30 единиц.";
        break;
      case "Огненный щит":
        divHint.innerHTML = "(огонь, баф) В течении четырех ходов снижает на 40% урон от дебафов.";
        break;
      case "Огненный венец":
        divHint.innerHTML = "(огонь, баф) В течении четырех ходов усиливает ваши атакующие заклинания на 25%.";
        break;
      case "Вулкан":
        divHint.innerHTML = "(огонь, дебаф) В течении трех ходов, каждый ход наносит от 5 до 12 единиц урона.";
        break;
      case "Огненная клетка":
        divHint.innerHTML = "(огонь, дебаф) При получении прямого урона наносит 5-10 единиц урона от клетки, действует постоянно.";
        break;
      case "Клеймо огня":
        divHint.innerHTML = "(огонь, другое) Увеличивает продолжительность всех наложенных на врага дебафов на два хода.";
        break;
      case "Ключ огня":
        divHint.innerHTML = "(огонь, диспел) Снимает с противника баф воды или земли. Не забудьте выбрать цель.";
        break;
      case "Струя пламени":
        divHint.innerHTML = "(огонь, прямой урон) Наносит противнику урон от 25 до 35 единиц, попадает в цель с вероятностью 66%.";
        break;
      case "Власть огня":
        divHint.innerHTML = "(огонь, баф) Постоянно увеличивает урон от атакующих огненных заклинаний на 5 единиц.";
        break;
      case "Ледяной осколок":
        divHint.innerHTML = "(вода, прямой урон) Наносит противнику от 5 до 15 единиц урона, за каждый дебаф, наложенный на противника, наносимый урон дополнительно увеличивается на 5.";
        break;
      case "Ледяная стена":
        divHint.innerHTML = "(вода, баф) В течении шести ходов снижает урон от атакующих заклинаний на 40%.";
        break;
      case "Корона воды":
        divHint.innerHTML = "(вода, баф) Снижает урон от дебафов на 50%, действует шесть ходов.";
        break;
      case "Родник":
        divHint.innerHTML = "(вода, диспел) Позволяет снять дебаф огня, воды, земли или воздуха с вероятностью 66%. Не забудьте выбрать цель.";
        break;
      case "Ледяная сфера":
        divHint.innerHTML = "(вода, баф) Полностью блокирует урон от атакующих заклинаний в течении двух ходов.";
        break;
      case "Печать воды":
        divHint.innerHTML = "(вода, баф) В течении шести ходов блокирует треть урона от атакующих заклинаний.";
        break;
      case "Ключ воды":
        divHint.innerHTML = "(вода, диспел) Позволяет снять дебаф огня или воздуха. Не забудьте выбрать цель.";
        break;
      case "Водный поток":
        divHint.innerHTML = "(вода, прямой урон) Наносит 20 единиц урона.";
        break;
      case "Власть воды":
        divHint.innerHTML = "(вода, баф) Постоянно увеличивает срок действия водных бафов на два хода.";
        break;
      case "Глыба":
        divHint.innerHTML = "(земля, прямой урон) Наносит урон противнику от 50 до 70 единиц. Попадает в цель с вероятностью 33%";
        break;
      case "Скала":
        divHint.innerHTML = "(земля, баф) В течении восьми ходов снижает урон от дебафов и атакующих заклинаний на 10 единиц.";
        break;
      case "Корона земли":
        divHint.innerHTML = "(земля, баф) На шесть ходов увеличивает вероятность попаданя по противнику атакующими заклинаниями на 15%.";
        break;
      case "Земные недра":
        divHint.innerHTML = "(земля, баф) Увеличивает урон от атакующих земных заклинаний на 15 единиц, увеличивает длительность дебафов земли на один ход, действует четыре хода.";
        break;
      case "Склеп":
        divHint.innerHTML = "(земля, дебаф) Увеличивает вероятность попадания по противнику дебафами и заклинаниями урона на 5%, на десять ходов.";
        break;
      case "Печать земли":
        divHint.innerHTML = "(земля, баф) В течении четырех ходов блокирует половину урона от атакующих заклинаний.";
        break;
      case "Ключ земли":
        divHint.innerHTML = "(земля, диспел) Позволяет снять дебаф огня или воздуха. Не забудьте выбрать цель.";
        break;
      case "Сель":
        divHint.innerHTML = "(земля, прямой урон) Наносит 80 единиц урона, попадает в цель с вероятностью 25%.";
        break;
      case "Власть земли":
        divHint.innerHTML = "(земля, баф) Постоянно увелчивает срок действия бафов земли на четыре хода, срабатывает на каждом бафе с вероятностью 50%, действует четыре хода.";
        break;
      case "Копье воздуха":
        divHint.innerHTML = "(воздух, прямой урон) Наносит противнику 25 единиц урона, попадает в цель с вероятностью 75% .";
        break;
      case "Вихрь":
        divHint.innerHTML = "(воздух, дебаф) В течении четырех ходов снижает вероятность пападания по противнику заклинаниями урона на 33%.";
        break;
      case "Корона воздуха":
        divHint.innerHTML = "(воздух, дебаф) В течении четырех ходов снижает вероятность успешного наложения бафа на 33%.";
        break;
      case "Врата воздуха":
        divHint.innerHTML = "(воздух, баф) В течении шести ходов увеличивает вероятность попадания по противнику дебафами и заклинаниями прямого урона на 10%.";
        break;
      case "Воздушный кокон":
        divHint.innerHTML = "(воздух, дебаф) В течении четырех ходов снижает вероятность попадания дебафом на 33%.";
        break;
      case "Печать воздуха":
        divHint.innerHTML = "(воздух, дебаф) В течении десяти ходов снижает вероятность успешного наложения бафа, на 10%.";
        break;
      case "Ключ воздуха":
        divHint.innerHTML = "(воздух, диспел) Позволяет снять с противника баф земли или воды. Не забудьте выбрать цель.";
        break;
      case "Ударная волна":
        divHint.innerHTML = "(воздух, прямой урон) наносит урон противнику 40 единиц. Попадает в цель с вероятностью 50%";
        break;
      case "Власть воздуха":
        divHint.innerHTML = "(воздух, баф) Постоянно уменьшает вероятность попадания по вам заклинаниями урона, на 20%.";
        break;
      case "Касание жизни":
        divHint.innerHTML = "(жизнь, диспел) Позволяет снять дебаф смерти. Не забудьте выбрать цель.";
        break;
      case "Щит жизни":
        divHint.innerHTML = "(жизнь, баф) Не позволяет уменьшать максимальный запас здоровья.";
        break;
      case "Корона жизни":
        divHint.innerHTML = "(жизнь, другое) Увеличивает максимальный запас здоровья на 15 единиц.";
        break;
      case "Источник жизни":
        divHint.innerHTML = "(жизнь, другое) Восстанавливает тридцать единиц здоровья.";
        break;
      case "Сфера восстановления":
        divHint.innerHTML = "(жизнь, баф) В течении пяти ходов восстанавливает по 10 единиц здоровья.";
        break;
      case "Печать жизни":
        divHint.innerHTML = "(жизнь, баф) Не позволяет наклдывать дебафы смерти в течении восьми ходов.";
        break;
      case "Ключ жизни":
        divHint.innerHTML = "(жизнь, диспел) Позволяет снять любой дебаф, срабатывает с вероятностью 66%. Не забудьте выбрать цель.";
        break;
      case "Поток жизни":
        divHint.innerHTML = "(жизнь, баф) Восстанавливает по 25 единиц здоровья за ход, действует два хода.";
        break;
      case "Власть жизни":
        divHint.innerHTML = "(жизнь, баф) Не позволяет противнику снимать с вас бафы жизни, до тех пока не будтет снят этот баф.";
        break;
      case "Касание смерти":
        divHint.innerHTML = "(смерть, диспел) Позволяет снять любой баф с противника, срабатывает с вероятностью 66%. Не забудьте выбрать цель.";
        break;
      case "Пелена смерти":
        divHint.innerHTML = "(смерть, дебаф) Снижает вероятность успешного наложения бафов на 50%, на четыре хода.";
        break;
      case "Корона мертвеца":
        divHint.innerHTML = "(смерть, другое) Уменьшает максимальный запас здоровья противника на 15 единиц.";
        break;
      case "Смерть":
        divHint.innerHTML = "(смерть, другое) Убивает противника с вероятностью 5%.";
        break;
      case "Круг смерти":
        divHint.innerHTML = "(смерть, дебаф) Увеличивает урон от накладываемых дебафов на 15 единиц за ход, действует два хода.";
        break;
      case "Печать смерти":
        divHint.innerHTML = "(смерть, дебаф) Не позволяет накладывать бафы, действует два хода.";
        break;
      case "Ключ от смерти":
        divHint.innerHTML = "(смерть, баф) Если у вас закончится запас здоровья, с вероятностью 50% оно восстановится до единицы. Действует четыре хода.";
        break;
      case "Поток смерти":
        divHint.innerHTML = "(смерть, дебаф) В течении пяти ходов наносит противнику пять единиц урона и восстанавливает вам пять единиц здоровья.";
        break;
      case "Власть смерти":
        divHint.innerHTML = "(смерть, диспел) Позволяет снять с противника баф жизни. Не забудьте выбрать цель.";
        break;
      default:
        deleteHint();
    }

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

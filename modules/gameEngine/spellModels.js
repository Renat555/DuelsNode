/*
buff
'DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'

debuff
'DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'

dispel
'СancelPositiveEffect', 'СancelNegativeEffect'

battleSpell
'ImmediateDamage'

other
'IncreaseDurationAllDebuff', 'IncreaseMaxHealth', 'IncreaseHealth', 'DecreaseMaxHealth', 'Death'
*/

let spellModels = {

  firespear: ['BattleSpell', 'ImmediateDamage', 'fire', 'spear', 1, 1, 'Метеор', [], 1, 20, 30],

  fireshild: [
    [1, 1, 1, 4],
    ['DecreaseDamageNegativeEffect', 'fire', 40, 0, 1,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'Vampirism'], ['All'],
    'Вы успешно наложили на себя огненный щит. ',
    'Противник успешно наложил на себя огненный щит. ',
    'Вам не удалось наложить на себя огненный щит. ',
    'Противнику не удалось наложить на себя огненный щит. ',
    ' Огненный щит снижает урон от заклинания на ']
  ],
  firecrown: [
    [1, 1, 4],
    ['IncreaseDamageOutputImmediateDamage', 'fire', 25, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя огненный венец. ',
    'Противник успешно наложил на себя огненный венец. ',
    'Вам не удалось наложить на себя огненный венец. ',
    'Противнику не удалось наложить на себя огненный венец. ',
    ' Огненный венец увеличил урон от заклинания на ']
  ],

  firesource: ['Buff', 'DamagePerMuve', 'fire', 'source', 1, 1, 'Вулкан', [], 1, 5, 12, 3],

  [
    [1, 1, 3],
    ['DamagePerMuve', 'fire', 5, 12, 'Вулкан',
    'Вы успешно наложили на противника вулкан. ',
    'Противник успешно наложил на вас вулкан. ',
    'Вам не удалось наложить на противника вулкан. ',
    'Противнику не удалось наложить на вас вулкан. ',
    'Вулкан наносит противнику ',
    'Вулкан наносит вам ']
  ],
  firesphere: [
    [1, 1, -1],
    ['DamageByContactInputImmediateDamage', 'fire', 5, 10,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на противника огненную клетку. ',
    'Противник успешно наложил на вас огненную клетку. ',
    'Вам не удалось наложить на противника огненную клетку. ',
    'Противнику не удалось наложить на вас огненную клетку. ',
    ' Огненная клетка наносит противнику ',
    ' Огненная клетка наносит вам ']
  ],
  firestamp: [
    [1, 1],
    ['IncreaseDurationAllDebuff', 'fire', 2,
    'Клеймо огня увеличило длительность всех наложенных на вас дебафов на ',
    'Клеймо огня увеличило длительность всех наложенных на противника дебафов на ']
  ],
  firekey: [
    [1, 1],
    ['СancelPositiveEffect', 'fire',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water', 'earth'],
    'Ключ огня снял с противника ',
    'Ключ огня снял с вас ',
    'Не удалось применить ключ огня. ']
  ],

  fireflow: ['BattleSpell', 'ImmediateDamage', 'fire', 'flow', 1, 1, 'Струя пламени', [], 0.66, 20, 30],

  firepower: [
    [1, 1, -1],
    ['IncreaseDamageOutputImmediateDamage', 'fire', 0, 5,
    ['ImmediateDamage'], ['fire'],
    'Вы успешно наложили на себя власть огня. ',
    'Противник успешно наложил на себя власть огня. ',
    'Вам не удалось наложить на себя власть огня. ',
    'Противнику не удалось наложить на себя власть огня. ',
    ' Власть огня увеличила урон от заклинания на ']
  ],
  waterspear: [
    [1, 1, 1],
    ['ImmediateDamagePerEachNegativeEffect', 'water', 5, 15, 'Ледяной осколок',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All']]
  ],
  watershild: [
    [1, 1, 6],
    ['DecreaseDamageInputImmediateDamage', 'water', 40, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя ледяную стену. ',
    'Противник успешно наложил на себя ледяную стену. ',
    'Вам не удалось наложить на себя ледяную стену. ',
    'Противнику не удалось наложить на себя ледяную стену. ',
    ' Ледяная стена уменьшила урон от заклинания на ']
  ],
  watercrown: [
    [1, 1, 6],
    ['DecreaseDamageNegativeEffect', 'water', 50, 0,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'Vampirism'], ['All'],
    'Вы успешно наложили на себя корону воды. ',
    'Противник успешно наложил на себя корону воды. ',
    'Вам не удалось наложить на себя корону воды. ',
    'Противнику не удалось наложить на себя корону воды. ',
    ' Корона воды снижает урон от заклинания на ']
  ],
  watersource: [
    [1, 1],
    ['СancelNegativeEffect', 'water', 0.66,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['water', 'earth', 'fire', 'air'],
    'Родник снял с противника ',
    'Родник снял с вас ',
    'Не удалось применить родник. ']
  ],
  watersphere: [
    [1, 1],
    ['BlockInputImmediateDamage', 'water', 2,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя ледяную сферу. ',
    'Противник успешно наложил на себя ледяную сферу. ',
    'Вам не удалось наложить на себя ледяную сферу. ',
    'Противнику не удалось наложить на себя ледяную сферу. ',
    ' Ледяная сфера уменьшила урон от заклинания на ']
  ],
  waterstamp: [
    [1, 1, 6],
    ['DecreaseDamageInputImmediateDamage', 'water', 33, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя печать воды. ',
    'Противник успешно наложил на себя печать воды. ',
    'Вам не удалось наложить на себя печать воды. ',
    'Противнику не удалось наложить на себя печать воды. ',
    ' Печать воды уменьшила урон от заклинания на ']
  ],
  waterkey: [
    [1, 1],
    ['СancelNegativeEffect', 'water',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['fire', 'air'],
    'Ключ воды снял с противника ',
    'Ключ воды снял с вас ',
    'Не удалось применить ключ воды. ']
  ],

  waterflow: ['BattleSpell', 'ImmediateDamage', 'water', 'flow', 1, 1, 'Водный поток', [], 1, 20, 30],

  waterpower: [
    [1, 1, -1],
    ['IncreaseDurationInputBuff', 'water', 2,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water'],
    'Вы успешно наложили на себя власть воды. ',
    'Противник успешно наложил на себя власть воды. ',
    'Вам не удалось наложить на себя власть воды. ',
    'Противнику не удалось наложить на себя власть воды. ',
    'Власть воды увеличила продолжительность действия заклинания на два хода. ']
  ],

  earthspear: ['BattleSpell', 'ImmediateDamage', 'earth', 'spear', 1, 1, 'Глыба', [], 0.33, 50, 70],

  earthshild: [
    [1, 1, 8],
    ['DecreaseDamageNegativeEffect', 'earth', 0, 10,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Вы успешно защитили себя скалой. ',
    'Противник успешно защитил себя скалой. ',
    'Вам не удалось создать скалу. ',
    'Противнику не удалось создать скалу. ',
    ' Скала снижает урон от заклинания на '],
    ['DecreaseDamageInputSpell', 'earth', 0, 10,
    ['SingleImmediateDamage'], ['All'],
    ' Скала уменьшила урон от заклинания на ']
  ],
  earthcrown: [
    [1, 1, 6],
    ['IncreaseHitChanceOutputImmediateDamage', 'earth', 15,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя корону земли. ',
    'Противник успешно наложил на себя корону земли. ',
    'Вам не удалось наложить на себя корону земли. ',
    'Противнику не удалось наложить на себя корону земли. ',
    ' Корона воды увеличила вероятность попадания заклинанием на 15%. ']
  ],
  earthsource: [
    [1, 1, 4],
    ['IncreaseDamageOutputImmediateDamage', 'earth', 0, 15,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя земные недра. ',
    'Противник успешно наложил на себя земные недра. ',
    'Вам не удалось наложить на себя земные недра. ',
    'Противнику не удалось наложить на себя земные недра. ',
    ' Земные недра увеличил урон от заклинания на 15 единиц. '],
    ['IncreaseDurationOutputNegativeEffect', 'earth', 1,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['earth'],
    'Земные недра увеличили продолжительность действия заклинания на один ход. ']
  ],
  earthsphere: [
    [1, 1, 10],
    ['IncreaseHitChanceInputImmediateDamage', 'earth', 5, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно заключили противника в склеп. ',
    'Противник успешно заключил вас в склеп. ',
    'Вам не удалось заключить противника в склеп. ',
    'Противнику не удалось заключить вас в склеп. ',
    ' Склеп увеличил вероятность попадания заклинанием на 5%. '],
    ['IncreaseHitChanceInputNegativeEffect', 'earth', 5, 0,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    ' Склеп увеличил вероятность попадания заклинанием на 5%. ']
  ],
  earthstamp: [
    [1, 1, 4],
    ['DecreaseDamageInputImmediateDamage', 'earth', 50, 0,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя печать земли. ',
    'Противник успешно наложил на себя печать земли. ',
    'Вам не удалось наложить на себя печать земли. ',
    'Противнику не удалось наложить на себя печать земли. ',
    ' Печать земли вдвое уменьшила урон от заклинания. ']
  ],
  earthkey: [
    [1, 1],
    ['СancelNegativeEffect', 'earth',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['fire', 'air'],
    'Ключ земли снял с противника ',
    'Ключ земли снял с вас ',
    'Не удалось применить ключ земли. ']
  ],

  earthflow: ['BattleSpell', 'ImmediateDamage', 'earth', 'flow', 1, 1, 'Сель', [], 0.25, 80, 80],

  earthpower: [
    [1, 1, 4],
    ['IncreaseDurationInputBuff', 'earth', 4, 0.5,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water'],
    'Вы успешно наложили на себя власть земли. ',
    'Противник успешно наложил на себя власть земли. ',
    'Вам не удалось наложить на себя власть земли. ',
    'Противнику не удалось наложить на себя власть земли. ',
    'Власть земли увеличила продолжительность действия заклинания на четыре хода. ']
  ],

  airspear: ['BattleSpell', 'ImmediateDamage', 'air', 'spear', 1, 1, 'Копье воздуха', [], 0.75, 25, 25],

  airshild: [
    [1, 1, 4],
    ['DecreaseHitChanceOutputImmediateDamage', 'air', 0.33,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на противника вихрь. ',
    'Противник успешно наложил на вас вихрь. ',
    'Вам не удалось наложить на противника вихрь. ',
    'Противнику не удалось наложить на вас вихрь. ',
    'Вихрь снизил вероятность попадания заклинанием на ']
  ],
  aircrown: [
    [1, 1, 4],
    ['DecreaseHitChanceInputPositiveEffect', 'air', 0.33,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника корону воздуха. ',
    'Противник успешно наложил на вас корону воздуха. ',
    'Вам не удалось наложить на противника корону воздуха. ',
    'Противнику не удалось наложить на вас корону воздуха. ',
    'Корона воздуха уменьшила вероятность успешного наложения заклинания на . ']
  ],
  airsource: [
    [1, 1, 6],
    ['IncreaseHitChanceOutputImmediateDamage', 'air', 10,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя врата воздуха. ',
    'Противник успешно наложил на себя врата воздуха. ',
    'Вам не удалось наложить на себя врата воздуха. ',
    'Противнику не удалось наложить на себя врата воздуха. ',
    'Врата воздуха увеличили вероятность попадания заклинанием на 10%. '],
    ['IncreaseHitChanceOutputNegativeEffect', 'air', 10,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Врата воздуха увеличили вероятность попадания заклинанием на 10%. ']
  ],
  airsphere: [
    [1, 1, 4],
    ['DecreaseHitChanceOutputNegativeEffect', 'air', 0.33,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Вы успешно наложили на противника воздушный кокон. ',
    'Противник успешно наложил на вас воздушный кокон. ',
    'Вам не удалось наложить на противника воздушный кокон. ',
    'Противнику не удалось наложить на вас воздушный кокон. ',
    'Воздушный кокон уменьшил вероятность успешного наложения заклинания на . ']
  ],
  airstamp: [
    [1, 1, 10],
    ['DecreaseHitChanceInputPositiveEffect', 'air', 0.1,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника печать воздуха. ',
    'Противник успешно наложил на вас печать воздуха. ',
    'Вам не удалось наложить на противника печать воздуха. ',
    'Противнику не удалось наложить на вас печать воздуха. ',
    'Печать воздуха уменьшила вероятность успешного наложения заклинания на . ']
  ],
  airkey: [
    [1, 1],
    ['CancelPositiveEffect', 'air',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['water', 'earth'],
    'Ключ воздуха снял с противника ',
    'Ключ воздуха снял с вас ',
    'Не удалось применить ключ воздуха. ']
  ],

  airflow: ['BattleSpell', 'ImmediateDamage', 'air', 'flow', 1, 1, 'Ударная волна', [], 0.5, 40, 40],

  airpower: [
    [1, 1, -1],
    ['DecreaseHitChanceInputImmediateDamage', 'air', 20,
    ['ImmediateDamage'], ['All'],
    'Вы успешно наложили на себя власть воздуха. ',
    'Противник успешно наложил на себя власть воздуха. ',
    'Вам не удалось наложить на себя власть воздуха. ',
    'Противнику не удалось наложить на себя власть воздуха. ',
    'Власть воздуха увеличила вероятность попадания заклинанием на 20%. ']
  ],
  lifespear: [
    [1, 1],
    ['CancelNegativeEffect', 'life',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['death'],
    'Касание жизни снимает с вас ',
    'Касание жизни снимает с противника ',
    'Не удалось применить касание жизни. ']
  ],
  lifeshild: [
    [1, 1, -1],
    ['BlockDecreaseMaxHealth', 'life',
    ['DecreaseMaxHealth'], ['All'],
    'Вы успешно наложили на себя щит жизни. ',
    'Противник успешно наложил на себя щит жизни. ',
    'Вам не удалось наложить на себя щит жизни. ',
    'Противнику не удалось наложить на себя щит жизни. ',
    'Щит жизни не позволил уменьшить ваш запас здоровья. ',
    'Щит жизни не позволил уменьшить запас здоровья противника. ']
  ],
  lifecrown: [
    [1, 1],
    ['IncreaseMaxHealth', 'life', 15,
    'Корона жизни увеличивает ваш максимальный запас здоровья на ',
    'Корона жизни увеличивает максимальный запас здоровья противника на ',
    'Вам не удалось применить корону жизни. ',
    'Противнику не удалось применить корону жизни. ']
  ],
  lifesource: [
    [1, 1],
    ['IncreaseHealth', 'life', 30,
    'Источник жизни восстанавливает вам ',
    'Источник жизни восстанавливает противнику ',
    'Вам не удалось применить источник жизни. ',
    'Противнику не удалось применить источник жизни. ']
  ],
  lifesphere: [
    [1, 1, 5],
    ['IncreaseHealthPerMuve', 'life', 10,
    [], [],
    'Вы успешно наложили на себя сферу восстановления. ',
    'Противник успешно наложил на себя сферу восстановления. ',
    'Вам не удалось наложить на себя сферу восстановления. ',
    'Противнику не удалось наложить на себя сферу восстановления. ',
    'Сфера восстановления восстановила вам  ',
    'Сфера восстановления восстановила противнику ']
  ],
  lifestamp: [
    [1, 1, 8],
    ['BlockInputNegativeEffect', 'life',
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Вы успешно наложили на себя печать жизни. ',
    'Противник успешно наложил на себя печать жизни. ',
    'Вам не удалось наложить на себя печать жизни. ',
    'Противнику не удалось наложить на себя печать жизни. ',
    'Печать жизни не позволила наложить на вас заклинание. ']
  ],
  lifekey: [
    [1, 1],
    ['CancelNegativeEffect', 'life', 0.66,
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'IncreaseHitChanceInputImmediateDamage', 'IncreaseHitChanceInputNegativeEffect', 'IncreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceOutputImmediateDamage', 'DecreaseHitChanceOutputNegativeEffect', 'DecreaseHitChanceInputPositiveEffect', 'IncreaseDamageInputNegativeEffect', 'BlockInputPositiveEffect', 'Vampirism'], ['All'],
    'Ключ жизни снял с противника ',
    'Ключ жизни снял с вас ',
    'Не удалось применить ключ жизни. ']
  ],
  lifeflow: [
    [1, 1, 2],
    ['IncreaseHealthPerMuve', 'life', 25,
    'Вы успешно наложили на себя поток жизни. ',
    'Противник успешно наложил на себя поток жизни. ',
    'Вам не удалось наложить на себя поток жизни. ',
    'Противнику не удалось наложить на себя поток жизни. ',
    'Споток жизни восстановил вам  ',
    'поток жизни восстановил противнику ']
  ],
  lifepower: [
    [1, 1, -1],
    ['BlockCancelPositiveEffect', 'life',
    'Вы успешно наложили на себя власть жизни. ',
    'Противник успешно наложил на себя власть жизни. ',
    'Вам не удалось наложить на себя власть жизни. ',
    'Противнику не удалось наложить на себя власть жизни. ',
    'Власть жизни не позволила снять заклинание. ']
  ],
  deathspear: [
    [1, 1],
    ['CancelPositiveEffect', 'death', 0.66,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Касание смерти сняло с противника ',
    'Касание смерти сняло с вас ',
    'Не удалось применить касание смерти. ']
  ],
  deathshild: [
    [1, 1, 4],
    ['DecreaseHitChanceInputPositiveEffect', 'death', 0.5,
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника пелену смерти. ',
    'Противник успешно наложил на вас пелену смерти. ',
    'Вам не удалось наложить на противника пелену смерти. ',
    'Противнику не удалось наложить на вас пелену смерти. ',
    'Пелена смерти уменьшила вероятность успешного наложения заклинания на . ']
  ],
  deathcrown: [
    [1, 1],
    ['DecreaseMaxHealth', 'death', 15,
    'Корона мертвеца уменьшает максимальный запас здоровья противника на ',
    'Корона мертвеца уменьшает ваш максимальный запас здоровья на ',
    'Не удалось применить корону мертвеца. ']
  ],
  deathsource: [
    [1, 1],
    ['Death', 'death',
    'Смерть убивает противника. ',
    'Смерть убивает вас. ',
    'Не удалось применить смерть. ']
  ],
  deathsphere: [
    [1, 1, 2],
    ['IncreaseDamageInputNegativeEffect', 'death', 15
    ['DamagePerMuve', 'DamageByContactInputImmediateDamage', 'Vampirism'], ['All'],
    'Вы успешно наложили на противника круг смерти. ',
    'Противник успешно наложил на вас круг смерти. ',
    'Вам не удалось наложить на противника круг смерти. ',
    'Противнику не удалось наложить на вас круг смерти. ',
    'Круг смерти увеличил урон от дебафа на ']
  ],
  deathstamp: [
    [1, 1, 2],
    ['BlockInputPositiveEffect', 'death',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['All'],
    'Вы успешно наложили на противника печать смерти. ',
    'Противник успешно наложил на вас печать смерти. ',
    'Вам не удалось наложить на противника печать смерти. ',
    'Противнику не удалось наложить на вас печать смерти. ',
    'Печать смерти заблокировала заклинание. ']
  ],
  deathkey: [
    [1, 1],
    ['BlockDeath', 'death',
    'Вы успешно наложили на себя ключ от смерти. ',
    'Противник успешно наложил на себя ключ от смерти. ',
    'Вам не удалось наложить на себя ключ от смерти. ',
    'Противнику не удалось наложить на себя ключ от смерти. ',
    'Ключ от смерти не позволил убить вас. ',
    'Ключ от смерти не позволил убить противника. ']
  ],
  deathflow: [
    [1, 1, 5],
    ['Vampirism', 'death', 5,
    'Вы успешно наложили на противника поток смерти. ',
    'Противник успешно наложил на вас поток смерти. ',
    'Вам не удалось наложить на противника поток смерти. ',
    'Противнику не удалось наложить на вас поток смерти. ',
    'Поток смерти отнял 5 единиц здоровья и передал вам. ',
    'Поток смерти отнял 5 единиц здоровья у вас и передал противнику. ']
  ],
  deathpower: [
    [1, 1],
    ['CancelPositiveEffect', 'death',
    ['DecreaseDamageNegativeEffect', 'IncreaseDamageOutputImmediateDamage', 'DecreaseDamageInputImmediateDamage', 'BlockInputImmediateDamage', 'IncreaseDurationInputBuff', 'IncreaseHitChanceOutputImmediateDamage', 'BlockDecreaseMaxHealth', 'IncreaseHealthPerMuve', 'BlockInputNegativeEffect', 'DecreaseHitChanceInputImmediateDamage', 'BlockCancelPositiveEffect', 'BlockDeath'], ['life'],
    'Власть смерти сняла с противника ',
    'Власть смерти сняла с вас ',
    'Не удалось применить власть смерти. ']
  ]
}

module.exports = spellModels;

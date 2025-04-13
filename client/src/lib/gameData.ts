// Определения типов для игровых данных
export interface Artifact {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  icon: string;
  rarity: string;
  rarityClass: string;
  textClass: string;
  chestType: string;
  levelRequired: number;
  bonus: {
    type: string;
    value: number;
  };
}

export interface Skin {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  icon: string;
  rarity: string;
  rarityClass: string;
  textClass: string;
  chestType: string;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: string;
  rarityClass: string;
  textClass: string;
  effects: string[];
  level: number;
  bonus: {
    type: string;
    value: number;
  };
}

export interface TreasureChest {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  rarity: string;
  rarityClass: string;
  textClass: string;
  category: string;
  minLevel: number;
}

export interface Expedition {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number;
  diamondReward: number;
  experienceReward: number;
  levelRequired: number;
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  minClearedDungeons: number;
}

export interface Monster {
  id: string;
  name: string;
  description: string;
  icon: string;
  health: number;
  damage: number;
  diamondReward: number;
  experienceReward: number;
}

// Артефакты
export const artifacts: Artifact[] = [
  // Обычные артефакты
  {
    id: "a1",
    name: "Потёртая перчатка",
    description: "Помогает сильнее нажимать на кнопку",
    shortDescription: "+5% к силе клика",
    icon: "🧤",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки",
    levelRequired: 1,
    bonus: { type: "clickPower", value: 0.05 }
  },
  {
    id: "a2",
    name: "Сломанный автокликер",
    description: "Иногда кликает автоматически",
    shortDescription: "+3% к силе автоклика",
    icon: "🔨",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки",
    levelRequired: 1,
    bonus: { type: "autoClickPower", value: 0.03 }
  },
  {
    id: "a3",
    name: "Лупа",
    description: "Помогает находить больше алмазов",
    shortDescription: "+5% к алмазам",
    icon: "🔍",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки",
    levelRequired: 2,
    bonus: { type: "diamondGain", value: 0.05 }
  },
  {
    id: "a4",
    name: "Карманные часы",
    description: "Немного сокращают время экспедиций",
    shortDescription: "-3% ко времени экспедиций",
    icon: "⏱️",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки",
    levelRequired: 3,
    bonus: { type: "expeditionTime", value: 0.03 }
  },
  
  // Необычные артефакты
  {
    id: "a5",
    name: "Волшебная рукавица",
    description: "Значительно усиливает ваши клики",
    shortDescription: "+10% к силе клика",
    icon: "👊",
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    chestType: "Редкие сундуки",
    levelRequired: 5,
    bonus: { type: "clickPower", value: 0.1 }
  },
  {
    id: "a6",
    name: "Ускоритель кликов",
    description: "Улучшенный автокликер с повышенной производительностью",
    shortDescription: "+15% к силе автоклика",
    icon: "⚙️",
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    chestType: "Редкие сундуки",
    levelRequired: 7,
    bonus: { type: "autoClickPower", value: 0.15 }
  },
  {
    id: "a7",
    name: "Алмазный компас",
    description: "Автоматически притягивает алмазы",
    shortDescription: "+15% к алмазам",
    icon: "🧭",
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    chestType: "Редкие сундуки",
    levelRequired: 8,
    bonus: { type: "diamondGain", value: 0.15 }
  },
  
  // Редкие артефакты
  {
    id: "a8",
    name: "Перчатка титана",
    description: "Создана из прочнейших материалов, значительно увеличивает силу кликов",
    shortDescription: "+25% к силе клика",
    icon: "🥊",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Эпические сундуки",
    levelRequired: 10,
    bonus: { type: "clickPower", value: 0.25 }
  },
  {
    id: "a9",
    name: "Квантовый автокликер",
    description: "Использует технологии будущего для автоматического нажатия",
    shortDescription: "+30% к силе автоклика",
    icon: "⏰",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Эпические сундуки",
    levelRequired: 12,
    bonus: { type: "autoClickPower", value: 0.3 }
  },
  {
    id: "a10",
    name: "Алмазный магнит",
    description: "Мощный магнит, притягивающий алмазы со всех уголков мира",
    shortDescription: "+30% к алмазам",
    icon: "🧲",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Эпические сундуки",
    levelRequired: 15,
    bonus: { type: "diamondGain", value: 0.3 }
  },
  
  // Эпические артефакты
  {
    id: "a11",
    name: "Кулак древнего титана",
    description: "Мифический артефакт с огромной силой",
    shortDescription: "+50% к силе клика",
    icon: "⚡",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Легендарные сундуки",
    levelRequired: 20,
    bonus: { type: "clickPower", value: 0.5 }
  },
  {
    id: "a12",
    name: "Фабрика автокликов",
    description: "Целая фабрика, работающая на полную мощность",
    shortDescription: "+60% к силе автоклика",
    icon: "🏭",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Легендарные сундуки",
    levelRequired: 25,
    bonus: { type: "autoClickPower", value: 0.6 }
  },
  {
    id: "a13",
    name: "Алмазная жила",
    description: "Открывает доступ к огромному месторождению алмазов",
    shortDescription: "+75% к алмазам",
    icon: "💎",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Легендарные сундуки",
    levelRequired: 30,
    bonus: { type: "diamondGain", value: 0.75 }
  },
  
  // Легендарные артефакты
  {
    id: "a14",
    name: "Рука богов",
    description: "Древний артефакт, наделенный божественной силой",
    shortDescription: "+100% к силе клика",
    icon: "✨",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    chestType: "Мифические сундуки",
    levelRequired: 40,
    bonus: { type: "clickPower", value: 1.0 }
  },
  {
    id: "a15",
    name: "Вечный двигатель",
    description: "Невероятное устройство, способное работать вечно без остановки",
    shortDescription: "+150% к силе автоклика",
    icon: "🔋",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    chestType: "Мифические сундуки",
    levelRequired: 50,
    bonus: { type: "autoClickPower", value: 1.5 }
  },
  
  // Мифические артефакты
  {
    id: "a16",
    name: "Рука создателя",
    description: "Легендарный артефакт, дающий поистине божественную силу",
    shortDescription: "+300% к силе клика",
    icon: "🌟",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки",
    levelRequired: 70,
    bonus: { type: "clickPower", value: 3.0 }
  },
  {
    id: "a17",
    name: "Мифический автокликер",
    description: "Создан из материалов другого измерения, непостижимая мощь",
    shortDescription: "+500% к силе автоклика",
    icon: "⚜️",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки",
    levelRequired: 80,
    bonus: { type: "autoClickPower", value: 5.0 }
  },
  {
    id: "a18",
    name: "Философский камень",
    description: "Превращает всё, к чему прикасается, в алмазы",
    shortDescription: "+1000% к алмазам",
    icon: "💫",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки",
    levelRequired: 90,
    bonus: { type: "diamondGain", value: 10.0 }
  },
  
  // Особые артефакты для подземелий
  {
    id: "a19",
    name: "Щит храбреца",
    description: "Защищает своего владельца в подземельях",
    shortDescription: "+20% к защите в подземельях",
    icon: "🛡️",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Подземные сундуки",
    levelRequired: 10,
    bonus: { type: "dungeonDefense", value: 0.2 }
  },
  {
    id: "a20",
    name: "Меч героя",
    description: "Наносит больше урона монстрам в подземельях",
    shortDescription: "+30% к урону в подземельях",
    icon: "⚔️",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Подземные сундуки",
    levelRequired: 15,
    bonus: { type: "dungeonDamage", value: 0.3 }
  }
];

// Скины для кликера
export const skins: Skin[] = [
  // Обычные скины
  {
    id: "s1",
    name: "Стандартный скин",
    description: "Базовый внешний вид кликера",
    icon: "⭕",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки"
  },
  {
    id: "s2",
    name: "Деревянная кнопка",
    description: "Простая деревянная кнопка",
    icon: "🟤",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки"
  },
  {
    id: "s3",
    name: "Каменная кнопка",
    description: "Кнопка из твёрдого камня",
    icon: "⚪",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки"
  },
  {
    id: "s4",
    name: "Железная кнопка",
    description: "Металлическая кнопка из железа",
    icon: "⚫",
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    chestType: "Обычные сундуки"
  },
  
  // Необычные скины
  {
    id: "s5",
    name: "Золотая кнопка",
    description: "Блестящая золотая кнопка",
    icon: "🔵",
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    chestType: "Редкие сундуки"
  },
  {
    id: "s6",
    name: "Изумрудная кнопка",
    description: "Кнопка из драгоценного изумруда",
    icon: "🟢",
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    chestType: "Редкие сундуки"
  },
  {
    id: "s7",
    name: "Рубиновая кнопка",
    description: "Красная кнопка из рубина",
    icon: "🔴",
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    chestType: "Редкие сундуки"
  },
  
  // Редкие скины
  {
    id: "s8",
    name: "Алмазная кнопка",
    description: "Сверкающая алмазная кнопка",
    icon: "💠",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Эпические сундуки"
  },
  {
    id: "s9",
    name: "Огненная кнопка",
    description: "Кнопка, объятая пламенем",
    icon: "🔥",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Эпические сундуки"
  },
  {
    id: "s10",
    name: "Ледяная кнопка",
    description: "Кнопка изо льда, который никогда не тает",
    icon: "❄️",
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    chestType: "Эпические сундуки"
  },
  
  // Эпические скины
  {
    id: "s11",
    name: "Кнопка молний",
    description: "Кнопка, заряженная электричеством",
    icon: "⚡",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Легендарные сундуки"
  },
  {
    id: "s12",
    name: "Кнопка вихря",
    description: "Кнопка, окружённая мощным вихрем",
    icon: "🌪️",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Легендарные сундуки"
  },
  {
    id: "s13",
    name: "Космическая кнопка",
    description: "Кнопка, созданная из звёздной материи",
    icon: "🌌",
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    chestType: "Легендарные сундуки"
  },
  
  // Легендарные скины
  {
    id: "s14",
    name: "Кнопка дракона",
    description: "Кнопка, созданная из чешуи древнего дракона",
    icon: "🐉",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    chestType: "Мифические сундуки"
  },
  {
    id: "s15",
    name: "Кнопка феникса",
    description: "Кнопка, возрождающаяся из пепла",
    icon: "🔆",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    chestType: "Мифические сундуки"
  },
  {
    id: "s16",
    name: "Кнопка судьбы",
    description: "Кнопка, определяющая судьбу вселенной",
    icon: "🌟",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    chestType: "Мифические сундуки"
  },
  
  // Мифические скины
  {
    id: "s17",
    name: "Кнопка бога",
    description: "Божественная кнопка, наделённая невероятной силой",
    icon: "👁️",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки"
  },
  {
    id: "s18",
    name: "Кнопка вечности",
    description: "Кнопка, существующая вне времени и пространства",
    icon: "🌈",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки"
  },
  {
    id: "s19",
    name: "Кнопка хаоса",
    description: "Кнопка, содержащая в себе первозданный хаос",
    icon: "☯️",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки"
  },
  {
    id: "s20",
    name: "Кнопка создателя",
    description: "Кнопка, способная создавать новые миры",
    icon: "🌠",
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    chestType: "Древние сундуки"
  }
];

// Реликвии
export const relics: Relic[] = [
  {
    id: "r1",
    name: "Амулет силы",
    description: "Древний амулет, усиливающий каждый клик",
    icon: "📿",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+50% к силе клика",
      "Небольшой шанс двойного клика"
    ],
    level: 1,
    bonus: { type: "clickPower", value: 0.5 }
  },
  {
    id: "r2",
    name: "Кристалл автоматизации",
    description: "Мощный кристалл, улучшающий автоклики",
    icon: "💎",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+75% к силе автоклика",
      "-10% к времени между автокликами"
    ],
    level: 1,
    bonus: { type: "autoClickPower", value: 0.75 }
  },
  {
    id: "r3",
    name: "Магический компас",
    description: "Указывает путь к самым богатым экспедициям",
    icon: "🧭",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+50% к награде с экспедиций",
      "-20% к времени экспедиций"
    ],
    level: 1,
    bonus: { type: "expeditionReward", value: 0.5 }
  },
  {
    id: "r4",
    name: "Щит храбрости",
    description: "Великий щит, дающий стойкость в подземельях",
    icon: "🛡️",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+30% к здоровью в подземельях",
      "-15% к получаемому урону"
    ],
    level: 1,
    bonus: { type: "dungeonDefense", value: 0.3 }
  },
  {
    id: "r5",
    name: "Клинок героя",
    description: "Легендарный меч, разящий монстров подземелий",
    icon: "⚔️",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+100% к урону в подземельях",
      "+10% к шансу критического удара"
    ],
    level: 1,
    bonus: { type: "dungeonDamage", value: 1.0 }
  },
  {
    id: "r6",
    name: "Счастливая монета",
    description: "Приносит удачу своему владельцу",
    icon: "🪙",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+25% к шансу редких находок",
      "-15% к ценам в магазине"
    ],
    level: 1,
    bonus: { type: "luck", value: 0.25 }
  },
  {
    id: "r7",
    name: "Песочные часы времени",
    description: "Замедляют время вокруг владельца",
    icon: "⏳",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "-30% к времени всех действий",
      "+20% к скорости автоклика"
    ],
    level: 1,
    bonus: { type: "timeReduction", value: 0.3 }
  },
  {
    id: "r8",
    name: "Корона алмазов",
    description: "Царская корона, привлекающая алмазы",
    icon: "👑",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+200% к получаемым алмазам",
      "+10% к шансу двойных алмазов"
    ],
    level: 1,
    bonus: { type: "diamondGain", value: 2.0 }
  },
  {
    id: "r9",
    name: "Кулон просветления",
    description: "Ускоряет духовный рост и накопление опыта",
    icon: "🔮",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+100% к получаемому опыту",
      "+1 дополнительное очко навыка каждые 5 уровней"
    ],
    level: 1,
    bonus: { type: "experienceGain", value: 1.0 }
  },
  {
    id: "r10",
    name: "Сердце перерождения",
    description: "Усиливает каждое перерождение",
    icon: "❤️",
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    effects: [
      "+50% к бонусу от престижа",
      "Сохраняет 10% улучшений при перерождении"
    ],
    level: 1,
    bonus: { type: "prestigeBonus", value: 0.5 }
  }
];

// Сундуки с сокровищами
export const treasureChests: TreasureChest[] = [
  // Обычные сундуки
  {
    id: "tc1",
    name: "Деревянный сундук",
    description: "Простой сундук с обычными предметами",
    icon: "📦",
    price: 50,
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    category: "Обычные сундуки",
    minLevel: 1
  },
  {
    id: "tc2",
    name: "Железный сундук",
    description: "Крепкий сундук с предметами повседневного обихода",
    icon: "🧰",
    price: 100,
    rarity: "common",
    rarityClass: "rarity-common",
    textClass: "text-common",
    category: "Обычные сундуки",
    minLevel: 1
  },
  // Редкие сундуки
  {
    id: "tc3",
    name: "Серебряный сундук",
    description: "Сундук с необычными предметами",
    icon: "🗄️",
    price: 250,
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    category: "Редкие сундуки",
    minLevel: 5
  },
  {
    id: "tc4",
    name: "Золотой сундук",
    description: "Сундук с ценными предметами",
    icon: "🧳",
    price: 500,
    rarity: "uncommon",
    rarityClass: "rarity-uncommon",
    textClass: "text-uncommon",
    category: "Редкие сундуки",
    minLevel: 8
  },
  // Эпические сундуки
  {
    id: "tc5",
    name: "Сундук искателя",
    description: "Сундук, наполненный редкими находками",
    icon: "🎁",
    price: 1000,
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    category: "Эпические сундуки",
    minLevel: 15
  },
  {
    id: "tc6",
    name: "Сундук авантюриста",
    description: "Сундук с удивительными предметами",
    icon: "🗃️",
    price: 2000,
    rarity: "rare",
    rarityClass: "rarity-rare",
    textClass: "text-rare",
    category: "Эпические сундуки",
    minLevel: 20
  },
  // Легендарные сундуки
  {
    id: "tc7",
    name: "Сундук героя",
    description: "Сундук, полный эпических сокровищ",
    icon: "🏺",
    price: 5000,
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    category: "Легендарные сундуки",
    minLevel: 30
  },
  {
    id: "tc8",
    name: "Королевский сундук",
    description: "Сундук с королевскими сокровищами",
    icon: "👑",
    price: 10000,
    rarity: "epic",
    rarityClass: "rarity-epic",
    textClass: "text-epic",
    category: "Легендарные сундуки",
    minLevel: 40
  },
  // Мифические сундуки
  {
    id: "tc9",
    name: "Сундук легенд",
    description: "Сундук с легендарными артефактами",
    icon: "✨",
    price: 25000,
    rarity: "legendary",
    rarityClass: "rarity-legendary",
    textClass: "text-legendary",
    category: "Мифические сундуки",
    minLevel: 50
  },
  {
    id: "tc10",
    name: "Сундук богов",
    description: "Сундук с божественными сокровищами",
    icon: "🌟",
    price: 50000,
    rarity: "mythic",
    rarityClass: "rarity-mythic",
    textClass: "text-mythic",
    category: "Древние сундуки",
    minLevel: 70
  }
];

// Экспедиции
export const expeditions: Expedition[] = [
  {
    id: "e1",
    name: "Дремучий лес",
    description: "Исследование ближайшего леса",
    icon: "🌲",
    duration: 300000, // 5 минут
    diamondReward: 10,
    experienceReward: 5,
    levelRequired: 1
  },
  {
    id: "e2",
    name: "Заброшенная шахта",
    description: "Поиск ресурсов в старой шахте",
    icon: "⛏️",
    duration: 600000, // 10 минут
    diamondReward: 25,
    experienceReward: 10,
    levelRequired: 3
  },
  {
    id: "e3",
    name: "Пещеры гномов",
    description: "Торговля и исследование пещер гномов",
    icon: "🏔️",
    duration: 1800000, // 30 минут
    diamondReward: 80,
    experienceReward: 30,
    levelRequired: 5
  },
  {
    id: "e4",
    name: "Морское путешествие",
    description: "Плавание к дальним островам",
    icon: "🌊",
    duration: 3600000, // 1 час
    diamondReward: 200,
    experienceReward: 60,
    levelRequired: 8
  },
  {
    id: "e5",
    name: "Пустынные руины",
    description: "Поиск древних сокровищ в пустыне",
    icon: "🏜️",
    duration: 7200000, // 2 часа
    diamondReward: 500,
    experienceReward: 120,
    levelRequired: 12
  },
  {
    id: "e6",
    name: "Затерянный храм",
    description: "Исследование храма древней цивилизации",
    icon: "🏛️",
    duration: 14400000, // 4 часа
    diamondReward: 1200,
    experienceReward: 250,
    levelRequired: 18
  },
  {
    id: "e7",
    name: "Заснеженные горы",
    description: "Экспедиция в суровые горы",
    icon: "❄️",
    duration: 28800000, // 8 часов
    diamondReward: 3000,
    experienceReward: 500,
    levelRequired: 25
  },
  {
    id: "e8",
    name: "Вулканическая долина",
    description: "Опасное путешествие к действующим вулканам",
    icon: "🌋",
    duration: 43200000, // 12 часов
    diamondReward: 5000,
    experienceReward: 800,
    levelRequired: 35
  },
  {
    id: "e9",
    name: "Затерянный город",
    description: "Поиск мифического города, полного сокровищ",
    icon: "🏙️",
    duration: 86400000, // 24 часа
    diamondReward: 12000,
    experienceReward: 1500,
    levelRequired: 50
  },
  {
    id: "e10",
    name: "Путешествие между мирами",
    description: "Экспедиция в параллельное измерение",
    icon: "🌌",
    duration: 172800000, // 48 часов
    diamondReward: 30000,
    experienceReward: 3000,
    levelRequired: 70
  }
];

// Подземелья
export const dungeons: Dungeon[] = [
  {
    id: "d1",
    name: "Подвалы замка",
    description: "Первое испытание для начинающих героев",
    icon: "🏰",
    difficulty: "Лёгкая",
    minClearedDungeons: 0
  },
  {
    id: "d2",
    name: "Пещеры гоблинов",
    description: "Логово злобных гоблинов и их сокровища",
    icon: "👹",
    difficulty: "Средняя",
    minClearedDungeons: 1
  },
  {
    id: "d3",
    name: "Древнее кладбище",
    description: "Обитель нежити и призраков",
    icon: "💀",
    difficulty: "Высокая",
    minClearedDungeons: 2
  },
  {
    id: "d4",
    name: "Логово дракона",
    description: "Пещера древнего дракона, полная сокровищ",
    icon: "🐉",
    difficulty: "Очень высокая",
    minClearedDungeons: 3
  },
  {
    id: "d5",
    name: "Портал демонов",
    description: "Проход в адское измерение",
    icon: "👿",
    difficulty: "Экстремальная",
    minClearedDungeons: 4
  }
];

// Монстры
export const monsters: Monster[] = [
  // Подвалы замка
  {
    id: "m1",
    name: "Гигантская крыса",
    description: "Обычная, но очень большая крыса",
    icon: "🐀",
    health: 10,
    damage: 1,
    diamondReward: 2,
    experienceReward: 3
  },
  {
    id: "m2",
    name: "Скелет",
    description: "Оживший скелет, вооружённый ржавым мечом",
    icon: "💀",
    health: 15,
    damage: 2,
    diamondReward: 3,
    experienceReward: 5
  },
  {
    id: "m3",
    name: "Паук-мутант",
    description: "Огромный ядовитый паук",
    icon: "🕷️",
    health: 20,
    damage: 3,
    diamondReward: 5,
    experienceReward: 8
  },
  {
    id: "m4",
    name: "Капитан стражи",
    description: "Бывший капитан, одержимый злом",
    icon: "🧟",
    health: 50,
    damage: 5,
    diamondReward: 15,
    experienceReward: 20
  },
  
  // Пещеры гоблинов
  {
    id: "m5",
    name: "Гоблин-воришка",
    description: "Мелкий и юркий гоблин",
    icon: "👺",
    health: 25,
    damage: 4,
    diamondReward: 8,
    experienceReward: 10
  },
  {
    id: "m6",
    name: "Гоблин-воин",
    description: "Гоблин с боевым опытом и оружием",
    icon: "👹",
    health: 35,
    damage: 6,
    diamondReward: 12,
    experienceReward: 15
  },
  {
    id: "m7",
    name: "Шаман гоблинов",
    description: "Гоблин, владеющий тёмной магией",
    icon: "🧙",
    health: 40,
    damage: 8,
    diamondReward: 18,
    experienceReward: 22
  },
  {
    id: "m8",
    name: "Король гоблинов",
    description: "Огромный и сильный лидер гоблинов",
    icon: "👑",
    health: 100,
    damage: 15,
    diamondReward: 50,
    experienceReward: 60
  },
  
  // Древнее кладбище
  {
    id: "m9",
    name: "Зомби",
    description: "Восставший из мёртвых человек",
    icon: "🧟",
    health: 45,
    damage: 7,
    diamondReward: 15,
    experienceReward: 18
  },
  {
    id: "m10",
    name: "Призрак",
    description: "Неупокоенный дух, пугающий путников",
    icon: "👻",
    health: 40,
    damage: 10,
    diamondReward: 20,
    experienceReward: 25
  },
  {
    id: "m11",
    name: "Вампир",
    description: "Древний кровопийца",
    icon: "🧛",
    health: 60,
    damage: 12,
    diamondReward: 25,
    experienceReward: 35
  },
  {
    id: "m12",
    name: "Личь",
    description: "Могущественный некромант, обратившийся в нежить",
    icon: "☠️",
    health: 150,
    damage: 20,
    diamondReward: 100,
    experienceReward: 120
  },
  
  // Логово дракона
  {
    id: "m13",
    name: "Кобольд-слуга",
    description: "Мелкий прислужник дракона",
    icon: "🦎",
    health: 70,
    damage: 12,
    diamondReward: 30,
    experienceReward: 40
  },
  {
    id: "m14",
    name: "Драконорождённый",
    description: "Наполовину человек, наполовину дракон",
    icon: "🐲",
    health: 100,
    damage: 18,
    diamondReward: 50,
    experienceReward: 65
  },
  {
    id: "m15",
    name: "Огненная горгулья",
    description: "Каменное существо, охраняющее сокровища дракона",
    icon: "🗿",
    health: 120,
    damage: 22,
    diamondReward: 75,
    experienceReward: 90
  },
  {
    id: "m16",
    name: "Древний дракон",
    description: "Могущественный дракон, собирающий сокровища веками",
    icon: "🐉",
    health: 300,
    damage: 35,
    diamondReward: 200,
    experienceReward: 250
  },
  
  // Портал демонов
  {
    id: "m17",
    name: "Бес",
    description: "Мелкий демон-вредитель",
    icon: "😈",
    health: 90,
    damage: 15,
    diamondReward: 40,
    experienceReward: 55
  },
  {
    id: "m18",
    name: "Адский пёс",
    description: "Трёхголовый огненный страж преисподней",
    icon: "🐕",
    health: 150,
    damage: 25,
    diamondReward: 80,
    experienceReward: 100
  },
  {
    id: "m19",
    name: "Повелитель боли",
    description: "Демон, питающийся страданиями",
    icon: "👿",
    health: 200,
    damage: 30,
    diamondReward: 120,
    experienceReward: 150
  },
  {
    id: "m20",
    name: "Архидемон",
    description: "Древний правитель адского измерения",
    icon: "🔥",
    health: 500,
    damage: 50,
    diamondReward: 500,
    experienceReward: 600
  }
];

// Получение монстра в зависимости от уровня и подземелья
export function getMonsterByLevel(dungeonId: string, level: number): Monster {
  // Базовый пул монстров
  let monsterPool: Monster[] = [];
  
  // Определяем пул монстров в зависимости от подземелья
  switch (dungeonId) {
    case "d1": // Подвалы замка
      monsterPool = monsters.slice(0, 4);
      break;
    case "d2": // Пещеры гоблинов
      monsterPool = monsters.slice(4, 8);
      break;
    case "d3": // Древнее кладбище
      monsterPool = monsters.slice(8, 12);
      break;
    case "d4": // Логово дракона
      monsterPool = monsters.slice(12, 16);
      break;
    case "d5": // Портал демонов
      monsterPool = monsters.slice(16, 20);
      break;
    default:
      monsterPool = monsters.slice(0, 4);
  }
  
  // Определяем, босс ли это
  const isBoss = level % 5 === 0;
  const isMajorBoss = level % 10 === 0;
  
  // Выбираем монстра
  let monster: Monster;
  
  if (isMajorBoss) {
    // Главный босс (каждые 10 уровней)
    monster = { ...monsterPool[3] }; // Берём самого сильного
  } else if (isBoss) {
    // Обычный босс (каждые 5 уровней)
    monster = { ...monsterPool[2] }; // Берём второго по силе
  } else {
    // Обычный монстр
    const randomIndex = Math.floor(Math.random() * 2); // Выбираем из первых двух
    monster = { ...monsterPool[randomIndex] };
  }
  
  // Усиливаем монстра в зависимости от уровня
  const levelMultiplier = 1 + (level - 1) * 0.2; // +20% за каждый уровень выше первого
  
  monster.health = Math.ceil(monster.health * levelMultiplier);
  monster.damage = Math.ceil(monster.damage * levelMultiplier);
  monster.diamondReward = Math.ceil(monster.diamondReward * levelMultiplier);
  monster.experienceReward = Math.ceil(monster.experienceReward * levelMultiplier);
  
  // Если это босс, дополнительно усиливаем его
  if (isBoss) {
    monster.health = Math.ceil(monster.health * 1.5);
    monster.damage = Math.ceil(monster.damage * 1.3);
    monster.diamondReward = Math.ceil(monster.diamondReward * 2);
    monster.experienceReward = Math.ceil(monster.experienceReward * 2);
  }
  
  // Если это главный босс, ещё больше усиливаем
  if (isMajorBoss) {
    monster.health = Math.ceil(monster.health * 2);
    monster.damage = Math.ceil(monster.damage * 1.5);
    monster.diamondReward = Math.ceil(monster.diamondReward * 3);
    monster.experienceReward = Math.ceil(monster.experienceReward * 3);
  }
  
  return monster;
}

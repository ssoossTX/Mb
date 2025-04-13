import { create } from "zustand";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import { artifacts, skins, treasureChests, expeditions } from "../gameData";

export type ClassType = "warrior" | "explorer" | "merchant";

// Типы для улучшений
interface Skill {
  name: string;
  description: string;
  icon: string;
  level: number;
  maxLevel: number;
  getCurrentBonus: () => string;
  getNextBonus: () => string;
}

// Типы для всех систем
interface Artifact {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  icon: string;
  rarity: string;
  rarityClass: string;
  textClass: string;
  bonus: {
    type: string;
    value: number;
  };
}

interface Skin {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  icon: string;
  rarity: string;
  rarityClass: string;
  textClass: string;
}

interface Relic {
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

interface Expedition {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number;
  diamondReward: number;
  experienceReward: number;
  levelRequired: number;
  endTime: number;
}

interface Inventory {
  artifacts: Artifact[];
  skins: Skin[];
  relics: Relic[];
}

// Интерфейс состояния кликера
interface ClickerState {
  // Базовая информация
  selectedClass: ClassType | null;
  hasSelectedClass: boolean;
  level: number;
  experience: number;
  totalExperience: number;
  
  // Ресурсы
  clicks: number;
  totalClicks: number;
  diamonds: number;
  
  // Престиж
  prestige: number;
  prestigeThreshold: number;
  canPrestige: boolean;
  showPrestigeWarning: boolean;
  
  // Улучшения
  clickPower: number;
  clickLevel: number;
  clickCost: number;
  
  autoClickPower: number;
  autoClickLevel: number;
  autoClickCost: number;
  
  autoClickSpeed: number;
  autoClickSpeedLevel: number;
  autoClickSpeedCost: number;
  
  // Инвентарь
  inventory: Inventory;
  
  // Экспедиции
  expeditionSlots: number;
  activeExpeditions: Expedition[];
  
  // Подземелья
  dungeonsCleared: number;
  dungeonLevel: number;
  currentDungeon: any | null;
  
  // Навыки
  skillPoints: number;
  skills: Record<string, Skill>;
  
  // Методы обработки состояния
  selectClass: (classType: ClassType) => void;
  addClicks: (amount: number) => void;
  addClickFromAuto: () => void;
  addDiamonds: (amount: number) => void;
  spendDiamonds: (amount: number) => void;
  addExperience: (amount: number) => void;
  
  // Улучшения
  upgradeClickPower: () => void;
  upgradeAutoClickPower: () => void;
  upgradeAutoClickSpeed: () => void;
  canAffordUpgrade: (type: string) => boolean;
  
  // Престиж
  performPrestige: () => void;
  setShowPrestigeWarning: (value: boolean) => void;
  
  // Инвентарь и предметы
  addItem: (item: any) => void;
  addRandomItem: (chest: any) => any[];
  
  // Экспедиции
  startExpedition: (expedition: any) => void;
  completeExpedition: (expeditionId: string) => any;
  canStartExpedition: () => boolean;
  
  // Подземелья
  selectDungeon: (dungeonId: string) => void;
  startDungeon: (dungeonId: string) => void;
  clearDungeonLevel: () => void;
  exitDungeon: () => void;
  
  // Навыки
  upgradeSkill: (skillId: string) => void;
  
  // Сохранение/загрузка
  saveGame: () => any;
  loadGame: (data: any) => void;
  resetGame: () => void;
}

export const useClicker = create<ClickerState>((set, get) => ({
  // Базовая информация
  selectedClass: null,
  hasSelectedClass: false,
  level: 1,
  experience: 0,
  totalExperience: 0,
  
  // Ресурсы
  clicks: 0,
  totalClicks: 0,
  diamonds: 0,
  
  // Престиж
  prestige: 0,
  prestigeThreshold: 10000,
  canPrestige: false,
  showPrestigeWarning: true,
  
  // Улучшения
  clickPower: 1,
  clickLevel: 1,
  clickCost: 10,
  
  autoClickPower: 0,
  autoClickLevel: 0,
  autoClickCost: 100,
  
  autoClickSpeed: 1000,
  autoClickSpeedLevel: 0,
  autoClickSpeedCost: 5,
  
  // Инвентарь
  inventory: {
    artifacts: [],
    skins: [],
    relics: []
  },
  
  // Экспедиции
  expeditionSlots: 2,
  activeExpeditions: [],
  
  // Подземелья
  dungeonsCleared: 0,
  dungeonLevel: 1,
  currentDungeon: null,
  
  // Навыки
  skillPoints: 0,
  skills: {
    clickEfficiency: {
      name: "Эффективность клика",
      description: "Увеличивает силу каждого клика",
      icon: "👆",
      level: 0,
      maxLevel: 10,
      getCurrentBonus: function() {
        return `+${this.level * 5}% к силе клика`;
      },
      getNextBonus: function() {
        return `+${(this.level + 1) * 5}% к силе клика`;
      }
    },
    autoClickEfficiency: {
      name: "Эффективность автоклика",
      description: "Увеличивает силу автоклика",
      icon: "⚡",
      level: 0,
      maxLevel: 10,
      getCurrentBonus: function() {
        return `+${this.level * 10}% к силе автоклика`;
      },
      getNextBonus: function() {
        return `+${(this.level + 1) * 10}% к силе автоклика`;
      }
    },
    diamondFinder: {
      name: "Поиск алмазов",
      description: "Увеличивает количество получаемых алмазов",
      icon: "💎",
      level: 0,
      maxLevel: 10,
      getCurrentBonus: function() {
        return `+${this.level * 5}% к получаемым алмазам`;
      },
      getNextBonus: function() {
        return `+${(this.level + 1) * 5}% к получаемым алмазам`;
      }
    },
    expeditionMaster: {
      name: "Мастер экспедиций",
      description: "Сокращает время экспедиций",
      icon: "🧭",
      level: 0,
      maxLevel: 5,
      getCurrentBonus: function() {
        return `${this.level * 5}% к скорости экспедиций`;
      },
      getNextBonus: function() {
        return `${(this.level + 1) * 5}% к скорости экспедиций`;
      }
    },
    dungeonFighter: {
      name: "Боец подземелий",
      description: "Увеличивает урон в подземельях",
      icon: "🏰",
      level: 0,
      maxLevel: 10,
      getCurrentBonus: function() {
        return `+${this.level * 10}% к урону в подземельях`;
      },
      getNextBonus: function() {
        return `+${(this.level + 1) * 10}% к урону в подземельях`;
      }
    }
  },
  
  // Методы обработки состояния
  selectClass: (classType) => {
    console.log("useClicker.selectClass вызван с классом:", classType);
    
    // Определяем начальные бонусы класса для выбранного класса
    let newClickPower = 1; // Базовое значение
    let newDiamonds = 0;   // Базовое значение
    
    // Применяем бонусы выбранного класса
    switch (classType) {
      case "warrior":
        console.log("Применение бонусов для воина");
        // Воин получает +5 к начальной силе клика
        newClickPower += 5;
        break;
      case "explorer":
        console.log("Применение бонусов для исследователя");
        // Исследователь начинает с открытой экспедицией
        // (это будет реализовано в другом месте)
        break;
      case "merchant":
        console.log("Применение бонусов для торговца");
        // Торговец начинает с +50 алмазами
        newDiamonds = 50;
        break;
    }
    
    // Устанавливаем новое состояние напрямую, без использования предыдущего состояния
    set({
      selectedClass: classType,
      hasSelectedClass: true,
      clickPower: newClickPower,
      diamonds: newDiamonds
    });
    
    console.log("useClicker.selectClass: класс установлен, новое состояние:", 
      useClicker.getState().selectedClass, 
      useClicker.getState().hasSelectedClass
    );
  },
  
  addClicks: (amount) => {
    set((state) => {
      // Определяем мультипликатор в зависимости от класса
      let multiplier = 1;
      if (state.selectedClass === "warrior") {
        multiplier += 0.25; // +25% для воина
      }
      
      // Учитываем бонусы от навыков
      const skillBonus = state.skills.clickEfficiency.level * 0.05; // +5% за уровень
      multiplier += skillBonus;
      
      // Учитываем бонусы от реликвий
      state.inventory.relics.forEach(relic => {
        if (relic.bonus.type === "clickPower") {
          multiplier += relic.bonus.value;
        }
      });
      
      // Учитываем бонусы от артефактов
      state.inventory.artifacts.forEach(artifact => {
        if (artifact.bonus.type === "clickPower") {
          multiplier += artifact.bonus.value;
        }
      });
      
      // Применяем мультипликатор и округляем
      const adjustedAmount = Math.round(amount * multiplier);
      
      // Обновляем счетчики кликов
      const newClicks = state.clicks + adjustedAmount;
      const newTotalClicks = state.totalClicks + adjustedAmount;
      
      // Проверяем возможность престижа
      const canPrestige = newClicks >= state.prestigeThreshold;
      
      return {
        clicks: newClicks,
        totalClicks: newTotalClicks,
        canPrestige
      };
    });
  },
  
  addClickFromAuto: () => {
    const state = get();
    if (state.autoClickPower <= 0) return;
    
    // Определяем мультипликатор в зависимости от навыков
    let multiplier = 1;
    const skillBonus = state.skills.autoClickEfficiency.level * 0.1; // +10% за уровень
    multiplier += skillBonus;
    
    // Учитываем бонусы от реликвий
    state.inventory.relics.forEach(relic => {
      if (relic.bonus.type === "autoClickPower") {
        multiplier += relic.bonus.value;
      }
    });
    
    // Учитываем бонусы от артефактов
    state.inventory.artifacts.forEach(artifact => {
      if (artifact.bonus.type === "autoClickPower") {
        multiplier += artifact.bonus.value;
      }
    });
    
    // Применяем мультипликатор и округляем
    const adjustedAmount = Math.round(state.autoClickPower * multiplier);
    
    // Добавляем клики
    set((state) => {
      const newClicks = state.clicks + adjustedAmount;
      const newTotalClicks = state.totalClicks + adjustedAmount;
      
      // Проверяем возможность престижа
      const canPrestige = newClicks >= state.prestigeThreshold;
      
      return {
        clicks: newClicks,
        totalClicks: newTotalClicks,
        canPrestige
      };
    });
  },
  
  addDiamonds: (amount) => {
    set((state) => {
      // Определяем мультипликатор в зависимости от класса
      let multiplier = 1;
      if (state.selectedClass === "merchant") {
        multiplier += 0.1; // +10% для торговца
      }
      
      // Учитываем бонусы от навыков
      const skillBonus = state.skills.diamondFinder.level * 0.05; // +5% за уровень
      multiplier += skillBonus;
      
      // Учитываем бонусы от реликвий
      state.inventory.relics.forEach(relic => {
        if (relic.bonus.type === "diamondGain") {
          multiplier += relic.bonus.value;
        }
      });
      
      // Применяем мультипликатор и округляем
      const adjustedAmount = Math.round(amount * multiplier);
      
      return { diamonds: state.diamonds + adjustedAmount };
    });
  },
  
  spendDiamonds: (amount) => {
    set((state) => {
      if (state.diamonds < amount) return {};
      
      // Определяем скидку в зависимости от класса
      let discount = 0;
      if (state.selectedClass === "merchant") {
        discount = 0.15; // -15% для торговца
      }
      
      // Учитываем бонусы от реликвий
      state.inventory.relics.forEach(relic => {
        if (relic.bonus.type === "shopDiscount") {
          discount += relic.bonus.value;
        }
      });
      
      // Применяем скидку (максимум 50%)
      const adjustedAmount = Math.round(amount * (1 - Math.min(0.5, discount)));
      
      return { diamonds: state.diamonds - adjustedAmount };
    });
  },
  
  addExperience: (amount) => {
    set((state) => {
      const totalExp = state.experience + amount;
      const expForNextLevel = state.level * 100;
      
      // Если опыт достиг порога следующего уровня
      if (totalExp >= expForNextLevel) {
        const remainingExp = totalExp - expForNextLevel;
        return {
          level: state.level + 1,
          experience: remainingExp,
          totalExperience: state.totalExperience + amount,
          skillPoints: state.skillPoints + 1 // Добавляем очко навыка при повышении уровня
        };
      }
      
      return {
        experience: totalExp,
        totalExperience: state.totalExperience + amount
      };
    });
  },
  
  // Улучшения
  upgradeClickPower: () => {
    set((state) => {
      if (state.clicks < state.clickCost) return {};
      
      const newLevel = state.clickLevel + 1;
      const newClickPower = Math.ceil(state.clickPower * 1.2); // +20% к силе
      const newCost = Math.ceil(state.clickCost * 1.5); // +50% к стоимости
      
      return {
        clicks: state.clicks - state.clickCost,
        clickLevel: newLevel,
        clickPower: newClickPower,
        clickCost: newCost
      };
    });
  },
  
  upgradeAutoClickPower: () => {
    set((state) => {
      if (state.clicks < state.autoClickCost) return {};
      
      const newLevel = state.autoClickLevel + 1;
      let newAutoClickPower = state.autoClickLevel === 0 ? 1 : Math.ceil(state.autoClickPower * 1.3); // Первый уровень = 1, затем +30%
      const newCost = Math.ceil(state.autoClickCost * 1.8); // +80% к стоимости
      
      return {
        clicks: state.clicks - state.autoClickCost,
        autoClickLevel: newLevel,
        autoClickPower: newAutoClickPower,
        autoClickCost: newCost
      };
    });
  },
  
  upgradeAutoClickSpeed: () => {
    set((state) => {
      if (state.diamonds < state.autoClickSpeedCost) return {};
      
      const newLevel = state.autoClickSpeedLevel + 1;
      // Уменьшаем интервал, но не менее 100мс
      const newSpeed = Math.max(100, state.autoClickSpeed - Math.ceil(state.autoClickSpeed * 0.1)); // -10% к времени
      const newCost = Math.ceil(state.autoClickSpeedCost * 1.5); // +50% к стоимости
      
      return {
        diamonds: state.diamonds - state.autoClickSpeedCost,
        autoClickSpeedLevel: newLevel,
        autoClickSpeed: newSpeed,
        autoClickSpeedCost: newCost
      };
    });
  },
  
  canAffordUpgrade: (type) => {
    const state = get();
    switch (type) {
      case "click":
        return state.clicks >= state.clickCost;
      case "autoClick":
        return state.clicks >= state.autoClickCost;
      case "autoClickSpeed":
        return state.diamonds >= state.autoClickSpeedCost;
      default:
        return false;
    }
  },
  
  // Престиж
  performPrestige: () => {
    set((state) => {
      // Увеличиваем порог престижа на 50%
      const newPrestigeThreshold = Math.ceil(state.prestigeThreshold * 1.5);
      
      // Рассчитываем бонус к силе клика
      const prestigeBonus = Math.max(1, Math.floor(Math.sqrt(state.prestige + 1) * 2));
      
      return {
        prestige: state.prestige + 1,
        prestigeThreshold: newPrestigeThreshold,
        clicks: 0,
        clickLevel: 1,
        clickPower: 1 + prestigeBonus, // Базовая сила + бонус престижа
        clickCost: 10,
        autoClickPower: 0,
        autoClickLevel: 0,
        autoClickCost: 100,
        autoClickSpeed: 1000,
        autoClickSpeedLevel: 0,
        autoClickSpeedCost: 5,
        canPrestige: false,
        showPrestigeWarning: true
      };
    });
  },
  
  setShowPrestigeWarning: (value) => {
    set({ showPrestigeWarning: value });
  },
  
  // Инвентарь и предметы
  addItem: (item) => {
    set((state) => {
      const inventory = { ...state.inventory };
      
      // Определяем, к какой категории относится предмет
      if ('effects' in item) {
        // Это реликвия
        if (!inventory.relics.some(relic => relic.id === item.id)) {
          inventory.relics = [...inventory.relics, item];
        }
      } else if ('bonus' in item) {
        // Это артефакт
        if (!inventory.artifacts.some(artifact => artifact.id === item.id)) {
          inventory.artifacts = [...inventory.artifacts, item];
        }
      } else {
        // Это скин
        if (!inventory.skins.some(skin => skin.id === item.id)) {
          inventory.skins = [...inventory.skins, item];
        }
      }
      
      return { inventory };
    });
  },
  
  addRandomItem: (chest) => {
    // Клонируем объект сундука чтобы не менять исходник
    const chestCopy = { ...chest };
    
    // Получаем список всех предметов соответствующего типа
    const state = get();
    
    // Определяем коэффициент удачи (для класса торговца)
    let luckModifier = state.selectedClass === "merchant" ? 0.1 : 0; // +10% к удаче для торговца
    
    // Учитываем бонусы от реликвий
    state.inventory.relics.forEach(relic => {
      if (relic.bonus.type === "luck") {
        luckModifier += relic.bonus.value;
      }
    });
    
    // Определяем количество предметов в сундуке
    const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 предмета
    
    // Собираем все доступные артефакты, скины и т.д.
    const allArtifacts = artifacts.filter(a => a.chestType === chestCopy.category);
    const allSkins = skins.filter(s => s.chestType === chestCopy.category);
    
    // Функция для получения случайного предмета с учетом редкости
    const getRandomItem = () => {
      // Определяем шансы выпадения разных типов предметов
      const artifactChance = 0.7; // 70% артефакт, 30% скин
      
      // Применяем удачу
      const adjustedArtifactChance = artifactChance - luckModifier;
      
      // Выбираем тип предмета
      const itemType = Math.random() < adjustedArtifactChance ? 'artifact' : 'skin';
      
      // Для выбора предмета по редкости
      const rarityRoll = Math.random();
      let rarityTarget: string;
      
      // Применяем удачу к шансу редких предметов
      if (rarityRoll < (0.01 + luckModifier)) {
        rarityTarget = 'mythic'; // 1% + удача
      } else if (rarityRoll < (0.05 + luckModifier)) {
        rarityTarget = 'legendary'; // 4% + удача
      } else if (rarityRoll < (0.15 + luckModifier)) {
        rarityTarget = 'epic'; // 10% + удача
      } else if (rarityRoll < (0.35 + luckModifier)) {
        rarityTarget = 'rare'; // 20% + удача
      } else if (rarityRoll < (0.65 + luckModifier)) {
        rarityTarget = 'uncommon'; // 30% + удача
      } else {
        rarityTarget = 'common'; // 35% - удача
      }
      
      // Выбираем предмет из соответствующего списка и нужной редкости
      const itemPool = itemType === 'artifact' 
        ? allArtifacts.filter(item => item.rarity === rarityTarget)
        : allSkins.filter(item => item.rarity === rarityTarget);
      
      // Если не нашли предметов нужной редкости, выбираем любой доступный
      const availablePool = itemPool.length > 0 
        ? itemPool 
        : (itemType === 'artifact' ? allArtifacts : allSkins);
      
      // Если вообще нет предметов, возвращаем null
      if (availablePool.length === 0) return null;
      
      // Выбираем случайный предмет
      return availablePool[Math.floor(Math.random() * availablePool.length)];
    };
    
    // Выбираем предметы
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      const item = getRandomItem();
      if (item) {
        items.push(item);
        // Добавляем предмет в инвентарь
        get().addItem(item);
      }
    }
    
    return items;
  },
  
  // Экспедиции
  startExpedition: (expedition) => {
    set((state) => {
      // Копируем экспедицию
      const newExpedition = { ...expedition };
      
      // Определяем модификатор времени для исследователя
      let timeModifier = state.selectedClass === "explorer" ? 0.8 : 1; // -20% для исследователя
      
      // Учитываем навык мастера экспедиций
      timeModifier -= state.skills.expeditionMaster.level * 0.05; // -5% за уровень навыка
      
      // Минимальный модификатор 0.5 (-50%)
      timeModifier = Math.max(0.5, timeModifier);
      
      // Устанавливаем время окончания экспедиции
      const adjustedDuration = Math.ceil(newExpedition.duration * timeModifier);
      newExpedition.endTime = Date.now() + adjustedDuration;
      
      // Применяем бонус награды для исследователя
      if (state.selectedClass === "explorer") {
        newExpedition.diamondReward = Math.ceil(newExpedition.diamondReward * 1.15); // +15%
        newExpedition.experienceReward = Math.ceil(newExpedition.experienceReward * 1.15); // +15%
      }
      
      // Добавляем экспедицию в активные
      return {
        activeExpeditions: [...state.activeExpeditions, newExpedition]
      };
    });
  },
  
  completeExpedition: (expeditionId) => {
    const state = get();
    
    // Ищем экспедицию в активных
    const expeditionIndex = state.activeExpeditions.findIndex(e => e.id === expeditionId);
    if (expeditionIndex === -1) return null;
    
    const expedition = state.activeExpeditions[expeditionIndex];
    
    // Получаем награду
    const diamonds = expedition.diamondReward;
    const experience = expedition.experienceReward;
    
    // Шанс получить предмет (20%)
    let items: any[] = [];
    if (Math.random() < 0.2) {
      // Выбираем случайный артефакт
      const availableArtifacts = artifacts.filter(a => 
        a.levelRequired <= state.level && 
        !state.inventory.artifacts.some(inv => inv.id === a.id)
      );
      
      if (availableArtifacts.length > 0) {
        const item = availableArtifacts[Math.floor(Math.random() * availableArtifacts.length)];
        items.push(item);
        state.addItem(item);
      }
    }
    
    // Добавляем алмазы и опыт
    state.addDiamonds(diamonds);
    state.addExperience(experience);
    
    // Удаляем экспедицию из активных
    set((state) => ({
      activeExpeditions: state.activeExpeditions.filter(e => e.id !== expeditionId)
    }));
    
    // Возвращаем информацию о награде
    return {
      expedition,
      diamonds,
      experience,
      items
    };
  },
  
  canStartExpedition: () => {
    const state = get();
    return state.activeExpeditions.length < state.expeditionSlots;
  },
  
  // Подземелья
  selectDungeon: (dungeonId) => {
    return { currentDungeon: null }; // Просто для выбора, фактически начнется через startDungeon
  },
  
  startDungeon: (dungeonId) => {
    set((state) => {
      // Ищем данные о подземелье
      const dungeon = expeditions.find(d => d.id === dungeonId);
      if (!dungeon) return {};
      
      return {
        currentDungeon: dungeon,
        dungeonLevel: 1
      };
    });
  },
  
  clearDungeonLevel: () => {
    set((state) => {
      return {
        dungeonLevel: state.dungeonLevel + 1
      };
    });
  },
  
  exitDungeon: () => {
    set((state) => {
      // Если прошли хотя бы 10 уровней, засчитываем как пройденное подземелье
      if (state.dungeonLevel >= 10) {
        return {
          currentDungeon: null,
          dungeonLevel: 1,
          dungeonsCleared: state.dungeonsCleared + 1
        };
      }
      
      return {
        currentDungeon: null,
        dungeonLevel: 1
      };
    });
  },
  
  // Навыки
  upgradeSkill: (skillId) => {
    set((state) => {
      if (state.skillPoints <= 0) return {};
      
      const skills = { ...state.skills };
      const skill = skills[skillId];
      
      // Проверяем, что навык не достиг максимума
      if (skill.level >= skill.maxLevel) return {};
      
      // Увеличиваем уровень навыка
      skill.level += 1;
      
      return {
        skills,
        skillPoints: state.skillPoints - 1
      };
    });
  },
  
  // Сохранение/загрузка
  saveGame: () => {
    const state = get();
    
    // Формируем объект с данными игры для сохранения
    return {
      selectedClass: state.selectedClass,
      level: state.level,
      experience: state.experience,
      totalExperience: state.totalExperience,
      clicks: state.clicks,
      totalClicks: state.totalClicks,
      diamonds: state.diamonds,
      prestige: state.prestige,
      prestigeThreshold: state.prestigeThreshold,
      clickPower: state.clickPower,
      clickLevel: state.clickLevel,
      clickCost: state.clickCost,
      autoClickPower: state.autoClickPower,
      autoClickLevel: state.autoClickLevel,
      autoClickCost: state.autoClickCost,
      autoClickSpeed: state.autoClickSpeed,
      autoClickSpeedLevel: state.autoClickSpeedLevel,
      autoClickSpeedCost: state.autoClickSpeedCost,
      inventory: state.inventory,
      expeditionSlots: state.expeditionSlots,
      activeExpeditions: state.activeExpeditions,
      dungeonsCleared: state.dungeonsCleared,
      skillPoints: state.skillPoints,
      skills: state.skills
    };
  },
  
  loadGame: (data) => {
    // Загружаем данные игры из сохранения
    set((state) => ({
      ...state,
      ...data,
      hasSelectedClass: !!data.selectedClass
    }));
  },
  
  resetGame: () => {
    localStorage.removeItem("clickerGameSave");
    set((state) => ({
      selectedClass: null,
      hasSelectedClass: false,
      level: 1,
      experience: 0,
      totalExperience: 0,
      clicks: 0,
      totalClicks: 0,
      diamonds: 0,
      prestige: 0,
      prestigeThreshold: 10000,
      canPrestige: false,
      showPrestigeWarning: true,
      clickPower: 1,
      clickLevel: 1,
      clickCost: 10,
      autoClickPower: 0,
      autoClickLevel: 0,
      autoClickCost: 100,
      autoClickSpeed: 1000,
      autoClickSpeedLevel: 0,
      autoClickSpeedCost: 5,
      inventory: {
        artifacts: [],
        skins: [],
        relics: []
      },
      expeditionSlots: 2,
      activeExpeditions: [],
      dungeonsCleared: 0,
      dungeonLevel: 1,
      currentDungeon: null,
      skillPoints: 0,
      skills: {
        ...state.skills,
        clickEfficiency: {
          ...state.skills.clickEfficiency,
          level: 0
        },
        autoClickEfficiency: {
          ...state.skills.autoClickEfficiency,
          level: 0
        },
        diamondFinder: {
          ...state.skills.diamondFinder,
          level: 0
        },
        expeditionMaster: {
          ...state.skills.expeditionMaster,
          level: 0
        },
        dungeonFighter: {
          ...state.skills.dungeonFighter,
          level: 0
        }
      }
    }));
  }
}));

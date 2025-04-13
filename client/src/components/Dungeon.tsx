import { useState, useEffect } from "react";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";
import { dungeons, monsters, getMonsterByLevel, relics } from "../lib/gameData";

// Проверим подземелья
console.log("Доступные подземелья:", dungeons);

const Dungeon = () => {
  const { 
    dungeonsCleared, dungeonLevel, currentDungeon, 
    clearDungeonLevel, selectDungeon, startDungeon, exitDungeon,
    inventory, clickPower, addDiamonds, addExperience, addItem
  } = useClicker();
  const { playHit, playSuccess } = useAudio();
  
  // Локальные состояния
  const [selectedDungeon, setSelectedDungeon] = useState<any>(null);
  const [currentMonster, setCurrentMonster] = useState<any>(null);
  const [monsterHealth, setMonsterHealth] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [battleTimer, setBattleTimer] = useState(0);
  const [showRewards, setShowRewards] = useState(false);
  const [rewards, setRewards] = useState<any>({ diamonds: 0, experience: 0, items: [] });
  const [showRelicModal, setShowRelicModal] = useState(false);
  const [foundRelic, setFoundRelic] = useState<any>(null);
  
  // Подготавливаем монстра при загрузке уровня
  useEffect(() => {
    if (currentDungeon && !currentMonster) {
      const monster = getMonsterByLevel(currentDungeon.id, dungeonLevel);
      setCurrentMonster(monster);
      setMonsterHealth(monster.health);
      setPlayerHealth(100);
      setBattleLog([`Вы столкнулись с ${monster.name}!`]);
    }
  }, [currentDungeon, currentMonster, dungeonLevel]);
  
  // Таймер для атаки монстра
  useEffect(() => {
    let timer: number | null = null;
    
    if (currentMonster && monsterHealth > 0 && playerHealth > 0) {
      timer = window.setTimeout(() => {
        // Монстр атакует
        const damage = Math.max(1, currentMonster.damage);
        setPlayerHealth(prev => Math.max(0, prev - damage));
        setBattleLog(prev => [...prev, `${currentMonster.name} атакует вас на ${damage} урона!`]);
        playHit();
        
        setBattleTimer(prev => prev + 1);
      }, 1500);
    } else if (playerHealth <= 0) {
      // Игрок проиграл
      exitDungeon();
      setBattleLog(prev => [...prev, `Вы потерпели поражение!`]);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentMonster, monsterHealth, playerHealth, battleTimer, exitDungeon, playHit]);
  
  // Атака игрока по монстру
  const attackMonster = () => {
    if (!currentMonster || monsterHealth <= 0 || playerHealth <= 0) return;
    
    // Рассчитываем урон
    const damage = clickPower;
    const newHealth = Math.max(0, monsterHealth - damage);
    setMonsterHealth(newHealth);
    setBattleLog(prev => [...prev, `Вы атакуете ${currentMonster.name} на ${damage} урона!`]);
    playHit();
    
    // Проверка победы
    if (newHealth <= 0) {
      handleVictory();
    }
  };
  
  // Обработка победы
  const handleVictory = () => {
    setBattleLog(prev => [...prev, `Вы победили ${currentMonster.name}!`]);
    playSuccess();
    
    // Определяем награды
    const diamondReward = currentMonster.diamondReward;
    const expReward = currentMonster.experienceReward;
    
    // Проверка на босса и его особые награды
    const isBoss = dungeonLevel % 5 === 0;
    const isMajorBoss = dungeonLevel % 10 === 0;
    
    let newRewards = { 
      diamonds: diamondReward, 
      experience: expReward,
      items: [] as any[]
    };
    
    // Проверка на находку реликвии (каждые 10 уровней)
    let foundNewRelic = null;
    if (isMajorBoss && Math.random() < 0.3) {
      // Выбираем случайную реликвию
      const availableRelics = relics.filter(relic => 
        !inventory.relics.some(r => r.id === relic.id)
      );
      
      if (availableRelics.length > 0) {
        const relic = availableRelics[Math.floor(Math.random() * availableRelics.length)];
        foundNewRelic = relic;
        newRewards.items.push(relic);
      }
    }
    
    // Начисляем награду
    addDiamonds(newRewards.diamonds);
    addExperience(newRewards.experience);
    
    // Добавляем предметы в инвентарь
    newRewards.items.forEach(item => {
      addItem(item);
    });
    
    // Записываем награды для отображения
    setRewards(newRewards);
    
    // Очищаем уровень подземелья
    clearDungeonLevel();
    
    // Если нашли реликвию, показываем модальное окно
    if (foundNewRelic) {
      setFoundRelic(foundNewRelic);
      setShowRelicModal(true);
    } else {
      // Иначе показываем обычное окно наград
      setShowRewards(true);
    }
    
    // Сбрасываем монстра
    setCurrentMonster(null);
  };
  
  // Выбор подземелья
  const handleSelectDungeon = (dungeon: any) => {
    setSelectedDungeon(dungeon);
  };
  
  // Начало прохождения подземелья
  const handleStartDungeon = () => {
    if (selectedDungeon) {
      startDungeon(selectedDungeon.id);
      setSelectedDungeon(null);
    }
  };
  
  // Выход из подземелья
  const handleExitDungeon = () => {
    exitDungeon();
    setCurrentMonster(null);
    setBattleLog([]);
  };
  
  // Закрытие модального окна с наградами
  const closeRewards = () => {
    setShowRewards(false);
  };
  
  // Закрытие модального окна с реликвией
  const closeRelicModal = () => {
    setShowRelicModal(false);
    setFoundRelic(null);
    setShowRewards(true); // Показываем основные награды после закрытия
  };
  
  // Получение цвета полосы здоровья
  const getHealthColor = (percentage: number) => {
    if (percentage > 50) return "bg-green-500";
    if (percentage > 20) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Подземелье</h2>
      
      {/* Активное подземелье */}
      {currentDungeon ? (
        <div className="space-y-4">
          {/* Информация о текущем подземелье */}
          <div className="card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{currentDungeon.name}</h3>
                <p className="text-sm text-muted-foreground">Уровень: {dungeonLevel}</p>
              </div>
              <button 
                onClick={handleExitDungeon}
                className="button button-outline"
              >
                Выход
              </button>
            </div>
          </div>
          
          {/* Текущий монстр */}
          {currentMonster && (
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{currentMonster.icon}</div>
                  <div>
                    <h3 className="font-semibold">{currentMonster.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {dungeonLevel % 5 === 0 ? "Босс" : "Обычный монстр"}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div>Урон: {currentMonster.damage}</div>
                </div>
              </div>
              
              {/* Здоровье монстра */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Здоровье монстра</span>
                  <span>{monsterHealth}/{currentMonster.health}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getHealthColor((monsterHealth / currentMonster.health) * 100)}`}
                    style={{ width: `${(monsterHealth / currentMonster.health) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Здоровье игрока */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Ваше здоровье</span>
                  <span>{playerHealth}/100</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getHealthColor(playerHealth)}`}
                    style={{ width: `${playerHealth}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Кнопка атаки */}
              <button
                onClick={attackMonster}
                disabled={monsterHealth <= 0 || playerHealth <= 0}
                className={`button w-full ${
                  monsterHealth > 0 && playerHealth > 0
                    ? "button-primary"
                    : "button-outline opacity-50"
                }`}
              >
                Атаковать
              </button>
            </div>
          )}
          
          {/* Боевой журнал */}
          <div className="card">
            <h3 className="font-semibold mb-2">Боевой журнал</h3>
            <div className="max-h-32 overflow-y-auto space-y-1 text-sm">
              {battleLog.map((log, index) => (
                <div key={index} className="py-1 border-b border-border last:border-0">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Выбор подземелья
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-3">Выберите подземелье</h3>
            <div className="space-y-3">
              {dungeons.map((dungeon) => (
                <div
                  key={dungeon.id}
                  className={`card border cursor-pointer transition-all ${
                    selectedDungeon?.id === dungeon.id
                      ? "border-primary border-2"
                      : "hover:border-muted-foreground"
                  } ${dungeon.minClearedDungeons > dungeonsCleared ? "opacity-50" : ""}`}
                  onClick={() => {
                    if (dungeon.minClearedDungeons <= dungeonsCleared) {
                      handleSelectDungeon(dungeon);
                    }
                  }}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{dungeon.icon}</span>
                          <h4 className="font-medium">{dungeon.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {dungeon.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs">
                          Сложность: <span className="font-medium">{dungeon.difficulty}</span>
                        </div>
                        {dungeon.minClearedDungeons > dungeonsCleared && (
                          <div className="text-xs text-secondary">
                            Требуется: {dungeon.minClearedDungeons} подземелий
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {dungeon.minClearedDungeons <= dungeonsCleared && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Входим в подземелье:", dungeon.id, dungeon.name);
                          startDungeon(dungeon.id);
                          console.log("currentDungeon после startDungeon:", useClicker.getState().currentDungeon);
                        }}
                        className="button button-primary w-full mt-2"
                      >
                        Войти в подземелье
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Сохраняем возможность выбора через handleSelectDungeon для будущего расширения функционала */}
          </div>
        </div>
      )}
      
      {/* Модальное окно с наградами */}
      {showRewards && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <h3 className="text-lg font-semibold text-center mb-4">
              Уровень пройден!
            </h3>
            
            <div className="text-center mb-3">
              <div className="text-xl font-semibold">
                {currentDungeon?.name} - Уровень {dungeonLevel}
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="card flex items-center justify-between">
                <span>Получено алмазов:</span>
                <div className="flex items-center gap-1 font-semibold">
                  <span>{rewards.diamonds}</span>
                  <span>💎</span>
                </div>
              </div>
              
              <div className="card flex items-center justify-between">
                <span>Получено опыта:</span>
                <div className="flex items-center gap-1 font-semibold">
                  <span>{rewards.experience}</span>
                  <span>✨</span>
                </div>
              </div>
              
              {rewards.items.length > 0 && !foundRelic && (
                <div className="card">
                  <h4 className="font-medium mb-2">Найденные предметы:</h4>
                  <div className="space-y-2">
                    {rewards.items.map((item: any, index: number) => (
                      <div 
                        key={index} 
                        className={`card ${item.rarityClass} flex items-center gap-3`}
                      >
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <h4 className={`font-medium ${item.textClass}`}>{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={closeRewards}
              className="button button-primary w-full"
            >
              Продолжить
            </button>
          </div>
        </div>
      )}
      
      {/* Модальное окно с реликвией */}
      {showRelicModal && foundRelic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <h3 className="text-lg font-semibold text-center mb-2 text-legendary">
              Легендарная находка!
            </h3>
            
            <div className="text-center mb-4">
              <div className="text-5xl my-3">{foundRelic.icon}</div>
              <h4 className={`text-xl font-bold ${foundRelic.textClass}`}>{foundRelic.name}</h4>
              <p className="text-sm text-muted-foreground mt-2">
                {foundRelic.description}
              </p>
            </div>
            
            <div className="card bg-muted-foreground/10 mb-4">
              <h4 className="font-medium mb-2">Свойства реликвии:</h4>
              <ul className="space-y-1 text-sm">
                {foundRelic.effects.map((effect: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={closeRelicModal}
              className="button button-primary w-full"
            >
              Принять реликвию
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dungeon;

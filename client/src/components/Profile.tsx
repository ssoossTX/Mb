import { useState } from "react";
import { useClicker } from "../lib/stores/useClicker";

// Тип для выбранной категории
type TabType = "info" | "inventory" | "skills";

const Profile = () => {
  const { 
    selectedClass, level, experience, 
    totalClicks, prestige, 
    inventory, skillPoints, skills, upgradeSkill,
    resetGame
  } = useClicker();
  
  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Получаем имя класса
  const getClassName = (): string => {
    switch (selectedClass) {
      case "warrior": return "Воин";
      case "explorer": return "Исследователь";
      case "merchant": return "Торговец";
      default: return "Неизвестно";
    }
  };
  
  // Получаем иконку класса
  const getClassIcon = (): string => {
    switch (selectedClass) {
      case "warrior": return "⚔️";
      case "explorer": return "🧭";
      case "merchant": return "💰";
      default: return "❓";
    }
  };
  
  // Расчет опыта до следующего уровня
  const nextLevelExp = level * 100;
  const expProgress = Math.min((experience / nextLevelExp) * 100, 100);
  
  // Обработчик для сброса игры
  const handleResetGame = () => {
    if (showResetConfirm) {
      resetGame();
      window.location.reload(); // Перезагружаем страницу
    } else {
      setShowResetConfirm(true);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Профиль</h2>
      
      {/* Навигация по вкладкам */}
      <div className="flex rounded-lg overflow-hidden border border-border mb-4">
        <button
          onClick={() => setActiveTab("info")}
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === "info" ? "tab-active" : "tab-inactive"
          }`}
        >
          Инфо
        </button>
        <button
          onClick={() => setActiveTab("inventory")}
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === "inventory" ? "tab-active" : "tab-inactive"
          }`}
        >
          Инвентарь
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === "skills" ? "tab-active" : "tab-inactive"
          }`}
        >
          Навыки
        </button>
      </div>
      
      {/* Информация о игроке */}
      {activeTab === "info" && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 bg-muted rounded-full">
                <span className="text-2xl">{getClassIcon()}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Класс: {getClassName()}</h3>
                <p className="text-sm text-muted-foreground">Уровень {level}</p>
              </div>
            </div>
            
            {/* Прогресс уровня */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Опыт</span>
                <span>{experience}/{nextLevelExp}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${expProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Статистика */}
          <div className="card">
            <h3 className="font-semibold mb-3">Статистика</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Всего кликов:</span>
                <span className="font-medium">{totalClicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Престиж:</span>
                <span className="font-medium">{prestige}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Артефактов:</span>
                <span className="font-medium">{inventory.artifacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Реликвий:</span>
                <span className="font-medium">{inventory.relics.length}</span>
              </div>
            </div>
          </div>
          
          {/* Сброс игры */}
          <div className="card border-2 border-red-500 bg-red-50 dark:bg-red-950/20">
            <h3 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
              <span>⚠️</span> 
              <span>Опасная зона</span>
            </h3>
            <button
              onClick={handleResetGame}
              className={`button w-full ${
                showResetConfirm 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-red-500 hover:bg-red-600"
              } text-white py-3 font-bold`}
            >
              {showResetConfirm ? "⚠️ ПОДТВЕРДИТЬ СБРОС ИГРЫ ⚠️" : "🔄 СБРОСИТЬ ИГРУ"}
            </button>
            {showResetConfirm && (
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/20 rounded-md border border-red-400">
                <p className="text-red-600 font-medium text-center">
                  ВНИМАНИЕ! Все данные игры будут удалены.
                </p>
                <p className="text-xs text-red-500 mt-1 text-center">
                  Это действие невозможно отменить!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Инвентарь */}
      {activeTab === "inventory" && (
        <div className="space-y-4">
          {/* Артефакты */}
          <div className="card">
            <h3 className="font-semibold mb-3">Артефакты ({inventory.artifacts.length})</h3>
            {inventory.artifacts.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {inventory.artifacts.map((artifact, index) => (
                  <div 
                    key={index} 
                    className={`card ${artifact.rarityClass} flex items-center gap-2`}
                  >
                    <div className="text-2xl">{artifact.icon}</div>
                    <div>
                      <h4 className={`text-sm font-medium ${artifact.textClass}`}>{artifact.name}</h4>
                      <p className="text-xs text-muted-foreground">{artifact.shortDescription || artifact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <p>У вас пока нет артефактов</p>
                <p className="text-xs mt-1">Их можно найти в сундуках или экспедициях</p>
              </div>
            )}
          </div>
          
          {/* Реликвии */}
          <div className="card">
            <h3 className="font-semibold mb-3">Реликвии ({inventory.relics.length})</h3>
            {inventory.relics.length > 0 ? (
              <div className="space-y-2">
                {inventory.relics.map((relic, index) => (
                  <div 
                    key={index} 
                    className={`card ${relic.rarityClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{relic.icon}</div>
                      <div>
                        <h4 className={`font-medium ${relic.textClass}`}>{relic.name}</h4>
                        <p className="text-xs text-muted-foreground">{relic.description}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <h5 className="font-medium mb-1">Свойства:</h5>
                      <ul className="space-y-1 text-xs">
                        {relic.effects.map((effect, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="text-primary">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <p>У вас пока нет реликвий</p>
                <p className="text-xs mt-1">Их можно найти в подземельях каждые 10 уровней</p>
              </div>
            )}
          </div>
          
          {/* Скины */}
          <div className="card">
            <h3 className="font-semibold mb-3">Скины ({inventory.skins.length})</h3>
            {inventory.skins.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {inventory.skins.map((skin, index) => (
                  <div 
                    key={index} 
                    className={`card ${skin.rarityClass} flex items-center gap-2`}
                  >
                    <div className="text-2xl">{skin.icon}</div>
                    <div>
                      <h4 className={`text-sm font-medium ${skin.textClass}`}>{skin.name}</h4>
                      <p className="text-xs text-muted-foreground">{skin.shortDescription || skin.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                <p>У вас пока нет скинов</p>
                <p className="text-xs mt-1">Их можно найти в сундуках</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Навыки */}
      {activeTab === "skills" && (
        <div className="space-y-4">
          <div className="card">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Очки навыков</h3>
              <span className="font-bold text-primary">{skillPoints}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Очки навыков можно получить при повышении уровня
            </p>
          </div>
          
          {/* Список навыков */}
          <div className="space-y-3">
            {Object.entries(skills).map(([skillId, skill]) => (
              <div key={skillId} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.icon}</span>
                      <h4 className="font-medium">{skill.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {skill.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs">Уровень: {skill.level}/{skill.maxLevel}</span>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden w-20">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => upgradeSkill(skillId)}
                    disabled={skillPoints <= 0 || skill.level >= skill.maxLevel}
                    className={`button ${
                      skillPoints > 0 && skill.level < skill.maxLevel
                        ? "button-primary"
                        : "button-outline opacity-50"
                    }`}
                  >
                    Улучшить
                  </button>
                </div>
                
                <div className="mt-3 text-xs">
                  <span className="font-medium">Текущий бонус: </span>
                  <span>
                    {skillId === 'clickEfficiency' && `+${skill.level * 5}% к силе клика`}
                    {skillId === 'autoClickEfficiency' && `+${skill.level * 10}% к силе автоклика`}
                    {skillId === 'diamondFinder' && `+${skill.level * 5}% к получаемым алмазам`}
                    {skillId === 'expeditionMaster' && `+${skill.level * 5}% к скорости экспедиций`}
                    {skillId === 'dungeonFighter' && `+${skill.level * 10}% к урону в подземельях`}
                  </span>
                </div>
                
                {skill.level < skill.maxLevel && (
                  <div className="mt-1 text-xs text-primary">
                    <span className="font-medium">Следующий уровень: </span>
                    <span>
                      {skillId === 'clickEfficiency' && `+${(skill.level + 1) * 5}% к силе клика`}
                      {skillId === 'autoClickEfficiency' && `+${(skill.level + 1) * 10}% к силе автоклика`}
                      {skillId === 'diamondFinder' && `+${(skill.level + 1) * 5}% к получаемым алмазам`}
                      {skillId === 'expeditionMaster' && `+${(skill.level + 1) * 5}% к скорости экспедиций`}
                      {skillId === 'dungeonFighter' && `+${(skill.level + 1) * 10}% к урону в подземельях`}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

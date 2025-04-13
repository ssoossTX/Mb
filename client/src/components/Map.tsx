import { useState, useEffect } from "react";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";
import { expeditions } from "../lib/gameData";

const Map = () => {
  const { 
    selectedClass, level, expeditionSlots, activeExpeditions,
    startExpedition, completeExpedition, canStartExpedition,
    diamonds
  } = useClicker();
  const { playSuccess, playHit } = useAudio();
  
  const [selectedExpedition, setSelectedExpedition] = useState<any>(null);
  const [completedResults, setCompletedResults] = useState<any>(null);
  
  // Обновляем таймеры активных экспедиций
  const [, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Фильтруем доступные экспедиции по уровню игрока
  const availableExpeditions = expeditions.filter(exp => exp.levelRequired <= level);
  
  // Обработчик выбора экспедиции
  const handleSelectExpedition = (expedition: any) => {
    setSelectedExpedition(expedition);
  };
  
  // Обработчик начала экспедиции
  const handleStartExpedition = () => {
    if (selectedExpedition && canStartExpedition()) {
      // Начинаем экспедицию
      startExpedition(selectedExpedition);
      
      // Сбрасываем выбранную экспедицию
      setSelectedExpedition(null);
      
      // Проигрываем звук успеха
      playSuccess();
    } else {
      // Проигрываем звук неудачи
      playHit();
    }
  };
  
  // Обработчик завершения экспедиции
  const handleCompleteExpedition = (expeditionId: string) => {
    const results = completeExpedition(expeditionId);
    setCompletedResults(results);
    playSuccess();
  };
  
  // Форматирование оставшегося времени
  const formatTimeLeft = (endTime: number) => {
    const now = Date.now();
    const timeLeft = Math.max(0, endTime - now);
    
    if (timeLeft <= 0) return "Завершено";
    
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Модификатор времени для исследователя
  const getTimeModifier = () => {
    return selectedClass === "explorer" ? "-20% к времени" : "";
  };
  
  // Модификатор награды для исследователя
  const getRewardModifier = () => {
    return selectedClass === "explorer" ? "+15% к награде" : "";
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Карта</h2>
      
      {/* Информация о ресурсах и слотах */}
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">💎</span>
            <span className="font-semibold">{diamonds.toLocaleString()} алмазов</span>
          </div>
          <div className="text-sm">
            Слоты экспедиций: {activeExpeditions.length}/{expeditionSlots}
          </div>
        </div>
      </div>
      
      {/* Активные экспедиции */}
      {activeExpeditions.length > 0 && (
        <div className="card">
          <h3 className="font-semibold mb-3">Активные экспедиции</h3>
          <div className="space-y-3">
            {activeExpeditions.map((expedition) => {
              const isComplete = expedition.endTime <= Date.now();
              
              return (
                <div key={`active-${expedition.id}-${expedition.endTime}`} className="card border">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{expedition.icon}</span>
                        <h4 className="font-medium">{expedition.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {expedition.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium ${isComplete ? "text-primary" : ""}`}>
                        {formatTimeLeft(expedition.endTime)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Награда: {expedition.diamondReward} 💎
                      </div>
                    </div>
                  </div>
                  
                  {isComplete && (
                    <button
                      onClick={() => handleCompleteExpedition(expedition.id)}
                      className="button button-primary w-full mt-3"
                    >
                      Забрать награду
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Доступные экспедиции */}
      <div className="card">
        <h3 className="font-semibold mb-3">Доступные экспедиции</h3>
        {availableExpeditions.length > 0 ? (
          <div className="space-y-3">
            {availableExpeditions.map((expedition) => (
              <div 
                key={`available-${expedition.id}`} 
                className={`card border cursor-pointer transition-all ${
                  selectedExpedition?.id === expedition.id
                    ? "border-primary border-2"
                    : "hover:border-muted-foreground"
                }`}
                onClick={() => handleSelectExpedition(expedition)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{expedition.icon}</span>
                      <h4 className="font-medium">{expedition.name}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {expedition.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs flex items-center gap-1 justify-end">
                      <span>⏱️</span>
                      <span>{Math.round(expedition.duration / 60000)} мин</span>
                      <span className="text-primary text-xs">{getTimeModifier()}</span>
                    </div>
                    <div className="text-xs flex items-center gap-1 justify-end mt-1">
                      <span>💎</span>
                      <span>{expedition.diamondReward}</span>
                      <span className="text-primary text-xs">{getRewardModifier()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            <p>Повысьте уровень для открытия новых экспедиций</p>
          </div>
        )}
        
        {/* Кнопка начала экспедиции */}
        {selectedExpedition && (
          <button
            onClick={handleStartExpedition}
            disabled={!canStartExpedition()}
            className={`button w-full mt-4 ${
              canStartExpedition() ? "button-primary" : "button-outline opacity-50"
            }`}
          >
            Начать экспедицию
          </button>
        )}
      </div>
      
      {/* Модальное окно с результатами экспедиции */}
      {completedResults && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <h3 className="text-lg font-semibold text-center mb-4">
              Экспедиция завершена!
            </h3>
            
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">{completedResults.expedition.icon}</div>
              <h4 className="font-medium">{completedResults.expedition.name}</h4>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="card flex items-center justify-between">
                <span>Получено алмазов:</span>
                <div className="flex items-center gap-1 font-semibold">
                  <span>{completedResults.diamonds}</span>
                  <span>💎</span>
                </div>
              </div>
              
              <div className="card flex items-center justify-between">
                <span>Получено опыта:</span>
                <div className="flex items-center gap-1 font-semibold">
                  <span>{completedResults.experience}</span>
                  <span>✨</span>
                </div>
              </div>
              
              {completedResults.items.length > 0 && (
                <div className="card">
                  <h4 className="font-medium mb-2">Найденные предметы:</h4>
                  <div className="space-y-2">
                    {completedResults.items.map((item: any, index: number) => (
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
              onClick={() => setCompletedResults(null)}
              className="button button-primary w-full"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;

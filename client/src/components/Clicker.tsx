import { useState, useEffect, useRef } from "react";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";

const Clicker = () => {
  const { 
    clicks, clickPower, addClicks, addClickFromAuto, 
    prestigeThreshold, prestige, canPrestige, performPrestige,
    showPrestigeWarning, setShowPrestigeWarning
  } = useClicker();
  
  const { playHit, playSuccess, isMuted } = useAudio();
  
  // Для создания визуальных эффектов при клике
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isClicking, setIsClicking] = useState(false);
  const nextClickId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Обработчик клика
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Добавляем клики в общий счет
    addClicks(clickPower);
    
    // Воспроизводим звук клика
    playHit();
    
    // Создаем эффект клика
    if (containerRef.current && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Вычисляем позицию клика относительно контейнера
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;
      
      // Добавляем эффект к списку
      setClickEffects(prev => [
        ...prev,
        { id: nextClickId.current++, x, y }
      ]);
    }
    
    // Активируем визуальный эффект нажатия
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);
  };
  
  // Удаляем эффекты кликов после анимации
  useEffect(() => {
    if (clickEffects.length > 0) {
      const timer = setTimeout(() => {
        setClickEffects(effects => effects.slice(1));
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [clickEffects]);
  
  // Настраиваем автоклик
  useEffect(() => {
    const intervalId = setInterval(() => {
      addClickFromAuto();
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [addClickFromAuto]);
  
  // Прогресс до престижа
  const prestigeProgress = Math.min((clicks / prestigeThreshold) * 100, 100);
  
  // Обработчик престижа
  const handlePrestige = () => {
    if (canPrestige) {
      if (showPrestigeWarning) {
        // Показываем предупреждение перед первым престижем
        setShowPrestigeWarning(false);
      } else {
        // Выполняем престиж
        performPrestige();
        playSuccess();
      }
    }
  };
  
  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      {/* Счетчик кликов */}
      <div className="card mb-4 text-center">
        <span className="text-3xl font-bold">{clicks.toLocaleString()}</span>
        <span className="text-sm text-muted-foreground block mt-1">кликов</span>
      </div>
      
      {/* Кнопка кликера */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <button
          ref={buttonRef}
          className={`clicker-button ${isClicking ? 'scale-95' : ''}`}
          onClick={handleClick}
          style={{ 
            animation: !isMuted ? 'pulse 1.5s infinite' : 'none'
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 100 100" className="fill-white">
              <use href="/src/assets/orb.svg#orb" />
            </svg>
            <span className="text-white font-semibold mt-2">+{clickPower}</span>
          </div>
          
          {/* Пульсация при клике */}
          {isClicking && <div className="clicker-ripple" />}
        </button>
        
        {/* Эффекты кликов */}
        {clickEffects.map(effect => (
          <div 
            key={effect.id}
            className="absolute text-white text-lg font-bold pointer-events-none animate-float"
            style={{ 
              left: effect.x, 
              top: effect.y, 
              transform: 'translate(-50%, -50%)',
              opacity: 0
            }}
          >
            +{clickPower}
          </div>
        ))}
      </div>
      
      {/* Секция престижа */}
      <div className="mt-6">
        {/* Прогресс до престижа */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Прогресс престижа</span>
            <span>{Math.floor(prestigeProgress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${prestigeProgress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Кнопка престижа */}
        <button
          onClick={handlePrestige}
          disabled={!canPrestige}
          className={`button w-full ${
            canPrestige ? 'button-secondary' : 'button-outline opacity-50'
          }`}
        >
          {showPrestigeWarning && canPrestige
            ? "Подтвердить Перерождение"
            : `Перерождение (Престиж ${prestige + 1})`}
        </button>
        
        {showPrestigeWarning && canPrestige && (
          <p className="text-xs text-secondary mt-2 text-center">
            Внимание! При перерождении вы потеряете все клики и улучшения, 
            но получите постоянный бонус к силе клика!
          </p>
        )}
        
        {!canPrestige && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Необходимо набрать {prestigeThreshold.toLocaleString()} кликов для перерождения
          </p>
        )}
      </div>
    </div>
  );
};

export default Clicker;

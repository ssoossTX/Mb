import { useState, useEffect } from "react";
import { useGame } from "../lib/stores/useGame";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";

type ClassType = "warrior" | "explorer" | "merchant";

const ClassSelection = () => {
  const { phase, start } = useGame();
  const { selectClass } = useClicker();
  const { playSuccess, toggleMute, isMuted } = useAudio();
  
  // Добавляем отладочный лог при монтировании компонента
  useEffect(() => {
    console.log("ClassSelection mounted, game phase:", phase);
  }, [phase]);

  // Функция для непосредственного выбора класса и начала игры
  const selectClassAndStartGame = (classType: ClassType) => {
    try {
      console.log("Прямой выбор класса:", classType);
      
      // Устанавливаем класс
      selectClass(classType);
      
      // Проверяем, что класс был установлен
      const classSelected = useClicker.getState().selectedClass;
      const hasClassSelected = useClicker.getState().hasSelectedClass;
      console.log("Класс установлен:", classSelected);
      console.log("hasSelectedClass:", hasClassSelected);
      
      // Воспроизводим звук
      playSuccess();
      
      // Запускаем игру
      start();
      
      // Проверяем фазу игры
      console.log("Игра запущена, фаза:", useGame.getState().phase);
    } catch (error) {
      console.error("Ошибка при выборе класса и запуске игры:", error);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Великий Кликер</h1>
        
        <div className="flex justify-end mb-4">
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-muted"
            aria-label={isMuted ? "Включить звук" : "Выключить звук"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-6">Выберите класс персонажа</h2>
          
          {/* Класс: Воин */}
          <div className="card p-4 mb-4 border-2 border-primary/20 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">⚔️</div>
              <div>
                <h3 className="font-bold">Воин</h3>
                <p className="text-sm text-muted-foreground">Мастер силы и боевых искусств</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Бонусы:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> +25% к силе клика
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> +10% к урону в подземельях
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> Начальный бонус: +5 к силе клика
                </li>
              </ul>
            </div>
            
            <button 
              onClick={() => selectClassAndStartGame("warrior")}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-md"
            >
              Выбрать Воина
            </button>
          </div>
          
          {/* Класс: Исследователь */}
          <div className="card p-4 mb-4 border-2 border-primary/20 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">🧭</div>
              <div>
                <h3 className="font-bold">Исследователь</h3>
                <p className="text-sm text-muted-foreground">Любознательный искатель приключений</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Бонусы:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> -20% к времени экспедиций
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> +15% к награде за экспедиции
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> Начальный бонус: Открыта первая экспедиция
                </li>
              </ul>
            </div>
            
            <button 
              onClick={() => selectClassAndStartGame("explorer")}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-md"
            >
              Выбрать Исследователя
            </button>
          </div>
          
          {/* Класс: Торговец */}
          <div className="card p-4 mb-4 border-2 border-primary/20 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="font-bold">Торговец</h3>
                <p className="text-sm text-muted-foreground">Опытный делец и коллекционер</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Бонусы:</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> +10% к шансу редких находок
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> -15% к ценам в магазине
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-primary">•</span> Начальный бонус: +50 алмазов
                </li>
              </ul>
            </div>
            
            <button 
              onClick={() => selectClassAndStartGame("merchant")}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors shadow-md"
            >
              Выбрать Торговца
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Выберите класс персонажа, нажав на одну из кнопок выше
        </p>
      </div>
    </div>
  );
};

export default ClassSelection;
import { useState, useEffect } from "react";
import { useGame } from "../lib/stores/useGame";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";

type ClassType = "warrior" | "explorer" | "merchant";

// Информация о классах
const classInfo = [
  {
    type: "warrior" as ClassType,
    name: "Воин",
    icon: "⚔️",
    description: "Мастер силы и боевых искусств",
    color: "bg-red-600 hover:bg-red-700",
    bonuses: [
      "+25% к силе клика",
      "+10% к урону в подземельях",
      "Начальный бонус: +5 к силе клика"
    ]
  },
  {
    type: "explorer" as ClassType,
    name: "Исследователь",
    icon: "🧭",
    description: "Любознательный искатель приключений",
    color: "bg-blue-600 hover:bg-blue-700",
    bonuses: [
      "-20% к времени экспедиций",
      "+15% к награде за экспедиции",
      "Начальный бонус: Открыта первая экспедиция"
    ]
  },
  {
    type: "merchant" as ClassType,
    name: "Торговец",
    icon: "💰",
    description: "Опытный делец и коллекционер",
    color: "bg-green-600 hover:bg-green-700",
    bonuses: [
      "+10% к шансу редких находок",
      "-15% к ценам в магазине",
      "Начальный бонус: +50 алмазов"
    ]
  }
];

const ClassSelection = () => {
  const { phase, start } = useGame();
  const { selectClass } = useClicker();
  const { playSuccess, toggleMute, isMuted } = useAudio();
  const [currentClassIndex, setCurrentClassIndex] = useState(0);
  
  // Добавляем отладочный лог при монтировании компонента
  useEffect(() => {
    console.log("ClassSelection mounted, game phase:", phase);
  }, [phase]);
  
  // Функции для навигации по классам
  const nextClass = () => {
    setCurrentClassIndex((prevIndex) => (prevIndex + 1) % classInfo.length);
  };
  
  const prevClass = () => {
    setCurrentClassIndex((prevIndex) => (prevIndex - 1 + classInfo.length) % classInfo.length);
  };

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
          
          {/* Навигация между классами */}
          <div className="flex justify-center items-center gap-4 mb-4">
            <button 
              className="p-3 rounded-full bg-muted hover:bg-muted-foreground/20 text-lg"
              onClick={prevClass}
              aria-label="Предыдущий класс"
            >
              ◀️
            </button>
            
            <div className="text-center font-medium">
              {currentClassIndex + 1} / {classInfo.length}
            </div>
            
            <button 
              className="p-3 rounded-full bg-muted hover:bg-muted-foreground/20 text-lg"
              onClick={nextClass}
              aria-label="Следующий класс"
            >
              ▶️
            </button>
          </div>
          
          {/* Текущий класс */}
          <div className="card p-6 mb-4 border-2 border-primary/20 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">{classInfo[currentClassIndex].icon}</div>
              <div>
                <h3 className="font-bold text-xl">{classInfo[currentClassIndex].name}</h3>
                <p className="text-muted-foreground">{classInfo[currentClassIndex].description}</p>
              </div>
            </div>
            
            <div className="mb-5">
              <p className="font-semibold mb-2">Бонусы:</p>
              <ul className="space-y-2">
                {classInfo[currentClassIndex].bonuses.map((bonus, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-primary">•</span> {bonus}
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              onClick={() => selectClassAndStartGame(classInfo[currentClassIndex].type)}
              className={`w-full py-3 ${classInfo[currentClassIndex].color} text-white font-bold rounded-lg transition-colors shadow-md`}
            >
              Выбрать {classInfo[currentClassIndex].name}
            </button>
          </div>
          
          {/* Индикатор текущего класса */}
          <div className="flex justify-center gap-2 mt-4">
            {classInfo.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentClassIndex ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => setCurrentClassIndex(index)}
                aria-label={`Перейти к классу ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Листайте для просмотра других классов ◀️ ▶️
        </p>
      </div>
    </div>
  );
};

export default ClassSelection;
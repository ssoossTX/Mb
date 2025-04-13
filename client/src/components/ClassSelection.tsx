import { useState, useEffect } from "react";
import { useGame } from "../lib/stores/useGame";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";

type ClassType = "warrior" | "explorer" | "merchant";

interface ClassInfo {
  id: ClassType;
  name: string;
  description: string;
  bonuses: string[];
  icon: string;
}

const ClassSelection = () => {
  const { phase, start } = useGame();
  const { selectClass } = useClicker();
  const { playSuccess, toggleMute, isMuted } = useAudio();
  const [selectedClassId, setSelectedClassId] = useState<ClassType | null>(null);

  // Добавляем отладочный лог при монтировании компонента
  useEffect(() => {
    console.log("ClassSelection mounted, game phase:", phase);
  }, [phase]);

  // Данные о классах
  const classes: ClassInfo[] = [
    {
      id: "warrior",
      name: "Воин",
      description: "Мастер силы и боевых искусств",
      bonuses: [
        "+25% к силе клика",
        "+10% к урону в подземельях",
        "Начальный бонус: +5 к силе клика"
      ],
      icon: "⚔️"
    },
    {
      id: "explorer",
      name: "Исследователь",
      description: "Любознательный искатель приключений",
      bonuses: [
        "-20% к времени экспедиций",
        "+15% к награде за экспедиции",
        "Начальный бонус: Открыта первая экспедиция"
      ],
      icon: "🧭"
    },
    {
      id: "merchant",
      name: "Торговец",
      description: "Опытный делец и коллекционер",
      bonuses: [
        "+10% к шансу редких находок",
        "-15% к ценам в магазине",
        "Начальный бонус: +50 алмазов"
      ],
      icon: "💰"
    }
  ];

  // Выбор класса
  const handleClassSelect = (classId: ClassType) => {
    console.log("Выбран класс:", classId);
    setSelectedClassId(classId);
  };

  // Подтверждение выбора класса
  const confirmClassSelection = () => {
    console.log("Нажата кнопка 'Начать игру', выбранный класс:", selectedClassId);
    if (selectedClassId) {
      selectClass(selectedClassId);
      console.log("Класс выбран, запуск игры");
      playSuccess();
      start();
      console.log("Игра запущена, новая фаза:", useGame.getState().phase);
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

        <div className="card mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">Выберите класс</h2>
          
          <div className="grid gap-4">
            {classes.map((classInfo) => {
              // Создаем специальную функцию для обработки клика для каждого класса
              function onClassCardClick() {
                console.log("Клик по классу", classInfo.id);
                handleClassSelect(classInfo.id);
              }
              
              // Определяем классы для стилизации
              const isSelected = selectedClassId === classInfo.id;
              const cardClasses = `card cursor-pointer transition-all p-4 border-2 ${
                isSelected ? "border-primary bg-primary/10" : "border-transparent hover:border-muted-foreground"
              }`;
              
              return (
                <div
                  key={classInfo.id}
                  className={cardClasses}
                  onClick={onClassCardClick}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{classInfo.icon}</div>
                    <div>
                      <h3 className="font-bold">{classInfo.name}</h3>
                      <p className="text-sm text-muted-foreground">{classInfo.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm font-semibold mb-1">Бонусы:</p>
                    <ul className="text-xs space-y-1">
                      {classInfo.bonuses.map((bonus, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-primary">•</span> {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={confirmClassSelection}
          disabled={!selectedClassId}
          className={`button button-primary w-full py-3 text-lg ${
            !selectedClassId ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Начать игру
        </button>
      </div>
    </div>
  );
};

export default ClassSelection;

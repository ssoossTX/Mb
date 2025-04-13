import { useState } from "react";
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
  const { start } = useGame();
  const { selectClass } = useClicker();
  const { playSuccess, toggleMute, isMuted } = useAudio();
  const [selectedClassId, setSelectedClassId] = useState<ClassType | null>(null);

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
    setSelectedClassId(classId);
  };

  // Подтверждение выбора класса
  const confirmClassSelection = () => {
    if (selectedClassId) {
      selectClass(selectedClassId);
      playSuccess();
      start();
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
            {classes.map((classInfo) => (
              <div
                key={classInfo.id}
                className={`card cursor-pointer transition-all ${
                  selectedClassId === classInfo.id
                    ? "border-primary border-2"
                    : "hover:border-muted-foreground"
                }`}
                onClick={() => handleClassSelect(classInfo.id)}
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
            ))}
          </div>
        </div>

        <button
          onClick={confirmClassSelection}
          disabled={!selectedClassId}
          className={`button button-primary w-full ${
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

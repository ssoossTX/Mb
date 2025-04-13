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
      // Применяем более явный подход с прямым вызовом функций
      try {
        // Шаг 1: Выберем класс
        selectClass(selectedClassId);
        console.log("Класс выбран:", useClicker.getState().selectedClass);
        console.log("hasSelectedClass:", useClicker.getState().hasSelectedClass);
        
        // Шаг 2: Воспроизведём звук
        playSuccess();
        
        // Шаг 3: Запустим игру
        start();
        
        // Шаг 4: Проверим, что игра запустилась
        console.log("Игра запущена, новая фаза:", useGame.getState().phase);
      } catch (error) {
        console.error("Ошибка при выборе класса:", error);
      }
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
            {/* Карточка класса Воин */}
            <div
              className={`card cursor-pointer transition-all p-4 border-2 ${
                selectedClassId === "warrior" ? "border-primary bg-primary/10" : "border-transparent hover:border-muted-foreground"
              }`}
              onClick={() => {
                console.log("Выбран класс Воин");
                setSelectedClassId("warrior");
              }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚔️</div>
                <div>
                  <h3 className="font-bold">Воин</h3>
                  <p className="text-sm text-muted-foreground">Мастер силы и боевых искусств</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-semibold mb-1">Бонусы:</p>
                <ul className="text-xs space-y-1">
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
            </div>
            
            {/* Карточка класса Исследователь */}
            <div
              className={`card cursor-pointer transition-all p-4 border-2 ${
                selectedClassId === "explorer" ? "border-primary bg-primary/10" : "border-transparent hover:border-muted-foreground"
              }`}
              onClick={() => {
                console.log("Выбран класс Исследователь");
                setSelectedClassId("explorer");
              }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🧭</div>
                <div>
                  <h3 className="font-bold">Исследователь</h3>
                  <p className="text-sm text-muted-foreground">Любознательный искатель приключений</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-semibold mb-1">Бонусы:</p>
                <ul className="text-xs space-y-1">
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
            </div>
            
            {/* Карточка класса Торговец */}
            <div
              className={`card cursor-pointer transition-all p-4 border-2 ${
                selectedClassId === "merchant" ? "border-primary bg-primary/10" : "border-transparent hover:border-muted-foreground"
              }`}
              onClick={() => {
                console.log("Выбран класс Торговец");
                setSelectedClassId("merchant");
              }}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">💰</div>
                <div>
                  <h3 className="font-bold">Торговец</h3>
                  <p className="text-sm text-muted-foreground">Опытный делец и коллекционер</p>
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-semibold mb-1">Бонусы:</p>
                <ul className="text-xs space-y-1">
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
            </div>
          </div>
        </div>

        <button
          onClick={confirmClassSelection}
          disabled={!selectedClassId}
          className={`mt-4 flex items-center justify-center w-full py-4 text-lg font-bold rounded-lg transition-all 
          ${selectedClassId 
            ? "bg-primary text-white shadow-lg hover:bg-primary-foreground active:scale-95" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          style={{border: '2px solid', borderColor: selectedClassId ? 'var(--color-primary)' : 'transparent'}}
        >
          {selectedClassId ? '🚀 Начать игру' : 'Выберите класс'}
        </button>
      </div>
    </div>
  );
};

export default ClassSelection;

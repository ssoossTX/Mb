import { useEffect, useState } from "react";
import { useAudio } from "./lib/stores/useAudio";
import { useGame } from "./lib/stores/useGame";
import { useClicker } from "./lib/stores/useClicker";
import GameAudio from "./components/GameAudio";
import ClassSelection from "./components/ClassSelection";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Clicker from "./components/Clicker";
import Upgrades from "./components/Upgrades";
import Shop from "./components/Shop";
import Map from "./components/Map";
import Dungeon from "./components/Dungeon";
import Profile from "./components/Profile";

// Главный компонент приложения
function App() {
  // Инициализация игровых состояний
  const { phase, start } = useGame();
  const { selectedClass, hasSelectedClass } = useClicker();
  
  // Локальное состояние для активной вкладки
  const [activeTab, setActiveTab] = useState<string>("clicker");
  
  // Инициализация звуков при загрузке
  useEffect(() => {
    // Создаем аудио элементы
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    
    const hitSound = new Audio("/sounds/hit.mp3");
    hitSound.volume = 0.4;
    
    const successSound = new Audio("/sounds/success.mp3");
    successSound.volume = 0.5;
    
    // Устанавливаем звуки в глобальное состояние
    useAudio.getState().setBackgroundMusic(bgMusic);
    useAudio.getState().setHitSound(hitSound);
    useAudio.getState().setSuccessSound(successSound);
    
    // Загружаем сохраненную игру из localStorage при старте
    const savedGame = localStorage.getItem("clickerGameSave");
    if (savedGame) {
      const gameData = JSON.parse(savedGame);
      useClicker.getState().loadGame(gameData);
      
      // Если класс уже выбран, запускаем игру
      if (gameData.selectedClass) {
        start();
      }
    }
    
    // Настраиваем автосохранение игры каждые 10 секунд
    const saveInterval = setInterval(() => {
      const gameState = useClicker.getState().saveGame();
      localStorage.setItem("clickerGameSave", JSON.stringify(gameState));
    }, 10000);
    
    return () => {
      clearInterval(saveInterval);
    };
  }, []);
  
  // Рендерим интерфейс в зависимости от состояния игры
  return (
    <div className="page-container bg-background text-foreground">
      <GameAudio />
      
      {/* Экран выбора класса */}
      {!hasSelectedClass && phase === "ready" && (
        <ClassSelection />
      )}
      
      {/* Основной игровой интерфейс */}
      {hasSelectedClass && (
        <>
          <Header />
          
          <main className="content-area">
            {activeTab === "clicker" && <Clicker />}
            {activeTab === "upgrades" && <Upgrades />}
            {activeTab === "shop" && <Shop />}
            {activeTab === "map" && <Map />}
            {activeTab === "dungeon" && <Dungeon />}
            {activeTab === "profile" && <Profile />}
          </main>
          
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      )}
    </div>
  );
}

export default App;

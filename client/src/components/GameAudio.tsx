import { useEffect } from "react";
import { useAudio } from "../lib/stores/useAudio";

/**
 * Компонент, управляющий аудиосистемой игры
 */
const GameAudio = () => {
  const { backgroundMusic, isMuted, toggleMute } = useAudio();
  
  // Настраиваем горячие клавиши для звука
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Клавиша "M" включает/выключает звук
      if (e.code === "KeyM") {
        toggleMute();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMute]);

  // Управляем воспроизведением фоновой музыки
  useEffect(() => {
    if (!backgroundMusic) return;
    
    if (isMuted) {
      backgroundMusic.pause();
    } else {
      // Пытаемся воспроизвести музыку (браузеры могут блокировать без взаимодействия)
      const playPromise = backgroundMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Автоматическое воспроизведение заблокировано:", error);
        });
      }
    }
    
    return () => {
      backgroundMusic.pause();
    };
  }, [backgroundMusic, isMuted]);

  // Этот компонент не рендерит видимый UI
  return null;
};

export default GameAudio;

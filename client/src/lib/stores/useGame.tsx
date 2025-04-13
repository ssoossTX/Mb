import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type GamePhase = "ready" | "playing" | "ended";

interface GameState {
  phase: GamePhase;
  
  // Actions
  start: () => void;
  restart: () => void;
  end: () => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    phase: "ready",
    
    start: () => {
      console.log("Вызвана функция start() в useGame");
      set(() => {
        console.log("Переключение фазы игры на playing");
        return { phase: "playing" };
      });
    },
    
    restart: () => {
      console.log("Вызвана функция restart() в useGame");
      set(() => ({ phase: "ready" }));
    },
    
    end: () => {
      console.log("Вызвана функция end() в useGame");
      set(() => ({ phase: "ended" }));
    }
  }))
);

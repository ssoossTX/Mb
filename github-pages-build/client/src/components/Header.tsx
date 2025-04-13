import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";

const Header = () => {
  const { clicks, diamonds, prestige, clickPower, autoClickPower } = useClicker();
  const { isMuted, toggleMute } = useAudio();

  // Форматирование больших чисел
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'М';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'К';
    }
    return num.toString();
  };

  return (
    <header className="bg-card shadow-md border-b border-border">
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Основные ресурсы */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-sm">👆</span>
              <span className="text-sm font-semibold">{formatNumber(clicks)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm">💎</span>
              <span className="text-sm font-semibold">{formatNumber(diamonds)}</span>
            </div>
          </div>

          {/* Престиж уровень */}
          <div className="px-2 py-1 bg-accent rounded-md">
            <span className="text-xs font-medium text-accent-foreground">
              ✨ {prestige}
            </span>
          </div>
        </div>

        {/* Правая сторона с силой клика и звуком */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Клик:</span>
              <span className="text-xs font-semibold">{clickPower}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Авто:</span>
              <span className="text-xs font-semibold">{autoClickPower}/с</span>
            </div>
          </div>

          {/* Кнопка звука */}
          <button 
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-muted"
            aria-label={isMuted ? "Включить звук" : "Выключить звук"}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

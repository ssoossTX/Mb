import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";

const Upgrades = () => {
  const { 
    clicks, diamonds,
    clickPower, clickLevel, clickCost, upgradeClickPower,
    autoClickPower, autoClickLevel, autoClickCost, upgradeAutoClickPower,
    autoClickSpeed, autoClickSpeedLevel, autoClickSpeedCost, upgradeAutoClickSpeed,
    canAffordUpgrade
  } = useClicker();
  
  const { playSuccess } = useAudio();
  
  // Форматирование больших чисел
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'М';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'К';
    }
    return num.toString();
  };

  // Обработчики улучшений
  const handleUpgradeClick = (type: string) => {
    switch (type) {
      case "click":
        if (canAffordUpgrade("click")) {
          upgradeClickPower();
          playSuccess();
        }
        break;
      case "autoClick":
        if (canAffordUpgrade("autoClick")) {
          upgradeAutoClickPower();
          playSuccess();
        }
        break;
      case "autoClickSpeed":
        if (canAffordUpgrade("autoClickSpeed")) {
          upgradeAutoClickSpeed();
          playSuccess();
        }
        break;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Улучшения</h2>
      
      {/* Информация о ресурсах */}
      <div className="card mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">👆</span>
            <span className="font-semibold">{formatNumber(clicks)} кликов</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">💎</span>
            <span className="font-semibold">{formatNumber(diamonds)} алмазов</span>
          </div>
        </div>
      </div>
      
      {/* Улучшение силы клика */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">Сила Клика</h3>
            <p className="text-sm text-muted-foreground">
              Увеличивает количество кликов за одно нажатие
            </p>
            <div className="mt-2">
              <div className="text-sm">Текущий уровень: <span className="font-medium">{clickLevel}</span></div>
              <div className="text-sm">Сила клика: <span className="font-medium">{clickPower}</span></div>
              <div className="text-sm text-primary font-medium">
                Следующий уровень: +{Math.ceil(clickPower * 0.2)} к силе клика
              </div>
            </div>
          </div>
          <button
            onClick={() => handleUpgradeClick("click")}
            disabled={!canAffordUpgrade("click")}
            className={`button whitespace-nowrap ${
              canAffordUpgrade("click") ? "button-primary" : "button-outline opacity-50"
            }`}
          >
            Улучшить
            <div className="text-xs flex items-center gap-1 mt-1">
              <span>👆</span>
              <span>{formatNumber(clickCost)}</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Улучшение автоклика */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">Сила Автоклика</h3>
            <p className="text-sm text-muted-foreground">
              Увеличивает количество кликов, получаемых автоматически
            </p>
            <div className="mt-2">
              <div className="text-sm">Текущий уровень: <span className="font-medium">{autoClickLevel}</span></div>
              <div className="text-sm">Сила автоклика: <span className="font-medium">{autoClickPower}/сек</span></div>
              <div className="text-sm text-primary font-medium">
                Следующий уровень: +{Math.ceil(autoClickPower * 0.3)} к автоклику
              </div>
            </div>
          </div>
          <button
            onClick={() => handleUpgradeClick("autoClick")}
            disabled={!canAffordUpgrade("autoClick")}
            className={`button whitespace-nowrap ${
              canAffordUpgrade("autoClick") ? "button-primary" : "button-outline opacity-50"
            }`}
          >
            Улучшить
            <div className="text-xs flex items-center gap-1 mt-1">
              <span>👆</span>
              <span>{formatNumber(autoClickCost)}</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Улучшение скорости автоклика */}
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">Скорость Автоклика</h3>
            <p className="text-sm text-muted-foreground">
              Уменьшает время между автоматическими кликами
            </p>
            <div className="mt-2">
              <div className="text-sm">Текущий уровень: <span className="font-medium">{autoClickSpeedLevel}</span></div>
              <div className="text-sm">Интервал: <span className="font-medium">{autoClickSpeed/1000}сек</span></div>
              <div className="text-sm text-primary font-medium">
                Следующий уровень: -{Math.min(100, autoClickSpeed * 0.1)}мс к интервалу
              </div>
            </div>
          </div>
          <button
            onClick={() => handleUpgradeClick("autoClickSpeed")}
            disabled={!canAffordUpgrade("autoClickSpeed")}
            className={`button whitespace-nowrap ${
              canAffordUpgrade("autoClickSpeed") ? "button-primary" : "button-outline opacity-50"
            }`}
          >
            Улучшить
            <div className="text-xs flex items-center gap-1 mt-1">
              <span>💎</span>
              <span>{formatNumber(autoClickSpeedCost)}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upgrades;

import { useState } from "react";
import { useClicker } from "../lib/stores/useClicker";
import { useAudio } from "../lib/stores/useAudio";
import { treasureChests } from "../lib/gameData";

const Shop = () => {
  const { diamonds, spendDiamonds, addRandomItem } = useClicker();
  const { playSuccess, playHit } = useAudio();
  const [openedChest, setOpenedChest] = useState<any>(null);
  
  // Группируем сундуки по категориям
  const chestCategories = Object.entries(
    treasureChests.reduce((acc: any, chest) => {
      if (!acc[chest.category]) acc[chest.category] = [];
      acc[chest.category].push(chest);
      return acc;
    }, {})
  );
  
  // Функция покупки сундука
  const buyChest = (chest: any) => {
    if (diamonds >= chest.price) {
      // Списываем алмазы
      spendDiamonds(chest.price);
      
      // Добавляем предметы из сундука
      const items = addRandomItem(chest);
      
      // Устанавливаем открытый сундук
      setOpenedChest({
        chest,
        items
      });
      
      // Проигрываем звук успеха
      playSuccess();
    } else {
      // Проигрываем звук неудачи
      playHit();
    }
  };
  
  // Закрытие диалога с сундуком
  const closeChestDialog = () => {
    setOpenedChest(null);
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center mb-4">Магазин</h2>
      
      {/* Информация о ресурсах */}
      <div className="card mb-4">
        <div className="flex justify-center items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💎</span>
            <span className="font-semibold">{diamonds.toLocaleString()} алмазов</span>
          </div>
        </div>
      </div>
      
      {/* Категории сундуков */}
      <div className="space-y-6">
        {chestCategories.map(([category, chests]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3">{category}</h3>
            <div className="grid grid-cols-2 gap-3">
              {(chests as any[]).map((chest) => (
                <div
                  key={chest.id}
                  className={`card cursor-pointer hover:shadow-lg transition-all duration-200 ${chest.rarityClass}`}
                  onClick={() => buyChest(chest)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{chest.icon}</div>
                    <h4 className={`font-medium text-sm mb-1 ${chest.textClass}`}>
                      {chest.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {chest.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium">
                      <span>💎</span>
                      <span>{chest.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Модальное окно с результатами открытия сундука */}
      {openedChest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md">
            <h3 className="text-lg font-semibold text-center mb-4">
              {openedChest.chest.name} открыт!
            </h3>
            
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">{openedChest.chest.icon}</div>
            </div>
            
            <div className="space-y-3 mb-4">
              {openedChest.items.map((item: any, index: number) => (
                <div 
                  key={index} 
                  className={`card ${item.rarityClass} flex items-center gap-3`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h4 className={`font-medium ${item.textClass}`}>{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={closeChestDialog}
              className="button button-primary w-full"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;

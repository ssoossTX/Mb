import { FC } from "react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "clicker", name: "Кликер", icon: "👆" },
    { id: "upgrades", name: "Улучшения", icon: "⚡" },
    { id: "shop", name: "Магазин", icon: "🛒" },
    { id: "map", name: "Карта", icon: "🗺️" },
    { id: "dungeon", name: "Подземелье", icon: "🏰" },
    { id: "profile", name: "Профиль", icon: "👤" },
  ];

  return (
    <nav className="bg-card shadow-inner border-t border-border">
      <div className="grid grid-cols-6 h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center h-full transition-colors ${
              activeTab === tab.id
                ? "text-primary border-t-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-xs font-medium mt-0.5">{tab.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;


class Game {
    constructor() {
        this.gold = 0;
        this.level = 1;
        this.tg = window.Telegram.WebApp;
        this.tg.ready();
        this.tg.expand();
        this.selectedClass = null;
        this.clickPower = 1;
        this.initializeUI();
        this.initializeListeners();
    }

    initializeUI() {
        this.updateStats();
    }

    initializeListeners() {
        // Выбор класса
        document.querySelectorAll('.class-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectClass(btn.dataset.class));
        });

        // Кнопка клика
        document.getElementById('click-btn').addEventListener('click', () => this.click());
    }

    selectClass(className) {
        this.selectedClass = className;
        document.getElementById('class-selection').classList.add('hidden');
        document.getElementById('clicker-area').classList.remove('hidden');
        document.getElementById('dungeons').classList.remove('hidden');
        document.getElementById('upgrades').classList.remove('hidden');

        // Настройка бонусов класса
        switch(className) {
            case 'warrior':
                this.clickPower = 2;
                break;
            case 'explorer':
                this.initializeDungeons();
                break;
            case 'merchant':
                this.initializeUpgrades();
                break;
        }
    }

    click() {
        this.gold += this.clickPower;
        this.updateStats();
    }

    updateStats() {
        document.getElementById('gold').textContent = `💰 ${this.gold}`;
        document.getElementById('level').textContent = `📊 Уровень: ${this.level}`;
    }

    initializeDungeons() {
        const dungeons = [
            { id: 'd1', name: 'Подвалы замка', icon: '🏰' },
            { id: 'd2', name: 'Пещеры гоблинов', icon: '👹' },
            { id: 'd3', name: 'Древнее кладбище', icon: '💀' }
        ];

        const dungeonList = document.getElementById('dungeon-list');
        dungeons.forEach(dungeon => {
            const btn = document.createElement('button');
            btn.className = 'dungeon-btn';
            btn.textContent = `${dungeon.icon} ${dungeon.name}`;
            btn.addEventListener('click', () => this.enterDungeon(dungeon));
            dungeonList.appendChild(btn);
        });
    }

    initializeUpgrades() {
        const upgrades = [
            { id: 'u1', name: 'Улучшить клик', cost: 10, power: 1 },
            { id: 'u2', name: 'Двойное золото', cost: 50, power: 2 }
        ];

        const upgradeList = document.getElementById('upgrade-list');
        upgrades.forEach(upgrade => {
            const btn = document.createElement('button');
            btn.className = 'upgrade-btn';
            btn.textContent = `⚡ ${upgrade.name} (${upgrade.cost} золота)`;
            btn.addEventListener('click', () => this.buyUpgrade(upgrade));
            upgradeList.appendChild(btn);
        });
    }

    enterDungeon(dungeon) {
        this.gold += 10;
        this.level += 1;
        this.updateStats();
    }

    buyUpgrade(upgrade) {
        if (this.gold >= upgrade.cost) {
            this.gold -= upgrade.cost;
            this.clickPower += upgrade.power;
            this.updateStats();
        }
    }
}

// Запуск игры
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});

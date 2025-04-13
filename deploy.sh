#!/bin/bash

# Папка, в которую будем собирать проект
OUTPUT_DIR="github-pages-build"

# Создаем директорию, если её нет
mkdir -p $OUTPUT_DIR

# Клонируем только client часть в директорию сборки
echo "Копирование client части проекта..."
cp -r client $OUTPUT_DIR/

# Создаем package.json только с необходимыми зависимостями для фронтенда
echo "Создание package.json для GitHub Pages..."
cat > $OUTPUT_DIR/package.json << EOL
{
  "name": "awesome-clicker-game",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fontsource/inter": "latest",
    "@react-three/drei": "latest",
    "@react-three/fiber": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "framer-motion": "latest",
    "howler": "latest",
    "react": "latest",
    "react-dom": "latest",
    "react-router-dom": "latest",
    "tailwind-merge": "latest",
    "tailwindcss-animate": "latest",
    "three": "latest",
    "zustand": "latest"
  },
  "devDependencies": {
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "@types/three": "latest",
    "@vitejs/plugin-react": "latest",
    "autoprefixer": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vite": "latest"
  }
}
EOL

# Копируем конфигурационные файлы
echo "Копирование конфигурационных файлов..."
cp postcss.config.js $OUTPUT_DIR/
cp tailwind.config.ts $OUTPUT_DIR/
cp tsconfig.json $OUTPUT_DIR/

# Создаем vite.config.ts для GitHub Pages
echo "Создание vite.config.ts для GitHub Pages..."
cat > $OUTPUT_DIR/vite.config.ts << EOL
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./", // Важно для GitHub Pages
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Add support for large models and audio files
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"],
});
EOL

# Создаем файл index.html в корне для GitHub Pages
echo "Создание index.html в корне проекта..."
cat > $OUTPUT_DIR/index.html << EOL
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Великий Кликер</title>
  <script src="./src/main.tsx" type="module"></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL

# Создаем файл .github/workflows/deploy.yml для автоматической деплоя
mkdir -p $OUTPUT_DIR/.github/workflows
cat > $OUTPUT_DIR/.github/workflows/deploy.yml << EOL
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  
  # Позволяет запускать workflow вручную
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
EOL

# Создаем README.md с инструкциями
cat > $OUTPUT_DIR/README.md << EOL
# Великий Кликер - Телеграм Веб-Приложение

Мобильно-оптимизированная веб-игра-кликер на русском языке с расширенным геймплеем, включающим систему классов, подземелья, улучшения и коллекционирование предметов.

## Инструкция по деплою на GitHub Pages

1. Создайте репозиторий на GitHub
2. Загрузите все файлы из этого архива в репозиторий
3. Перейдите в настройки репозитория -> Pages
4. В разделе "Build and deployment" выберите:
   - Source: GitHub Actions
5. GitHub автоматически запустит workflow для сборки и публикации сайта
6. После завершения сборки сайт будет доступен по адресу: https://[username].github.io/[repository]/

## Использование в Telegram

1. После успешного деплоя приложения на GitHub Pages, скопируйте URL вашего сайта
2. Обратитесь к [@BotFather](https://t.me/BotFather) в Telegram
3. Создайте нового бота или выберите существующего
4. Используйте команду /newapp чтобы создать веб-приложение для вашего бота
5. Следуйте инструкциям BotFather и укажите URL вашего GitHub Pages сайта
6. После завершения настройки, ваш бот сможет запускать веб-приложение

## Функциональность

- Система классов: Воин, Исследователь, Торговец
- Прогрессия через клики и автоматические улучшения
- Подземелья с монстрами и боссами
- Система экспедиций
- Коллекционирование артефактов, реликвий и скинов
- Система престижа для перерождений
EOL

echo "Сборка проекта завершена. Все файлы находятся в директории: $OUTPUT_DIR"
echo "Для использования на GitHub Pages, загрузите содержимое этой директории в новый репозиторий."
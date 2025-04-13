#!/bin/bash

# Создаем директорию для подготовки проекта
OUTPUT_DIR="github-pages-build"
mkdir -p $OUTPUT_DIR

# Копируем клиентскую часть
cp -r client $OUTPUT_DIR/
cp package.json $OUTPUT_DIR/
cp postcss.config.js $OUTPUT_DIR/
cp tailwind.config.ts $OUTPUT_DIR/
cp tsconfig.json $OUTPUT_DIR/
cp GITHUB-PAGES.md $OUTPUT_DIR/README.md
cp github-pages-index.html $OUTPUT_DIR/index.html
cp github-pages-vite.config.ts $OUTPUT_DIR/vite.config.ts

# Создаем директорию .github/workflows для автоматического деплоя
mkdir -p $OUTPUT_DIR/.github/workflows
cat > $OUTPUT_DIR/.github/workflows/deploy.yml << EOL
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
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

# Создаем архив
cd $OUTPUT_DIR
zip -r ../великий-кликер-для-github-pages.zip .
cd ..

echo "Архив 'великий-кликер-для-github-pages.zip' создан!"
echo "Этот архив содержит все необходимые файлы для публикации проекта на GitHub Pages."
echo "Распакуйте архив и загрузите содержимое в новый репозиторий GitHub."
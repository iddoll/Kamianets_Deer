# Kamianets Deer

Мобільний веб-хаб для запуску WebGL-ігор (Unity) під час екскурсій у Кам'янці-Подільському.

## Швидкий старт

```bash
npm install
npm run dev
```

Відкрийте на телефоні в тій самій мережі: `http://<IP-комп'ютера>:5173`

## Куди класти ігри

```
public/builds/game-1/   ← перший WebGL білд (index.html + Build/ + …)
public/builds/game-2/   ← другий WebGL білд
```

Після копіювання білду перезапустіть dev-сервер або оновіть сторінку. Кнопка **«Грати»** з’явиться, коли знайдено `index.html`.

Детальніше: [public/builds/README.md](public/builds/README.md)

## Налаштування назв ігор

Файл `src/config/games.ts` — заголовки, описи, імена папок.

## Збірка для продакшену

```bash
npm run build
npm run preview
```

Папка `dist/` містить і hub, і `builds/` — можна викласти на будь-який статичний хостинг.

## Unity → hub: завершення рівня

```javascript
window.parent.postMessage(
  { type: "kamianets-deer", status: "completed", score: 100 },
  "*"
);
```

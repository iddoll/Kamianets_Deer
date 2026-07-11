# Гра 1 — Знайди серед каміння (Find_In_Stones)

Unity-проєкт:

**`D:\GitHub\Kamianets-Deer-Games\Games\Find_In_Stones`**

WebGL-білд копіювати в:

**`D:\GitHub\Kamianets_Deer\public\builds\game-1\`**

## Важливо для WebGL / сайту

Панель інвентарю (`Inventory_Panel`) має бути прив’язана до **нижніх ~18%** екрана (anchor 0–0.18), а не через від’ємний `Size Delta` — інакше на WebGL панель зникає або займає пів екрана.

У `index.html` білду вже налаштовано:

- портрет **1080×1920**;
- `matchWebGLToCanvasSize: false` — UI рендериться у повній висоті, canvas масштабується під iframe.

Після змін у Unity зроби новий WebGL-білд, скопіюй у `public/builds/game-1/`, потім **`npm run prepare:unity`** (розпакує `.br`/`.gz` для браузера).

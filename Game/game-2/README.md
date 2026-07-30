# Гра 2 — Подільський Робін Гуд (Hero_Name_2)

Unity-проєкт:

**`D:\GitHub\Kamianets-Deer-Games\Games\Hero_Name_2`**

WebGL-білд копіювати в:

**`D:\GitHub\Kamianets_Deer\public\builds\imya-geroya\`**

## Букви на кубиках (WebGL)

Кубики використовують `UI.Text` з кириличними літерами. Вбудований Arial Unity **не містить кирилицю** в WebGL — кубики порожні.

У префабі `Square.prefab` підключено **`Assets/Fonts/ArialBold.ttf`** з набором символів фрази «Подільський Робін Гуд».

Після змін у Unity зроби новий WebGL-білд.

## WebGL / сайт

Гра портретна (1080×1920). У `index.html` білду вже є `matchWebGLToCanvasSize: false` і масштабування під iframe.

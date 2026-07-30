# Гра 5 — Фінальний Іспит Драко

Unity-проєкт:

**`D:\GitHub\Kamianets-Deer-Games\Games\Word_Puzzle`**

WebGL-білд копіювати в:

**`D:\GitHub\Kamianets_Deer\public\builds\finalnyy-ispyt-drako\`**

Після білду: **`npm run prepare:unity`**

Не перезаписуйте `index.html` і `TemplateData/style.css` з Unity — у репозиторії вони налаштовані під iframe сайту.

## Букви на кубиках (WebGL)

Кубики використовують `UI.Text` з кирилицею (слово «ВОЛЯ»). Вбудований Arial Unity **не містить кирилицю** в WebGL — кубики та заголовки порожні.

У проєкті підключено **`Assets/Resources/Fonts/ArialBold.ttf`**; `WordPuzzleBootstrap.cs` завантажує його через `Resources.Load`.

Після змін у Unity зроби новий WebGL-білд і скопіюй у `public/builds/finalnyy-ispyt-drako/`.

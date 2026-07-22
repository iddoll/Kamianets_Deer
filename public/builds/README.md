# Папка WebGL-білдів

Сюди кладуть **готові білди** з Unity (або іншого WebGL-експорту).

## Структура

```
public/builds/
  game-1/
    index.html          ← обов'язково
    Build/              ← Unity
    TemplateData/
  game-2/
  game-3/
  game-4/
  game-5/
```

## Unity WebGL

1. **File → Build Settings → WebGL → Build**
2. Скопіюйте **вміст** папки білду (не саму порожню папку з назвою проєкту) у `game-1` … `game-5`.
3. Переконайтесь, що в корені є `index.html`.
4. **Не перезаписуйте** `index.html` і `TemplateData/style.css` з Unity — у репозиторії вони вже налаштовані під iframe сайту.
5. Якщо білд стиснутий (`.br` / `.gz`), виконайте **`npm run prepare:unity`** — скрипт розпакує файли і оновить шляхи в `index.html`.

## Налаштування в Unity (рекомендовано)

- **Player → Resolution**: підтримка мобільних, орієнтація за потреби.
- **Publishing Settings → Compression**: Gzip або Brotli — для `npm run dev` Vite віддає правильний `Content-Encoding`; для GitHub Pages білд автоматично розпаковує файли.
- Якщо гра в iframe на іншому шляху — у білді шляхи зазвичай відносні, це ок.

## Повідомити hub про завершення рівня

З C# (через `Application.ExternalCall` або jslib):

```csharp
Application.ExternalEval(@"
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: 'kamianets-deer', status: 'completed', score: 100 },
      '*'
    );
  }
");
```

Або з JavaScript у WebGL template.

## Перейменування ігор

Список кнопок на головній сторінці: `src/config/games.ts`.

Додати третю гру — новий запис у `GAMES` і папка `public/builds/game-3/`.

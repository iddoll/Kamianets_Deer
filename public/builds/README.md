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
    index.html
    ...
```

## Unity WebGL

1. **File → Build Settings → WebGL → Build**
2. Скопіюйте **вміст** папки білду (не саму порожню папку з назвою проєкту) у `game-1` або `game-2`.
3. Переконайтесь, що в корені є `index.html`.

## Налаштування в Unity (рекомендовано)

- **Player → Resolution**: підтримка мобільних, орієнтація за потреби.
- **Publishing Settings → Compression**: Gzip або Brotli (сервер має віддавати правильний `Content-Encoding`).
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

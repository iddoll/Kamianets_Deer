# Папки WebGL-білдів

Сюди кладіть **вміст** білду з Unity (або готовий WebGL-експорт).

## Структура

```
public/builds/
  znayty-sered-kaminnya/   ← Гра 1 — Знайти серед каміння
  imya-geroya/             ← Гра 2 — Ім'я героя
  zhyvyy-kamin/            ← Гра 3 — Живий камінь
  labirynt-tiney/          ← Гра 4 — Лабіринт Тіней
  finalnyy-ispyt-drako/    ← Гра 5 — Фінальний Іспит Драко
  podatok-dlya-drakona/    ← Гра 6 — Податок для Дракона
  voghnyani-ilyuziyi/      ← Гра 7 — Вогняні Ілюзії
  sekretnyy-kodeks/        ← Гра 8 — Секретний Кодекс
  drakonyache-hornylo/     ← Гра 9 — Драконяче Горнило
  vodyana-vezha/           ← Гра 10 — Секретний Водопровід
```

У кожній папці має бути `index.html` (+ `Build/`, `TemplateData/` від Unity).

## Unity WebGL

1. **File → Build Settings → WebGL → Build**
2. Скопіюйте **вміст** папки білду у відповідну папку вище.
3. Переконайтесь, що в корені є `index.html`.
4. **Не редагуйте** `index.html` і `TemplateData/style.css` з Unity — у них налаштований повний екран під iframe сайту.
5. Якщо білд стиснутий (`.br` / `.gz`), запустіть **`npm run prepare:unity`**.

Назви папок мають збігатися з `buildFolder` у `src/config/games.ts`.

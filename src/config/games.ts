export type GameEntry = {
  id: string;
  title: string;
  description: string;
  /** Шлях до index.html білду всередині public/builds/ */
  buildFolder: string;
  emoji: string;
};

/**
 * Список ігор хабу. WebGL-білди кладіть у відповідну папку public/builds/.
 * (у кожній папці має бути index.html від Unity WebGL)
 */
export const GAMES: GameEntry[] = [
  {
    id: "game-1",
    title: "Знайти серед каміння",
    description: "Локація «Пошук предметів». Знайди потрібний предмет серед каміння.",
    buildFolder: "znayty-sered-kaminnya",
    emoji: "🪨",
  },
  {
    id: "game-2",
    title: "Ім'я героя",
    description: "Локація «Ім'я героя». Відкрий справжнє ім'я героя.",
    buildFolder: "imya-geroya",
    emoji: "🦌",
  },
  {
    id: "game-3",
    title: "Живий камінь",
    description: "Локація «Живий камінь». Знайди гладкий камінь і відчини двері.",
    buildFolder: "zhyvyy-kamin",
    emoji: "💎",
  },
  {
    id: "game-4",
    title: "Лабіринт Тіней",
    description: "Локація «Лабіринт Тіней». Пройди крізь тіні та світло.",
    buildFolder: "labirynt-tiney",
    emoji: "🌑",
  },
  {
    id: "game-5",
    title: "Фінальний Іспит Драко",
    description: "Локація «Фінальний Іспит Драко». Склади слово та відкрий скриню.",
    buildFolder: "finalnyy-ispyt-drako",
    emoji: "🐉",
  },
  {
    id: "game-6",
    title: "Податок для Дракона",
    description: "Локація «Податок для Дракона». Відсортуй справжні монети від фальшивих.",
    buildFolder: "podatok-dlya-drakona",
    emoji: "🪙",
  },
  {
    id: "game-7",
    title: "Вогняні Ілюзії",
    description: "Локація «Вогняні Ілюзії». Розкрий обман вогню та тіні.",
    buildFolder: "voghnyani-ilyuziyi",
    emoji: "🔥",
  },
  {
    id: "game-8",
    title: "Секретний Кодекс",
    description: "Локація «Секретний Кодекс». Розшифруй прихований код.",
    buildFolder: "sekretnyy-kodeks",
    emoji: "📜",
  },
  {
    id: "game-9",
    title: "Драконяче Горнило",
    description: "Локація «Драконяче Горнило». Витримай випробування горнила.",
    buildFolder: "drakonyache-hornylo",
    emoji: "⚒️",
  },
];

export function getGameById(id: string): GameEntry | undefined {
  return GAMES.find((g) => g.id === id);
}

/** URL для iframe (від кореня сайту) */
export function getGameIndexUrl(game: GameEntry): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/builds/${game.buildFolder}/index.html`;
}

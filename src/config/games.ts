export type GameEntry = {
  id: string;
  title: string;
  description: string;
  /** Номер вежі фортеці (порядок на головній) */
  towerNumber: number;
  /** Назва вежі без слова «вежа» */
  towerName: string;
  /** Шлях до index.html білду всередині public/builds/ */
  buildFolder: string;
  emoji: string;
  /** Немає гри — лише картка-заглушка */
  placeholder?: boolean;
};

/**
 * Список ігор хабу. WebGL-білди кладіть у відповідну папку public/builds/.
 * (у кожній папці має бути index.html від Unity WebGL)
 * Порядок — за номером вежі.
 */
export const GAMES: GameEntry[] = [
  {
    id: "game-1",
    title: "Знайти серед каміння",
    description: "Знайди потрібний предмет серед каміння.",
    towerNumber: 1,
    towerName: "Папська",
    buildFolder: "znayty-sered-kaminnya",
    emoji: "🪨",
  },
  {
    id: "game-2",
    title: "Ім'я героя",
    description: "Відкрий справжнє ім'я героя.",
    towerNumber: 1,
    towerName: "Папська",
    buildFolder: "imya-geroya",
    emoji: "🦌",
  },
  {
    id: "game-4",
    title: "Лабіринт Тіней",
    description: "Пройди крізь тіні та світло.",
    towerNumber: 2,
    towerName: "Рожанка",
    buildFolder: "labirynt-tiney",
    emoji: "🌑",
  },
  {
    id: "game-8",
    title: "Секретний Кодекс",
    description: "Розшифруй прихований код.",
    towerNumber: 3,
    towerName: "Лянцкоронська",
    buildFolder: "sekretnyy-kodeks",
    emoji: "📜",
  },
  {
    id: "game-7",
    title: "Вогняні Ілюзії",
    description: "Розкрий обман вогню та тіні.",
    towerNumber: 4,
    towerName: "Тенчинська",
    buildFolder: "voghnyani-ilyuziyi",
    emoji: "🔥",
  },
  {
    id: "game-3",
    title: "Живий камінь",
    description: "Знайди гладкий камінь і відчини двері.",
    towerNumber: 5,
    towerName: "Ковпак",
    buildFolder: "zhyvyy-kamin",
    emoji: "💎",
  },
  {
    id: "game-10",
    title: "Секретний Водопровід",
    description: "Наведи бінокль, з'єднай канал Претвича і укріпи ескарп.",
    towerNumber: 6,
    towerName: "Водяна",
    buildFolder: "vodyana-vezha",
    emoji: "💧",
  },
  {
    id: "game-9",
    title: "Драконяче Горнило",
    description: "Витримай випробування горнила.",
    towerNumber: 7,
    towerName: "Комендантська",
    buildFolder: "drakonyache-hornylo",
    emoji: "⚒️",
  },
  {
    id: "game-5",
    title: "Фінальний Іспит Драко",
    description: "Склади слово та відкрий скриню.",
    towerNumber: 8,
    towerName: "Нова Східна (Чорна)",
    buildFolder: "finalnyy-ispyt-drako",
    emoji: "🐉",
  },
  {
    id: "game-6",
    title: "Податок для Дракона",
    description: "Відсортуй справжні монети від фальшивих.",
    towerNumber: 9,
    towerName: "Ласька (Біла)",
    buildFolder: "podatok-dlya-drakona",
    emoji: "🪙",
  },
  {
    id: "game-11",
    title: "Сонячний Кристал",
    description: "Піймай спалах, розбий камені рогаткою і докоти кулю до чаші.",
    towerNumber: 10,
    towerName: "Денна",
    buildFolder: "denna-vezha",
    emoji: "☀️",
  },
  {
    id: "game-12",
    title: "Непробивний Бастіон",
    description: "Вирий рів, намалюй фальш-стіну і відбий ядра щитом.",
    towerNumber: 11,
    towerName: "Нова Західна (Західна)",
    buildFolder: "nova-zahidna-vezha",
    emoji: "🛡️",
  },
];

export function getGameById(id: string): GameEntry | undefined {
  return GAMES.find((g) => g.id === id);
}

export function formatTowerLabel(game: GameEntry): string {
  return `Вежа ${game.towerNumber} · ${game.towerName}`;
}

/** URL для iframe (від кореня сайту) */
export function getGameIndexUrl(game: GameEntry): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/builds/${game.buildFolder}/index.html`;
}

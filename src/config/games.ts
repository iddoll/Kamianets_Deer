export type GameEntry = {
  id: string;
  title: string;
  description: string;
  /** Шлях до index.html білду всередині public/builds/ */
  buildFolder: string;
  emoji: string;
};

/**
 * Дві гри за замовчуванням — покладіть WebGL-білди у:
 *   public/builds/game-1/
 *   public/builds/game-2/
 * (у кожній папці має бути index.html від Unity WebGL)
 */
export const GAMES: GameEntry[] = [
  {
    id: "game-1",
    title: "Гра 1",
    description: "Перша WebGL-гра — покладіть білд у public/builds/game-1/",
    buildFolder: "game-1",
    emoji: "🏰",
  },
  {
    id: "game-2",
    title: "Гра 2",
    description: "Друга WebGL-гра — покладіть білд у public/builds/game-2/",
    buildFolder: "game-2",
    emoji: "🦌",
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

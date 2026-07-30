import type { Coordinates } from "../geo/distance";

export type GameZone = {
  /** ID гри з games.ts */
  gameId: string;
  placeName: string;
  center: Coordinates;
  /** Радіус у метрах — у зоні кнопка «Грати» активна */
  radiusM: number;
};

/**
 * Координати Кам'янця-Подільського (орієнтовно).
 * Уточніть у Google Maps: клік по місцю → скопіювати lat/lng.
 */
export const GAME_ZONES: GameZone[] = [
  {
    gameId: "game-1",
    placeName: "Пошук предметів",
    center: { lat: 48.6734, lng: 26.5612 },
    radiusM: 80,
  },
  {
    gameId: "game-2",
    placeName: "Ім'я героя",
    center: { lat: 48.6717, lng: 26.5578 },
    radiusM: 60,
  },
  {
    gameId: "game-3",
    placeName: "Живий камінь",
    center: { lat: 48.6720, lng: 26.5590 },
    radiusM: 70,
  },
  {
    gameId: "game-4",
    placeName: "Лабіринт Тіней",
    center: { lat: 48.6710, lng: 26.5620 },
    radiusM: 70,
  },
  {
    gameId: "game-5",
    placeName: "Фінальний Іспит Драко",
    center: { lat: 48.6705, lng: 26.5635 },
    radiusM: 70,
  },
  {
    gameId: "game-6",
    placeName: "Податок для Дракона",
    center: { lat: 48.6698, lng: 26.5605 },
    radiusM: 70,
  },
  {
    gameId: "game-7",
    placeName: "Вогняні Ілюзії",
    center: { lat: 48.6740, lng: 26.5585 },
    radiusM: 70,
  },
  {
    gameId: "game-8",
    placeName: "Секретний Кодекс",
    center: { lat: 48.6728, lng: 26.5645 },
    radiusM: 70,
  },
  {
    gameId: "game-9",
    placeName: "Драконяче Горнило",
    center: { lat: 48.6695, lng: 26.5568 },
    radiusM: 70,
  },
];

export function getZoneForGame(gameId: string): GameZone | undefined {
  return GAME_ZONES.find((z) => z.gameId === gameId);
}

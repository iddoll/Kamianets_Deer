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
 * Координати веж Кам'янець-Подільської фортеці (орієнтовно).
 * Уточніть у Google Maps: клік по місцю → скопіювати lat/lng.
 */
export const GAME_ZONES: GameZone[] = [
  {
    gameId: "game-1",
    placeName: "Папська вежа",
    center: { lat: 48.67288, lng: 26.56363 },
    radiusM: 60,
  },
  {
    gameId: "game-2",
    placeName: "Папська вежа",
    center: { lat: 48.67288, lng: 26.56363 },
    radiusM: 60,
  },
  {
    gameId: "game-4",
    placeName: "Вежа Рожанка",
    center: { lat: 48.67372, lng: 26.56305 },
    radiusM: 60,
  },
  {
    gameId: "game-8",
    placeName: "Лянцкоронська вежа",
    center: { lat: 48.67365, lng: 26.56415 },
    radiusM: 60,
  },
  {
    gameId: "game-7",
    placeName: "Тенчинська вежа",
    center: { lat: 48.67292, lng: 26.56432 },
    radiusM: 60,
  },
  {
    gameId: "game-3",
    placeName: "Вежа Ковпак",
    center: { lat: 48.6728, lng: 26.564 },
    radiusM: 60,
  },
  {
    gameId: "game-10",
    placeName: "Водяна вежа",
    center: { lat: 48.6742, lng: 26.5637 },
    radiusM: 70,
  },
  {
    gameId: "game-9",
    placeName: "Комендантська вежа",
    center: { lat: 48.67368, lng: 26.56355 },
    radiusM: 60,
  },
  {
    gameId: "game-5",
    placeName: "Нова Східна вежа",
    center: { lat: 48.67345, lng: 26.56455 },
    radiusM: 60,
  },
  {
    gameId: "game-6",
    placeName: "Ласька вежа",
    center: { lat: 48.67295, lng: 26.563 },
    radiusM: 60,
  },
  {
    gameId: "game-11",
    placeName: "Денна вежа",
    center: { lat: 48.67355, lng: 26.5617 },
    radiusM: 70,
  },
  {
    gameId: "game-12",
    placeName: "Нова Західна вежа",
    center: { lat: 48.67345, lng: 26.56115 },
    radiusM: 70,
  },
];

export function getZoneForGame(gameId: string): GameZone | undefined {
  return GAME_ZONES.find((z) => z.gameId === gameId);
}

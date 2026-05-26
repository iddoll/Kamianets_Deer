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
    placeName: "Фортеця",
    center: { lat: 48.6734, lng: 26.5612 },
    radiusM: 80,
  },
  {
    gameId: "game-2",
    placeName: "Старий міст",
    center: { lat: 48.6717, lng: 26.5578 },
    radiusM: 60,
  },
];

export function getZoneForGame(gameId: string): GameZone | undefined {
  return GAME_ZONES.find((z) => z.gameId === gameId);
}

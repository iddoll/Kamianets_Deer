import type { Coordinates } from "./distance";
import { GAME_ZONES } from "../config/locations";

export const GEO_MOCK_STORAGE_KEY = "kamianets-deer-geo-mock";

export type GeoMockPreset = "fortress" | "bridge" | "far" | "off";

const FAR_AWAY: Coordinates = { lat: 50.4501, lng: 30.5234 }; // Київ — для тесту «далеко»

export function getMockCoordinates(preset: GeoMockPreset): Coordinates | null {
  switch (preset) {
    case "fortress":
      return GAME_ZONES.find((z) => z.gameId === "game-1")!.center;
    case "bridge":
      return GAME_ZONES.find((z) => z.gameId === "game-2")!.center;
    case "far":
      return FAR_AWAY;
    case "off":
      return null;
  }
}

export function readMockPreset(): GeoMockPreset {
  if (!import.meta.env.DEV) return "off";
  const raw = localStorage.getItem(GEO_MOCK_STORAGE_KEY);
  if (raw === "fortress" || raw === "bridge" || raw === "far" || raw === "off") {
    return raw;
  }
  return "off";
}

export function writeMockPreset(preset: GeoMockPreset): void {
  localStorage.setItem(GEO_MOCK_STORAGE_KEY, preset);
  window.dispatchEvent(new Event("kamianets-deer-geo-mock"));
}

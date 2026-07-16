import type { Coordinates } from "./distance";
import { GAME_ZONES } from "../config/locations";
import { isGeoTestMode } from "./testMode";

export const GEO_MOCK_STORAGE_KEY = "kamianets-deer-geo-mock";

export type GeoMockPreset = "far" | "off" | (string & {});

const FAR_AWAY: Coordinates = { lat: 50.4501, lng: 30.5234 }; // Київ — для тесту «далеко»

const LEGACY_PRESETS: Record<string, string> = {
  fortress: "game-1",
  bridge: "game-2",
};

function normalizePreset(raw: string | null): GeoMockPreset {
  if (!raw) return "off";
  if (raw === "far" || raw === "off") return raw;
  if (raw in LEGACY_PRESETS) return LEGACY_PRESETS[raw];
  if (GAME_ZONES.some((z) => z.gameId === raw)) return raw;
  return "off";
}

export function getMockCoordinates(preset: GeoMockPreset): Coordinates | null {
  const normalized = normalizePreset(preset);
  if (normalized === "off") return null;
  if (normalized === "far") return FAR_AWAY;

  const zone = GAME_ZONES.find((z) => z.gameId === normalized);
  return zone?.center ?? null;
}

export function readMockPreset(): GeoMockPreset {
  if (!isGeoTestMode()) return "off";
  return normalizePreset(localStorage.getItem(GEO_MOCK_STORAGE_KEY));
}

export function writeMockPreset(preset: GeoMockPreset): void {
  localStorage.setItem(GEO_MOCK_STORAGE_KEY, preset);
  window.dispatchEvent(new Event("kamianets-deer-geo-mock"));
}

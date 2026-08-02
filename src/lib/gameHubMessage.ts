export type GameHubMessage = {
  type?: string;
  status?: string;
  score?: number;
  gameId?: string;
};

export type GameHubOutcome = "win" | "loss";

export type SavedGameResult = {
  status: GameHubOutcome;
  score?: number;
  at: number;
};

const STORAGE_PREFIX = "kamianets-deer-result:";

/** Unity may send win/loss or legacy completed. */
export function normalizeHubStatus(status: unknown): GameHubOutcome | null {
  if (typeof status !== "string") return null;

  const value = status.trim().toLowerCase();
  if (value === "win" || value === "completed") return "win";
  if (value === "loss") return "loss";
  return null;
}

export function saveGameResult(gameId: string, result: SavedGameResult): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${gameId}`, JSON.stringify(result));
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function readGameResult(gameId: string): SavedGameResult | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${gameId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedGameResult;
    if (parsed?.status !== "win" && parsed?.status !== "loss") return null;
    return parsed;
  } catch {
    return null;
  }
}

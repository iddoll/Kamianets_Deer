import { useEffect, useState } from "react";
import { GAMES } from "../config/games";

type ReadyMap = Record<string, boolean>;

export function useBuildStatus(): { ready: ReadyMap; checking: boolean } {
  const [ready, setReady] = useState<ReadyMap>({});
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const entries = await Promise.all(
        GAMES.map(async (game) => {
          const url = `${base}/builds/${game.buildFolder}/index.html`;
          try {
            const res = await fetch(url, { method: "HEAD" });
            return [game.id, res.ok] as const;
          } catch {
            return [game.id, false] as const;
          }
        }),
      );

      if (!cancelled) {
        setReady(Object.fromEntries(entries));
        setChecking(false);
      }
    }

    void check();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, checking };
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GeoLockMessage } from "../components/GeoStatusBar";
import { formatDistance, useGeo } from "../context/GeoContext";
import { getGameById, getGameIndexUrl } from "../config/games";
import {
  type GameHubMessage,
  normalizeHubStatus,
  saveGameResult,
} from "../lib/gameHubMessage";

type Outcome = "win" | "loss" | null;

export default function GamePlayerPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const { getGameStatus, loading: geoLoading } = useGeo();

  const game = gameId ? getGameById(gameId) : undefined;
  const geo = gameId ? getGameStatus(gameId) : null;
  const unlocked = geo?.unlocked ?? false;

  const handleMessage = useCallback(
    (event: MessageEvent<GameHubMessage>) => {
      const data = event.data;
      if (!data || typeof data !== "object" || data.type !== "kamianets-deer") return;
      if (gameId && data.gameId && data.gameId !== gameId) return;

      const normalized = normalizeHubStatus(data.status);
      if (!normalized || !gameId) return;

      setOutcome(normalized);
      saveGameResult(gameId, {
        status: normalized,
        score: data.score,
        at: Date.now(),
      });
    },
    [gameId]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    setOutcome(null);
  }, [gameId]);

  useEffect(() => {
    if (!unlocked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [unlocked]);

  if (!game) {
    return (
      <div className="page player-page">
        <p>Гру не знайдено.</p>
        <Link to="/">На головну</Link>
      </div>
    );
  }

  if (geoLoading) {
    return (
      <div className="page">
        <p>Визначаємо позицію…</p>
        <Link to="/">На головну</Link>
      </div>
    );
  }

  if (!unlocked && geo) {
    return (
      <div className="page geo-blocked-page">
        <h1>Гра заблокована</h1>
        <p>
          «{game.title}» доступна лише біля <strong>{geo.zone.placeName}</strong>.
        </p>
        <GeoLockMessage
          placeName={geo.zone.placeName}
          distanceM={geo.distanceM}
          radiusM={geo.zone.radiusM}
        />
        {geo.distanceM !== null && (
          <p className="hint">
            Відстань до точки: {formatDistance(geo.distanceM)} (потрібно ≤ {geo.zone.radiusM}{" "}
            м)
          </p>
        )}
        <Link className="btn btn-primary" to="/">
          На головну
        </Link>
      </div>
    );
  }

  const gameUrl = getGameIndexUrl(game);

  return (
    <div className="player-page">
      <header className="player-bar">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => navigate("/")}
          aria-label="Назад"
        >
          ← Назад
        </button>
        <span className="player-bar__title">{game.title}</span>
        <span className="player-bar__spacer" />
      </header>

      {!loaded && (
        <div className="player-loading">
          <div className="spinner" aria-hidden />
          <p>Завантаження гри…</p>
        </div>
      )}

      <iframe
        ref={iframeRef}
        className="game-frame"
        src={gameUrl}
        title={game.title}
        allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />

      {outcome === "win" && (
        <div className="player-toast player-toast--win" role="status">
          Ви виграли!
        </div>
      )}

      {outcome === "loss" && (
        <div className="player-toast player-toast--loss" role="status">
          Ви програли. Спробуйте ще раз.
        </div>
      )}

      <details className="player-hint">
        <summary>Для розробників Unity</summary>
        <p>З WebGL надішліть результат батьківській сторінці:</p>
        <pre>{`window.parent.postMessage(
  { type: "kamianets-deer", status: "win", score: 100 },
  "*"
);

window.parent.postMessage(
  { type: "kamianets-deer", status: "loss", score: 0 },
  "*"
);`}</pre>
      </details>
    </div>
  );
}

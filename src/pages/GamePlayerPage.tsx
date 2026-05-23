import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getGameById, getGameIndexUrl } from "../config/games";

type GameMessage = {
  type?: string;
  status?: string;
  score?: number;
};

export default function GamePlayerPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState(false);

  const game = gameId ? getGameById(gameId) : undefined;

  const handleMessage = useCallback((event: MessageEvent<GameMessage>) => {
    const data = event.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "kamianets-deer" && data.status === "completed") {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!game) {
    return (
      <div className="page player-page">
        <p>Гру не знайдено.</p>
        <Link to="/">На головну</Link>
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

      {completed && (
        <div className="player-toast" role="status">
          Завдання виконано!
        </div>
      )}

      <details className="player-hint">
        <summary>Для розробників Unity</summary>
        <p>
          Щоб повідомити hub про завершення, з WebGL викличте:
        </p>
        <pre>{`window.parent.postMessage(
  { type: "kamianets-deer", status: "completed", score: 100 },
  "*"
);`}</pre>
      </details>
    </div>
  );
}

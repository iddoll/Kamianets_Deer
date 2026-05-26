import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import GeoDevPanel from "../components/GeoDevPanel";
import GeoStatusBar, { GeoLockMessage } from "../components/GeoStatusBar";
import { useGeo } from "../context/GeoContext";
import { GAMES } from "../config/games";
import { useBuildStatus } from "../hooks/useBuildStatus";

export default function HomePage() {
  const { ready, checking } = useBuildStatus();
  const { getGameStatus } = useGeo();

  return (
    <div className="page home-page">
      <header className="hero">
        <p className="hero-badge">Кам'янець-Подільський</p>
        <h1>Kamianets Deer</h1>
        <p className="hero-sub">
          Ігри відкриваються лише біля відповідної локації. Інші залишаються
          заблокованими, доки не підійдете.
        </p>
      </header>

      <GeoDevPanel />
      <GeoStatusBar />

      <section className="games-section" aria-labelledby="games-heading">
        <h2 id="games-heading">Ігри</h2>
        {checking && <p className="hint">Перевіряємо наявність білдів…</p>}

        <ul className="game-list">
          {GAMES.map((game) => {
            const isReady = ready[game.id];
            const geo = getGameStatus(game.id);
            const unlocked = geo?.unlocked ?? false;

            let action: ReactNode;
            if (!isReady && !checking) {
              action = (
                <span className="btn btn-disabled" aria-disabled>
                  Немає білду
                </span>
              );
            } else if (!unlocked && geo) {
              action = (
                <span className="btn btn-disabled" aria-disabled>
                  Заблоковано
                </span>
              );
            } else if (isReady && unlocked) {
              action = (
                <Link className="btn btn-primary" to={`/play/${game.id}`}>
                  Грати
                </Link>
              );
            } else {
              action = (
                <span className="btn btn-disabled" aria-disabled>
                  …
                </span>
              );
            }

            return (
              <li key={game.id}>
                <article
                  className={`game-card ${isReady && unlocked ? "game-card--unlocked" : ""} ${!isReady ? "game-card--missing" : ""}`}
                >
                  <span className="game-card__emoji" aria-hidden>
                    {game.emoji}
                  </span>
                  <div className="game-card__body">
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    {geo && !unlocked && (
                      <GeoLockMessage
                        placeName={geo.zone.placeName}
                        distanceM={geo.distanceM}
                        radiusM={geo.zone.radiusM}
                      />
                    )}
                    {geo && unlocked && (
                      <p className="game-card__geo game-card__geo--open">
                        ✓ Ви біля «{geo.zone.placeName}» — можна грати
                      </p>
                    )}
                    {!isReady && !checking && (
                      <p className="game-card__warn">
                        Білд не знайдено. Додайте{" "}
                        <code>public/builds/{game.buildFolder}/index.html</code>
                      </p>
                    )}
                  </div>
                  {action}
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import { GAMES } from "../config/games";
import { useBuildStatus } from "../hooks/useBuildStatus";

export default function HomePage() {
  const { ready, checking } = useBuildStatus();

  return (
    <div className="page home-page">
      <header className="hero">
        <p className="hero-badge">Кам'янець-Подільський</p>
        <h1>Kamianets Deer</h1>
        <p className="hero-sub">
          Інтерактивні ігри для дітей під час екскурсії. Оберіть гру та грайте на
          телефоні.
        </p>
      </header>

      <section className="games-section" aria-labelledby="games-heading">
        <h2 id="games-heading">Ігри</h2>
        {checking && <p className="hint">Перевіряємо наявність білдів…</p>}

        <ul className="game-list">
          {GAMES.map((game) => {
            const isReady = ready[game.id];
            return (
              <li key={game.id}>
                <article className={`game-card ${isReady ? "" : "game-card--missing"}`}>
                  <span className="game-card__emoji" aria-hidden>
                    {game.emoji}
                  </span>
                  <div className="game-card__body">
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    {!isReady && !checking && (
                      <p className="game-card__warn">
                        Білд не знайдено. Додайте{" "}
                        <code>public/builds/{game.buildFolder}/index.html</code>
                      </p>
                    )}
                  </div>
                  {isReady ? (
                    <Link className="btn btn-primary" to={`/play/${game.id}`}>
                      Грати
                    </Link>
                  ) : (
                    <span className="btn btn-disabled" aria-disabled>
                      Немає білду
                    </span>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <footer className="site-footer">
        <p>
          Папка для білдів: <code>public/builds/</code>
        </p>
      </footer>
    </div>
  );
}

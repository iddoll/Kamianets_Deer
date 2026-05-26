import { formatDistance, useGeo } from "../context/GeoContext";
import { isGeoTestMode } from "../geo/testMode";

export default function GeoStatusBar() {
  const {
    loading,
    error,
    refresh,
    isMocked,
    needsPermission,
    requestGeolocation,
    coords,
    insecureContext,
  } = useGeo();

  if (loading) {
    return <p className="geo-status geo-status--loading">Визначаємо ваше місцезнаходження…</p>;
  }

  if (insecureContext && !isMocked && isGeoTestMode()) {
    return (
      <div className="geo-status geo-status--info">
        <p>
          <strong>Ви на http://</strong> — на телефоні браузер <em>не показує</em> вікно GPS. Це
          нормально.
        </p>
        <p className="geo-status__action">
          Натисніть у жовтому блоці нижче: <strong>«Біля фортеці»</strong> або{" "}
          <strong>«Біля мосту»</strong> — ігри відкриються для тесту.
        </p>
        <details className="geo-status__details">
          <summary>Справжній GPS на телефоні (https)</summary>
          <ol>
            <li>На ПК: зупиніть сервер (Ctrl+C), запустіть <code>npm run dev:https</code></li>
            <li>На телефоні відкрийте <code>https://192.168.0.175:5174/</code> (порт з терміналу)</li>
            <li>Натисніть «Додатково» → «Перейти на сайт» (сертифікат для розробки)</li>
            <li>Тоді з’явиться кнопка «Дозволити геолокацію»</li>
          </ol>
        </details>
      </div>
    );
  }

  if (needsPermission && !coords && !isMocked) {
    return (
      <div className="geo-status geo-status--prompt">
        <p>Натисніть, щоб дозволити доступ до GPS (з’явиться вікно браузера).</p>
        <button type="button" className="btn btn-primary btn-compact" onClick={requestGeolocation}>
          Дозволити геолокацію
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="geo-status geo-status--error">
        <p>{error}</p>
        <button type="button" className="btn btn-ghost btn-compact" onClick={refresh}>
          Спробувати знову
        </button>
      </div>
    );
  }

  return (
    <p className="geo-status">
      {isMocked ? "Режим тесту геолокації" : "Геолокація увімкнена"}
      {" · "}
      <button type="button" className="link-btn" onClick={refresh}>
        Оновити
      </button>
    </p>
  );
}

export function GeoLockMessage({
  placeName,
  distanceM,
  radiusM,
}: {
  placeName: string;
  distanceM: number | null;
  radiusM: number;
}) {
  const { insecureContext, isMocked } = useGeo();

  if (distanceM === null) {
    if (insecureContext && !isMocked && isGeoTestMode()) {
      return (
        <p className="game-card__geo">
          Оберіть «Біля фортеці» / «Біля мосту» у жовтому блоці <strong>Тест локації</strong> вище.
        </p>
      );
    }
    return (
      <p className="game-card__geo">
        Натисніть «Дозволити геолокацію» вище, щоб відкрити «{placeName}».
      </p>
    );
  }

  return (
    <p className="game-card__geo game-card__geo--locked">
      🔒 Підійдіть до «{placeName}» — зараз {formatDistance(distanceM)} (потрібно ≤{" "}
      {radiusM} м)
    </p>
  );
}

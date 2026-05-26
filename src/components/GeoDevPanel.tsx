import { useGeo } from "../context/GeoContext";
import type { GeoMockPreset } from "../geo/mock";
import { isGeoTestMode } from "../geo/testMode";

const PRESETS: { id: GeoMockPreset; label: string }[] = [
  { id: "fortress", label: "📍 Біля фортеці → Гра 1" },
  { id: "bridge", label: "📍 Біля мосту → Гра 2" },
  { id: "far", label: "🚫 Далеко (обидві закриті)" },
  { id: "off", label: "Справжній GPS" },
];

export default function GeoDevPanel() {
  const { mockPreset, setMockPreset, coords, isMocked, insecureContext } = useGeo();

  if (!isGeoTestMode()) return null;

  const prominent = insecureContext && mockPreset === "off";
  const onLiveSite = !import.meta.env.DEV;

  return (
    <section
      className={`geo-dev ${prominent ? "geo-dev--prominent" : ""}`}
      aria-label="Тест геолокації"
    >
      <h3>{insecureContext ? "Тест локації (натисніть тут)" : "Тест геолокації"}</h3>
      <p className="geo-dev__hint">
        {onLiveSite
          ? "Режим тесту на GitHub Pages (?test=1). Симулює перебування біля фортеці / мосту."
          : insecureContext
            ? "На http:// це єдиний спосіб перевірити ігри на телефоні без поїздки в Кам’янець."
            : "Або Chrome → F12 → Sensors → Location."}
      </p>
      <div className="geo-dev__buttons">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`btn btn-small ${mockPreset === p.id ? "btn-small--active" : ""}`}
            onClick={() => setMockPreset(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
      {coords && (
        <p className="geo-dev__coords">
          {isMocked ? "Симуляція" : "GPS"}: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
        </p>
      )}
    </section>
  );
}

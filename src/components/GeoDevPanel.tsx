import { useGeo } from "../context/GeoContext";
import type { GeoMockPreset } from "../geo/mock";

const PRESETS: { id: GeoMockPreset; label: string }[] = [
  { id: "fortress", label: "📍 Біля фортеці → Гра 1" },
  { id: "bridge", label: "📍 Біля мосту → Гра 2" },
  { id: "far", label: "🚫 Далеко (обидві закриті)" },
  { id: "off", label: "Справжній GPS (лише https)" },
];

/** Лише в режимі npm run dev */
export default function GeoDevPanel() {
  const { mockPreset, setMockPreset, coords, isMocked, insecureContext } = useGeo();

  if (!import.meta.env.DEV) return null;

  const prominent = insecureContext && mockPreset === "off";

  return (
    <section
      className={`geo-dev ${prominent ? "geo-dev--prominent" : ""}`}
      aria-label="Тест геолокації"
    >
      <h3>{insecureContext ? "Тест локації (натисніть тут)" : "Тест геолокації (dev)"}</h3>
      <p className="geo-dev__hint">
        {insecureContext
          ? "На http:// це єдиний спосіб перевірити відкриття ігор на телефоні без поїздки в Кам’янець."
          : "Або Chrome → F12 → Sensors → Location. Unity білди не змінюються."}
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

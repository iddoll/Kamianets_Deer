/** Тестові кнопки геолокації: завжди в npm run dev, на сайті — з ?test=1 у URL */
export function isGeoTestMode(): boolean {
  if (import.meta.env.DEV) return true;
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("test") === "1";
}

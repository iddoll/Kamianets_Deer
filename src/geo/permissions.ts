/** http://192.168… на телефоні — не «безпечний контекст», GPS заблоковано браузером. */
export function isGeoInsecureContext(): boolean {
  return typeof window !== "undefined" && !window.isSecureContext;
}

export function canUseGeolocation(): boolean {
  if (!navigator.geolocation) return false;
  if (isGeoInsecureContext()) return false;
  return true;
}

export function geolocationBlockedReason(): string | null {
  if (!navigator.geolocation) {
    return "Цей браузер не підтримує геолокацію.";
  }
  if (isGeoInsecureContext()) {
    return null;
  }
  return null;
}

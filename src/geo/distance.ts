export type Coordinates = {
  lat: number;
  lng: number;
};

const EARTH_RADIUS_M = 6_371_000;

/** Відстань між двома точками в метрах (формула Haversine). */
export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(x));
}

export function isWithinRadius(
  user: Coordinates,
  center: Coordinates,
  radiusM: number,
): boolean {
  return distanceMeters(user, center) <= radiusM;
}

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} м`;
  }
  return `${(meters / 1000).toFixed(1)} км`;
}

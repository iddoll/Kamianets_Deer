import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { GAME_ZONES, getZoneForGame, type GameZone } from "../config/locations";
import {
  distanceMeters,
  formatDistance,
  isWithinRadius,
  type Coordinates,
} from "../geo/distance";
import {
  getMockCoordinates,
  readMockPreset,
  writeMockPreset,
  type GeoMockPreset,
} from "../geo/mock";
import {
  canUseGeolocation,
  geolocationBlockedReason,
  isGeoInsecureContext,
} from "../geo/permissions";
import { isGeoTestMode } from "../geo/testMode";

export type GameGeoStatus = {
  unlocked: boolean;
  distanceM: number | null;
  zone: GameZone;
};

type GeoContextValue = {
  coords: Coordinates | null;
  loading: boolean;
  error: string | null;
  needsPermission: boolean;
  /** http:// на телефоні — GPS недоступний, використовуйте тест-кнопки або dev:https */
  insecureContext: boolean;
  mockPreset: GeoMockPreset;
  isMocked: boolean;
  refresh: () => void;
  requestGeolocation: () => void;
  setMockPreset: (preset: GeoMockPreset) => void;
  getGameStatus: (gameId: string) => GameGeoStatus | null;
};

const GeoContext = createContext<GeoContextValue | null>(null);

export function GeoProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsPermission, setNeedsPermission] = useState(false);
  const [mockPreset, setMockPresetState] = useState<GeoMockPreset>(() =>
    readMockPreset(),
  );
  const watchIdRef = useRef<number | null>(null);

  const isMocked = isGeoTestMode() && mockPreset !== "off";

  const clearWatch = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const startWatch = useCallback(() => {
    clearWatch();
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
        setError(null);
        setNeedsPermission(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(
            "Доступ заборонено. Увімкніть геолокацію для Safari/Chrome в налаштуваннях телефона (див. README).",
          );
          setNeedsPermission(true);
        } else if (err.code === err.TIMEOUT) {
          setError("Не вдалося визначити позицію. Вийдіть на відкриту ділянку та спробуйте знову.");
          setNeedsPermission(true);
        } else {
          setError("Геолокація тимчасово недоступна.");
          setNeedsPermission(true);
        }
      },
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 25_000 },
    );
  }, [clearWatch]);

  const requestGeolocation = useCallback(() => {
    if (isGeoTestMode() && mockPreset !== "off") {
      setCoords(getMockCoordinates(mockPreset));
      setNeedsPermission(false);
      setError(null);
      return;
    }

    const blocked = geolocationBlockedReason();
    if (blocked) {
      setError(blocked);
      setNeedsPermission(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Запит після натискання кнопки — так iOS/Android показують вікно дозволу
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
        setNeedsPermission(false);
        startWatch();
      },
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError(
            "Доступ заборонено. Увімкніть геолокацію в налаштуваннях телефона для цього браузера.",
          );
        } else {
          setError("Не вдалося отримати позицію. Спробуйте ще раз на відкритому місці.");
        }
        setNeedsPermission(true);
      },
      { enableHighAccuracy: true, timeout: 25_000, maximumAge: 0 },
    );
  }, [mockPreset, startWatch]);

  const refresh = useCallback(() => {
    requestGeolocation();
  }, [requestGeolocation]);

  const setMockPreset = useCallback(
    (preset: GeoMockPreset) => {
      writeMockPreset(preset);
      setMockPresetState(preset);
      clearWatch();
      setError(null);
      setLoading(false);
      if (preset === "off") {
        setCoords(null);
        setNeedsPermission(canUseGeolocation());
      } else {
        setCoords(getMockCoordinates(preset));
        setNeedsPermission(false);
      }
    },
    [clearWatch],
  );

  useEffect(() => {
    const onMockChange = () => {
      const preset = readMockPreset();
      setMockPresetState(preset);
      if (preset !== "off") {
        setCoords(getMockCoordinates(preset));
        setNeedsPermission(false);
        setError(null);
        clearWatch();
      } else {
        setCoords(null);
        setNeedsPermission(canUseGeolocation());
      }
    };
    window.addEventListener("kamianets-deer-geo-mock", onMockChange);
    return () => window.removeEventListener("kamianets-deer-geo-mock", onMockChange);
  }, [clearWatch]);

  useEffect(() => {
    const envLat = import.meta.env.VITE_GEO_LAT;
    const envLng = import.meta.env.VITE_GEO_LNG;
    if (envLat && envLng) {
      setCoords({ lat: Number(envLat), lng: Number(envLng) });
      setNeedsPermission(false);
      return;
    }

    if (isGeoTestMode() && mockPreset !== "off") {
      setCoords(getMockCoordinates(mockPreset));
      setNeedsPermission(false);
      return;
    }

    if (isGeoInsecureContext()) {
      setError(null);
      setNeedsPermission(false);
      return;
    }

    const blocked = geolocationBlockedReason();
    if (blocked) {
      setError(blocked);
      setNeedsPermission(false);
      return;
    }

    setNeedsPermission(true);
    return () => clearWatch();
  }, [mockPreset, clearWatch]);

  const insecureContext = isGeoInsecureContext();

  const getGameStatus = useCallback(
    (gameId: string): GameGeoStatus | null => {
      const zone = getZoneForGame(gameId);
      if (!zone) return null;
      if (!coords) {
        return { unlocked: false, distanceM: null, zone };
      }
      const distanceM = distanceMeters(coords, zone.center);
      return {
        unlocked: isWithinRadius(coords, zone.center, zone.radiusM),
        distanceM,
        zone,
      };
    },
    [coords],
  );

  const value = useMemo(
    () => ({
      coords,
      loading,
      error,
      needsPermission,
      insecureContext,
      mockPreset,
      isMocked,
      refresh,
      requestGeolocation,
      setMockPreset,
      getGameStatus,
    }),
    [
      coords,
      loading,
      error,
      needsPermission,
      insecureContext,
      mockPreset,
      isMocked,
      refresh,
      requestGeolocation,
      setMockPreset,
      getGameStatus,
    ],
  );

  return <GeoContext.Provider value={value}>{children}</GeoContext.Provider>;
}

export function useGeo(): GeoContextValue {
  const ctx = useContext(GeoContext);
  if (!ctx) {
    throw new Error("useGeo must be used within GeoProvider");
  }
  return ctx;
}

export { formatDistance, GAME_ZONES };

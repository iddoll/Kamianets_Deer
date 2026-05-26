import { Route, Routes } from "react-router-dom";
import { GeoProvider } from "./context/GeoContext";
import HomePage from "./pages/HomePage";
import GamePlayerPage from "./pages/GamePlayerPage";

export default function App() {
  return (
    <GeoProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:gameId" element={<GamePlayerPage />} />
      </Routes>
    </GeoProvider>
  );
}

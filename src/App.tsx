import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePlayerPage from "./pages/GamePlayerPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/play/:gameId" element={<GamePlayerPage />} />
    </Routes>
  );
}

import basicSsl from "@vitejs/plugin-basic-ssl";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** `npm run dev` — HTTP (працює на ПК і телефоні без попереджень).
 *  `npm run dev:https` — HTTPS (лише для GPS на телефоні в локальній мережі).
 *  `npm run build:ghpages` — збірка для GitHub Pages. */
export default defineConfig(({ mode }) => {
  const useHttps = mode === "https";
  const isGhPages = mode === "ghpages";

  return {
    base: isGhPages ? "/Kamianets_Deer/" : "/",
    plugins: [react(), ...(useHttps ? [basicSsl()] : [])],
    server: {
      port: 5173,
      host: true,
      ...(useHttps ? { https: true } : {}),
    },
  };
});

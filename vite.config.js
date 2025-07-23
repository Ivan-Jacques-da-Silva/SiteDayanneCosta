import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  // base: '/sistema/',
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [
      "2a25d29e-9841-432d-8f70-105feb1f2158-00-r1vqbcxpkpka.janeway.replit.dev",
    ],
  },
  plugins: [react()],
});

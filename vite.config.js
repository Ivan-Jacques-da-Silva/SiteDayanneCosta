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
      "83b5b6ef-257c-48c6-a2e4-092ea7b55b80-00-win6xoba0yl8.picard.replit.dev",
    ],
  },
  plugins: [react()],
});

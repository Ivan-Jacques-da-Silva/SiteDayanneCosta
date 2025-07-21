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
      "4895165f-ed9c-4596-bdb5-afc44ba5c4e3-00-25m2vlex0aqun.kirk.replit.dev",
    ],
  },
  plugins: [react()],
});

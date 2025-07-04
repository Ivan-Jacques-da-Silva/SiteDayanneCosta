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
      "1f280650-990d-4636-b297-112b56be2baf-00-2k3ujwcryddgd.kirk.replit.dev",
    ],
  },
  plugins: [react()],
});

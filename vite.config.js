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
      "f4970300-e5c4-4af2-96df-103b2fa7ece6-00-2esgc3n8u9r99.riker.replit.dev",
    ],
  },
  plugins: [react()],
});

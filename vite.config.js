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
      "925faaa8-e533-49c2-8635-de3f0e25d6dd-00-2e3k5nhjebgh.janeway.replit.dev",
    ],
  },
  plugins: [react()],
});

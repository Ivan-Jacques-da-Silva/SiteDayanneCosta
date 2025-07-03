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
      "0b7b69a8-d2f5-4d71-877c-05304c6264dc-00-1fkouzz8fnvp9.spock.replit.dev",
    ],
  },
  plugins: [react()],
});

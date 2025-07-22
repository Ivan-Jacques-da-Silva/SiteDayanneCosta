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
      "e2e1ae23-c6ff-4291-9d14-62724d4cc924-00-2neqg27cr0hoi.riker.replit.dev",
    ],
  },
  plugins: [react()],
});

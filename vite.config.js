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
      "5f6e2497-6175-4164-b323-78ae5e79eade-00-3gfaxbxz5guq7.kirk.replit.dev",
    ],
  },
  plugins: [react()],
});

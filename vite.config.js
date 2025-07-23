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
      "b308088e-1fc8-4e0b-9176-8cd6ab4cc95d-00-2878jphr93pd5.janeway.replit.dev",
    ],
  },
  plugins: [react()],
});

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
      "0617c982-d0b4-47be-9a66-312319de6994-00-1b46ingp8u4om.janeway.replit.dev",
    ],
  },
  plugins: [react()],
});

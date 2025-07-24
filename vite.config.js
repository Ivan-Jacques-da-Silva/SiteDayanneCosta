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
      "a32e3bd2-5637-43d4-bd50-c44cffb77281-00-8eua8xs0s3qh.worf.replit.dev",
    ],
  },
  plugins: [react()],
});

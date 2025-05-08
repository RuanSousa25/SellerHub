import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SellerHub",
  plugin: [react()],
  server: {
    historyApiFallback: true,
  },
});

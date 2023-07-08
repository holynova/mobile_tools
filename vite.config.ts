import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslintPlugin(),
    eslintPlugin({
      cache: false,
      include: [".jsx", ".tsx", ".ts"],
      failOnError: false,
      // include: /\.(jsx?|tsx?|vue|svelte)$/,
    }),
  ],
  base: "./",
  // publicDir: "./",
});

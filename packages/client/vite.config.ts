import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    base: env.VITE_BASE_URL,
    server: {
      proxy: {
        "/apis": {
          target: "http://localhost:" + env.PORT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, ""),
        },
      },
    },
  };
});

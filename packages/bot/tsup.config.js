import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/bot.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});

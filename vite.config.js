import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
 server: { port: 5173, open: true },
 build: {
  outDir: "dist",
  rollupOptions: {
   input: {
    main: resolve(__dirname, "index.html"),
    feed: resolve(__dirname, "feed/index.html"),
    profile: resolve(__dirname, "profile/index.html"),
   },
  },
 },
});

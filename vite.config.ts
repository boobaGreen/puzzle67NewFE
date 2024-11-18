import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  plugins: [react(), wasm()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Ensure `global` is polyfilled
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Polyfill Buffer globally
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      buffer: "buffer/", // Correct alias to ensure ESM build is used
    },
  },
});

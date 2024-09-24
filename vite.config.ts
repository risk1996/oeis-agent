// import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [
    solid(),
    // devtools(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});

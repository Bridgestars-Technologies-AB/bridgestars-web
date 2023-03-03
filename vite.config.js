import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  resolve: {
    alias: {
      src: '/src',
      constants: '/src/constants',
      bridgestars: '/src/bridgestars',
      otis: '/src/otis',
      assets: '/src/assets',
    },
  },
});

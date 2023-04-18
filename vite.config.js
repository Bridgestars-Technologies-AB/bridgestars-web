import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

import { dependencies } from './package.json';

const reactDeps = Object.keys(dependencies).filter(
  (key) => key === 'react' || key.startsWith('react-')
);

const manualChunks = {
  vendor: reactDeps,
  ...Object.keys(dependencies).reduce((chunks, name) => {
    if (!reactDeps.includes(name)) {
      chunks[name] = [name];
    }
    return chunks;
  }, {}),
};

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
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: (path) =>
          path.split('/').reverse()[
            path.split('/').reverse().indexOf('node_modules') - 1
          ], // just a hack to get the next path segment of the last node_modules in path
        // manualChunks: {
        //   vendor: reactDeps,
        //   ...manualChunks,
        // },
      },
    },
  },
});

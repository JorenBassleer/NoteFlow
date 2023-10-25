import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from '@rollup/plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@views': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [
    eslint({
      include: 'src/**/*.+(vue|js|jsx|ts|tsx)',
    }),
    vue(),
  ],
});

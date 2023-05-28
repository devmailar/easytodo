import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, './src/components'),
      '@Pages': path.resolve(__dirname, './src/pages'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Utils': path.resolve(__dirname, './src/utils'),
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/event-discovery/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/snigdhaos-devtab/', // Make sure this matches your repository name
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

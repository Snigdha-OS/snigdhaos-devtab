import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: '/snigdhaos-devtab/',
=======
  base: '/snigdhaos-devtab/', // Make sure this matches your repository name
>>>>>>> a27b8d1aa0df9720ef853e4e2f2295f2d6bd2051
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
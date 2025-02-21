import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  },
  server: {
    port: 5173, // Set a fixed port
    proxy: {
      '/parking': {
        target: 'http://localhost:8083', // Proxy requests to the backend API
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/parking/, ''), // Optional: rewrite the path if needed
      },
    },
  },
});

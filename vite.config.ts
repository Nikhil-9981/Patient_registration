import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Let PGlite load its own WASM/FS bundle at runtime
    exclude: ['@electric-sql/pglite']
  },
  worker: {
    // Ensure Vite workers use ES modules, if PGlite ever spawns a worker
    format: 'es'
  }
});

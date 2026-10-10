import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Media in public/ is copied as-is; keep the inline threshold low so the
    // photography is never base64'd into the CSS bundle.
    assetsInlineLimit: 2048
  }
});

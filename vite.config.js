import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/.tmp-chrome/**', '**/.tmp-chrome-shot/**', '**/render-check.png'],
    },
  },
});

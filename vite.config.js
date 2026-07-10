import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      ignored: ['**/.tmp-chrome/**', '**/.tmp-chrome-shot/**', '**/render-check.png'],
    },
  },
});

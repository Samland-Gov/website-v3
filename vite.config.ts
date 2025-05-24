import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
        exclude: ['@cloudflare/workers-types']
    }
});
import { fileURLToPath, URL } from 'node:url'
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 80,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/killiankvella.com/privkey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '/etc/letsencrypt/live/killiankvella.com/fullchain.pem')),
    }
  },
})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/skin-scribe-suite/', // ważne dla GitHub Pages
  build: {
    outDir: 'dist',
  },
})

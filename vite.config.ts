import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/skin-scribe-suite/',   // ważne dla GitHub Pages
  build: { outDir: 'dist' }
})

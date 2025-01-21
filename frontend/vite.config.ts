import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/ivao-api": {
        target: "https://api.ivao.aero",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ivao-api/, ""),
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
const resolve = (dir: string) => path.resolve(__dirname, dir)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve('src'),
      '@img': resolve('src/assets/img'),
      '~antd': resolve('node_modules/antd'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        paths: [
          path.resolve(__dirname, 'node_modules'),
          resolve('src/assets/img'),
        ],
      },
    },
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

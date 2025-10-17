import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@': path.resolve(__dirname, './src'),
      '@rock-and-scroll/shared': path.resolve(__dirname, '../shared/src')
    },
  },
  optimizeDeps: {
    include: ['@rock-and-scroll/shared'],
  },
})

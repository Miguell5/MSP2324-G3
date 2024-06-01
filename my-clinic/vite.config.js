import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/myClinic',
  server: {
    host: '0.0.0.0', // permite acesso externo
    port: 5173 // especifica a porta
  }
})

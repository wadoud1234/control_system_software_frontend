import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Unfonts from 'unplugin-fonts/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    Unfonts({
      fontsource:{
        families:['Roboto'],
      }
    }),
  ],
})
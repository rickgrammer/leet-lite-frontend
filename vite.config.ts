import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(
  {
      plugins: [react()],
      define:{
        'process.env': {
          BASE_URL: process.env.NODE_ENV === 'production'
            ? 'https://api.example.com'
            : 'http://localhost:9900'
          } 
      }
    }
)


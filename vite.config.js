import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 1. Автоматически добавляет ссылку на манифест и сервис-воркер в HTML
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      
      // 2. ВКЛЮЧАЕТ генерацию манифеста в режиме разработки (npm run dev)
      devOptions: {
        enabled: true
      },

      // 3. Настройки самого манифеста
      manifest: {
        name: 'MyNotebook',
        short_name: 'MyNotebook',
        description: 'Notebook App',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        id: '/', // Важно для идентификации приложения
        icons: [
          {
            src: 'icon-192.png', // Убрал начальный слеш для надежности
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      // 4. Настройки кэширования (чтобы работало офлайн)
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
})
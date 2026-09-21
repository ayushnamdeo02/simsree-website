import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    // studio/ is a separate app with its own dev server; don't watch or reload on it
    watch: { ignored: ['**/studio/**'] },
  },
  // only scan the website's own entry, not studio/.sanity/runtime/index.html
  optimizeDeps: { entries: ['index.html'] },
})

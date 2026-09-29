import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { progressApi } from './server/api.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), progressApi()],
  server: {
    // The SQLite file changes on every answer; don't let the watcher react to it.
    watch: { ignored: ['**/data/**'] },
  },
})

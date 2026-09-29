import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/dela-gothic-one/latin.css'
import '@fontsource-variable/figtree'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import App from './App.tsx'
import { migrateBrowserProgress } from './progress.ts'

void migrateBrowserProgress()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

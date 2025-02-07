
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    {/* for default css */}
    <CssBaseline />
    <App />
  </>,
)

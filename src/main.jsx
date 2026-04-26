import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'iconify-icon';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

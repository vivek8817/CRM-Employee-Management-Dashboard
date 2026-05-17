import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'iconify-icon';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx';
// Redux imports
import { Provider } from 'react-redux';
import { store } from './Store/index.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
    </StrictMode>
)

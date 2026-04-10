import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { store } from './redux/store.js'
import { ThemeProvider } from './theme/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3200,
              style: {
                background: 'rgba(20,20,24,0.85)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(14px)',
              },
            }}
          />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

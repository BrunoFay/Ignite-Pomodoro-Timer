import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CycleContextProvider } from './context/CycleContextProvider'
import DarkModeProvider from './context/DarkModeProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <CycleContextProvider>
          <App />
        </CycleContextProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

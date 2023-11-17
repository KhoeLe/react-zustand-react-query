import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
import ToasterProvider from './providers/ToasterProvider.tsx'
import './index.css'


axios.defaults.baseURL = 'http://localhost:8000'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
        <ToasterProvider />

            <App />
    </ReactQueryProvider>
  </React.StrictMode>,
)

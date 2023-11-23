import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import axios from 'axios'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
import ToasterProvider from './providers/ToasterProvider.tsx'
import './index.css'


if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8000';
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = window.location.origin;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ToasterProvider />

      <App />
    </ReactQueryProvider>
  </React.StrictMode>,
)

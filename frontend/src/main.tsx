import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // or './globals.css' if you're using Tailwind

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

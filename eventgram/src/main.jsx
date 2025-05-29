import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';     // ✅ tailwind styles
import App from './App';  // ✅ correct App import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

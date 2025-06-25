import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function Root() {
  const [dark, setDark] = useState(false);

  // load saved theme
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') setDark(true);
  }, []);
  // persist user choice
  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className={dark ? 'dark' : ''}>
      {/* optional toggle placeholder */}
      <button
        onClick={() => setDark(d => !d)}
        className="fixed top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded"
      >
        {dark ? 'Light Mode' : 'Dark Mode'}
      </button>
      <App />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);

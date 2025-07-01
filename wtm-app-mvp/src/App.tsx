// App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './Index'
// import About from './About' // add more routes as needed

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import MainLayout from './layouts/MainLayout.jsx';
import Home from './Pages/Home.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <MainLayout>
        <Routes>
         <Route path="/" element={<Home />} />
        </Routes>
      </MainLayout>
    </Router> );
}

export default App

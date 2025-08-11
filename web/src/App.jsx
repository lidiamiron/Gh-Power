import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import MainLayout from './layouts/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import Descargas from './Pages/Descargas.jsx';
import Contacto from './Pages/Contacto.jsx';
import Productos from "./Pages/Productos.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <MainLayout>
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/descargas" element={<Descargas />} />
         <Route path="/contacto" element={<Contacto />} />
         <Route path="/productos" element={<Productos />} />
        </Routes>
      </MainLayout>
    </Router> );
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import MainLayout from './layouts/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import Descargas from './Pages/Descargas.jsx';
import Contacto from './Pages/Contacto.jsx';
import Productos from "./Pages/Productos.jsx";
import GHPower from "./Pages/Gh-power.jsx"
import Cummins from "./Pages/Cummins.jsx"
import PERKINS from './Pages/Perkins.jsx';
import BAUDOUIN from './Pages/Baudouin.jsx';
import Doosan from './Pages/Doosan.jsx';
import Yanmar from './Pages/Yanmar.jsx';
import Fawde from './Pages/Fawde.jsx';

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
         <Route path="/productos/gh-power" element={<GHPower />} />
         <Route path="/productos/cummins" element={<Cummins />} />
         <Route path="/productos/perkins" element={<PERKINS />} />
         <Route path="/productos/baudouin" element={<BAUDOUIN />} />
         <Route path="/productos/doosan" element={<Doosan />} />
         <Route path="/productos/yanmar" element={<Yanmar />} />
         <Route path="/productos/fawde" element={<Fawde />} />


        </Routes>
      </MainLayout>
    </Router> );
}

export default App

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async'; 

import './App.css';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './Pages/Home.jsx';
import Descargas from './Pages/Descargas.jsx';
import Contacto from './Pages/Contacto.jsx';
import Productos from './Pages/Productos.jsx';
import GHPower from './Pages/Gh-power.jsx';
import Cummins from './Pages/Cummins.jsx';
import PERKINS from './Pages/Perkins.jsx';
import BAUDOUIN from './Pages/Baudouin.jsx';
import Doosan from './Pages/Doosan.jsx';
import Yanmar from './Pages/Yanmar.jsx';
import Fawde from './Pages/Fawde.jsx';
import GHD2000E from './Pages/GHD2000E.jsx';
import GHD3000E from './Pages/GHD3000E.jsx';
import GHD6000E from './Pages/GHD6000E.jsx';
import GHD8000E from './Pages/GHD8000E.jsx';
import GHD10000E from './Pages/GHD10000E.jsx';
import GHD12000E from './Pages/GHD12000E.jsx';
import GHD13000E from './Pages/GHD13000E.jsx';
import GHD13500E from './Pages/GHD13500E.jsx';
import GHD14000E from './Pages/GHD14000E.jsx';
import GHG2500E from './Pages/GHG2500E.jsx';
import GHG3000E from './Pages/GHG3000E.jsx';
import GHG3500E from './Pages/GHG3500E.jsx';
import GHG3800E from './Pages/GHG3800E.jsx';
import GHG6000E from './Pages/GHG6000E.jsx';
import GHG7000E from './Pages/GHG7000E.jsx';
import GHG7500E from './Pages/GHG7500E.jsx';
import GHG9000E from './Pages/GHG9000E.jsx';
import GHG10000E from './Pages/GHG10000E.jsx';
import Generador4x1 from './Pages/4x1.jsx';
import GH15000DE from './Pages/GH15000DE.jsx';
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Homepage from './Pages/Homepage.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import CookieConsent from "./components/CookieConsent";
import PoliticaCookies from './Pages/PoliticaCookies.jsx';
import CasosDeExito from './Pages/CasosDeExito.jsx';
import QuienesSomos from './Pages/QuienesSomos.jsx';
import EmpoweringSection from './components/EmpoweringSection.jsx';

function App() {
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <HelmetProvider> {/* Add HelmetProvider here */}
      <AuthProvider>
        <Router>
          <MainLayout>
            <ScrollToTop />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              {token ? <Route path="/homepage" element={<Homepage token={token} />} /> : ''}
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
              <Route path="/productos/generadores-portatiles/diesel/GHD2000E" element={<GHD2000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD3000E" element={<GHD3000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD6000E" element={<GHD6000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD8000E" element={<GHD8000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD10000E" element={<GHD10000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD12000E" element={<GHD12000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD13000E" element={<GHD13000E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD13500E" element={<GHD13500E />} />
              <Route path="/productos/generadores-portatiles/diesel/GHD14000E" element={<GHD14000E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG2500E" element={<GHG2500E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG3000E" element={<GHG3000E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG3500E" element={<GHG3500E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG3800E" element={<GHG3800E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG6000E" element={<GHG6000E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG7000E" element={<GHG7000E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG7500E" element={<GHG7500E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG9000E" element={<GHG9000E />} />
              <Route path="/productos/generadores-portatiles/gasolina/GHG10000E" element={<GHG10000E />} />
              <Route path="/productos/generador4x1" element={<Generador4x1 />} />
              <Route path="/productos/generadores-portatiles/diesel/GH15000DE" element={<GH15000DE />} />
              <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
              <Route path="/politica-cookies" element={<PoliticaCookies />} />
              <Route path="/casos-de-exito" element={<CasosDeExito />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/empowering-world" element={<EmpoweringSection />} />
            </Routes>
          </MainLayout>
          <CookieConsent />
          <LanguageSwitcher />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
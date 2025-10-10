import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaBars, FaChevronDown, FaChevronRight, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { supabase } from '../client';
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg";
import "../components/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  
  const { user, loading } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    if (window.innerWidth <= 768) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
      setOpenSubDropdown(null);
    } else {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
      setOpenSubDropdown(null);
    }
  };

  const toggleSubDropdown = (subDropdownName) => {
    if (window.innerWidth <= 768) {
      setOpenSubDropdown(openSubDropdown === subDropdownName ? null : subDropdownName);
    } else {
      setOpenSubDropdown(openSubDropdown === subDropdownName ? null : subDropdownName);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      sessionStorage.removeItem('token');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getUserName = () => {
    if (!user) return '';
    
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    
    if (user.email) {
      return user.email.split('@')[0];
    }
    
    return t('navbar.user');
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Estructura de datos para los productos - Internacionalizada
  const productosMenu = {
    [t('navbar.industrialGenerators')]: {
      path: "/productos/generadores-industriales",
      items: {
        "Gh-power": "/productos/gh-power",
        "Cummins": "/productos/cummins",
        "Perkins": "/productos/perkins",
        "Baudouin": "/productos/baudouin",
        "Doosan": "/productos/doosan",
        "Fawde": "/productos/fawde",
        "Yanmar": "/productos/yanmar"
      }
    },
    [t('navbar.portableGenerators')]: {
      path: "/productos/generadores-portatiles",
      items: {
        [t('navbar.diesel')]: {
          path: "/productos/generadores-portatiles/diesel",
          items: {
            "GHD2000E": "/productos/generadores-portatiles/diesel/GHD2000E",
            "GHD3000E": "/productos/generadores-portatiles/diesel/GHD3000E",
            "GHD6000E": "/productos/generadores-portatiles/diesel/GHD6000E",
            "GHD8000E": "/productos/generadores-portatiles/diesel/GHD8000E",
            "GHD10000E": "/productos/generadores-portatiles/diesel/GHD10000E",
            "GHD12000E": "/productos/generadores-portatiles/diesel/GHD12000E",
            "GHD13000E": "/productos/generadores-portatiles/diesel/GHD13000E",
            "GHD13500E": "/productos/generadores-portatiles/diesel/GHD13500E",
            "GHD14000E": "/productos/generadores-portatiles/diesel/GHD14000E",
            "GH15000DE": "/productos/generadores-portatiles/diesel/GH15000DE"
          }
        },
        [t('navbar.gasoline')]: {
          path: "/productos/generadores-portatiles/gasolina",
          items: {
            "GHG2500E": "/productos/generadores-portatiles/gasolina/GHG2500E",
            "GHG3000E": "/productos/generadores-portatiles/gasolina/GHG3000E",
            "GHG3500E": "/productos/generadores-portatiles/gasolina/GHG3500E",
            "GHG3800E": "/productos/generadores-portatiles/gasolina/GHG3800E",
            "GHG6000E": "/productos/generadores-portatiles/gasolina/GHG6000E",
            "GHG7000E": "/productos/generadores-portatiles/gasolina/GHG7000E",
            "GHG7500E": "/productos/generadores-portatiles/gasolina/GHG7500E",
            "GHG9000E": "/productos/generadores-portatiles/gasolina/GHG9000E",
            "GHG10000E": "/productos/generadores-portatiles/gasolina/GHG10000E"
          }
        }
      }
    },
    [t('navbar.generator4x1')]: {
      path: "/productos/generador4x1"
    }
  };

  return (
    <header className={isHomePage ? "fixed-header" : "sticky-header"}>
      <div className="container">
        <nav>
          {/* Logo */}
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Logo" />
            </a>
          </div>

          {/* Contenedor principal del menú */}
          <div className="nav-main">
            {/* Menú de navegación */}
            <ul className={isOpen ? "nav-link active" : "nav-link"}>
              <li>
                <a className={location.pathname === '/' ? 'active' : ''} href="/">
                  {t('navbar.company')}
                </a>
              </li>
              
              <li 
                className="dropdown-wrapper"
                ref={dropdownRef}
                onMouseEnter={() => window.innerWidth > 768 && setOpenDropdown('productos')}
                onMouseLeave={() => window.innerWidth > 768 && setOpenDropdown(null)}
              >
                <a 
                  href="/productos" 
                  className={`${location.pathname.startsWith('/productos') ? 'active' : ''} ${openDropdown === 'productos' ? 'open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('productos');
                  }}
                >
                  {t('navbar.products')}
                  <FaChevronDown className="dropdown-icon" />
                </a>
                
                {openDropdown === 'productos' && (
                  <div className="submenu-container">
                    <div className="submenu">
                      {Object.entries(productosMenu).map(([categoria, datos]) => (
                        <div 
                          key={categoria} 
                          className="submenu-item"
                          onMouseEnter={() => window.innerWidth > 768 && datos.items && setOpenSubDropdown(categoria)}
                          onMouseLeave={() => window.innerWidth > 768 && setOpenSubDropdown(null)}
                        >
                          <div 
                            className="submenu-title"
                            onClick={() => datos.items && toggleSubDropdown(categoria)}
                          >
                            <a href={datos.path}>{categoria}</a>
                            {datos.items && Object.keys(datos.items).length > 0 && (
                              <FaChevronRight className="dropdown-icon submenu-arrow" />
                            )}
                          </div>
                          
                          {datos.items && openSubDropdown === categoria && Object.keys(datos.items).length > 0 && (
                            <div className="subsubmenu">
                              {Object.entries(datos.items).map(([subcategoria, subdatos]) => (
                                <div key={subcategoria} className="subsubmenu-item">
                                  {typeof subdatos === 'string' ? (
                                    <a href={subdatos}>{subcategoria}</a>
                                  ) : (
                                    <>
                                      <div className="subsubmenu-title">
                                        <a href={subdatos.path}>{subcategoria}</a>
                                        {Object.keys(subdatos.items).length > 0 && (
                                          <FaChevronRight className="dropdown-icon" />
                                        )}
                                      </div>
                                      {Object.keys(subdatos.items).length > 0 && (
                                        <div className="subsubsubmenu">
                                          {Object.entries(subdatos.items).map(([producto, ruta]) => (
                                            <div key={producto} className="subsubsubmenu-item">
                                              <a href={ruta}>{producto}</a>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>

              <li>
                <a className={location.pathname === '/Descargas' ? 'active' : ''} href="/Descargas">
                  {t('navbar.downloads')}
                </a>
              </li>
              <li>
                <a className={location.pathname === '/Contacto' ? 'active' : ''} href="/Contacto">
                  {t('navbar.contact')}
                </a>
              </li>
            </ul>

            {/* Iconos de autenticación - EN LA MISMA LÍNEA */}
            <div className="auth-icons">
              {loading ? (
                <div className="auth-loading">
                  <span>{t('navbar.loading')}</span>
                </div>
              ) : user ? (
                <>
                  <div className="user-welcome">
                    <FaUser className="user-icon" />
                    <span className="user-name">{t('navbar.hello')}, {getUserName()}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="auth-icon logout"
                    title={t('navbar.logoutTitle')}
                  >
                    <FaSignOutAlt />
                    <span>{t('navbar.logout')}</span>
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="auth-icon" title={t('navbar.loginTitle')}>
                    <FaUser />
                    <span>{t('navbar.login')}</span>
                  </a>
                  <a href="/signup" className="auth-icon signup" title={t('navbar.signupTitle')}>
                    <FaUserPlus />
                    <span>{t('navbar.signup')}</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Ícono del menú hamburguesa */}
          <div className="icon" onClick={toggleMenu}>
            <FaBars />
          </div>
        </nav>
      </div>
    </header>
  );
}
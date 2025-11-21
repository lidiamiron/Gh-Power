import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaChevronDown, FaChevronRight, FaUser, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import { supabase } from '../client';
import { useTranslation } from "react-i18next";
import logo from "../assets/rojo_logo.png";
import "../components/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';
  const navRef = useRef(null);
  const { t } = useTranslation();
  
  const { user, loading } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    if (window.innerWidth <= 1024) {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
      setOpenSubDropdown(null);
    } else {
      setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
      setOpenSubDropdown(null);
    }
  };

  const toggleSubDropdown = (subDropdownName) => {
    if (window.innerWidth <= 1024) {
      setOpenSubDropdown(openSubDropdown === subDropdownName ? null : subDropdownName);
    } else {
      setOpenSubDropdown(openSubDropdown === subDropdownName ? null : subDropdownName);
    }
  };

  const handleMenuClick = (path) => {
    navigate(path);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setIsOpen(false);
  };

  const handleProductosClick = (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      
      if (openDropdown !== 'productos') {
        setOpenDropdown('productos');
      } else {
        navigate('/productos');
        setOpenDropdown(null);
        setIsOpen(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      sessionStorage.removeItem('token');
      window.location.href = '/';
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

  // Handle clicks outside the nav to close menu and submenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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
        <nav ref={navRef}>
          {/* Logo */}
          <div className="nav-logo">
            <a href="/">
              <img src={logo} className='logo-img' alt="Logo" />
            </a>
          </div>

          {/* Contenedor principal del menú */}
          <div className="nav-main">
            {/* Menú de navegación */}
            <ul className={isOpen ? "nav-link active" : "nav-link"}>
              <li>
                <a 
                  className={location.pathname === '/' ? 'active' : ''} 
                  href="/"
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      e.preventDefault();
                      handleMenuClick('/');
                    }
                  }}
                >
                  {t('navbar.company')}
                </a>
              </li>
              
              <li 
                className="dropdown-wrapper"
                onMouseEnter={() => window.innerWidth > 1024 && setOpenDropdown('productos')}
                onMouseLeave={() => window.innerWidth > 1024 && setOpenDropdown(null)}
              >
                <a 
                  href="/productos" 
                  className={`${location.pathname.startsWith('/productos') ? 'active' : ''} ${openDropdown === 'productos' ? 'open' : ''}`}
                  onClick={handleProductosClick}
                >
                  {t('navbar.products')}
                  <FaChevronDown className={`dropdown-icon ${openDropdown === 'productos' ? 'open' : ''}`} />
                </a>
                
                {/* Submenú de productos */}
                <div className={`submenu-container ${openDropdown === 'productos' ? 'open' : ''}`}>
                  <div className="submenu">
                    {Object.entries(productosMenu).map(([categoria, datos]) => (
                      <div 
                        key={categoria} 
                        className="submenu-item"
                        onMouseEnter={() => window.innerWidth > 1024 && datos.items && setOpenSubDropdown(categoria)}
                        onMouseLeave={() => window.innerWidth > 1024 && setOpenSubDropdown(null)}
                      >
                        <div 
                          className="submenu-title"
                          onClick={() => {
                            if (window.innerWidth <= 1024) {
                              if (datos.items) {
                                toggleSubDropdown(categoria);
                              } else {
                                handleMenuClick(datos.path);
                              }
                            }
                          }}
                        >
                          {datos.items ? (
                            <span className="submenu-text">{categoria}</span>
                          ) : (
                            <a 
                              href={datos.path}
                              onClick={(e) => {
                                if (window.innerWidth <= 1024) {
                                  e.preventDefault();
                                  handleMenuClick(datos.path);
                                }
                              }}
                            >
                              {categoria}
                            </a>
                          )}
                          {datos.items && Object.keys(datos.items).length > 0 && (
                            <FaChevronRight className={`dropdown-icon submenu-arrow ${openSubDropdown === categoria ? 'open' : ''}`} />
                          )}
                        </div>
                        
                        {/* Sub-submenú */}
                        {datos.items && (openSubDropdown === categoria || window.innerWidth > 1024) && Object.keys(datos.items).length > 0 && (
                          <div className={`subsubmenu ${openSubDropdown === categoria ? 'open' : ''}`}>
                            {Object.entries(datos.items).map(([subcategoria, subdatos]) => (
                              <div key={subcategoria} className="subsubmenu-item">
                                {typeof subdatos === 'string' ? (
                                  <a 
                                    href={subdatos}
                                    onClick={(e) => {
                                      if (window.innerWidth <= 1024) {
                                        e.preventDefault();
                                        handleMenuClick(subdatos);
                                      }
                                    }}
                                  >
                                    {subcategoria}
                                  </a>
                                ) : (
                                  <>
                                    <div 
                                      className="subsubmenu-title"
                                      onClick={() => {
                                        if (window.innerWidth <= 1024 && subdatos.items) {
                                          // Para subcategorías con items, manejamos el toggle de forma diferente
                                          const subSubmenu = document.querySelector(`.subsubsubmenu-${subcategoria}`);
                                          if (subSubmenu) {
                                            subSubmenu.classList.toggle('open');
                                          }
                                        } else if (window.innerWidth <= 1024 && !subdatos.items) {
                                          handleMenuClick(subdatos.path);
                                        }
                                      }}
                                    >
                                      {subdatos.items ? (
                                        <span className="submenu-text">{subcategoria}</span>
                                      ) : (
                                        <a 
                                          href={subdatos.path}
                                          onClick={(e) => {
                                            if (window.innerWidth <= 1024) {
                                              e.preventDefault();
                                              handleMenuClick(subdatos.path);
                                            }
                                          }}
                                        >
                                          {subcategoria}
                                        </a>
                                      )}
                                      {subdatos.items && Object.keys(subdatos.items).length > 0 && (
                                        <FaChevronRight className="dropdown-icon" />
                                      )}
                                    </div>
                                    {subdatos.items && Object.keys(subdatos.items).length > 0 && (
                                      <div className={`subsubsubmenu subsubsubmenu-${subcategoria} ${window.innerWidth > 1024 ? 'open' : ''}`}>
                                        {Object.entries(subdatos.items).map(([producto, ruta]) => (
                                          <div key={producto} className="subsubsubmenu-item">
                                            <a 
                                              href={ruta}
                                              onClick={(e) => {
                                                if (window.innerWidth <= 1024) {
                                                  e.preventDefault();
                                                  handleMenuClick(ruta);
                                                }
                                              }}
                                            >
                                              {producto}
                                            </a>
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
              </li>

              <li>
                <a 
                  className={location.pathname === '/Descargas' ? 'active' : ''} 
                  href="/Descargas"
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      e.preventDefault();
                      handleMenuClick('/Descargas');
                    }
                  }}
                >
                  {t('navbar.downloads')}
                </a>
              </li>
              <li>
                <a 
                  className={location.pathname === '/Contacto' ? 'active' : ''} 
                  href="/Contacto"
                  onClick={(e) => {
                    if (window.innerWidth <= 1024) {
                      e.preventDefault();
                      handleMenuClick('/Contacto');
                    }
                  }}
                >
                  {t('navbar.contact')}
                </a>
              </li>
            </ul>

            {/* Iconos de autenticación */}
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
                  <a 
                    href="/login" 
                    className="auth-icon" 
                    title={t('navbar.loginTitle')}
                    onClick={(e) => {
                      if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        handleMenuClick('/login');
                      }
                    }}
                  >
                    <FaUser />
                    <span>{t('navbar.login')}</span>
                  </a>
                  <a 
                    href="/signup" 
                    className="auth-icon signup" 
                    title={t('navbar.signupTitle')}
                    onClick={(e) => {
                      if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        handleMenuClick('/signup');
                      }
                    }}
                  >
                    <FaUserPlus />
                    <span>{t('navbar.signup')}</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Ícono del menú hamburguesa */}
          <div 
            className="icon" 
            onClick={toggleMenu}
            role="button"
            aria-label="Menú de navegación"
            aria-expanded={isOpen}
            aria-controls="nav-menu"
          >
            <FaBars />
          </div>
        </nav>
      </div>
    </header>
  );
}
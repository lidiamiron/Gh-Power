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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const [openSubSubDropdown, setOpenSubSubDropdown] = useState<string | null>(null); // Nuevo estado para tercer nivel
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';
  const navRef = useRef<HTMLElement | null>(null);
  const { t } = useTranslation();
  
  const { user, loading } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setOpenSubSubDropdown(null);
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
    setOpenSubDropdown(null);
    setOpenSubSubDropdown(null);
  };

  const toggleSubDropdown = (subDropdownName: string) => {
    setOpenSubDropdown(openSubDropdown === subDropdownName ? null : subDropdownName);
    setOpenSubSubDropdown(null);
  };

  const toggleSubSubDropdown = (subSubDropdownName: string) => {
    setOpenSubSubDropdown(openSubSubDropdown === subSubDropdownName ? null : subSubDropdownName);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setOpenSubSubDropdown(null);
    setIsOpen(false);
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
    if (user.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user.email) return user.email.split('@')[0];
    return t('navbar.user');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
        setOpenSubSubDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
          <div className="nav-logo">
            <a href="/">
              <img src={logo} className="logo-img" alt="Logo" />
            </a>
          </div>

          <div className="nav-main">
            <ul className={isOpen ? "nav-link active" : "nav-link"}>
              <li>
                <a 
                  className={location.pathname === '/' || location.pathname === '/Home' ? 'active' : ''} 
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
              
              {/* PRODUCTOS */}
              <li 
                className="dropdown-wrapper"
                onMouseEnter={() => window.innerWidth > 1024 && setOpenDropdown('productos')}
                onMouseLeave={() => window.innerWidth > 1024 && setOpenDropdown(null)}
              >
                <a 
                  href="#"
                  className={`${location.pathname.startsWith('/productos') ? 'active' : ''} ${openDropdown === 'productos' ? 'open' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('productos');
                  }}
                >
                  {t('navbar.products')}
                  <FaChevronDown className={`dropdown-icon ${openDropdown === 'productos' ? 'open' : ''}`} />
                </a>
                
                <div className={`submenu-container ${openDropdown === 'productos' ? 'open' : ''}`}>
                  <div className="submenu">

                    {/* Buscador de productos - primera opción */}
                    <div className="submenu-item">
                      <a
                        href="/productos"
                        className="submenu-title"
                        onClick={(e) => {
                          if (window.innerWidth <= 1024) {
                            e.preventDefault();
                            handleMenuClick('/productos');
                          }
                        }}
                      >
                        {t('navbar.productSearch') || 'Buscador de productos'}
                      </a>
                    </div>

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

                        {datos.items && (openSubDropdown === categoria) && (
                          <div className={`subsubmenu ${openSubDropdown === categoria ? 'open' : ''}`}>
                            {Object.entries(datos.items).map(([subcategoria, subdatos]) => (
                              <div 
                                key={subcategoria} 
                                className="subsubmenu-item"
                                onMouseEnter={() => window.innerWidth > 1024 && subdatos.items && setOpenSubSubDropdown(subcategoria)}
                                onMouseLeave={() => window.innerWidth > 1024 && setOpenSubSubDropdown(null)}
                              >
                                <div 
                                  className="subsubmenu-title"
                                  onClick={() => {
                                    if (window.innerWidth <= 1024) {
                                      if (subdatos.items) {
                                        toggleSubSubDropdown(subcategoria);
                                      } else {
                                        handleMenuClick(subdatos.path || subdatos);
                                      }
                                    }
                                  }}
                                >
                                  {subdatos.items ? (
                                    <span className="subsubmenu-text">{subcategoria}</span>
                                  ) : (
                                    <a 
                                      href={typeof subdatos === 'string' ? subdatos : subdatos.path}
                                      onClick={(e) => {
                                        if (window.innerWidth <= 1024) {
                                          e.preventDefault();
                                          handleMenuClick(typeof subdatos === 'string' ? subdatos : subdatos.path);
                                        }
                                      }}
                                    >
                                      {subcategoria}
                                    </a>
                                  )}
                                  {subdatos.items && Object.keys(subdatos.items).length > 0 && (
                                    <FaChevronRight className={`dropdown-icon subsubmenu-arrow ${openSubSubDropdown === subcategoria ? 'open' : ''}`} />
                                  )}
                                </div>

                                {subdatos.items && (openSubSubDropdown === subcategoria) && (
                                  <div className={`subsubsubmenu ${openSubSubDropdown === subcategoria ? 'open' : ''}`}>
                                    {Object.entries(subdatos.items).map(([modelo, modelPath]) => (
                                      <div key={modelo} className="subsubsubmenu-item">
                                        <a 
                                          href={modelPath}
                                          onClick={(e) => {
                                            if (window.innerWidth <= 1024) {
                                              e.preventDefault();
                                              handleMenuClick(modelPath);
                                            }
                                          }}
                                        >
                                          {modelo}
                                        </a>
                                      </div>
                                    ))}
                                  </div>
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
                <a href="/Descargas">{t('navbar.downloads')}</a>
              </li>
              <li>
                <a href="/Contacto">{t('navbar.contact')}</a>
              </li>
            </ul>

            <div className="auth-icons">
              {loading ? null : user ? (
                <>
                  <span>{t('navbar.hello')}, {getUserName()}</span>
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> {t('navbar.logout')}
                  </button>
                </>
              ) : (
                <>
                  <a href="/login"><FaUser /> {t('navbar.login')}</a>
                  <a href="/signup"><FaUserPlus /> {t('navbar.signup')}</a>
                </>
              )}
            </div>
          </div>

          <div className="icon" onClick={toggleMenu}>
            <FaBars />
          </div>
        </nav>
      </div>
    </header>
  );
}
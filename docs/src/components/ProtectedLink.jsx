import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleProtectedLink = ({ href, children, className = '' }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // Verificar si hay token en sessionStorage (como lo guardas en tu App.js)
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      e.preventDefault();
      e.stopPropagation();
      console.log('No hay token, redirigiendo a login');
      navigate('/login', { 
        state: { from: window.location.pathname } 
      });
      return false;
    }
    console.log('Token encontrado, permitiendo descarga');
  };

  // Verificar token
  const token = sessionStorage.getItem('token');
  
  if (!token) {
    return (
      <span 
        className={className}
        onClick={handleClick}
        style={{ 
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          
          padding: '8px 12px',
        }}
      >
        {children}
        <small style={{ 
          color: '#dc3545', 
          marginLeft: '8px',
          fontSize: '0.75rem'
        }}>
          (Inicia sesión)
        </small>
      </span>
    );
  }

  return (
    <a 
      href={href} 
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default SimpleProtectedLink;
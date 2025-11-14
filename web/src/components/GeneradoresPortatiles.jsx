// GeneradoresPortatiles.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './GeneradoresPortatiles.css';
import Diesel from "../assets/diesel-portatil.png";
import Gasolina from "../assets/gasolina-portatil.jpg";
import QuatroPorUno from "../assets/4x1 foto.jpg";

const GeneradoresPortatiles = () => {

  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  const productos = [
    {
      id: 1,
      categoria: 'GENERADORES PORTATILES DE DIESEL',
      tipo: 'diesel',
      descripcion: 'Nuestros generadores portátiles diésel están diseñados para ofrecer potencia confiable en las condiciones más exigentes. Equipados con cabinas heavy-duty, interruptores ABB y enchufes industriales, garantizan un rendimiento continuo 24/7 sin interrupciones. Son la elección ideal para proyectos, minería, construcción e industria donde la durabilidad, la robustez y la eficiencia energética son fundamentales. Su ingeniería avanzada asegura un funcionamiento estable, seguro y preparado para los trabajos más demandantes.',
      imagen: Diesel,
      modelos: ['GHD2000E', 'GHD3000E', 'GHD6000E', 'GHD8000E', 'GHD10000E', 'GHD12000E', 'GHD13000E', 'GHD13500E', 'GHD14000E', 'GHD15000E'],
      bgColor: '#e8e8e8',
      invertido: false
    },
    {
      id: 2,
      categoria: 'GENERADORES PORTATILES DE GASOLINA',
      tipo: 'gasolina',
      descripcion: 'Nuestra línea de generadores a gasolina ofrece soluciones versátiles, compactas y de fácil transporte, perfectas para aplicaciones domésticas, comerciales y de emergencia. Fabricados con motores de alto rendimiento y sistemas de arranque confiables, proporcionan energía limpia y estable para herramientas, equipos y dispositivos sensibles. Su diseño ligero, eficiente y económico los convierte en la alternativa ideal para uso diario, trabajos en campo, eventos, camping y respaldo energético inmediato.',
      imagen: Gasolina,
      modelos: ['GHG2500E', 'GHG3000E', 'GHG3500E', 'GHG3800E', 'GHG6000E', 'GHG7000E', 'GHG7500E', 'GHG9000E', 'GHG10000E'],
      bgColor: '#ffffff',
      invertido: true
    },
    {
      id: 3,
      categoria: 'GENERADOR 4X1',
      tipo: '4x1',
      descripcion: 'El generador 4x1 combina cuatro funciones esenciales en un solo equipo de alto rendimiento: generación eléctrica, compresor, soldadora y planta de luz. Equipado con un motor de 7 HP y diseño reforzado, está pensado para profesionales que requieren múltiples herramientas en un solo cuerpo robusto y confiable. Su construcción duradera y operación casi libre de mantenimiento lo convierten en la solución integral perfecta para talleres, obras, mantenimiento industrial y trabajos en exteriores donde la versatilidad y la potencia son indispensables.',
      imagen: QuatroPorUno,
      modelos: ['4X1'],
      bgColor: '#e8e8e8',
      invertido: false
    }
  ];

  const getModeloLink = (producto, modelo) => {
    if (producto.tipo === 'diesel') {
      return `/productos/generadores-portatiles/diesel/${modelo}`;
    }
    if (producto.tipo === 'gasolina') {
      return `/productos/generadores-portatiles/gasolina/${modelo}`;
    }
    if (producto.tipo === '4x1') {
      return `http://localhost:5173/productos/generador4x1`;
    }
  };

  return (
    <div className="generadores-portatiles-container">
      {productos.map((producto) => (
        <section
          key={producto.id}
          className={`portatiles-seccion ${producto.invertido ? 'invertido' : ''}`}
          style={{ backgroundColor: producto.bgColor }}
        >
          <div
            className="portatiles-imagen"
            style={{ backgroundImage: `url(${producto.imagen})` }}
          />

          <div className="portatiles-info">
            <h2 className="portatiles-categoria">{producto.categoria}</h2>
            <p className="portatiles-descripcion">{producto.descripcion}</p>

            {producto.modelos.length > 0 && (
              <div className="portatiles-modelos-grid">
                {producto.modelos.map((modelo, index) => (
                  <Link
                    key={index}
                    to={getModeloLink(producto, modelo)}
                    className="portatiles-modelo-btn"
                  >
                    {modelo}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GeneradoresPortatiles;

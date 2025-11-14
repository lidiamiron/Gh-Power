
import { useState } from 'react';
import "../components/GeneradoresIndustriales.css";
import GH from "../assets/logo.svg"
import GHimage from "../assets/banner-motores-negro.jpg"
import CumminsImage from "../assets/cummins  color.jpg"
import Cummins from "../assets/SVG/Cummins-logo.svg"
import Perkins from "../assets/SVG/Perkins-Logo.svg"
import Baudouin from "../assets/SVG/Baudouin-logo.svg"
import Doosan from "../assets/SVG/Doosan_Group_and_Corporation_-_Logo.svg"
import Fawde from "../assets/SVG/Faw-logo.svg"
import Yanmar from "../assets/SVG/Yanmar-logo.svg"
import BoudouinImage from "../assets/Baudouinimage.jpg"
import FawdeImage from "../assets/fawde-1920-x-800.jpg"
import PerkinsImage from "../assets/perkins-1920x800-1.jpg"
import DoosanImage from "../assets/banner-doosan-1920x800-2.jpg"
import YanmarImage from "../assets/yanmar 1920x800.jpg"



const GeneradoresIndustriales = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const generadores = [
    {
      id: 1,
      marca: 'GH-POWER',
      logo: GH,
      imagen: GHimage,
      descripcion: 'Generadores confiables de alto rendimiento, desde 10 kVA hasta 440 kVA, diseñados para entornos industriales exigentes.',
      link: '/productos/gh-power'
    },
    {
      id: 2,
      marca: 'CUMMINS',
      logo: Cummins,
      imagen: CumminsImage,
      descripcion: 'Motores y generadores líderes en la industria, con potencia y eficiencia para operaciones críticas.',
      link: '/productos/cummins'
    },
    {
      id: 3,
      marca: 'PERKINS',
      logo: Perkins,
      imagen: PerkinsImage,
      descripcion: 'Soluciones de generación duraderas y eficientes, ideales para aplicaciones industriales de gran escala.',
      link: '/productos/perkins'
    },
    {
      id: 4,
      marca: 'BAUDOUIN',
      logo: Baudouin,
      imagen: BoudouinImage,
      descripcion: 'Generadores marítimos e industriales robustos, con tecnología avanzada y larga vida útil.',
      link: '/productos/baudouin'
    },
    {
      id: 5,
      marca: 'DOOSAN',
      logo: Doosan,
      imagen: DoosanImage,
      descripcion: 'Motores de alto rendimiento y generadores confiables para industrias de cualquier tamaño.',
      link: '/productos/doosan'
    },
    {
      id: 6,
      marca: 'FAWDE',
      logo: Fawde,
      imagen: FawdeImage,
      descripcion: 'Soluciones económicas y duraderas en generación de energía industrial.',
      link: '/productos/fawde'
    },
    {
      id: 7,
      marca: 'YANMAR',
      logo: Yanmar,
      imagen: YanmarImage,
      descripcion: 'Motores compactos y eficientes, perfectos para aplicaciones industriales y comerciales.',
      link: '/productos/yanmar'
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % generadores.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + generadores.length) % generadores.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="generadores-container">
     

    

      <div className="section-title">
        <h2>GENERADORES INDUSTRIALES</h2>
        <p className="generador-subtitle">Generadores industriales confiables con motores de las principales marcas
En nuestra empresa ofrecemos generadores industriales de alta calidad, equipados con motores de marcas reconocidas mundialmente como GH-POWER, Cummins, Perkins, Baudouin, Doosan, Fawde y Yanmar. Contamos con soluciones que van desde generadores compactos de baja potencia hasta equipos de gran capacidad, diseñados para aplicaciones críticas en la industria, comercio, construcción y proyectos de energía. Nuestra gama garantiza eficiencia, durabilidad y confiabilidad, adaptándose a cualquier necesidad energética. Descubre la potencia y calidad de nuestros generadores para asegurar operaciones continuas y seguras en tu negocio.</p>
      </div>

      <div className="carousel-wrapper">
        <div 
          className="carousel-container"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {generadores.map((gen) => (
            <div key={gen.id} className="motor-card">
              <a href={gen.link} className="card-content">
                <div className="image-container">
                  <img 
                    src={gen.imagen} 
                    alt={`Generador ${gen.marca}`}
                    className="generator-image"
                  />
                  <div className="logo-overlay">
                    <img 
                      src={gen.logo} 
                      alt={`Logo ${gen.marca}`}
                      className="brand-logo"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-description">{gen.descripcion}</p>
                  <span className="card-link">Ver detalles</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button 
          className="nav-button prev" 
          onClick={prevSlide}
          aria-label="Anterior"
        />
        
        <div className="dots-container">
          {generadores.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a diapositiva ${index + 1}`}
            />
          ))}
        </div>

        <button 
          className="nav-button next" 
          onClick={nextSlide}
          aria-label="Siguiente"
        />
      </div>
    </div>
  );
};

export default GeneradoresIndustriales;
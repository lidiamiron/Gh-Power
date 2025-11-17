import { useState } from 'react';
import "../components/GeneradoresIndustriales.css";
import GH from "../assets/logo.svg"
import GHimage from "../assets/gh-power.jpg"
import CumminsImage from "../assets/Cummins.jpg"
import Cummins from "../assets/SVG/Cummins-logo.svg"
import Perkins from "../assets/SVG/Perkins-Logo.svg"
import Baudouin from "../assets/SVG/Baudouin-logo.svg"
import Doosan from "../assets/SVG/Doosan_Group_and_Corporation_-_Logo.svg"
import Fawde from "../assets/SVG/Faw-logo.svg"
import Yanmar from "../assets/SVG/Yanmar-logo.svg"
import BoudouinImage from "../assets/Boudouin.jpg"
import FawdeImage from "../assets/Fawde.jpg"
import PerkinsImage from "../assets/Perkins.jpg"
import DoosanImage from "../assets/Doosan.jpg"
import YanmarImage from "../assets/Yanmar.jpg"

const GeneradoresIndustriales = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const generadores = [
    {
      id: 1,
      marca: 'GH-POWER',
      title: "GH-POWER",
      logo: GH,
      imagen: GHimage,
      descripcion: 'Generadores confiables de alto rendimiento, desde 10 kVA hasta 440 kVA, diseñados para entornos industriales exigentes.',
      link: '/productos/gh-power'
    },
    {
      id: 2,
      marca: 'CUMMINS',
      title: "Cummins",
      logo: Cummins,
      imagen: CumminsImage,
      descripcion: 'Motores y generadores líderes en la industria, con potencia y eficiencia para operaciones críticas.',
      link: '/productos/cummins'
    },
    {
      id: 3,
      marca: 'PERKINS',
      title: "Perkins",
      logo: Perkins,
      imagen: PerkinsImage,
      descripcion: 'Soluciones de generación duraderas y eficientes, ideales para aplicaciones industriales de gran escala.',
      link: '/productos/perkins'
    },
    {
      id: 4,
      marca: 'BAUDOUIN',
      title: "Baudouin",
      logo: Baudouin,
      imagen: BoudouinImage,
      descripcion: 'Generadores marítimos e industriales robustos, con tecnología avanzada y larga vida útil.',
      link: '/productos/baudouin'
    },
    {
      id: 5,
      marca: 'DOOSAN',
      title: "Doosan",
      logo: Doosan,
      imagen: DoosanImage,
      descripcion: 'Motores de alto rendimiento y generadores confiables para industrias de cualquier tamaño.',
      link: '/productos/doosan'
    },
    {
      id: 6,
      marca: 'FAWDE',
      title: "Fawde",
      logo: Fawde,
      imagen: FawdeImage,
      descripcion: 'Soluciones económicas y duraderas en generación de energía industrial.',
      link: '/productos/fawde'
    },
    {
      id: 7,
      marca: 'YANMAR',
      title: "Yanmar",
      logo: Yanmar,
      imagen: YanmarImage,
      descripcion: 'Motores compactos y eficientes, perfectos para aplicaciones industriales y comerciales.',
      link: '/productos/yanmar'
    }
  ];

  const cardsToShow = 3;
  const maxIndex = Math.max(0, generadores.length - cardsToShow);

  const nextSlide = () => {
    if (isAnimating || currentIndex >= maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="generadores-container">
      <div className="section-title">
        <h2>GENERADORES INDUSTRIALES</h2>
        <p className="generador-subtitle">Generadores industriales confiables con motores de las principales marcas. En nuestra empresa ofrecemos generadores industriales de alta calidad, equipados con motores de marcas reconocidas mundialmente como GH-POWER, Cummins, Perkins, Baudouin, Doosan, Fawde y Yanmar. </p>
      <p className="generador-subtitle"> Contamos con soluciones que van desde generadores compactos de baja potencia hasta equipos de gran capacidad, diseñados para aplicaciones críticas en la industria, comercio, construcción y proyectos de energía. Nuestra gama garantiza eficiencia, durabilidad y confiabilidad, adaptándose a cualquier necesidad energética. Descubre la potencia y calidad de nuestros generadores para asegurar operaciones continuas y seguras en tu negocio.</p>
      </div>

      <div className="slideshow-wrapper">
        <button 
          className="nav-arrow prev-arrow" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Anterior"
        >
          ‹
        </button>

        <div className="slideshow-container">
          <div 
            className="cards-track"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
          >
            {generadores.map((gen) => (
              <div key={gen.id} className="generator-card">
                <a href={gen.link} className="card-link-wrapper">
                  <div className="card-image-wrapper">
                    <img 
                      src={gen.imagen} 
                      alt={`Generador ${gen.marca}`}
                      className="generator-image"
                    />
                    <div className="logo-badge">
                      <img 
                        src={gen.logo} 
                        alt={`Logo ${gen.marca}`}
                        className="brand-logo"
                      />
                    </div>
                  </div>
                  <div className="card-info">
                    <h3 className="card-brand">{gen.title}</h3>
                    <p className="card-desc">{gen.descripcion}</p>
                    <span className="read-more">VER MÁS ›</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="nav-arrow next-arrow" 
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      <div className="slide-indicators">
        <span className="slide-count">{currentIndex + 1} / {maxIndex + 1}</span>
      </div>
    </div>
  );
};

export default GeneradoresIndustriales;
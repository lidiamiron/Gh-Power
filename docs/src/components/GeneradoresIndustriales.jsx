import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import "../components/GeneradoresIndustriales.css";

import GH from "../assets/logo.svg";
import GHimage from "../assets/gh-power.jpg";
import CumminsImage from "../assets/Cummins.jpg";
import Cummins from "../assets/SVG/Cummins-logo.svg";
import Perkins from "../assets/SVG/Perkins-Logo.svg";
import Baudouin from "../assets/SVG/Baudouin-logo.svg";
import Doosan from "../assets/SVG/Doosan_Group_and_Corporation_-_Logo.svg";
import Fawde from "../assets/SVG/Faw-logo.svg";
import Yanmar from "../assets/SVG/Yanmar-logo.svg";
import BoudouinImage from "../assets/Boudouin.jpg";
import FawdeImage from "../assets/Fawde.jpg";
import PerkinsImage from "../assets/Perkins.jpg";
import DoosanImage from "../assets/Doosan.jpg";
import YanmarImage from "../assets/Yanmar.jpg";

const GeneradoresIndustriales = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const generadores = [
    {
      id: 1,
      marca: 'ghpower',
      title: t("industrial.brands.ghpower.title"),
      logo: GH,
      imagen: GHimage,
      descripcion: t("industrial.brands.ghpower.description"),
      link: '/productos/gh-power'
    },
    {
      id: 2,
      marca: 'cummins',
      title: t("industrial.brands.cummins.title"),
      logo: Cummins,
      imagen: CumminsImage,
      descripcion: t("industrial.brands.cummins.description"),
      link: '/productos/cummins'
    },
    {
      id: 3,
      marca: 'perkins',
      title: t("industrial.brands.perkins.title"),
      logo: Perkins,
      imagen: PerkinsImage,
      descripcion: t("industrial.brands.perkins.description"),
      link: '/productos/perkins'
    },
    {
      id: 4,
      marca: 'baudouin',
      title: t("industrial.brands.baudouin.title"),
      logo: Baudouin,
      imagen: BoudouinImage,
      descripcion: t("industrial.brands.baudouin.description"),
      link: '/productos/baudouin'
    },
    {
      id: 5,
      marca: 'doosan',
      title: t("industrial.brands.doosan.title"),
      logo: Doosan,
      imagen: DoosanImage,
      descripcion: t("industrial.brands.doosan.description"),
      link: '/productos/doosan'
    },
    {
      id: 6,
      marca: 'fawde',
      title: t("industrial.brands.fawde.title"),
      logo: Fawde,
      imagen: FawdeImage,
      descripcion: t("industrial.brands.fawde.description"),
      link: '/productos/fawde'
    },
    {
      id: 7,
      marca: 'yanmar',
      title: t("industrial.brands.yanmar.title"),
      logo: Yanmar,
      imagen: YanmarImage,
      descripcion: t("industrial.brands.yanmar.description"),
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
        <h2>{t("industrial.title")}</h2>
        <p className="generador-subtitle">{t("industrial.subtitle1")}</p>
        <p className="generador-subtitle">{t("industrial.subtitle2")}</p>
      </div>

      <div className="slideshow-wrapper">
        <button 
          className="nav-arrow prev-arrow" 
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label={t("industrial.prev")}
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
                <Link to={gen.link} className="card-link-wrapper">
                  <div className="card-image-wrapper">
                    <img 
                      src={gen.imagen} 
                      alt={`${gen.title}`}
                      className="generator-image"
                    />
                    <div className="logo-badge">
                      <img 
                        src={gen.logo} 
                        alt={`Logo ${gen.title}`}
                        className="brand-logo"
                      />
                    </div>
                  </div>
                  <div className="card-info">
                    <h3 className="card-brand">{gen.title}</h3>
                    <p className="card-desc">{gen.descripcion}</p>
                    <span className="read-more">{t("industrial.read_more")} ›</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="nav-arrow next-arrow" 
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          aria-label={t("industrial.next")}
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
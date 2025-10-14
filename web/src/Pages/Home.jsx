import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import banner from "../assets/banner.svg";
import generador from "../assets/generador.png"; 
import { FaTools, FaHammer, FaShieldAlt } from "react-icons/fa";
import workerImage from "../assets/generadores.jpg";
import "../Pages/Home.css";
import Acordeon from "../components/Acordeon";
import Config from "../assets/configuracion.png";
import FeaturedProducts from '../components/FeaturedProducts';
import Contact from './Contacto';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const aboutSectionRef = useRef(null);
  const aboutLeftRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Iniciar animación del texto después de un pequeño delay
    const timer = setTimeout(() => {
      setTextAnimationStarted(true);
    }, 500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calcular visibilidad
      if (aboutSectionRef.current && aboutLeftRef.current) {
        const sectionRect = aboutSectionRef.current.getBoundingClientRect();
        const elementRect = aboutLeftRef.current.getBoundingClientRect();
        
        setIsVisible(
          elementRect.bottom > sectionRect.top && 
          elementRect.top < sectionRect.bottom
        );
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Calcula el desplazamiento (máximo 100px)
  const offset = Math.min(scrollY * 0.5, 10);

  const cards = [
    {
      icon: <FaTools className="cardIcon" />,
      title: t('home.cards.spareParts.title'),
      text: t('home.cards.spareParts.text'),
    },
    {
      icon: <FaHammer className="cardIcon" />,
      title: t('home.cards.technicalService.title'),
      text: t('home.cards.technicalService.text'),
    },
    {
      icon: <FaShieldAlt className="cardIcon" />,
      title: t('home.cards.warranties.title'),
      text: t('home.cards.warranties.text'),
    },
  ];

  return (
    <main>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>GH Power | Generadores Portátiles Diesel y Gasolina</title>
        <meta
          name="description"
          content="Generadores portátiles diesel y gasolina de alta calidad en GH Power. Soluciones confiables para tus necesidades de energía."
        />
        <meta
          name="keywords"
          content="generadores portátiles, generadores diesel, generadores gasolina, GH Power"
        />
        <meta property="og:title" content="GH Power | Generadores Portátiles" />
        <meta
          property="og:description"
          content="Descubre generadores portátiles diesel y gasolina en GH Power. Energía confiable para cualquier situación."
        />
        <meta property="og:image" content="https://gh-power.com/images/generador.png" />
        <meta property="og:url" content="https://gh-power.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        {/* Multilingual support for i18next */}
        <link rel="alternate" href="https://gh-power.com/" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en" hreflang="en" />
        <link rel="alternate" href="https://gh-power.com/en" hreflang="de" />
        <link rel="alternate" href="https://gh-power.com/en" hreflang="fr" />
      </Helmet>

      {/* HEADER */}
      <section className="header">
        <div className="home-banner">
          <img className="banner" src={banner} alt="banner" />
          <div className="title-container">
            <div className="title-content">
              <h1 className="title">
                <span className={`title-line title-line-1 ${textAnimationStarted ? 'animate' : ''}`}>
                  {t('home.titleLine1')}
                </span>
                <br/>
                <span className={`title-line title-line-2 ${textAnimationStarted ? 'animate' : ''}`}>
                  {t('home.titleLine2')}
                </span>
                <br/>
              </h1>
              <h2 className={`subtitle ${textAnimationStarted ? 'animate' : ''}`}>
                {t('home.subtitle')}
              </h2>
              <a href="/Contacto">
                <button className={`presupuesto presupuesto1 ${textAnimationStarted ? 'animate' : ''}`}>
                  {t('home.budgetButton')}
                </button>
              </a>
            </div>
            <div className="generador-image">
              <img className="generator" src={generador} alt="foto-generador" />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section" ref={aboutSectionRef}>
        <div 
          ref={aboutLeftRef}
          className="about-left" 
          style={{ 
            transform: `translateY(${offset}px)`,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden'
          }}
        >
          <h2 className="about-title">{t('home.aboutTitle')}</h2>
          <h1 className="about-heading">{t('home.aboutHeading')}</h1>
          <h2 className="about-subtitle">{t('home.aboutSubtitle')}</h2>
          <p className="contact-us">
            <a href="/Contacto">{t('home.contactUs')}</a>
          </p>
        </div>

        <div className="about-right">
          <div className="about-description">
            <p>
              {t('home.aboutDescription')}
            </p>
          </div>
          <div className="about-image">
            <img src={workerImage} alt="Generadores industriales" />
          </div>
        </div>
      </section>

      {/* CARDS SECTION */}
      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card.icon}
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      {/* ACCORDION SECTION */}
      <section className="acordeon-section">
        <div className="img-acordeon">
          <img className="img-a" src={Config} alt="Power generator" />
        </div>
        <div className="accordion-box">
          <Acordeon />
        </div> 
      </section>

      <section className='featureProducts'> 
        <FeaturedProducts />
      </section>
      
      <section className='contact'> 
        <Contact />
      </section>
    </main>
  );
}
import { useState, useEffect, useRef } from 'react';
import banner from "../assets/banner.svg";
import generador from "../assets/generador.png"; 
import { FaTools, FaHammer, FaShieldAlt } from "react-icons/fa";
import workerImage from "../assets/generadores.jpg";
import "../Pages/Home.css"
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
      title: "Recambios",
      text: "Disponemos de los repuestos y recambios que necesitas para la reparación y el mantenimiento de generadores industriales, asegurando la máxima eficiencia y durabilidad de tus equipos.",
    },
    {
      icon: <FaHammer className="cardIcon" />,
      title: "Servicio Técnico",
      text: "Ofrecemos repuestos y recambios originales para todos los productos de la marca LKEnergy, con servicio de reparación y mantenimiento realizado por nuestros mecánicos oficiales certificados.",
    },
    {
      icon: <FaShieldAlt className="cardIcon" />,
      title: "Garantías",
      text: "Garantías completas para todos nuestros productos de hasta 3 años de duración.",
    },
  ];

  return (
    <main>
      {/* HEADER */}
      <section className="header">
        <div className="home-banner">
          <img className="banner" src={banner} alt="banner" />
          <div className="title-container">
            <div className="title-content">
              <h1 className="title">
                <span className={`title-line title-line-1 ${textAnimationStarted ? 'animate' : ''}`}>
                  GH POWER 
                </span>
                <br/>
                <span className={`title-line title-line-2 ${textAnimationStarted ? 'animate' : ''}`}>
                  GENERADORES ELÉCTRICOS
                </span>
                <br/>
                
              </h1>
              <h2 className={`subtitle ${textAnimationStarted ? 'animate' : ''}`}>
                Soluciones Energéticas de Alta Calidad
              </h2>
              <a href="/Contacto"><button className={`presupuesto presupuesto1 ${textAnimationStarted ? 'animate' : ''}`}>Solicita tu presupuesto</button></a>
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
          <h2 className="about-title">SOBRE NOSOTROS</h2>
          <h1 className="about-heading">GH POWER</h1>
          <h2 className="about-subtitle">Generadores Eléctricos: Soluciones Energéticas Innovadoras y Personalizadas</h2>
          <p className="contact-us"><a href="/Contacto">CONTACTANÓS</a></p>
        </div>

        <div className="about-right">
          <div className="about-description">
            <p>
             GH POWER es líder en la fabricación de generadores eléctricos y ofrece una amplia gama de soluciones energéticas diseñadas para satisfacer las necesidades de diversos mercados. Con presencia en más de 30 países y una robusta red de distribuidores, expandimos nuestra huella global año tras año, consolidándonos como referente en el sector energético. Nuestra fortaleza radica en la versatilidad para crear productos a medida, adaptados a las demandas específicas de cada mercado. En GH POWER, garantizamos tiempos de respuesta inmediatos y un soporte técnico-comercial de primer nivel, lo que nos ha permitido alcanzar la satisfacción de más de 5000 clientes en todo el mundo. Confíe en GH POWER para soluciones energéticas confiables, innovadoras y respaldadas por un servicio excepcional. ¡Contáctenos hoy y descubra cómo podemos potenciar su energía!
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
        <div className="accordion-box"><Acordeon /></div> 
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
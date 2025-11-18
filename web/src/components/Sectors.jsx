import {useState, useEffect} from "react";
import "../components/Sectors.css";
import Aguas from "../assets/tratamientoaguas.jpg"
import CentroDatos from "../assets/centrodedatos.png"
import SectorSanitario from "../assets/sectordesalud.jpg"
import IndustriaPetrolera from "../assets/industriapetrolera.png"
import SectorConstruccion from "../assets/sectordelaconstrucion.png"

const Sectors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const apps = [
    {
      id: 1,
      title: "TRATAMIENTO DE AGUAS",
      sector: 'TRATAMIENTO DE AGUAS',
      imagen: Aguas,
      descripcion: 'La demanda de agua está creciendo rápidamente. El consumo de agua a nivel mundial se duplica cada 20 años. Por eso, los municipios y autoridades están enfocados en gestionar este recurso de forma más eficiente e inteligente, mediante la purificación y reutilización de aguas residuales. Hoy más que nunca, las plantas de tratamiento deben recolectar, transportar y procesar grandes volúmenes de agua, para luego devolverla al medio ambiente o reutilizarla en actividades como el regadío. Sin embargo, durante interrupciones prolongadas, un tratamiento insuficiente puede generar consecuencias ambientales y financieras graves. GH POWER ofrece soluciones energéticas confiables para el sector hídrico. La instalación de un grupo electrógeno permite mantener la operación continua de las plantas en situaciones críticas como apagones o cortes de energía, asegurando el suministro de agua a toda una ciudad incluso en circunstancias fuera de control.neradores confiables de alto rendimiento, desde 10 kVA hasta 440 kVA, diseñados para entornos industriales exigentes.',
    },
    {
      id: 2,
      title: "CENTRO DE DATOS",
      sector: 'CENTRO DE DATOS',
      imagen: CentroDatos,
      descripcion: 'En GH POWER ofrecemos soluciones en generadores eléctricos diseñadas para garantizar un suministro estable y confiable incluso en condiciones exigentes. Nuestras tecnologías integran plataformas en la nube y virtualización en tiempo real para mejorar la continuidad operativa de nuestros clientes con equipos fáciles de mantener y preparados para funcionar en paralelo. Brindamos respaldo energético eficiente personalizado y con un diseño adaptado al entorno reduciendo el impacto visual y asegurando el máximo rendimiento en cada proyecto.',
    },
    {
      id: 3,
      title: "SECTOR SANITARIO",
      sector: 'SECTOR SANITARIO',
      imagen: SectorSanitario,
      descripcion: 'Cuando ocurre un apagón en centros de salud u hospitales, la vida de pacientes, personal y visitantes puede estar en riesgo. Durante una crisis, un hospital se convierte en un punto clave para la comunidad. Los visitantes no se van y muchas personas llegan buscando refugio, atención, comida y agua. Si los generadores de emergencia están dimensionados solo para funciones críticas, puede haber problemas al enfrentar grandes multitudes. Los generadores GH POWER ofrecen soluciones confiables para proteger cualquier edificio frente a apagones o estados de emergencia, asegurando el funcionamiento continuo y seguro de las instalaciones.',
    },
    {
      id: 4,
      title: "INDUSTRIA PETROLERA",
      sector: 'INDUSTRIA PETROLERA',
      imagen: IndustriaPetrolera,
      descripcion: 'La industria petrolera y gasista mueve diariamente proyectos multimillonarios que abarcan exploración, perforación, operación, refinación y distribución. Tras años de altos costos, enfrenta una fuerte presión por aumentar su eficiencia, productividad y reducir su impacto ambiental. GH POWER ofrece soluciones confiables en grupos electrógenos diseñados para soportar condiciones extremas. Nuestros equipos garantizan energía continua en entornos operativos exigentes, ideales para las necesidades del sector energético.',
    },
    {
      id: 5,
      title: "SECTOR DE LA CONSTRUCCIÓN",
      sector: 'SECTOR DE LA CONSTRUCCIÓN',
      imagen: SectorConstruccion,
      descripcion: 'La industria de la construcción es un sector competitivo, dinámico y esencial para el desarrollo económico. Impulsa el crecimiento a través de la construcción de viviendas, obras de ingeniería civil y proyectos comerciales, generando una gran cantidad de empleo en cada país. GH POWER es el aliado ideal para cubrir todas las necesidades de suministro de energía en este sector. Ofrecemos generadores eléctricos específicos y personalizados para cada tipo de obra, adaptándonos a sus condiciones y requerimientos. Somos un proveedor enfocado en la innovación, con soluciones energéticas que marcan una diferencia real en el mercado. Nuestra experiencia incluye numerosos proyectos exitosos en el ámbito de la construcción a nivel global.',
    },
  ];

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % apps.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Función para ir a un slide específico
  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Efecto para el autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <div className="apps-container">
      <div className="apps-title">
        <h2>¿Por qué elegir GH-POWER?</h2>
        <p className="apps-subtitle">En GH POWER ofrecemos soluciones energéticas confiables con más de 25 años de experiencia en el sector. Ofrecemos servicio técnico de calidad a todos nuestros distribuidores de todo el país.</p>
      </div>
      <div className="eficiencia-title">
        <h2>EFICIENCIA ENERGÉTICA</h2>
        <p className="eficiencia-subtitle">La industria moderna opera con altos niveles de eficiencia gracias a tecnologías avanzadas, procesos precisos y trabajadores altamente cualificados. Un factor clave en este rendimiento es el sistema de inventario Just in Time, donde cada componente llega a la línea de producción justo a tiempo para su ensamblaje. Para que este proceso funcione sin interrupciones, es esencial contar con un suministro de energía confiable que mantenga la producción activa incluso durante un apagón. En GH POWER proporcionamos la potencia que su operación necesita. Ofrecemos una amplia gama de soluciones energéticas de respaldo y emergencia, diseñadas para garantizar continuidad operativa en cualquier situación.</p>
      </div>

      <div className="carousel-with-arrows">
        {/* Flecha izquierda */}
        <button 
          className="nav-button external prev" 
          onClick={prevSlide}
          aria-label="Anterior"
        />
        
        <div className="sectors-carousel-wrapper">
          <div 
            className="sectors-carousel-container"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {apps.map((apps) => (
              <div key={apps.id} className="motor-card">
                  <div className="image-container">
                    <h3 className="card-title">{apps.title}</h3>
                    <img 
                      src={apps.imagen} 
                      alt={`Applications ${apps.sector}`}
                      className="apps-image"
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-description">{apps.descripcion}</p>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        <button 
          className="nav-button external next" 
          onClick={nextSlide}
          aria-label="Siguiente"
        />
      </div>

      {/* Indicadores de posición */}
      <div className="dots-container">
        {apps.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sectors;
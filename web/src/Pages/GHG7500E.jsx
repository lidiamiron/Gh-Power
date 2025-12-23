import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/GHG7500E.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('ghg7500e.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('ghg7500e.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('ghg7500e.specs.structure')}</td>
                <td>{t('ghg7500e.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('ghg7500e.specs.dimensions')}</td>
                <td>{t('ghg7500e.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('ghg7500e.specs.weight')}</td>
                <td>{t('ghg7500e.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('ghg7500e.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('ghg7500e.specs.model')}</li>
            <li>{t('ghg7500e.specs.frequency')}</li>
            <li>{t('ghg7500e.specs.voltage')}</li>
            <li>{t('ghg7500e.specs.socketType')}</li>
            <li>{t('ghg7500e.specs.engineCapacity')}</li>
            <li>{t('ghg7500e.specs.autonomy100')}</li>
            <li>{t('ghg7500e.specs.autonomy50')}</li>
            <li>{t('ghg7500e.specs.engineType')}</li>
            <li>{t('ghg7500e.specs.startingSystem')}</li>
            <li>{t('ghg7500e.specs.engineCooling')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('ghg7500e.manuals')}</h2>
        <div className="doc-item">
          <a href="/docs/LK21B.pdf" className="pdf-icon" title={t('ghg7500e.techSheet')}>
            <FaFilePdf />
          </a>
          <a href="/docs/LK21B.pdf" target="_blank" rel="noreferrer" title={t('ghg7500e.techSheet')}>
            <p className="descargas">{t('ghg7500e.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon" title={t('ghg7500e.userManual')}>
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas" title={t('ghg7500e.userManual')}>
            <p className="descargas">{t('ghg7500e.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GHG7500E = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <Helmet>
        <title>Generador GHG7500E | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Generador portátil GHG7500E de GH Power: máxima potencia y fiabilidad para uso doméstico y profesional. Pide presupuesto ahora."
        />
        <meta
          name="keywords"
          content="generador GHG7500E, generadores portátiles, generadores gasolina, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generador GHG7500E | GH Power" />
        <meta
          property="og:description"
          content="Descubre el generador portátil GHG7500E de GH Power, ideal para uso doméstico y profesional. Pide presupuesto hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/ghg7500e.png" />
        <meta property="og:url" content="https://gh-power.com/productos/ghg7500e" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/ghg7500e" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/ghg7500e" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Generador GHG7500E",
            "description": "Generador portátil GHG7500E de GH Power, diseñado para máxima potencia y fiabilidad en aplicaciones domésticas y profesionales.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/ghg7500e.png",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "url": "https://gh-power.com/productos/ghg7500e"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Power PRP",
                "value": t('ghg7500e.features.powerPRP')
              },
              {
                "@type": "PropertyValue",
                "name": "Power ESP",
                "value": t('ghg7500e.features.powerESP')
              },
              {
                "@type": "PropertyValue",
                "name": "Weight",
                "value": t('ghg7500e.features.weight')
              }
            ],
            "hasAttachment": [
              {
                "@type": "DigitalDocument",
                "name": "Ficha Técnica GHG7500E",
                "url": "https://gh-power.com/docs/LK21B.pdf",
                "description": "Ficha técnica del generador GHG7500E de GH Power."
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt={t('ghg7500e.mainImageAlt')} className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t('ghg7500e.thumbnailAlt', { index: index + 1 })}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('ghg7500e.title')}</h2>
        <p className="product-subtitle">{t('ghg7500e.subtitle')}</p>
        <ul className="product-info">
          <li>{t('ghg7500e.features.powerPRP')}</li>
          <li>{t('ghg7500e.features.powerESP')}</li>
          <li>{t('ghg7500e.features.singlePhase')}</li>
          <li>{t('ghg7500e.features.weight')}</li>
          <li>{t('ghg7500e.features.engine')}</li>
          <li>{t('ghg7500e.features.alternator')}</li>
          <li>{t('ghg7500e.features.fuelCapacity')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('ghg7500e.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default GHG7500E;
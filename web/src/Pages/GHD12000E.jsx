import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/ghd12000.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('ghd12000e.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('ghd12000e.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('ghd12000e.specs.structure')}</td>
                <td>{t('ghd12000e.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('ghd12000e.specs.dimensions')}</td>
                <td>{t('ghd12000e.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('ghd12000e.specs.weight')}</td>
                <td>{t('ghd12000e.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('ghd12000e.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('ghd12000e.specs.model')}</li>
            <li>{t('ghd12000e.specs.frequency')}</li>
            <li>{t('ghd12000e.specs.voltage')}</li>
            <li>{t('ghd12000e.specs.powerFactor')}</li>
            <li>{t('ghd12000e.specs.engineCapacity')}</li>
            <li>{t('ghd12000e.specs.dcOutput')}</li>
            <li>{t('ghd12000e.specs.phases')}</li>
            <li>{t('ghd12000e.specs.startingSystem')}</li>
            <li>{t('ghd12000e.specs.engineCooling')}</li>
            <li>{t('ghd12000e.specs.autonomy')}</li>
            <li>{t('ghd12000e.specs.unitsPerContainer')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('ghd12000e.manuals')}</h2>
        <div className="doc-item">
          <a href="/docs/LK21B.pdf" className="pdf-icon" title={t('ghd12000e.techSheet')}>
            <FaFilePdf />
          </a>
          <a href="/docs/LK21B.pdf" target="_blank" rel="noreferrer" title={t('ghd12000e.techSheet')}>
            <p className="descargas">{t('ghd12000e.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon" title={t('ghd12000e.userManual')}>
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas" title={t('ghd12000e.userManual')}>
            <p className="descargas">{t('ghd12000e.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GHD12000E = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <Helmet>
        <title>Generador GHD12000E | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Generador portátil GHD12000E de GH Power: máxima potencia y fiabilidad para uso industrial y doméstico. Cotiza ahora."
        />
        <meta
          name="keywords"
          content="generador GHD12000E, generadores portátiles, generadores diesel, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generador GHD12000E | GH Power" />
        <meta
          property="og:description"
          content="Descubre el generador portátil GHD12000E de GH Power, ideal para uso industrial y doméstico. Cotiza hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/ghd12000.png" />
        <meta property="og:url" content="https://gh-power.com/productos/ghd12000e" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/ghd12000e" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/ghd12000e" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Generador GHD12000E",
            "description": "Generador portátil GHD12000E de GH Power, diseñado para máxima potencia y fiabilidad en aplicaciones industriales y domésticas.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/ghd12000.png",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "url": "https://gh-power.com/productos/ghd12000e"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Power PRP",
                "value": t('ghd12000e.features.powerPRP')
              },
              {
                "@type": "PropertyValue",
                "name": "Power ESP",
                "value": t('ghd12000e.features.powerESP')
              },
              {
                "@type": "PropertyValue",
                "name": "Weight",
                "value": t('ghd12000e.features.weight')
              }
            ],
            "hasAttachment": [
              {
                "@type": "DigitalDocument",
                "name": "Ficha Técnica GHD12000E",
                "url": "https://gh-power.com/docs/LK21B.pdf",
                "description": "Ficha técnica del generador GHD12000E de GH Power."
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt={t('ghd12000e.mainImageAlt')} className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t('ghd12000e.thumbnailAlt', { index: index + 1 })}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('ghd12000e.title')}</h2>
        <p className="product-subtitle">{t('ghd12000e.subtitle')}</p>
        <ul className="product-info">
          <li>{t('ghd12000e.features.powerPRP')}</li>
          <li>{t('ghd12000e.features.powerESP')}</li>
          <li>{t('ghd12000e.features.singlePhase')}</li>
          <li>{t('ghd12000e.features.weight')}</li>
          <li>{t('ghd12000e.features.engine')}</li>
          <li>{t('ghd12000e.features.alternator')}</li>
          <li>{t('ghd12000e.features.fuelCapacity')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('ghd12000e.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default GHD12000E;
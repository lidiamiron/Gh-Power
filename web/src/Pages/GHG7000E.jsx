import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/GHG7000E.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('ghg7000e.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('ghg7000e.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('ghg7000e.specs.structure')}</td>
                <td>{t('ghg7000e.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('ghg7000e.specs.dimensions')}</td>
                <td>{t('ghg7000e.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('ghg7000e.specs.weight')}</td>
                <td>{t('ghg7000e.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('ghg7000e.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('ghg7000e.specs.model')}</li>
            <li>{t('ghg7000e.specs.frequency')}</li>
            <li>{t('ghg7000e.specs.voltage')}</li>
            <li>{t('ghg7000e.specs.socketType')}</li>
            <li>{t('ghg7000e.specs.engineCapacity')}</li>
            <li>{t('ghg7000e.specs.dcOutput')}</li>
            <li>{t('ghg7000e.specs.phases')}</li>
            <li>{t('ghg7000e.specs.startingSystem')}</li>
            <li>{t('ghg7000e.specs.engineCooling')}</li>
            <li>{t('ghg7000e.specs.autonomy')}</li>
            <li>{t('ghg7000e.specs.battery')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('ghg7000e.manuals')}</h2>
        <div className="doc-item">
          <a href="https://mfbwfvyokxanubyxamim.supabase.co/storage/v1/object/sign/Fichas%20Tecnicas/GHG7000E.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YjE0MGYwNC01ZTNkLTRhYzItOGQ3OS02ZWI3YzMzNjNjNDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGaWNoYXMgVGVjbmljYXMvR0hHNzAwMEUucGRmIiwiaWF0IjoxNzU4MDIzODc2LCJleHAiOjIzODg3NDM4NzZ9.Far9Oh9EZUsh_yVuMMrEC98pDyb-tledt5PUKMzGzcI" className="pdf-icon" title={t('ghg7000e.techSheet')}>
            <FaFilePdf />
          </a>
          <a href="https://mfbwfvyokxanubyxamim.supabase.co/storage/v1/object/sign/Fichas%20Tecnicas/GHG7000E.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YjE0MGYwNC01ZTNkLTRhYzItOGQ3OS02ZWI3YzMzNjNjNDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGaWNoYXMgVGVjbmljYXMvR0hHNzAwMEUucGRmIiwiaWF0IjoxNzU4MDIzODc2LCJleHAiOjIzODg3NDM4NzZ9.Far9Oh9EZUsh_yVuMMrEC98pDyb-tledt5PUKMzGzcI" target="_blank" rel="noreferrer" title={t('ghg7000e.techSheet')}>
            <p className="descargas">{t('ghg7000e.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon" title={t('ghg7000e.userManual')}>
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas" title={t('ghg7000e.userManual')}>
            <p className="descargas">{t('ghg7000e.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GHG7000E = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <Helmet>
        <title>Generador GHG7000E | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Generador portátil GHG7000E de GH Power: máxima potencia y fiabilidad para uso doméstico y profesional. Pide presupuesto ahora."
        />
        <meta
          name="keywords"
          content="generador GHG7000E, generadores portátiles, generadores gasolina, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generador GHG7000E | GH Power" />
        <meta
          property="og:description"
          content="Descubre el generador portátil GHG7000E de GH Power, ideal para uso doméstico y profesional. Pide presupuesto hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/ghg7000e.png" />
        <meta property="og:url" content="https://gh-power.com/productos/ghg7000e" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/ghg7000e" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/ghg7000e" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Generador GHG7000E",
            "description": "Generador portátil GHG7000E de GH Power, diseñado para máxima potencia y fiabilidad en aplicaciones domésticas y profesionales.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/ghg7000e.png",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "url": "https://gh-power.com/productos/ghg7000e"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Power PRP",
                "value": t('ghg7000e.features.powerPRP')
              },
              {
                "@type": "PropertyValue",
                "name": "Power ESP",
                "value": t('ghg7000e.features.powerESP')
              },
              {
                "@type": "PropertyValue",
                "name": "Weight",
                "value": t('ghg7000e.features.weight')
              }
            ],
            "hasAttachment": [
              {
                "@type": "DigitalDocument",
                "name": "Ficha Técnica GHG7000E",
                "url": "https://gh-power.com/docs/LK21B.pdf",
                "description": "Ficha técnica del generador GHG7000E de GH Power."
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt={t('ghg7000e.mainImageAlt')} className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t('ghg7000e.thumbnailAlt', { index: index + 1 })}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('ghg7000e.title')}</h2>
        <p className="product-subtitle">{t('ghg7000e.subtitle')}</p>
        <ul className="product-info">
          <li>{t('ghg7000e.features.powerPRP')}</li>
          <li>{t('ghg7000e.features.powerESP')}</li>
          <li>{t('ghg7000e.features.singlePhase')}</li>
          <li>{t('ghg7000e.features.weight')}</li>
          <li>{t('ghg7000e.features.engine')}</li>
          <li>{t('ghg7000e.features.alternator')}</li>
          <li>{t('ghg7000e.features.fuelCapacity')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('ghg7000e.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default GHG7000E;
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/GH15000DE.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('gh15000de.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('gh15000de.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('gh15000de.specs.structure')}</td>
                <td>{t('gh15000de.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('gh15000de.specs.dimensions')}</td>
                <td>{t('gh15000de.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('gh15000de.specs.weight')}</td>
                <td>{t('gh15000de.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('gh15000de.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('gh15000de.specs.model')}</li>
            <li>{t('gh15000de.specs.frequency')}</li>
            <li>{t('gh15000de.specs.voltage')}</li>
            <li>{t('gh15000de.specs.engineType')}</li>
            <li>{t('gh15000de.specs.engineCapacity')}</li>
            <li>{t('gh15000de.specs.thd')}</li>
            <li>{t('gh15000de.specs.power')}</li>
            <li>{t('gh15000de.specs.tankCapacity')}</li>
            <li>{t('gh15000de.specs.voltageRegulator')}</li>
            <li>{t('gh15000de.specs.soundLevel')}</li>
            <li>{t('gh15000de.specs.certifications')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('gh15000de.manuals')}</h2>
        <div className="doc-item">
          <a href="/docs/LK21B.pdf" className="pdf-icon" title={t('gh15000de.techSheet')}>
            <FaFilePdf />
          </a>
          <a href="https://mfbwfvyokxanubyxamim.supabase.co/storage/v1/object/sign/Fichas%20Tecnicas/Ficha-tecnica-GH15000DE.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YjE0MGYwNC01ZTNkLTRhYzItOGQ3OS02ZWI3YzMzNjNjNDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGaWNoYXMgVGVjbmljYXMvRmljaGEtdGVjbmljYS1HSDE1MDAwREUucGRmIiwiaWF0IjoxNzcxODUwMDQ3LCJleHAiOjIwODcyMTAwNDd9.D3UFHGkX77sfuXW-xvsMXUXOOvG9wlcjx2SL7ZbDxz0" target="_blank" rel="noreferrer" title={t('gh15000de.techSheet')}>
            <p className="descargas">{t('gh15000de.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon" title={t('gh15000de.userManual')}>
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas" title={t('gh15000de.userManual')}>
            <p className="descargas">{t('gh15000de.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GH15000DE = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <Helmet>
        <title>Generador GH15000DE | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Generador portátil GH15000DE de GH Power: alta potencia y fiabilidad para uso doméstico e industrial. Cotiza ahora."
        />
        <meta
          name="keywords"
          content="generador GH15000DE, generadores portátiles, generadores diesel, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generador GH15000DE | GH Power" />
        <meta
          property="og:description"
          content="Descubre el generador portátil GH15000DE de GH Power, ideal para uso doméstico e industrial. Cotiza hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/GH15000DE.png" />
        <meta property="og:url" content="https://gh-power.com/productos/gh15000de" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/gh15000de" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/gh15000de" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Generador GH15000DE",
            "description": "Generador portátil GH15000DE de GH Power, diseñado para alta potencia y fiabilidad en aplicaciones domésticas e industriales.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/GH15000DE.png",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "url": "https://gh-power.com/productos/gh15000de"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Power PRP",
                "value": t('gh15000de.features.powerPRP')
              },
              {
                "@type": "PropertyValue",
                "name": "Power ESP",
                "value": t('gh15000de.features.powerESP')
              },
              {
                "@type": "PropertyValue",
                "name": "Weight",
                "value": t('gh15000de.features.weight')
              }
            ],
            "hasAttachment": [
              {
                "@type": "DigitalDocument",
                "name": "Ficha Técnica GH15000DE",
                "url": "https://gh-power.com/docs/LK21B.pdf",
                "description": "Ficha técnica del generador GH15000DE de GH Power."
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt={t('gh15000de.mainImageAlt')} className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t('gh15000de.thumbnailAlt', { index: index + 1 })}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('gh15000de.title')}</h2>
        <p className="product-subtitle">{t('gh15000de.subtitle')}</p>
        <ul className="product-info">
          <li>{t('gh15000de.features.powerPRP')}</li>
          <li>{t('gh15000de.features.powerESP')}</li>
          <li>{t('gh15000de.features.singlePhase')}</li>
          <li>{t('gh15000de.features.weight')}</li>
          <li>{t('gh15000de.features.engine')}</li>
          <li>{t('gh15000de.features.alternator')}</li>
          <li>{t('gh15000de.features.fuelCapacity')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('gh15000de.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default GH15000DE;
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/4x1-1.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('generator4x1.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('generator4x1.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('generator4x1.specs.structure')}</td>
                <td>{t('generator4x1.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('generator4x1.specs.dimensions')}</td>
                <td>{t('generator4x1.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('generator4x1.specs.weight')}</td>
                <td>{t('generator4x1.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('generator4x1.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('generator4x1.specs.generator')}</li>
            <li>{t('generator4x1.specs.frequency')}</li>
            <li>{t('generator4x1.specs.fuel')}</li>
            <li>{t('generator4x1.specs.voltage')}</li>
            <li>{t('generator4x1.specs.cooling')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('generator4x1.manuals')}</h2>
        <div className="doc-item">
          <a href="/docs/LK21B.pdf" className="pdf-icon">
            <FaFilePdf />
          </a>
          <a href="/docs/LK21B.pdf" target="_blank" rel="noreferrer">
            <p className="descargas">{t('generator4x1.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon">
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas">
            <p className="descargas">{t('generator4x1.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const Generador4x1 = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <Helmet>
        <title>Generador 4x1 | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Descubre el generador 4x1 de GH Power: alta eficiencia, multifuncional, ideal para construcción, industria y más. Cotiza ahora."
        />
        <meta
          name="keywords"
          content="generador 4x1, generadores portátiles, generadores diesel, GH Power, soluciones energéticas, construcción, industria"
        />
        <meta property="og:title" content="Generador 4x1 | GH Power" />
        <meta
          property="og:description"
          content="Generador 4x1 de GH Power: eficiente y multifuncional para construcción, industria y más. Descarga la ficha técnica."
        />
        <meta property="og:image" content="https://gh-power.com/images/4x1-1.png" />
        <meta property="og:url" content="https://gh-power.com/productos/generador4x1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/generador4x1" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/generador4x1" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Generador 4x1",
            "image": "https://gh-power.com/images/4x1-1.png",
            "description": "Generador 4x1 de GH Power, ideal para construcción, industria y más. Alta eficiencia y multifuncionalidad.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "offers": {
              "@type": "Offer",
              "url": "https://gh-power.com/productos/generador4x1",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>

      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt={t('generator4x1.mainImageAlt')} className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t(`generator4x1.thumbnailAlt${index + 1}`)}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('generator4x1.title')}</h2>
        <p className="product-subtitle">{t('generator4x1.subtitle')}</p>
        <ul className="product-info">
          <li>{t('generator4x1.features.powerPRP')}</li>
          <li>{t('generator4x1.features.powerESP')}</li>
          <li>{t('generator4x1.features.singlePhase')}</li>
          <li>{t('generator4x1.features.longLife')}</li>
          <li>{t('generator4x1.features.highEfficiency')}</li>
          <li>{t('generator4x1.features.multifunction')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('generator4x1.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default Generador4x1;
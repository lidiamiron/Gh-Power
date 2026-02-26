import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; 
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/gdg8500se.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('gdg8500se.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('gdg8500se.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('gdg8500se.specs.structure')}</td>
                <td>{t('gdg8500se.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('gdg8500se.specs.dimensions')}</td>
                <td>{t('gdg8500se.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('gdg8500se.specs.weight')}</td>
                <td>{t('gdg8500se.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('gdg8500se.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('gdg8500se.specs.model')}</li>
            <li>{t('gdg8500se.specs.frequency')}</li>
            <li>{t('gdg8500se.specs.voltage')}</li>
            <li>{t('gdg8500se.specs.powerFactor')}</li>
            <li>{t('gdg8500se.specs.engineCapacity')}</li>
            <li>{t('gdg8500se.specs.dcOutput')}</li>
            <li>{t('gdg8500se.specs.phases')}</li>
            <li>{t('gdg8500se.specs.startingSystem')}</li>
            <li>{t('gdg8500se.specs.engineCooling')}</li>
            <li>{t('gdg8500se.specs.autonomy')}</li>
            <li>{t('gdg8500se.specs.unitsPerContainer')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('gdg8500se.manuals')}</h2>
        <div className="doc-item">
          <a href="/docs/LK21B.pdf" className="pdf-icon" title={t('gdg8500se.techSheet')}>
            <FaFilePdf />
          </a>
          <a href="https://mfbwfvyokxanubyxamim.supabase.co/storage/v1/object/sign/Fichas%20Tecnicas/GDG%20SERIES-2_compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YjE0MGYwNC01ZTNkLTRhYzItOGQ3OS02ZWI3YzMzNjNjNDUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJGaWNoYXMgVGVjbmljYXMvR0RHIFNFUklFUy0yX2NvbXByZXNzZWQucGRmIiwiaWF0IjoxNzcyMDE2Nzk0LCJleHAiOjI0MDI3MzY3OTR9.d-x7g4XZI8auPycFx-Yh_OGIkgcovxfk9CDBJaxpRzo" target="_blank" rel="noreferrer" title={t('gdg8500se.techSheet')}>
            <p className="descargas">{t('gdg8500se.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon" title={t('gdg8500se.userManual')}>
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas" title={t('gdg8500se.userManual')}>
            <p className="descargas">{t('gdg8500se.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GDG8500SE = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      <Helmet>
        <title>Generador GDG8500SE | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Generador portátil GDG8500SE de GH Power: compacto y eficiente para uso doméstico e industrial. Pide presupuesto ahora."
        />
        <meta
          name="keywords"
          content="generador GDG8500SE, generadores portátiles, generadores diesel, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generador GDG8500SE | GH Power" />
        <meta
          property="og:description"
          content="Descubre el generador portátil GDG8500SE de GH Power, ideal para uso doméstico e industrial. Pide presupuesto hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/gdg8500se.png" />
        <meta property="og:url" content="https://gh-power.com/productos/gdg8500se" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/gdg8500se" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/gdg8500se" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Generador GDG8500SE",
            "description": "Generador portátil GDG8500SE de GH Power, diseñado para ser compacto y eficiente en aplicaciones domésticas e industriales.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/gdg8500se.png",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "EUR",
              "url": "https://gh-power.com/productos/gdg8500se"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Power PRP",
                "value": t('gdg8500se.features.powerPRP')
              },
              {
                "@type": "PropertyValue",
                "name": "Power ESP",
                "value": t('gdg8500se.features.powerESP')
              },
              {
                "@type": "PropertyValue",
                "name": "Weight",
                "value": t('gdg8500se.features.weight')
              }
            ],
            "hasAttachment": [
              {
                "@type": "DigitalDocument",
                "name": "Ficha Técnica GHD3000E",
                "url": "https://gh-power.com/docs/LK21B.pdf",
                "description": "Ficha técnica del generador GDG8500SE de GH Power."
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt={t('gdg8500se.mainImageAlt')} className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={t('gdg8500se.thumbnailAlt', { index: index + 1 })}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('gdg8500se.title')}</h2>
        <p className="product-subtitle">{t('gdg8500se.subtitle')}</p>
        <ul className="product-info">
          <li>{t('gdg8500se.features.powerPRP')}</li>
          <li>{t('gdg8500se.features.powerESP')}</li>
          <li>{t('gdg8500se.features.singlePhase')}</li>
          <li>{t('gdg8500se.features.weight')}</li>
          <li>{t('gdg8500se.features.engine')}</li>
          <li>{t('gdg8500se.features.alternator')}</li>
          <li>{t('gdg8500se.features.fuelCapacity')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('gdg8500se.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default GDG8500SE;
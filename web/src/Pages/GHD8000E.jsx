import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";
import generatormain from "../assets/ghd8000.png";

// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");
  const { t } = useTranslation();

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">{t('ghd8000e.technicalSpecs')}</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>{t('ghd8000e.structure')}</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr>
                <td>{t('ghd8000e.specs.structure')}</td>
                <td>{t('ghd8000e.specs.structureValue')}</td>
              </tr>
              <tr>
                <td>{t('ghd8000e.specs.dimensions')}</td>
                <td>{t('ghd8000e.specs.dimensionsValue')}</td>
              </tr>
              <tr>
                <td>{t('ghd8000e.specs.weight')}</td>
                <td>{t('ghd8000e.specs.weightValue')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>{t('ghd8000e.motor')}</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
          <ul className="specs-list">
            <li>{t('ghd8000e.specs.model')}</li>
            <li>{t('ghd8000e.specs.frequency')}</li>
            <li>{t('ghd8000e.specs.voltage')}</li>
            <li>{t('ghd8000e.specs.powerFactor')}</li>
            <li>{t('ghd8000e.specs.engineCapacity')}</li>
            <li>{t('ghd8000e.specs.dcOutput')}</li>
            <li>{t('ghd8000e.specs.phases')}</li>
            <li>{t('ghd8000e.specs.startingSystem')}</li>
            <li>{t('ghd8000e.specs.engineCooling')}</li>
            <li>{t('ghd8000e.specs.autonomy')}</li>
            <li>{t('ghd8000e.specs.unitsPerContainer')}</li>
          </ul>
        )}
      </div>

      <div className="docs-block">
        <h2 className="docs-title">{t('ghd8000e.manuals')}</h2>
        <div className="doc-item">
          <a href="/docs/LK21B.pdf" className="pdf-icon">
            <FaFilePdf />
          </a>
          <a href="/docs/LK21B.pdf" target="_blank" rel="noreferrer">
            <p className="descargas">{t('ghd8000e.techSheet')}</p>
          </a>
        </div>
        <div className="doc-item">
          <a href="#" className="pdf-icon">
            <FaFilePdf />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas">
            <p className="descargas">{t('ghd8000e.userManual')}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GHD8000E = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  return (
    <section className="gallery-section" ref={sectionRef}>
      {/* Galería e info técnica a la izquierda */}
      <div className="gallery-left">
        <img src={selectedImage} alt="Principal" className="main-image" />
        <div className="thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Miniatura ${index + 1}`}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
        <ProductSpecs />
      </div>

      {/* Parte derecha sticky */}
      <div className="gallery-right">
        <h2 className="product-title">{t('ghd8000e.title')}</h2>
        <p className="product-subtitle">{t('ghd8000e.subtitle')}</p>
        <ul className="product-info">
          <li>{t('ghd8000e.features.powerPRP')}</li>
          <li>{t('ghd8000e.features.powerESP')}</li>
          <li>{t('ghd8000e.features.singlePhase')}</li>
          <li>{t('ghd8000e.features.weight')}</li>
          <li>{t('ghd8000e.features.engine')}</li>
          <li>{t('ghd8000e.features.alternator')}</li>
          <li>{t('ghd8000e.features.fuelCapacity')}</li>
        </ul>
        <a href="/Contacto">
          <button className="product-button">
            {t('ghd8000e.contactButton')}
          </button>
        </a>
      </div>
    </section>
  );
};

export default GHD8000E;
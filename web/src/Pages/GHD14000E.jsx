import React, { useState, useRef } from "react";
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";


import generatormain from "../assets/ghd14000.png";


// Subcomponente para especificaciones
const ProductSpecs = () => {
  const [openSection, setOpenSection] = useState("estructura");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="specs-container">
      <h2 className="specs-title">Especificaciones Técnicas</h2>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("estructura")}>
          <h3>Estructura</h3>
          <span>{openSection === "estructura" ? "↑" : "↓"}</span>
        </div>
        {openSection === "estructura" && (
          <table className="specs-table">
            <tbody>
              <tr><td>Estructura:</td><td>Abierta</td></tr>
              <tr><td>Dimensiones:</td><td>811 x 547 x 715 mm</td></tr>
              <tr><td>Peso neto:</td><td>154 kg</td></tr>
              
              
            </tbody>
          </table>
        )}
      </div>

      <div className="specs-block">
        <div className="specs-header" onClick={() => toggleSection("motor")}>
          <h3>Motor</h3>
          <span>{openSection === "motor" ? "↑" : "↓"}</span>
        </div>
        {openSection === "motor" && (
  <ul className="specs-list">
    <li>Modelo: GHD14000E</li>
    <li>Frecuencia (Hz): 50/60</li>
    <li>Voltaje (V): 230-400</li>
    <li>Factor de potencia: 1/0.8</li>
    <li>Capacidad Motor (cc): 762</li>
    <li>Salida DC (V/A): 12/8.3</li>
    <li>Fases:1/3</li>
    <li>Sistema de arranque: Eléctrico</li>
    <li>Enfriamiento de Motor: Aire</li>
    <li>Autonomia (h): 7.5</li>
    <li>Und x 20 ft: 84</li>
  </ul>
)}
      </div>
      


      <div className="docs-block">
        <h2 className="docs-title">Manuales y documentos</h2>
        <div className="doc-item" ><a href="/docs/LK21B.pdf" className="pdf-icon"><FaFilePdf /></a>
          <a href="/docs/LK21B.pdf" target="_blank" rel="noreferrer" >
           
 <p className="descargas">Ficha técnica</p>
          </a>
        </div>
        <div className="doc-item"><a href="" className="pdf-icon"><FaFilePdf /></a>
          <a href="#" target="_blank" rel="noreferrer" className="descargas">
          
            <p className="descargas">Manual de usuario</p>
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const GHD14000E = () => {
  const images = [generatormain];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const sectionRef = useRef(null);

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
        <h2 className="product-title">GHD14000E</h2>
        <p className="product-subtitle">Monofásico</p>
        <ul className="product-info">
          <li>⚡ Potencia PRP: 10kW / 11kVA</li>
          <li>⚡ Potencia ESP: 11kW / 12kVA</li>
          <li>🔌 Monofásico</li>
          <li>⚖️ 154 Kg</li>
          <li>✔️ Motor DE1105FE</li>
          <li>✔️ Alternador de alto rendimiento</li>
          <li>✔️ Capacidad de combustible: 20 L</li>
        </ul>
        <a href="http://localhost:5173/Contacto"><button className="product-button">Contactanos→</button></a>
      </div>
    </section>
  );
};

export default GHD14000E;

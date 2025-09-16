import React, { useState, useRef } from "react";
import "./portatiles.css";
import { FaFilePdf } from "react-icons/fa";


import generatormain from "../assets/4x1-1.png";


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
              <tr><td>Dimensiones:</td><td>950 x 800 x 1050 mm</td></tr>
              <tr><td>Peso neto:</td><td>220 kg</td></tr>
              
              
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
    <li>Generador 4x1</li>
    <li>Frecuencia (Hz): 50/60</li>
    <li>Combustible: GASOLINA</li>
    <li>Voltaje(V): 220</li>
    <li>Refrigeración: Aire</li>
    
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
const generador4x1 = () => {
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
        <h2 className="product-title">Generador 4x1</h2>
        <p className="product-subtitle">Monofásico</p>
        <ul className="product-info">
          <li>⚡ Potencia PRP: 5000W</li>
          <li>⚡ Potencia ESP: 5500W</li>
          <li>🔌 Monofásico</li>
          <li>✔️ Motor de válvulas en cabeza de larga duración</li>
          <li>✔️ Alternador de alto rendimiento</li>
          <li>✔️ Multifunciones: generador, soldador, compresor de aire, torre de iluminación</li>
        </ul>
        <a href="http://localhost:5173/Contacto"><button className="product-button">Contactanos→</button></a>
      </div>
    </section>
  );
};

export default generador4x1;

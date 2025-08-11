import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../pages/Productos.css";


import generador from "../assets/4x1-1.png";
import GHD2000 from "../assets/ghd2000.png";
import GHD3000 from "../assets/ghd3000.png";
import GHD6000 from "../assets/ghd6000.png";
import GHD8000 from "../assets/ghd8000.png";
import GHD12000 from "../assets/ghd12000.png";
import GHD10000 from "../assets/ghd10000.png";
import GHD13000 from "../assets/ghd13000.png";
import GHD13500 from "../assets/ghd13500.png";
import GHD14000 from "../assets/ghd14000.png";
import GHG2500E from "../assets/GHG2500E.png";
import GHG3000E from "../assets/GHG3000E.png";
import GHG3500E from "../assets/GHG3500E.png";
import GHG3800E from "../assets/GHG3800E.png";
import GHG6000E from "../assets/GHG6000E.png";
import GHG7000E from "../assets/GHG7000E.png";
import GHG7500E from "../assets/GHG7500E.png";
import GHG9000E from "../assets/GHG9000E.png";
import GHG10000E from "../assets/GHG10000E.png";

const products = [
  { name: "4x1", power: "21kVA", powerValue: 21, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage: ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: generador },
  { name: "GHD2000", power: "25kVA", powerValue: 25, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD2000 },
  { name: "GHD3000", power: "36kVA", powerValue: 36, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD3000 },
  { name: "GHD6000", power: "44kVA", powerValue: 44, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD6000 },
  { name: "GHD8000", power: "50kVA", powerValue: 50, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD8000 },
  { name: "GHD10000", power: "72kVA", powerValue: 72, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD12000 },
  { name: "GHD12000", power: "88kVA", powerValue: 88, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD10000 },
  { name: "GHD13000", power: "110kVA", powerValue: 110, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD13000 },
  { name: "GHD13500", power: "150kVA", powerValue: 150, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD13500 },
  { name: "GHD14000", power: "165kVA", powerValue: 165, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHD14000 },
  { name: "GHG2500E", power: "188kVA", powerValue: 188, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG2500E },
  { name: "GHG3000E", power: "250kVA", powerValue: 250, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG3000E },
  { name: "GHG3500E", power: "21kVA", powerValue: 21, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage: ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG3500E},
  { name: "GHG3800E", power: "25kVA", powerValue: 25, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG3800E },
  { name: "GHG6000E", power: "36kVA", powerValue: 36, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG6000E},
  { name: "GHG7000E", power: "44kVA", powerValue: 44, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG7000E },
  { name: "GHG7500E", power: "50kVA", powerValue: 50, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image: GHG7500E },
  { name: "GHG9000E", power: "72kVA", powerValue: 72, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image:  GHG9000E},
  { name: "GHG10000E", power: "88kVA", powerValue: 88, type: "Trifásico", fuel: "Diesel", frequency: "50", voltage:  ["380/220V", "400/230V", "415/240V" ], phase: "Three", image:  GHG10000E},

];

function ProductGrid() {
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");
  const [applyFilters, setApplyFilters] = useState(false);

  const handleSearch = () => setApplyFilters(true);

  const filteredProducts = products.filter((product) => {
    if (!applyFilters) return true;

    const matchesFuel = selectedFuel === "All" || product.fuel === selectedFuel;
    const matchesFrequency = selectedFrequency === "All" || product.frequency === selectedFrequency;
    const matchesVoltage = selectedVoltage === "All" || product.voltage.includes(selectedVoltage);
    const matchesPhase = selectedPhase === "All" || product.phase === selectedPhase;
    const matchesPower = selectedPower === "All" || product.powerValue === parseInt(selectedPower);

    return matchesFuel && matchesFrequency && matchesVoltage && matchesPhase && matchesPower;
  });

  return (
    <div className="product-wrapper">
      <div className="product-container">
        <h2>GENERADORES INDUSTRIALES</h2>
        <p className="product-description">
          Especializados en motores de alta gama, generadores de combustible alternativo y diésel. Nuestros motores entran al mercado a competir gracias a su eficiencia y prestaciones de alto rendimiento.
        </p>

        {/* FILTROS */}
        <div className="filter-panel">
          <div className="filter-group">
            <span>Combustible:</span>
            <button onClick={() => setSelectedFuel("Diesel")} className={selectedFuel === "Diesel" ? "active" : ""}>Diesel</button>
            <button onClick={() => setSelectedFuel("Gas")} className={selectedFuel === "Gas" ? "active" : ""}>Gas</button>
            <button onClick={() => setSelectedFuel("All")} className={selectedFuel === "All" ? "active" : ""}>Todos</button>
          </div>

          <div className="filter-group">
            <span>Frecuencia:</span>
            <button onClick={() => setSelectedFrequency("50")} className={selectedFrequency === "50" ? "active" : ""}>50 Hz</button>
            <button onClick={() => setSelectedFrequency("60")} className={selectedFrequency === "60" ? "active" : ""}>60 Hz</button>
            <button onClick={() => setSelectedFrequency("All")} className={selectedFrequency === "All" ? "active" : ""}>Todas</button>
          </div>

          <div className="filter-group">
            <label>Voltaje:</label>
            <select value={selectedVoltage} onChange={(e) => setSelectedVoltage(e.target.value)}>
              <option value="All">Todos</option>
              <option value="380/220V">380/220V</option>
              <option value="400/230V">400/230V</option>
              <option value="415/240V">415/240V</option>
            </select>
          </div>

          <div className="filter-group">
            <span>Fase:</span>
            <button onClick={() => setSelectedPhase("Single")} className={selectedPhase === "Single" ? "active" : ""}>Monofásico</button>
            <button onClick={() => setSelectedPhase("Three")} className={selectedPhase === "Three" ? "active" : ""}>Trifásico</button>
            <button onClick={() => setSelectedPhase("All")} className={selectedPhase === "All" ? "active" : ""}>Todas</button>
          </div>

          <div className="filter-group">
            <label>Potencia:</label>
            <select value={selectedPower} onChange={(e) => setSelectedPower(e.target.value)}>
              <option value="All">Todas</option>
              {[21, 25, 36, 44, 50, 72, 88, 110, 150, 165, 188, 250].map((kva) => (
                <option key={kva} value={kva}>{kva} kVA</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <button onClick={handleSearch} className="search-button">Buscar</button>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <Link to={`/productos/${product.name}`} className="product-card" key={index}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-power">
                ⚡ {product.power} - <span>{product.type}</span>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-subtitle">GRUPOS<br /> ELECTROGENOS</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;

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
  { name: "4x1", powerKVA: "", powerValueKVA: 21, powerKW: "16.8kW", powerValueKW: 16.8, powerW: "5500W", powerValueW: 5500, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["220V"], phase: "Monofásico", image: generador },
  { name: "GHD2000", powerKVA: "", powerValueKVA: 25, powerKW: "2.0/2.2kW", powerValueKW: 2.2, powerW: "", powerValueW: 20000, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD2000 },
  { name: "GHD3000", powerKVA: "", powerValueKVA: 36, powerKW: "3.0/3.3", powerValueKW: 3.3, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["110/240V"], phase: "Monofásico", image: GHD3000 },
  { name: "GHD6000", powerKVA: "", powerValueKVA: 36, powerKW: "5.0/5.5", powerValueKW: 5.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["110/240V"], phase: "Monofásico", image: GHD6000 },
  { name: "GHD8000", powerKVA: "", powerValueKVA: 36, powerKW: "5.5/6.0", powerValueKW: 6.0, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD8000 },
  { name: "GHD10000", powerKVA: "", powerValueKVA: 36, powerKW: "7.0/7.7", powerValueKW: 7.7, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD10000 },
  { name: "GHD12000",  powerKVA: "", powerValueKVA: 36, powerKW: "8.0/8.8", powerValueKW: 8.8, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD12000 },
  { name: "GHD13000", powerKVA: "", powerValueKVA: 36, powerKW: "9.0/10", powerValueKW: 10, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD13000 },
  { name: "GHD13500", ppowerKVA: "", powerValueKVA: 36, powerKW: "10/11", powerValueKW: 11, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD13500 },
  { name: "GHD14000", powerKVA: "", powerValueKVA: 36, powerKW: "11/12", powerValueKW: 12, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Diesel", frequencies: ["50", "60"], voltage: ["230/400V"], phase: "Monofásico", image: GHD14000 },
  { name: "GHG2500E", powerKVA: "", powerValueKVA: 36, powerKW: "2/2.2", powerValueKW: 2.2, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG2500E },
  { name: "GHG3000E", powerKVA: "", powerValueKVA: 36, powerKW: "2.5/2.8", powerValueKW: 2.8, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG3000E },
  { name: "GHG3500E", powerKVA: "", powerValueKVA: 36, powerKW: "3/3.3", powerValueKW: 3.3, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG3500E },
  { name: "GHG3800E", powerKVA: "", powerValueKVA: 36, powerKW: "3.2/3.6", powerValueKW: 3.6, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG3800E },
  { name: "GHG6000E", powerKVA: "", powerValueKVA: 36, powerKW: "5/5.5", powerValueKW: 5.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG6000E },
  { name: "GHG7000E", powerKVA: "", powerValueKVA: 36, powerKW: "6/6.5", powerValueKW: 6.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG7000E },
  { name: "GHG7500E", powerKVA: "", powerValueKVA: 36, powerKW: "6/6.5", powerValueKW: 6.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG7500E },
  { name: "GHG9000E", powerKVA: "", powerValueKVA: 36, powerKW: "7/7.5", powerValueKW: 7.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG9000E },
  { name: "GHG10000E", powerKVA: "", powerValueKVA: 36, powerKW: "8/8.5", powerValueKW: 8.5, powerW: "", powerValueW: 28800, type: "Monofásico", fuel: "Gasolina", frequencies: ["50", "60"], voltage: ["230V"], phase: "Monofásico", image: GHG10000E },
];

function ProductGrid() {
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");
  const [selectedPowerUnit, setSelectedPowerUnit] = useState("kVA"); // Default to kVA
  const [applyFilters, setApplyFilters] = useState(false);

  const handleSearch = () => setApplyFilters(true);

  // Unique power values based on selected unit
  const powerValues = {
    kVA: [...new Set(products.map(p => p.powerValueKVA))].sort((a, b) => a - b),
    kW: [...new Set(products.map(p => p.powerValueKW))].sort((a, b) => a - b),
    W: [...new Set(products.map(p => p.powerValueW))].sort((a, b) => a - b),
  };

  const filteredProducts = products.filter((product) => {
    if (!applyFilters) return true;

    const matchesFuel = selectedFuel === "All" || product.fuel === selectedFuel;
    const matchesFrequency = selectedFrequency === "All" || product.frequencies.includes(selectedFrequency);
    const matchesVoltage = selectedVoltage === "All" || product.voltage.includes(selectedVoltage);
    const matchesPhase = selectedPhase === "All" || product.phase === selectedPhase;
    const matchesPower = selectedPower === "All" || (
      selectedPowerUnit === "kVA" ? product.powerValueKVA === parseFloat(selectedPower) :
      selectedPowerUnit === "kW" ? product.powerValueKW === parseFloat(selectedPower) :
      product.powerValueW === parseFloat(selectedPower)
    );

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
            <button onClick={() => setSelectedFuel("Gasolina")} className={selectedFuel === "Gasolina" ? "active" : ""}>Gasolina</button>
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
              <option value="220V">220V</option>
              <option value="380/220V">380/220V</option>
              <option value="400/230V">400/230V</option>
              <option value="415/240V">415/240V</option>
              <option value="230/400V">230/400V</option>
              <option value="110/240V">110/240V</option>
              <option value="230/400V">230/400V</option>
              <option value="230V">230V</option>
            </select>
          </div>

          <div className="filter-group">
            <span>Fase:</span>
            <button onClick={() => setSelectedPhase("Monofásico")} className={selectedPhase === "Monofásico" ? "active" : ""}>Monofásico</button>
            <button onClick={() => setSelectedPhase("Trifásico")} className={selectedPhase === "Trifásico" ? "active" : ""}>Trifásico</button>
            <button onClick={() => setSelectedPhase("All")} className={selectedPhase === "All" ? "active" : ""}>Todas</button>
          </div>

          <div className="filter-group">
            <label>Unidad de Potencia:</label>
            <select value={selectedPowerUnit} onChange={(e) => { setSelectedPowerUnit(e.target.value); setSelectedPower("All"); }}>
              <option value="kVA">kVA</option>
              <option value="kW">kW</option>
              <option value="W">W</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Potencia:</label>
            <select value={selectedPower} onChange={(e) => setSelectedPower(e.target.value)}>
              <option value="All">Todas</option>
              {powerValues[selectedPowerUnit].map((value) => (
                <option key={value} value={value}>{value} {selectedPowerUnit}</option>
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
                ⚡ {selectedPowerUnit === "kVA" ? product.powerKVA : selectedPowerUnit === "kW" ? product.powerKW : product.powerW} - <span>{product.type}</span>
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
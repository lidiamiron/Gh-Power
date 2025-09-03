import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/Productos.css";
import { createClient } from '@supabase/supabase-js';

// Configurar cliente de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedPower, setSelectedPower] = useState("All");
  const [selectedPowerUnit, setSelectedPowerUnit] = useState("kVA");
  const [applyFilters, setApplyFilters] = useState(false);
  const [selectedEngineBrand, setSelectedEngineBrand] = useState("All");
  const [selectedEngineModel, setSelectedEngineModel] = useState("All");

  // Cargar productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('*');
        
        if (error) {
          throw error;
        }
        
        // Transformar datos para mantener compatibilidad con el código existente
        const transformedData = data.map(item => ({
          id: item.id,
          name: item.modelo_motor || '',
          powerKVA: item.prime_power_kva ? `${item.prime_power_kva}kVA` : '',
          powerValueKVA: item.prime_power_kva || 0,
          powerKW: item.prime_power_kw ? `${item.prime_power_kw}kW` : '',
          powerValueKW: item.prime_power_kw || 0,
          powerW: '', // No tenemos este campo en la BD, pero mantenemos compatibilidad
          powerValueW: 0,
          type: item.phase || '',
          fuel: item.fuel || '',
          frequencies: item.frequencies ? item.frequencies.split(',') : [],
          voltage: item.voltage ? item.voltage.split(',') : [],
          phase: item.phase || '',
          image: item.image_url || '',
          engineBrand: item.marca_motor || '',
          engineModel: item.engine_model || ''
        }));
        
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => setApplyFilters(true);

  // Obtener valores únicos para los filtros
  const fuels = [...new Set(products.map(p => p.fuel))].filter(Boolean);
  const frequencies = [...new Set(products.flatMap(p => p.frequencies))].filter(Boolean);
  const voltages = [...new Set(products.flatMap(p => p.voltage))].filter(Boolean);
  const phases = [...new Set(products.map(p => p.phase))].filter(Boolean);
  const engineBrands = [...new Set(products.map(p => p.engineBrand))].filter(Boolean);
  
  // Obtener modelos de motor según la marca seleccionada
  const engineModels = selectedEngineBrand === "All" 
    ? [...new Set(products.map(p => p.engineModel))].filter(Boolean)
    : [...new Set(products.filter(p => p.engineBrand === selectedEngineBrand).map(p => p.engineModel))].filter(Boolean);

  // Valores de potencia según la unidad seleccionada
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
    
    const matchesEngineBrand = selectedEngineBrand === "All" || product.engineBrand === selectedEngineBrand;
    const matchesEngineModel = selectedEngineModel === "All" || product.engineModel === selectedEngineModel;

    return matchesFuel && matchesFrequency && matchesVoltage && matchesPhase && 
           matchesPower && matchesEngineBrand && matchesEngineModel;
  });

  if (loading) {
    return <div className="product-wrapper">Cargando productos...</div>;
  }

  return (
    <div className="product-wrapper">
      <div className="product-container">
        <h2>GENERADORES INDUSTRIALES</h2>
        <p className="product-description">
          Especializados en motores de alta gama, generadores de combustible alternativo y diésel. 
          Nuestros motores entran al mercado a competir gracias a su eficiencia y prestaciones de alto rendimiento.
        </p>

        {/* FILTROS */}
        <div className="filter-panel">
          <div className="filter-group">
            <span>Combustible:</span>
            <button onClick={() => setSelectedFuel("All")} className={selectedFuel === "All" ? "active" : ""}>
              Todos
            </button>
            {fuels.map(fuel => (
              <button 
                key={fuel} 
                onClick={() => setSelectedFuel(fuel)} 
                className={selectedFuel === fuel ? "active" : ""}
              >
                {fuel}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span>Frecuencia:</span>
            <button onClick={() => setSelectedFrequency("All")} className={selectedFrequency === "All" ? "active" : ""}>
              Todas
            </button>
            {frequencies.map(freq => (
              <button 
                key={freq} 
                onClick={() => setSelectedFrequency(freq)} 
                className={selectedFrequency === freq ? "active" : ""}
              >
                {freq} Hz
              </button>
            ))}
          </div>

          <div className="filter-group">
            <label>Voltaje:</label>
            <select value={selectedVoltage} onChange={(e) => setSelectedVoltage(e.target.value)}>
              <option value="All">Todos</option>
              {voltages.map(voltage => (
                <option key={voltage} value={voltage}>{voltage}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <span>Fase:</span>
            <button onClick={() => setSelectedPhase("All")} className={selectedPhase === "All" ? "active" : ""}>
              Todas
            </button>
            {phases.map(phase => (
              <button 
                key={phase} 
                onClick={() => setSelectedPhase(phase)} 
                className={selectedPhase === phase ? "active" : ""}
              >
                {phase}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <label>Unidad de Potencia:</label>
            <select 
              value={selectedPowerUnit} 
              onChange={(e) => {
                setSelectedPowerUnit(e.target.value);
                setSelectedPower("All");
              }}
            >
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
                <option key={value} value={value}>
                  {value} {selectedPowerUnit}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Marca del Motor:</label>
            <select 
              value={selectedEngineBrand} 
              onChange={(e) => {
                setSelectedEngineBrand(e.target.value);
                setSelectedEngineModel("All");
              }}
            >
              <option value="All">Todas</option>
              {engineBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Modelo del Motor:</label>
            <select 
              value={selectedEngineModel} 
              onChange={(e) => setSelectedEngineModel(e.target.value)}
            >
              <option value="All">Todos</option>
              {engineModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <button onClick={handleSearch} className="search-button">
              Buscar
            </button>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <Link to={`/productos/${product.name}`} className="product-card" key={index}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-power">
                ⚡ {selectedPowerUnit === "kVA" ? product.powerKVA : 
                    selectedPowerUnit === "kW" ? product.powerKW : 
                    product.powerW} - <span>{product.type}</span>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-subtitle">GRUPOS<br />ELECTROGENOS</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
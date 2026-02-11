import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import "../pages/Productos.css";
import { createClient } from '@supabase/supabase-js';

// Configurar cliente de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de los filtros en el nuevo orden
  const [selectedEngineBrand, setSelectedEngineBrand] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedStandbyPower, setSelectedStandbyPower] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedEngineModel, setSelectedEngineModel] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");

  const [applyFilters, setApplyFilters] = useState(false);
  
  const { t } = useTranslation();

  // Función para generar la URL correcta según el tipo de producto
  const getProductUrl = (product) => {
    const productName = product.name.toLowerCase();
    
    if (productName.includes('4x1') || productName.includes('4en1') || productName.includes('4 en 1')) {
      return `/productos/generador4x1`;
    }
    
    if (product.engineBrand && product.engineBrand.trim() !== '') {
      const engineBrand = product.engineBrand.toLowerCase().trim();
      
      if (engineBrand.includes('cummins')) return `/productos/cummins`;
      if (engineBrand.includes('baudouin')) return `/productos/baudouin`;
      if (engineBrand.includes('perkins')) return `/productos/perkins`;
      if (engineBrand.includes('volvo')) return `/productos/volvo`;
      if (engineBrand.includes('deutz')) return `/productos/deutz`;
      
      return `/productos/${engineBrand.replace(/\s+/g, '-')}`;
    }
    
    const fuelType = product.fuel.toLowerCase() === 'diesel' ? 'diesel' : 'gasolina';
    return `/productos/generadores-portatiles/${fuelType}/${product.name}`;
  };

  // Cargar productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('*');
        
        if (error) throw error;

        const transformedData = data.map(item => {
          const standbyKVA = item.standby_kva != null ? parseFloat(item.standby_kva) : 0;
          return {
            id: item.id,
            name: item.modelo_motor || '',
            powerKVA: standbyKVA ? `${standbyKVA}kVA` : 'N/A',
            standbyPowerKVA: standbyKVA,
            powerKW: item.prime_power_kw ? `${parseFloat(item.prime_power_kw)}kW` : 'N/A',
            powerValueKW: parseFloat(item.prime_power_kw) || 0,
            type: item.phase || '',
            fuel: item.fuel || '',
            frequencies: item.frequencies ? item.frequencies.split(',').map(v => v.trim()) : [],
            voltage: item.voltage ? item.voltage.split(',').map(v => v.trim()) : [],
            phase: item.phase || '',
            image: item.image_url || '',
            engineBrand: item.marca_motor || '',
            engineModel: item.engine_model || ''
          };
        });
        
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ────────────────────────────────────────────────
  //                 FILTROS EN CASCADA
  // ────────────────────────────────────────────────
  const filteredByEngineBrand = products.filter(p => 
    selectedEngineBrand === "All" || p.engineBrand === selectedEngineBrand
  );

  const filteredByFrequency = filteredByEngineBrand.filter(p => 
    selectedFrequency === "All" || p.frequencies.includes(selectedFrequency)
  );

  const filteredByPhase = filteredByFrequency.filter(p => 
    selectedPhase === "All" || p.phase === selectedPhase
  );

  const filteredByStandbyPower = filteredByPhase.filter(p => 
    selectedStandbyPower === "All" || p.standbyPowerKVA === parseFloat(selectedStandbyPower)
  );

  const filteredByVoltage = filteredByStandbyPower.filter(p => 
    selectedVoltage === "All" || p.voltage.includes(selectedVoltage)
  );

  const filteredByEngineModel = filteredByVoltage.filter(p => 
    selectedEngineModel === "All" || p.engineModel === selectedEngineModel
  );

  const finalFilteredProducts = filteredByEngineModel.filter(p => 
    selectedFuel === "All" || p.fuel === selectedFuel
  );

  const displayedProducts = applyFilters ? finalFilteredProducts : products;

  // ────────────────────────────────────────────────
  //            OPCIONES DISPONIBLES (dinámicas)
  // ────────────────────────────────────────────────
  const availableEngineBrands = [...new Set(products.map(p => p.engineBrand))].filter(Boolean);

  const availableFrequencies = [...new Set(filteredByEngineBrand.flatMap(p => p.frequencies))].filter(Boolean);

  const availablePhases = [...new Set(filteredByFrequency.map(p => p.phase))].filter(Boolean);

  const availableStandbyPowers = [...new Set(filteredByPhase.map(p => p.standbyPowerKVA))]
    .filter(val => !isNaN(val) && val !== 0)
    .sort((a, b) => a - b);

  const availableVoltages = [...new Set(filteredByStandbyPower.flatMap(p => p.voltage))].filter(Boolean);

  const availableEngineModels = [...new Set(filteredByVoltage.map(p => p.engineModel))].filter(Boolean);

  const availableFuels = [...new Set(filteredByEngineModel.map(p => p.fuel))].filter(Boolean);

  const handleSearch = () => setApplyFilters(true);

  // Resetear filtros inferiores cuando cambian los superiores
  const handleEngineBrandChange = (value) => {
    setSelectedEngineBrand(value);
    setSelectedFrequency("All");
    setSelectedPhase("All");
    setSelectedStandbyPower("All");
    setSelectedVoltage("All");
    setSelectedEngineModel("All");
    setSelectedFuel("All");
  };

  const handleFrequencyChange = (value) => {
    setSelectedFrequency(value);
    setSelectedPhase("All");
    setSelectedStandbyPower("All");
    setSelectedVoltage("All");
    setSelectedEngineModel("All");
    setSelectedFuel("All");
  };

  const handlePhaseChange = (value) => {
    setSelectedPhase(value);
    setSelectedStandbyPower("All");
    setSelectedVoltage("All");
    setSelectedEngineModel("All");
    setSelectedFuel("All");
  };

  const handleStandbyPowerChange = (value) => {
    setSelectedStandbyPower(value);
    setSelectedVoltage("All");
    setSelectedEngineModel("All");
    setSelectedFuel("All");
  };

  const handleVoltageChange = (value) => {
    setSelectedVoltage(value);
    setSelectedEngineModel("All");
    setSelectedFuel("All");
  };

  const handleEngineModelChange = (value) => {
    setSelectedEngineModel(value);
    setSelectedFuel("All");
  };

  if (loading) {
    return <div className="product-wrapper">{t('products.loading')}</div>;
  }

  return (
    <div className="product-wrapper">
      <Helmet>
        <title>Generadores Portátiles | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Explora nuestra gama de generadores portátiles diesel y gasolina en GH Power. Filtra por combustible, potencia, voltaje y más. Cotiza ahora."
        />
        <meta
          name="keywords"
          content="generadores portátiles, generadores diesel, generadores gasolina, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generadores Portátiles | GH Power" />
        <meta
          property="og:description"
          content="Descubre generadores portátiles diesel y gasolina de GH Power. Filtra por potencia, combustible y más. Cotiza hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/generador.png" />
        <meta property="og:url" content="https://gh-power.com/productos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos" hreflang="en" />
        <link rel="alternate" href="https://gh-power.com/de/productos" hreflang="de" />
        <link rel="alternate" href="https://gh-power.com/fr/productos" hreflang="fr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "name": "Generadores Portátiles GH Power",
            "description": "Gama de generadores portátiles diesel y gasolina de GH Power, con opciones para aplicaciones domésticas e industriales.",
            "brand": { "@type": "Brand", "name": "GH Power" },
            "image": "https://gh-power.com/images/generador.png",
            "hasVariant": displayedProducts.map(product => ({
              "@type": "Product",
              "name": product.name,
              "description": `Generador portátil ${product.name} con ${product.powerKVA} de potencia standby y ${product.fuel} como combustible.`,
              "image": product.image || "https://gh-power.com/images/generador.png",
              "url": `https://gh-power.com${getProductUrl(product)}`,
              "additionalProperty": [
                { "@type": "PropertyValue", "name": "Standby Power kVA", "value": product.powerKVA },
                { "@type": "PropertyValue", "name": "Prime Power kW", "value": product.powerKW },
                { "@type": "PropertyValue", "name": "Fuel", "value": product.fuel },
                { "@type": "PropertyValue", "name": "Phase", "value": product.phase },
                { "@type": "PropertyValue", "name": "Engine Brand", "value": product.engineBrand },
                { "@type": "PropertyValue", "name": "Engine Model", "value": product.engineModel }
              ]
            }))
          })}
        </script>
      </Helmet>

      <div className="product-container">
        <h2>{t('products.title')}</h2>
        <p className="product-description">{t('products.description')}</p>

        {/* FILTROS – nuevo orden */}
        <div className="filter-panel">

          {/* 1. Marca de motor */}
          <div className="filter-group">
            <label>{t('products.filters.engineBrand')}</label>
            <select 
              value={selectedEngineBrand} 
              onChange={(e) => handleEngineBrandChange(e.target.value)}>
              <option value="All">{t('products.filters.allBrands')}</option>
              {availableEngineBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* 2. Frecuencia */}
          <div className="filter-group">
            <span>{t('products.filters.frequency')}</span>
            <button 
              onClick={() => handleFrequencyChange("All")} 
              className={selectedFrequency === "All" ? "active" : ""}>
              {t('products.filters.allFrequencies')}
            </button>
            {availableFrequencies.map(freq => (
              <button 
                key={freq} 
                onClick={() => handleFrequencyChange(freq)} 
                className={selectedFrequency === freq ? "active" : ""}>
                {freq} Hz
              </button>
            ))}
          </div>

          {/* 3. Fase */}
          <div className="filter-group">
            <span>{t('products.filters.phase')}</span>
            <button 
              onClick={() => handlePhaseChange("All")} 
              className={selectedPhase === "All" ? "active" : ""}>
              {t('products.filters.allPhases')}
            </button>
            {availablePhases.map(phase => (
              <button 
                key={phase} 
                onClick={() => handlePhaseChange(phase)} 
                className={selectedPhase === phase ? "active" : ""}>
                {phase}
              </button>
            ))}
          </div>

          {/* 4. Potencia Standby */}
          <div className="filter-group">
            <label>{t('products.filters.standbyPower')}</label>
            <select 
              value={selectedStandbyPower} 
              onChange={(e) => handleStandbyPowerChange(e.target.value)}>
              <option value="All">{t('products.filters.allPowers')}</option>
              {availableStandbyPowers.map(value => (
                <option key={value} value={value}>{value} kVA</option>
              ))}
            </select>
          </div>

          {/* 5. Voltaje */}
          <div className="filter-group">
            <label>{t('products.filters.voltage')}</label>
            <select 
              value={selectedVoltage} 
              onChange={(e) => handleVoltageChange(e.target.value)}>
              <option value="All">{t('products.filters.allVoltages')}</option>
              {availableVoltages.map(voltage => (
                <option key={voltage} value={voltage}>{voltage}</option>
              ))}
            </select>
          </div>

          {/* 6. Modelo de motor */}
          <div className="filter-group">
            <label>{t('products.filters.engineModel')}</label>
            <select 
              value={selectedEngineModel} 
              onChange={(e) => handleEngineModelChange(e.target.value)}>
              <option value="All">{t('products.filters.allModels')}</option>
              {availableEngineModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* 7. Combustible */}
          <div className="filter-group">
            <span>{t('products.filters.fuel')}</span>
            <button 
              onClick={() => setSelectedFuel("All")} 
              className={selectedFuel === "All" ? "active" : ""}>
              {t('products.filters.all')}
            </button>
            {availableFuels.map(fuel => (
              <button 
                key={fuel} 
                onClick={() => setSelectedFuel(fuel)} 
                className={selectedFuel === fuel ? "active" : ""}>
                {fuel}
              </button>
            ))}
          </div>

          {/* Botón Aplicar */}
          <div className="filter-group">
            <button onClick={handleSearch} className="search-button">
              {t('products.filters.search')}
            </button>
          </div>

        </div>

        {/* PRODUCTOS */}
        <div className="product-grid">
          {displayedProducts.map((product, index) => (
            <Link 
              to={getProductUrl(product)}
              className="product-card" 
              key={index}>
              <img 
                src={product.image} 
                alt={t('products.productCard.imageAlt', { name: product.name })} 
                className="product-image" 
              />
              <div className="product-power">
                {t('products.productCard.power')} {product.powerKVA} - <span>{product.type}</span>
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p 
                className="product-subtitle" 
                dangerouslySetInnerHTML={{ 
                  __html: t('products.productCard.subtitle') 
                }} 
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
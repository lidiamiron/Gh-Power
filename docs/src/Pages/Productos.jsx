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
  const [selectedFuel, setSelectedFuel] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedStandbyPower, setSelectedStandbyPower] = useState("All");
  const [applyFilters, setApplyFilters] = useState(false);
  const [selectedEngineBrand, setSelectedEngineBrand] = useState("All");
  const [selectedEngineModel, setSelectedEngineModel] = useState("All");
  
  const { t } = useTranslation();

  // Función para generar la URL correcta según el tipo de producto
  const getProductUrl = (product) => {
    const productName = product.name.toLowerCase();
    
    // Generador 4x1
    if (productName.includes('4x1') || productName.includes('4en1') || productName.includes('4 en 1')) {
      return `/productos/generador4x1`;
    }
    
    // Si tiene marca de motor (engineBrand), es industrial - va a la página de la marca
    if (product.engineBrand && product.engineBrand.trim() !== '') {
      const engineBrand = product.engineBrand.toLowerCase().trim();
      
      if (engineBrand.includes('cummins')) {
        return `/productos/cummins`;
      }
      
      if (engineBrand.includes('baudouin')) {
        return `/productos/baudouin`;
      }
      
      if (engineBrand.includes('perkins')) {
        return `/productos/perkins`;
      }
      
      if (engineBrand.includes('volvo')) {
        return `/productos/volvo`;
      }
      
      if (engineBrand.includes('deutz')) {
        return `/productos/deutz`;
      }
      
      // Si tiene otra marca de motor, usar esa marca
      return `/productos/${engineBrand.replace(/\s+/g, '-')}`;
    }
    
    // Si NO tiene marca de motor, es portátil - va a su página individual
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
        
        if (error) {
          throw error;
        }
        
        console.log('Raw Supabase data:', data);

        const transformedData = data.map(item => {
          const standbyKVA = item.standby_kva != null ? parseFloat(item.standby_kva) : 0;
          console.log('Raw standby_kva:', item.standby_kva, 'Parsed standbyKVA:', standbyKVA);
          const product = {
            id: item.id,
            name: item.modelo_motor || '',
            powerKVA: standbyKVA ? `${standbyKVA}kVA` : 'N/A',
            standbyPowerKVA: standbyKVA,
            powerKW: item.prime_power_kw ? `${parseFloat(item.prime_power_kw)}kW` : 'N/A',
            powerValueKW: parseFloat(item.prime_power_kw) || 0,
            powerW: '',
            powerValueW: 0,
            type: item.phase || '',
            fuel: item.fuel || '',
            frequencies: item.frequencies ? item.frequencies.split(',') : [],
            voltage: item.voltage ? item.voltage.split(',') : [],
            phase: item.phase || '',
            image: item.image_url || '',
            engineBrand: item.marca_motor || '',
            engineModel: item.engine_model || ''
          };
          console.log('Transformed product:', product);
          return product;
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

  const handleSearch = () => setApplyFilters(true);

  // Obtener valores únicos para los filtros
  const fuels = [...new Set(products.map(p => p.fuel))].filter(Boolean);
  const frequencies = [...new Set(products.flatMap(p => p.frequencies))].filter(Boolean);
  const voltages = [...new Set(products.flatMap(p => p.voltage))].filter(Boolean);
  const phases = [...new Set(products.map(p => p.phase))].filter(Boolean);
  const engineBrands = [...new Set(products.map(p => p.engineBrand))].filter(Boolean);
  
  // Obtener valores únicos para Standby Power
  const standbyPowerValues = [...new Set(products.map(p => p.standbyPowerKVA))]
    .filter(val => !isNaN(val) && val !== 0)
    .sort((a, b) => a - b);

  console.log('Standby power values:', standbyPowerValues);

  // Obtener modelos de motor según la marca seleccionada
  const engineModels = selectedEngineBrand === "All" 
    ? [...new Set(products.map(p => p.engineModel))].filter(Boolean)
    : [...new Set(products.filter(p => p.engineBrand === selectedEngineBrand).map(p => p.engineModel))].filter(Boolean);

  const filteredProducts = products.filter((product) => {
    if (!applyFilters) return true;
    
    const matchesFuel = selectedFuel === "All" || product.fuel === selectedFuel;
    const matchesFrequency = selectedFrequency === "All" || product.frequencies.includes(selectedFrequency);
    const matchesVoltage = selectedVoltage === "All" || product.voltage.includes(selectedVoltage);
    const matchesPhase = selectedPhase === "All" || product.phase === selectedPhase;
    const matchesStandbyPower = selectedStandbyPower === "All" || product.standbyPowerKVA === parseFloat(selectedStandbyPower);
    const matchesEngineBrand = selectedEngineBrand === "All" || product.engineBrand === selectedEngineBrand;
    const matchesEngineModel = selectedEngineModel === "All" || product.engineModel === selectedEngineModel;

    console.log('Filtering product:', product.name, 'Standby matches:', matchesStandbyPower);

    return matchesFuel && matchesFrequency && matchesVoltage && matchesPhase && 
           matchesStandbyPower && matchesEngineBrand && matchesEngineModel;
  });

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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "name": "Generadores Portátiles GH Power",
            "description": "Gama de generadores portátiles diesel y gasolina de GH Power, con opciones para aplicaciones domésticas e industriales.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/generador.png",
            "hasVariant": filteredProducts.map(product => ({
              "@type": "Product",
              "name": product.name,
              "description": `Generador portátil ${product.name} con ${product.powerKVA} de potencia standby y ${product.fuel} como combustible.`,
              "image": product.image || "https://gh-power.com/images/generador.png",
              "url": `https://gh-power.com${getProductUrl(product)}`,
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Standby Power kVA",
                  "value": product.powerKVA
                },
                {
                  "@type": "PropertyValue",
                  "name": "Prime Power kW",
                  "value": product.powerKW
                },
                {
                  "@type": "PropertyValue",
                  "name": "Fuel",
                  "value": product.fuel
                },
                {
                  "@type": "PropertyValue",
                  "name": "Phase",
                  "value": product.phase
                },
                {
                  "@type": "PropertyValue",
                  "name": "Engine Brand",
                  "value": product.engineBrand
                },
                {
                  "@type": "PropertyValue",
                  "name": "Engine Model",
                  "value": product.engineModel
                }
              ]
            }))
          })}
        </script>
      </Helmet>
      <div className="product-container">
        <h2>{t('products.title')}</h2>
        <p className="product-description">
          {t('products.description')}
        </p>

        {/* FILTROS */}
        <div className="filter-panel">
          <div className="filter-group">
            <span>{t('products.filters.fuel')}</span>
            <button 
              onClick={() => setSelectedFuel("All")} 
              className={selectedFuel === "All" ? "active" : ""} 
              title={t('products.filters.all')}
            >
              {t('products.filters.all')}
            </button>
            {fuels.map(fuel => (
              <button 
                key={fuel} 
                onClick={() => setSelectedFuel(fuel)} 
                className={selectedFuel === fuel ? "active" : ""} 
                title={fuel}
              >
                {fuel}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <span>{t('products.filters.frequency')}</span>
            <button 
              onClick={() => setSelectedFrequency("All")} 
              className={selectedFrequency === "All" ? "active" : ""} 
              title={t('products.filters.allFrequencies')}
            >
              {t('products.filters.allFrequencies')}
            </button>
            {frequencies.map(freq => (
              <button 
                key={freq} 
                onClick={() => setSelectedFrequency(freq)} 
                className={selectedFrequency === freq ? "active" : ""} 
                title={`${freq} Hz`}
              >
                {freq} Hz
              </button>
            ))}
          </div>

          <div className="filter-group">
            <label>{t('products.filters.voltage')}</label>
            <select 
              value={selectedVoltage} 
              onChange={(e) => setSelectedVoltage(e.target.value)}
              title={t('products.filters.voltage')}
            >
              <option value="All">{t('products.filters.allVoltages')}</option>
              {voltages.map(voltage => (
                <option key={voltage} value={voltage}>{voltage}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <span>{t('products.filters.phase')}</span>
            <button 
              onClick={() => setSelectedPhase("All")} 
              className={selectedPhase === "All" ? "active" : ""} 
              title={t('products.filters.allPhases')}
            >
              {t('products.filters.allPhases')}
            </button>
            {phases.map(phase => (
              <button 
                key={phase} 
                onClick={() => setSelectedPhase(phase)} 
                className={selectedPhase === phase ? "active" : ""} 
                title={phase}
              >
                {phase}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <label>{t('products.filters.standbyPower')}</label>
            <select 
              value={selectedStandbyPower} 
              onChange={(e) => {
                console.log('Selected Standby Power:', e.target.value);
                setSelectedStandbyPower(e.target.value);
              }}
              title={t('products.filters.standbyPower')}
            >
              <option value="All">{t('products.filters.allPowers')}</option>
              {standbyPowerValues.map(value => (
                <option key={value} value={value}>{value} kVA</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>{t('products.filters.engineBrand')}</label>
            <select 
              value={selectedEngineBrand} 
              onChange={(e) => {
                setSelectedEngineBrand(e.target.value);
                setSelectedEngineModel("All");
              }}
              title={t('products.filters.engineBrand')}
            >
              <option value="All">{t('products.filters.allBrands')}</option>
              {engineBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>{t('products.filters.engineModel')}</label>
            <select 
              value={selectedEngineModel} 
              onChange={(e) => setSelectedEngineModel(e.target.value)}
              title={t('products.filters.engineModel')}
            >
              <option value="All">{t('products.filters.allModels')}</option>
              {engineModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <button 
              onClick={handleSearch} 
              className="search-button" 
              title={t('products.filters.search')}
            >
              {t('products.filters.search')}
            </button>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="product-grid">
          {filteredProducts.map((product, index) => (
            <Link 
              to={getProductUrl(product)}
              className="product-card" 
              key={index} 
              title={t('products.productCard.title', { name: product.name })}
            >
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
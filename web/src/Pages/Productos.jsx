// ProductGrid.jsx (sin cambios)
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import "../pages/Productos.css";
import { createClient } from '@supabase/supabase-js';
import { FaGasPump, FaWrench, FaIndustry, FaBolt, FaPlug, FaBatteryFull, FaCogs } from "react-icons/fa";

// Configurar cliente de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

function ProductGrid() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados de los filtros con iniciales desde params
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "All");
  const [selectedEngineBrand, setSelectedEngineBrand] = useState(searchParams.get('engineBrand') || "All");
  const [selectedFrequency, setSelectedFrequency] = useState(searchParams.get('frequency') || "All");
  const [selectedPhase, setSelectedPhase] = useState(searchParams.get('phase') || "All");
  const [selectedStandbyPower, setSelectedStandbyPower] = useState(searchParams.get('standbyPower') || "All");
  const [selectedVoltage, setSelectedVoltage] = useState(searchParams.get('voltage') || "All");
  const [selectedEngineModel, setSelectedEngineModel] = useState(searchParams.get('engineModel') || "All");
  const [selectedFuel, setSelectedFuel] = useState(searchParams.get('fuel') || "All");

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
      if (engineBrand.includes('yanmar')) return `/productos/yanmar`;
      if (engineBrand.includes('fawde')) return `/productos/fawde`;
      if (engineBrand.includes('gh-power')) return `/productos/gh-power`;
      if (engineBrand.includes('doosan')) return `/productos/doosan`;

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
          .select('id, modelo_motor, standby_kva, prime_power_kw, phase, fuel, frequencies, voltage, image_url, marca_motor, engine_model, category, prime_power_kva, ficha_tecnica');

        if (error) throw error;

        const transformedData = data.map(item => {
          const standbyKVA = item.standby_kva != null ? parseFloat(item.standby_kva) : 0;
          const primePowerKVA = item.prime_power_kva != null ? parseFloat(item.prime_power_kva) : 0;
          return {
            id: item.id,
            name: item.modelo_motor || '',
            powerKVA: standbyKVA ? `${standbyKVA}kVA` : 'N/A',
            standbyPowerKVA: standbyKVA,
            primePowerKVA: primePowerKVA,
            powerKW: item.prime_power_kw ? `${parseFloat(item.prime_power_kw)}kW` : 'N/A',
            powerValueKW: parseFloat(item.prime_power_kw) || 0,
            type: item.phase || '',
            fuel: item.fuel || '',
            frequencies: item.frequencies ? item.frequencies.split(',').map(v => v.trim()) : [],
            voltage: item.voltage ? item.voltage.split(',').map(v => v.trim()) : [],
            phase: item.phase || '',
            image: item.image_url || '',
            engineBrand: item.marca_motor || '',
            engineModel: item.engine_model || '',
            category: item.category || 'Sin categoría',
            fichaTecnica: item.ficha_tecnica || ''
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

  // FILTROS EN CASCADA
  const filteredByCategory = products.filter(p =>
    selectedCategory === "All" || (p.category || 'Sin categoría').trim().toLowerCase() === selectedCategory
  );

  const filteredByEngineBrand = filteredByCategory.filter(p =>
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

  const displayedProducts = finalFilteredProducts;

  // OPCIONES DISPONIBLES (dinámicas) + normalización para evitar duplicados
  const availableCategories = [...new Set(
    products.map(p => (p.category || 'Sin categoría').trim().toLowerCase())
  )].filter(Boolean).sort((a, b) => a.localeCompare(b));

  const availableEngineBrands = [...new Set(filteredByCategory.map(p => p.engineBrand))].filter(Boolean);

  const availableFrequencies = [...new Set(filteredByEngineBrand.flatMap(p => p.frequencies))].filter(Boolean);

  const availablePhases = [...new Set(filteredByFrequency.map(p => p.phase))].filter(Boolean);

  const availableStandbyPowers = [...new Set(filteredByPhase.map(p => p.standbyPowerKVA))]
    .filter(val => !isNaN(val) && val !== 0)
    .sort((a, b) => a - b);

  const availableVoltages = [...new Set(filteredByStandbyPower.flatMap(p => p.voltage))].filter(Boolean);

  const availableEngineModels = [...new Set(filteredByVoltage.map(p => p.engineModel))].filter(Boolean);

  const availableFuels = [...new Set(filteredByEngineModel.map(p => p.fuel))].filter(Boolean);

  // Resetear filtros inferiores cuando cambian los superiores
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedEngineBrand("All");
    setSelectedFrequency("All");
    setSelectedPhase("All");
    setSelectedStandbyPower("All");
    setSelectedVoltage("All");
    setSelectedEngineModel("All");
    setSelectedFuel("All");
  };

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
        <title>{t('products.helmet.title')}</title>
        <meta
          name="description"
          content={t('products.helmet.description')}
        />
        <meta
          name="keywords"
          content={t('products.helmet.keywords')}
        />
        <meta property="og:title" content={t('products.helmet.og_title')} />
        <meta
          property="og:description"
          content={t('products.helmet.og_description')}
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
            "name": t('products.helmet.schema_name'),
            "description": t('products.helmet.schema_description'),
            "brand": { "@type": "Brand", "name": "GH Power" },
            "image": "https://gh-power.com/images/generador.png",
            "hasVariant": displayedProducts.map(product => ({
              "@type": "Product",
              "name": product.name,
              "description": t('products.helmet.schema_product_description', { name: product.name, powerKVA: product.powerKVA, fuel: product.fuel }),
              "image": product.image || "https://gh-power.com/images/generador.png",
              "url": `https://gh-power.com${getProductUrl(product)}`,
              "additionalProperty": [
                { "@type": "PropertyValue", "name": t('products.helmet.schema_standby_power_kva'), "value": product.powerKVA },
                { "@type": "PropertyValue", "name": t('products.helmet.schema_prime_power_kw'), "value": product.powerKW },
                { "@type": "PropertyValue", "name": t('products.helmet.schema_fuel'), "value": product.fuel },
                { "@type": "PropertyValue", "name": t('products.helmet.schema_phase'), "value": product.phase },
                { "@type": "PropertyValue", "name": t('products.helmet.schema_engine_brand'), "value": product.engineBrand },
                { "@type": "PropertyValue", "name": t('products.helmet.schema_engine_model'), "value": product.engineModel }
              ]
            }))
          })}
        </script>
      </Helmet>

      <div className="product-container">
        <h2>{t('products.title')}</h2>
        <p className="product-filter-description">{t('products.description')}</p>

        {/* FILTROS – con categoría al principio */}
        <div className="filter-panel">

          {/* 1. Categoría */}
          <div className="filter-group">
            <label><FaIndustry /> {t('products.filters.category')}</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="All">{t('products.filters.all_categories')}</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>
                  {t(`products.categories.${cat}`, { defaultValue: cat.charAt(0).toUpperCase() + cat.slice(1) })}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Marca de motor */}
          <div className="filter-group">
            <label><FaWrench /> {t('products.filters.engineBrand')}</label>
            <select
              value={selectedEngineBrand}
              onChange={(e) => handleEngineBrandChange(e.target.value)}
            >
              <option value="All">{t('products.filters.allBrands')}</option>
              {availableEngineBrands.map(brand => (
                <option key={brand} value={brand}>{t(`products.engine_brands.${brand.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: brand })}</option>
              ))}
            </select>
          </div>

          {/* 3. Frecuencia */}
          <div className="filter-group">
            <span><FaBolt /> {t('products.filters.frequency')}</span>
            <button
              onClick={() => handleFrequencyChange("All")}
              className={selectedFrequency === "All" ? "active" : ""}
            >
              {t('products.filters.allFrequencies')}
            </button>
            {availableFrequencies.map(freq => (
              <button
                key={freq}
                onClick={() => handleFrequencyChange(freq)}
                className={selectedFrequency === freq ? "active" : ""}
              >
                {freq} {t('products.filters.hz')}
              </button>
            ))}
          </div>

          {/* 4. Fase */}
          <div className="filter-group">
            <span><FaPlug /> {t('products.filters.phase')}</span>
            <button
              onClick={() => handlePhaseChange("All")}
              className={selectedPhase === "All" ? "active" : ""}
            >
              {t('products.filters.allPhases')}
            </button>
            {availablePhases.map(phase => (
              <button
                key={phase}
                onClick={() => handlePhaseChange(phase)}
                className={selectedPhase === phase ? "active" : ""}
              >
                {phase}
              </button>
            ))}
          </div>

          {/* 5. Potencia Standby */}
          <div className="filter-group">
            <label><FaBatteryFull /> {t('products.filters.standbyPower')}</label>
            <select
              value={selectedStandbyPower}
              onChange={(e) => handleStandbyPowerChange(e.target.value)}
            >
              <option value="All">{t('products.filters.allPowers')}</option>
              {availableStandbyPowers.map(value => (
                <option key={value} value={value}>{value} kVA</option>
              ))}
            </select>
          </div>

          {/* 6. Voltaje */}
          <div className="filter-group">
            <label><FaBolt /> {t('products.filters.voltage')}</label>
            <select
              value={selectedVoltage}
              onChange={(e) => handleVoltageChange(e.target.value)}
            >
              <option value="All">{t('products.filters.allVoltages')}</option>
              {availableVoltages.map(voltage => (
                <option key={voltage} value={voltage}>{voltage}</option>
              ))}
            </select>
          </div>

          {/* 7. Modelo de motor */}
          <div className="filter-group">
            <label><FaCogs /> {t('products.filters.engineModel')}</label>
            <select
              value={selectedEngineModel}
              onChange={(e) => handleEngineModelChange(e.target.value)}
            >
              <option value="All">{t('products.filters.allModels')}</option>
              {availableEngineModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          {/* 8. Combustible */}
          <div className="filter-group">
            <span><FaGasPump /> {t('products.filters.fuel')}</span>
            <button
              onClick={() => setSelectedFuel("All")}
              className={selectedFuel === "All" ? "active" : ""}
            >
              {t('products.filters.all')}
            </button>
            {availableFuels.map(fuel => (
              <button
                key={fuel}
                onClick={() => setSelectedFuel(fuel)}
                className={selectedFuel === fuel ? "active" : ""}
              >
                {t(`products.fuel.${fuel.toLowerCase()}`, { defaultValue: fuel })}
              </button>
            ))}
          </div>

        </div>

        {/* PRODUCTOS */}
        <div className="product-grid">
          {displayedProducts.map((product, index) => (
            <Link
              to={getProductUrl(product)}
              className="product-card"
              key={index}
            >
              <div className="product-type">{product.frequencies[0] || ''} {product.phase || ''}</div>
              <h3 className="product-name">{product.name}</h3>
              <img
                src={product.image}
                alt={t('products.productCard.imageAlt', { name: product.name })}
                className="product-image"
              />
              <div className="power-details">
                <div className="power-detail">
                  <span>{t('products.kva_prp')}</span>
                  <span>{product.primePowerKVA || 'N/A'}</span>
                </div>
                <div className="power-detail">
                  <span>{t('products.kva_esp')}</span>
                  <span>{product.standbyPowerKVA || 'N/A'}</span>
                </div>
              </div>
              <div className="product-details">
                
                {product.fuel && (
                  <div className="product-detail">
                    <FaGasPump />
                    {t(`products.fuel.${product.fuel.toLowerCase()}`, { defaultValue: product.fuel.charAt(0).toUpperCase() + product.fuel.slice(1) })}
                  </div>
                )}
                {product.engineBrand && (
                  <div className="product-detail">
                    <FaWrench />
                    {t(`products.engine_brands.${product.engineBrand.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: product.engineBrand })}
                  </div>
                )}
                {product.category && product.category !== 'Sin categoría' && (
                  <div className="product-detail">
                    <FaIndustry />
                    {t(`products.categories.${product.category.trim().toLowerCase()}`, { defaultValue: product.category.toUpperCase() })}
                  </div>
                )}
              </div>
              {product.fichaTecnica && (
                <a
                  href={product.fichaTecnica}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ficha-tecnica-button"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('products.fichaTecnica')}
                </a>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductGrid;
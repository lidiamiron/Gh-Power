// GeneradoresIndustriales.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import "../components/GeneradoresIndustriales.css";

import GH from "../assets/logo.svg";
import GHimage from "../assets/gh-powerimg.jpg";
import CumminsImage from "../assets/Cummins.jpg";
import BoudouinImage from "../assets/baudouinimg.jpg";
import FawdeImage from "../assets/fawdeimg.jpg";
import PerkinsImage from "../assets/perkinsimg.jpg";
import DoosanImage from "../assets/doosanimg.jpg";
import YanmarImage from "../assets/yanmar.jpg";

import { createClient } from '@supabase/supabase-js';
import { FaGasPump, FaWrench, FaIndustry, FaBolt, FaPlug, FaBatteryFull, FaCogs } from "react-icons/fa";

// Configurar cliente de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const GeneradoresIndustriales = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const generadores = [
    {
      id: 1,
      marca: 'ghpower',
      title: t("industrial.brands.ghpower.title"),
      imagen: GHimage,
      descripcion: t("industrial.brands.ghpower.description"),
      link: '/productos/gh-power'
    },
    {
      id: 2,
      marca: 'cummins',
      title: t("industrial.brands.cummins.title"),
      imagen: CumminsImage,
      descripcion: t("industrial.brands.cummins.description"),
      link: '/productos/cummins'
    },
    {
      id: 3,
      marca: 'perkins',
      title: t("industrial.brands.perkins.title"),
      imagen: PerkinsImage,
      descripcion: t("industrial.brands.perkins.description"),
      link: '/productos/perkins'
    },
    {
      id: 4,
      marca: 'baudouin',
      title: t("industrial.brands.baudouin.title"),
      imagen: BoudouinImage,
      descripcion: t("industrial.brands.baudouin.description"),
      link: '/productos/baudouin'
    },
    {
      id: 5,
      marca: 'doosan',
      title: t("industrial.brands.doosan.title"),
      imagen: DoosanImage,
      descripcion: t("industrial.brands.doosan.description"),
      link: '/productos/doosan'
    },
    {
      id: 6,
      marca: 'fawde',
      title: t("industrial.brands.fawde.title"),
      imagen: FawdeImage,
      descripcion: t("industrial.brands.fawde.description"),
      link: '/productos/fawde'
    },
    {
      id: 7,
      marca: 'yanmar',
      title: t("industrial.brands.yanmar.title"),
      imagen: YanmarImage,
      descripcion: t("industrial.brands.yanmar.description"),
      link: '/productos/yanmar'
    }
  ];

  const cardsToShow = 1;
  const maxIndex = generadores.length - 1;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1 > maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 < 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("industrial");
  const [selectedEngineBrand, setSelectedEngineBrand] = useState("All");
  const [selectedFrequency, setSelectedFrequency] = useState("All");
  const [selectedPhase, setSelectedPhase] = useState("All");
  const [selectedStandbyPower, setSelectedStandbyPower] = useState("All");
  const [selectedVoltage, setSelectedVoltage] = useState("All");
  const [selectedEngineModel, setSelectedEngineModel] = useState("All");
  const [selectedFuel, setSelectedFuel] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('id, modelo_motor, standby_kva, prime_power_kw, phase, fuel, frequencies, voltage, image_url, marca_motor, engine_model, category, prime_power_kva');

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
            category: item.category || 'Sin categoría'
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

  // OPCIONES DISPONIBLES
  const availableCategories = [...new Set(
    products.map(p => (p.category || 'Sin categoría').trim().toLowerCase())
  )].filter(Boolean).sort((a, b) => a.localeCompare(b));

  const availableEngineBrands = [...new Set(filteredByCategory.map(p => p.engineBrand))].filter(Boolean);
  const availableFrequencies = [...new Set(filteredByEngineBrand.flatMap(p => p.frequencies))].filter(Boolean).sort();
  const availablePhases = [...new Set(filteredByFrequency.map(p => p.phase))].filter(Boolean);
  const availableStandbyPowers = [...new Set(filteredByPhase.map(p => p.standbyPowerKVA))]
    .filter(val => !isNaN(val) && val !== 0)
    .sort((a, b) => a - b);
  const availableVoltages = [...new Set(filteredByStandbyPower.flatMap(p => p.voltage))].filter(Boolean);
  const availableEngineModels = [...new Set(filteredByVoltage.map(p => p.engineModel))].filter(Boolean);
  const availableFuels = [...new Set(filteredByEngineModel.map(p => p.fuel))].filter(Boolean);

  // Handlers
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

  const handleSearch = () => {
    const params = new URLSearchParams({
      category: selectedCategory,
      engineBrand: selectedEngineBrand,
      frequency: selectedFrequency,
      phase: selectedPhase,
      standbyPower: selectedStandbyPower,
      voltage: selectedVoltage,
      engineModel: selectedEngineModel,
      fuel: selectedFuel,
    });
    navigate(`/productos?${params.toString()}`);
  };

  if (loading) {
    return <div>{t('products.loading')}</div>;
  }

  return (
    <div className="generadores-container">
      <div className="section-title">
        <h2>{t("industrial.title")}</h2>
        <p className="generador-subtitle">{t("industrial.subtitle1")}</p>
        <p className="generador-subtitle">{t("industrial.subtitle2")}</p>
      </div>

      <div className="content-row">
        <div className="carousel-section">
          <div className="slideshow-wrapper">
            <button
              className="nav-arrow prev-arrow"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label={t("industrial.prev")}
            >
              ‹
            </button>

            <div className="slideshow-container">
              <div
                className="cards-track"
                style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }}
              >
                {generadores.map((gen) => (
                  <div key={gen.id} className="generator-card">
                    <Link to={gen.link} className="card-link-wrapper">
                      <div className="card-image-wrapper">
                        <img
                          src={gen.imagen}
                          alt={`${gen.title}`}
                          className="generator-image"
                        />
                      </div>
                      <div className="card-info">
                        <h3 className="card-brand">{gen.title}</h3>
                        <p className="card-desc">{gen.descripcion}</p>
                        <span className="read-more">{t("industrial.read_more")} ›</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="nav-arrow next-arrow"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              aria-label={t("industrial.next")}
            >
              ›
            </button>
          </div>

          <div className="slide-indicators">
            <span className="slide-count">{currentIndex + 1} / {generadores.length}</span>
          </div>
        </div>

        <div className="industrial-filter-section">
          <h2 className='title-filter'>{t('products.title')}</h2>
          <div className="industrial-filter-panel">

            {/* 1. Categoría */}
            <div className="industrial-filter-group">
              <label><FaIndustry /> {t('products.filters.category')}</label>
              <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="All">{t('products.filters.all_categories')}</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {t(`products.categories.${cat}`, { defaultValue: cat.charAt(0).toUpperCase() + cat.slice(1) })}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Marca de motor */}
            <div className="industrial-filter-group">
              <label><FaWrench /> {t('products.filters.engineBrand')}</label>
              <select value={selectedEngineBrand} onChange={(e) => handleEngineBrandChange(e.target.value)}>
                <option value="All">{t('products.filters.allBrands')}</option>
                {availableEngineBrands.map(brand => (
                  <option key={brand} value={brand}>
                    {t(`products.engine_brands.${brand.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: brand })}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Frecuencia */}
            <div className="industrial-filter-group">
              <label><FaBolt /> {t('products.filters.frequency')}</label>
              <select value={selectedFrequency} onChange={(e) => handleFrequencyChange(e.target.value)}>
                <option value="All">{t('products.filters.allFrequencies')}</option>
                {availableFrequencies.map(freq => (
                  <option key={freq} value={freq}>{freq} {t('products.filters.hz')}</option>
                ))}
              </select>
            </div>

            {/* 4. Fase */}
            <div className="industrial-filter-group">
              <label><FaPlug /> {t('products.filters.phase')}</label>
              <select value={selectedPhase} onChange={(e) => handlePhaseChange(e.target.value)}>
                <option value="All">{t('products.filters.allPhases')}</option>
                {availablePhases.map(phase => (
                  <option key={phase} value={phase}>
                    {t(`products.phases.${phase.toLowerCase().replace(/\s+/g, '_')}`, { defaultValue: phase })}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Potencia Standby */}
            <div className="industrial-filter-group">
              <label><FaBatteryFull /> {t('products.filters.standbyPower')}</label>
              <select value={selectedStandbyPower} onChange={(e) => handleStandbyPowerChange(e.target.value)}>
                <option value="All">{t('products.filters.allPowers')}</option>
                {availableStandbyPowers.map(value => (
                  <option key={value} value={value}>{value} kVA</option>
                ))}
              </select>
            </div>

            {/* 6. Voltaje */}
            <div className="industrial-filter-group">
              <label><FaBolt /> {t('products.filters.voltage')}</label>
              <select value={selectedVoltage} onChange={(e) => handleVoltageChange(e.target.value)}>
                <option value="All">{t('products.filters.allVoltages')}</option>
                {availableVoltages.map(voltage => (
                  <option key={voltage} value={voltage}>{voltage}</option>
                ))}
              </select>
            </div>

            {/* 7. Modelo de motor */}
            <div className="industrial-filter-group">
              <label><FaCogs /> {t('products.filters.engineModel')}</label>
              <select value={selectedEngineModel} onChange={(e) => handleEngineModelChange(e.target.value)}>
                <option value="All">{t('products.filters.allModels')}</option>
                {availableEngineModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* 8. Combustible */}
            <div className="industrial-filter-group">
              <label><FaGasPump /> {t('products.filters.fuel')}</label>
              <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)}>
                <option value="All">{t('products.filters.allFuels')}</option>
                {availableFuels.map(fuel => (
                  <option key={fuel} value={fuel}>
                    {t(`products.fuel.${fuel.toLowerCase()}`, { defaultValue: fuel })}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <button className="industrial-search-button" onClick={handleSearch}>
            {t('products.filters.search')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneradoresIndustriales;
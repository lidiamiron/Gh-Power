import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import './Yanmar.css';
import generator from '../assets/generador.png';

const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const Yanmar = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState('50');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('prime_power_kw, prime_power_kva, standby_kw, standby_kva, engine_model, modelo_motor, frequencies, voltage, phase')
          .eq('marca_motor', 'YANMAR')
          .order('standby_kva', { ascending: true });

        if (error) {
          throw error;
        }

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="loading">{t('yanmar.loading')}</p>;
  if (error) return <p className="error">{t('yanmar.error')} {error}</p>;

  const filteredProducts = products.filter(product => product.frequencies.includes(selectedFrequency));

  return (
    <div className="gh-power-container">
      <Helmet>
        <title>Generadores Yanmar | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Explora los generadores Yanmar de GH Power: potencia y fiabilidad para aplicaciones industriales y domésticas. Cotiza ahora."
        />
        <meta
          name="keywords"
          content="generadores Yanmar, generadores portátiles, generadores diesel, GH Power, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Generadores Yanmar | GH Power" />
        <meta
          property="og:description"
          content="Descubre los generadores Yanmar de GH Power, diseñados para máxima potencia y fiabilidad. Cotiza hoy."
        />
        <meta property="og:image" content="https://gh-power.com/images/generador.png" />
        <meta property="og:url" content="https://gh-power.com/productos/yanmar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/yanmar" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/yanmar" hreflang="en" />
         <link rel="alternate" href="https://gh-power.com/productos/yanmar" hreflang="de" />
        <link rel="alternate" href="https://gh-power.com/en/productos/yanmar" hreflang="fr" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "name": "Generadores Yanmar",
            "description": "Línea de generadores Yanmar de GH Power, diseñados para aplicaciones industriales y domésticas con alta fiabilidad.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "image": "https://gh-power.com/images/generador.png",
            "hasVariant": products.map(product => ({
              "@type": "Product",
              "name": product.modelo_motor,
              "description": `Generador Yanmar ${product.modelo_motor} con ${product.prime_power_kw} kW de potencia prime y ${product.standby_kva} kVA de potencia standby.`,
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Prime Power kW",
                  "value": product.prime_power_kw
                },
                {
                  "@type": "PropertyValue",
                  "name": "Prime Power kVA",
                  "value": product.prime_power_kva
                },
                {
                  "@type": "PropertyValue",
                  "name": "Standby kW",
                  "value": product.standby_kw
                },
                {
                  "@type": "PropertyValue",
                  "name": "Standby kVA",
                  "value": product.standby_kva
                },
                {
                  "@type": "PropertyValue",
                  "name": "Engine Model",
                  "value": product.engine_model
                },
                {
                  "@type": "PropertyValue",
                  "name": "Frequency",
                  "value": product.frequencies
                },
                {
                  "@type": "PropertyValue",
                  "name": "Voltage",
                  "value": product.voltage
                },
                {
                  "@type": "PropertyValue",
                  "name": "Phase",
                  "value": product.phase
                }
              ]
            }))
          })}
        </script>
      </Helmet>
      <section className="header-section">
        <div className="header-left">
          <img src={generator} alt={t('yanmar.mainImageAlt')} className="main-image" />
        </div>
        <div className="header-right">
          <h2 className="product-title">{t('yanmar.title')}</h2>
          <p className="product-description">
            {t('yanmar.description')}
          </p>
          <a href="/Contacto">
            <button className="contact-button" title={t('yanmar.contactButton')}>
              {t('yanmar.contactButton')}
            </button>
          </a>
        </div>
      </section>
      <div className="filter-panel">
        <div className="filter-group">
          <button 
            className={selectedFrequency === '50' ? 'active' : ''} 
            onClick={() => setSelectedFrequency('50')}
          >
            50HZ
          </button>
          <button 
            className={selectedFrequency === '60' ? 'active' : ''} 
            onClick={() => setSelectedFrequency('60')}
          >
            60HZ
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>{t('yanmar.table.model')}</th>
              <th className='hide-mobile'>{t('yanmar.table.primePowerKW')}</th>
              <th className='hide-mobile'>{t('yanmar.table.primePowerKVA')}</th>
              <th className='hide-mobile'>{t('yanmar.table.standbyKW')}</th>
              <th>{t('yanmar.table.standbyKVA')}</th>
              <th className='hide-mobile'>{t('yanmar.table.engineModel')}</th>
              <th>{t('yanmar.table.frequency')}</th>
              <th>{t('yanmar.table.voltage')}</th>
              <th className='hide-mobile'>{t('yanmar.table.phase')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.modelo_motor}</td>
                <td className='hide-mobile'>{product.prime_power_kw}</td>
                <td className='hide-mobile'>{product.prime_power_kva}</td>
                <td className='hide-mobile'>{product.standby_kw}</td>
                <td>{product.standby_kva}</td>
                <td className='hide-mobile'>{product.engine_model}</td>
                <td>{product.frequencies}</td>
                <td>{product.voltage}</td>
                <td className='hide-mobile'>{product.phase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Yanmar;
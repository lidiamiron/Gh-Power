import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async'; // Added for SEO
import './Gh-power.css';
import generator from '../assets/generador.png';

const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const GHPower = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('prime_power_kw, prime_power_kva, standby_kw, standby_kva, engine_model, modelo_motor, frequencies, voltage, phase')
          .eq('marca_motor', 'GH-POWER');

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

  if (loading) return <p className="loading">{t('ghpower.loading')}</p>;
  if (error) return <p className="error">{t('ghpower.error')} {error}</p>;

  return (
    <div className="gh-power-container">
      <Helmet>
        <title>Generadores GH Power | Soluciones Energéticas</title>
        <meta
          name="description"
          content="Generadores GH Power: alta calidad y eficiencia para industria y construcción. Pide presupuesto ahora en Barcelona."
        />
        <meta
          name="keywords"
          content="generadores GH Power, generadores diesel, generadores industriales, soluciones energéticas, Barcelona, construcción, industria"
        />
        <meta property="og:title" content="Generadores GH Power" />
        <meta
          property="og:description"
          content="Explora generadores GH Power, ideales para industria y construcción con alta calidad. Pide presupuesto en Barcelona."
        />
        <meta property="og:image" content="https://gh-power.com/images/generador.png" />
        <meta property="og:url" content="https://gh-power.com/productos/gh-power" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/productos/gh-power" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/productos/gh-power" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProductGroup",
            "name": "Generadores GH Power",
            "description": "Generadores GH Power, diseñados para alta calidad y eficiencia en aplicaciones industriales y de construcción.",
            "brand": {
              "@type": "Brand",
              "name": "GH Power"
            },
            "hasVariant": products.map(product => ({
              "@type": "Product",
              "name": product.modelo_motor,
              "description": `Generador GH Power ${product.modelo_motor} con ${product.prime_power_kva} kVA de potencia principal.`,
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Prime Power kW",
                  "value": product.prime_power_kw
                },
                {
                  "@type": "PropertyValue",
                  "name": "Standby Power kVA",
                  "value": product.standby_kva
                }
              ]
            }))
          })}
        </script>
      </Helmet>

      <section className="header-section">
        <div className="header-left">
          <img src={generator} alt={t('ghpower.mainImageAlt')} className="main-image" />
        </div>
        <div className="header-right">
          <h2 className="product-title">{t('ghpower.title')}</h2>
          <p className="product-description">
            {t('ghpower.description')}
          </p>
          <a href="/Contacto">
            <button className="contact-button">{t('ghpower.contactButton')}</button>
          </a>
        </div>
      </section>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>{t('ghpower.tableHeaders.model')}</th>
              <th className='hide-mobile'>{t('ghpower.tableHeaders.primePowerKW')}</th>
              <th className='hide-mobile'>{t('ghpower.tableHeaders.primePowerKVA')}</th>
              <th className='hide-mobile'>{t('ghpower.tableHeaders.standbyPowerKW')}</th>
              <th>{t('ghpower.tableHeaders.standbyPowerKVA')}</th>
              <th className='hide-mobile'>{t('ghpower.tableHeaders.engineModel')}</th>
              <th>{t('ghpower.tableHeaders.frequency')}</th>
              <th>{t('ghpower.tableHeaders.voltage')}</th>
              <th className='hide-mobile'>{t('ghpower.tableHeaders.phase')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
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

export default GHPower;
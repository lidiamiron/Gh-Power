import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from "react-i18next";
import './Yanmar.css';
import generator from '../assets/generador.png';

const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const Yanmar = () => {
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
          .eq('marca_motor', 'YANMAR');

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

  return (
    <div className="gh-power-container">
      <section className="header-section">
        <div className="header-left">
          <img src={generator} alt="Generador Principal" className="main-image" />
        </div>
        <div className="header-right">
          <h2 className="product-title">{t('yanmar.title')}</h2>
          <p className="product-description">
            {t('yanmar.description')}
          </p>
          <a href="/Contacto">
            <button className="contact-button">{t('yanmar.contactButton')}</button>
          </a>
        </div>
      </section>
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

export default Yanmar;
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from "react-i18next";
import './Perkins.css';
import generator from '../assets/generador.png';

const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const PERKINS = () => {
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
          .eq('marca_motor', 'CUMMINS');

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

  if (loading) return <p className="loading">{t('perkins.loading')}</p>;
  if (error) return <p className="error">{t('perkins.error')} {error}</p>;

  return (
    <div className="gh-power-container">
      <section className="header-section">
        <div className="header-left">
          <img src={generator} alt="Generador Principal" className="main-image" />
        </div>
        <div className="header-right">
          <h2 className="product-title">{t('perkins.title')}</h2>
          <p className="product-description">
            {t('perkins.description')}
          </p>
          <a href="/Contacto">
            <button className="contact-button">{t('perkins.contactButton')}</button>
          </a>
        </div>
      </section>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>{t('perkins.table.model')}</th>
              <th className='hide-mobile'>{t('perkins.table.primePowerKW')}</th>
              <th className='hide-mobile'>{t('perkins.table.primePowerKVA')}</th>
              <th className='hide-mobile'>{t('perkins.table.standbyKW')}</th>
              <th>{t('perkins.table.standbyKVA')}</th>
              <th className='hide-mobile'>{t('perkins.table.engineModel')}</th>
              <th>{t('perkins.table.frequency')}</th>
              <th>{t('perkins.table.voltage')}</th>
              <th className='hide-mobile'>{t('perkins.table.phase')}</th>
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

export default PERKINS;
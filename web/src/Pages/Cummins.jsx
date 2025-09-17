import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Cummins.css';
import generator from '../assets/generador.png'; // Asegúrate de tener esta imagen en tu proyecto

const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const CUMMINS = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('prime_power_kw, prime_power_kva, standby_kw, standby_kva, engine_model, modelo_motor,  frequencies, voltage, phase')
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

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="gh-power-container">
      <section className="header-section">
        <div className="header-left">
          <img src={generator} alt="Generador Principal" className="main-image" />
        </div>
        <div className="header-right">
          <h2 className="product-title">Generadores CUMMINS</h2>
          <p className="product-description">
           Especializados en motores de alta gama, generadores de combustible alternativo y diésel.

Cummins ha trabajado durante más de 100 años, creando soluciones de energía, 14 años consecutivos en la lista de las empresas más éticas del mundo, cuentan con una plantilla que supera los 73.600 colaboradores.
          </p>
          <a href="/Contacto">
            <button className="contact-button">Contactanos →</button>
          </a>
        </div>
      </section>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Modelo</th>
              <th className='hide-mobile'>Prime Power KW</th>
              <th className='hide-mobile'>Prime Power KVA</th>
              <th className='hide-mobile'>Standby Power KW</th>
              <th>Standby Power KVA</th>
              <th className='hide-mobile'>Modelo Motor</th>
              
              <th>Frecuencia</th>
              <th>Voltaje</th>
              <th className='hide-mobile'>Fase</th>
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

export default CUMMINS;
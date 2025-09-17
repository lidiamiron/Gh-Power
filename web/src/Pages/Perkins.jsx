import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './Perkins.css';
import generator from '../assets/generador.png'; // Asegúrate de tener esta imagen en tu proyecto

const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const PERKINS = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="loading">Cargando productos...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="gh-power-container">
      <section className="header-section">
        <div className="header-left">
          <img src={generator} alt="Generador Principal" className="main-image" />
        </div>
        <div className="header-right">
          <h2 className="product-title">Generadores PERKINS</h2>
          <p className="product-description">
           Una de las filiales de Caterpillar Inc. Especializadas en la fabricación de motores diésel para diversos mercados internacionales, destacando la construcción, manejo de materiales de gran volumen, agricultura y generación de energía e industria. 

Bajo el lema “El Poder de la colaboración” son uno de los principales proveedores de motores diésel del mundo, apasionados por el servicio y superar las expectativas de sus clientes. Con una historia de más de 90 años y más de 22 millones de motores a sus espaldas.
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

export default PERKINS;
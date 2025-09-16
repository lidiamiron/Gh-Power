import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaDownload } from "react-icons/fa";
import "./Descargas.css";

// Configuración de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const Descargas = () => {
  const [generadores, setGeneradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeneradores = async () => {
      try {
        const { data, error } = await supabase
          .from('generadores')
          .select('*')
          .order('marca_motor', { ascending: true })
          .order('standby_kva', { ascending: true });

        if (error) {
          throw error;
        }

        console.log('Datos recibidos de Supabase:', data); // Para depuración
        
        // Filtrar productos únicos por modelo_motor
        const productosUnicos = filtrarProductosUnicos(data);
        setGeneradores(productosUnicos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGeneradores();
  }, []);

  // Función para filtrar productos únicos por modelo_motor
  const filtrarProductosUnicos = (data) => {
    const productosUnicos = [];
    const modelosVistos = new Set();
    
    data.forEach((producto) => {
      if (!modelosVistos.has(producto.modelo_motor)) {
        modelosVistos.add(producto.modelo_motor);
        productosUnicos.push(producto);
      }
    });
    
    return productosUnicos;
  };

  // Función para verificar si una URL es válida
  const esUrlValida = (url) => {
    if (!url) return false;
    
    // Verificar si es una URL válida
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="loading">Cargando datos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>MODELO</th>
            <th className="hide-mobile">STANDBY KVA</th>
            <th className="hide-mobile">STANDBY KW</th>
            <th className="hide-mobile">MARCA MOTOR</th>
            <th className="hide-mobile">MODELO MOTOR</th>
            <th className="hide-mobile">FASE</th>
            <th>Descarga</th>
            <th>Descarga</th>
          </tr>
        </thead>
        <tbody>
          {generadores.map((item, index) => {
            // Depuración para ver los valores de los enlaces
            console.log(`Item ${index}:`, {
              modelo: item.modelo_motor,
              ficha_técnica: item.ficha_técnica,
              manual: item.manual,
              esFichaValida: esUrlValida(item.ficha_técnica),
              esManualValido: esUrlValida(item.manual)
            });
            
            return (
              <tr key={index}>
                <td>{item.modelo_motor || 'N/A'}</td>
                <td className="hide-mobile">{item.standby_kva || 'N/A'}</td>
                <td className="hide-mobile">{item.standby_kw || 'N/A'}</td>
                <td className="hide-mobile">{item.marca_motor || 'N/A'}</td>
                <td className="hide-mobile">{item.engine_model || 'N/A'}</td>
                <td className="hide-mobile">{item.phase || 'N/A'}</td>
                <td className="descarga">
                  {esUrlValida(item.ficha_técnica) ? (
                    <a href={item.ficha_técnica} target="_blank" rel="noreferrer" download>
                      <FaDownload /><span className='space'>Ficha técnica</span>
                    </a>
                  ) : (
                    <span className="no-disponible">
                      {item.ficha_técnica ? 'Enlace inválido' : 'No disponible'}
                    </span>
                  )}
                </td>
                <td className="descarga">
                  {esUrlValida(item.manual) ? (
                    <a href={item.manual} target="_blank" rel="noreferrer" download>
                      <FaDownload /><span className='space'>Manual de usuario</span>
                    </a>
                  ) : (
                    <span className="no-disponible">
                      {item.manual ? 'Enlace inválido' : 'No disponible'}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Descargas;
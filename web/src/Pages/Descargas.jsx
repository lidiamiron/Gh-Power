import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaDownload } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Descargas.css";

// Configuración de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const Descargas = () => {
  const [generadores, setGeneradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

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
        <div className="loading">{t('downloads.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="error">{t('downloads.error')} {error}</div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>{t('downloads.tableHeaders.model')}</th>
            <th className="hide-mobile">{t('downloads.tableHeaders.standbyKVA')}</th>
            <th className="hide-mobile">{t('downloads.tableHeaders.standbyKW')}</th>
            <th className="hide-mobile">{t('downloads.tableHeaders.engineBrand')}</th>
            <th className="hide-mobile">{t('downloads.tableHeaders.engineModel')}</th>
            <th className="hide-mobile">{t('downloads.tableHeaders.phase')}</th>
            <th>{t('downloads.tableHeaders.download')}</th>
            <th>{t('downloads.tableHeaders.download2')}</th>
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
                <td>{item.modelo_motor || t('downloads.status.noData')}</td>
                <td className="hide-mobile">{item.standby_kva || t('downloads.status.noData')}</td>
                <td className="hide-mobile">{item.standby_kw || t('downloads.status.noData')}</td>
                <td className="hide-mobile">{item.marca_motor || t('downloads.status.noData')}</td>
                <td className="hide-mobile">{item.engine_model || t('downloads.status.noData')}</td>
                <td className="hide-mobile">{item.phase || t('downloads.status.noData')}</td>
                <td className="descarga">
                  {esUrlValida(item.ficha_técnica) ? (
                    <a href={item.ficha_técnica} target="_blank" rel="noreferrer" download>
                      <FaDownload /><span className='space'>{t('downloads.downloadButtons.techSheet')}</span>
                    </a>
                  ) : (
                    <span className="no-disponible">
                      {item.ficha_técnica ? t('downloads.status.invalidLink') : t('downloads.status.notAvailable')}
                    </span>
                  )}
                </td>
                <td className="descarga">
                  {esUrlValida(item.manual) ? (
                    <a href={item.manual} target="_blank" rel="noreferrer" download>
                      <FaDownload /><span className='space'>{t('downloads.downloadButtons.userManual')}</span>
                    </a>
                  ) : (
                    <span className="no-disponible">
                      {item.manual ? t('downloads.status.invalidLink') : t('downloads.status.notAvailable')}
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
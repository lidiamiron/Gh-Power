import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from "react-i18next";
import "./FeaturedProducts.css";

// Configurar cliente de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  // Función para generar la URL única para cada producto
  const generateProductUrl = (productName) => {
    // Mapeo de nombres de productos a URLs específicas
    const urlMappings = {
      'GH88BSX': '/productos/baudouin',
      'GH44CSX': '/productos/cummins',
      'GH1650BSX': '/productos/baudouin',
      '4x1': '/productos/generador4x1',
      'GH15000DE': '/productos/generadores-portatiles/diesel/GH15000DE',
      'GDG8500SE': '/productos/generadores-portatiles/diesel/GDG8500SE'
    };
    
    // Si existe un mapeo específico, usarlo, sino generar una URL por defecto
    return urlMappings[productName] || `/productos/${encodeURIComponent(productName.toLowerCase().replace(/\s+/g, '-'))}`;
  };

  // Cargar productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching specific products from Supabase...');
        
        // Lista de modelos específicos a buscar
        const targetModels = [
          'GH88BSX', 
          'GH44CSX', 
          'GH1650BSX', 
          '4x1', 
          'GH15000DE',
          'GDG8500SE' 
        ];
        
        // Buscar cada producto individualmente
        const productPromises = targetModels.map(model => 
          supabase
            .from('generadores')
            .select('id, modelo_motor, standby_kva, image_url, phase')
            .ilike('modelo_motor', model)
            .limit(1)
            .single()
        );
        
        // Ejecutar todas las consultas
        const results = await Promise.allSettled(productPromises);
        
        console.log('All query results:', results);

        // Procesar resultados exitosos
        const foundProducts = [];
        for (const result of results) {
          if (result.status === 'fulfilled' && result.value.data) {
            foundProducts.push(result.value.data);
          }
        }

        console.log('Found products:', foundProducts);

        if (foundProducts.length === 0) {
          console.warn('No specific products found.');
          setError(t('featuredProducts.noSpecificProducts'));
          setProducts([]);
          return;
        }

        const transformedData = foundProducts.map((item, index) => {
          return {
            id: item.id || `temp-id-${index}`,
            name: item.modelo_motor || 'Sin Nombre',
            kva: item.standby_kva != null && !isNaN(parseFloat(item.standby_kva)) 
              ? parseFloat(item.standby_kva) 
              : 0,
            image: item.image_url || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible',
            url: generateProductUrl(item.modelo_motor) // Añadir URL única
          };
        });

        console.log('Final products:', transformedData);
        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
        setError(t('featuredProducts.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t]);

  if (loading) {
    return <div className="gallery-container">{t('featuredProducts.loading')}</div>;
  }

  if (error) {
    return (
      <div className="gallery-container">
        <h2>{t('featuredProducts.title')}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h2 className="title-feature-products">{t('featuredProducts.title')}</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>{t('featuredProducts.noProducts')}</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.kva} {t('featuredProducts.kva')}</p>
              <Link to={product.url} className="ver-mas-btn">
                {t('featuredProducts.viewMore')}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";
import { createClient } from '@supabase/supabase-js';

// Configurar cliente de Supabase
const supabaseUrl = 'https://mfbwfvyokxanubyxamim.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mYndmdnlva3hhbnVieXhhbWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODI1OTQsImV4cCI6MjA3MjQ1ODU5NH0.oFoatF2o44dic8qIkrPeLpv_Zd6mzoWOnEGGDXILUEo';
const supabase = createClient(supabaseUrl, supabaseKey);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from Supabase...'); // Debug: Start of fetch
        const { data, error } = await supabase
          .from('generadores')
          .select('id, modelo_motor, standby_kva, image_url, phase')
          .eq('phase', 'MONOFÁSICO') // Filter for single-phase (uppercase)
          .limit(6); // Limit to 6 products
        
        if (error) {
          console.error('Supabase query error:', error); // Debug: Log specific error
          throw error;
        }

        console.log('Raw Supabase data:', data); // Debug: Log raw data

        if (!data || data.length === 0) {
          console.warn('No products found matching the criteria.');
          setError('No se encontraron productos monofásicos.');
          setProducts([]);
          return;
        }

        const transformedData = data.map((item, index) => {
          console.log(`Processing item ${index}:`, item); // Debug: Log each item
          return {
            id: item.id || `temp-id-${index}`, // Fallback ID
            name: item.modelo_motor || 'Sin Nombre',
            kva: item.standby_kva != null && !isNaN(parseFloat(item.standby_kva)) 
              ? parseFloat(item.standby_kva) 
              : 0,
            image: item.image_url || 'https://via.placeholder.com/150', // Fallback image
          };
        });

        console.log('Transformed products:', transformedData); // Debug: Log transformed data

        setProducts(transformedData);
      } catch (error) {
        console.error('Error fetching products:', error.message, error.details || ''); // Debug: Detailed error
        setError(`Error al cargar los productos: ${error.message}. Por favor, intenta de nuevo.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="gallery-container">Cargando productos...</div>;
  }

  if (error) {
    return (
      <div className="gallery-container">
        <h2>Productos Destacados</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <h2>Productos Destacados</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.kva} KVA</p>
              <Link to={`/productos/${product.name}`} id="ver-mas-btn">Ver más</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
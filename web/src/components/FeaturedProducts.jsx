import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";
import generatormain from "../assets/generator-main.png";
import generador1 from "../assets/generator-main.png";
import generador2 from "../assets/generator-main.png";
import generador3 from "../assets/generator-main.png";
import generador4 from "../assets/generator-main.png";
import generador5 from "../assets/generator-main.png";

const products = [
  {
    id: 1,
    name: "GH25BSX",
    kva:  25,
    image: generatormain,
  },
  {
    id: 2,
    name: "GH125CSX",
    kva: 44,
    image: generador1,
  },
  {
    id: 3,
    name: "GH165CSX",
    kva: 72,
    image: generador2,
  },
  {
    id: 4,
    name: "GH210CSX",
    kva: 110,
    image: generador3,
  },
  {
    id: 5,
    name: "GH210CSX",
    kva: 165,
    image: generador4,
  },
  {
    id: 6,
    name: "GH210CSX",
    kva: 250,
    image: generador5,
  },
];

const FeaturedProducts = () => {
  return (
    <div className="gallery-container">
      <h2>Productos Destacados</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.kva} KVA</p>
            <Link to={`/productos/${product.name}`} id="ver-mas-btn">Ver más</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
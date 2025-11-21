// GeneradoresPortatiles.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./GeneradoresPortatiles.css";
import Diesel from "../assets/diesel-portatil.png";
import Gasolina from "../assets/gasolina-portatil.jpg";
import QuatroPorUno from "../assets/4x1 foto.jpg";

const GeneradoresPortatiles = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  const productos = [
    {
      id: 1,
      categoria: t("portable.diesel_category"),
      tipo: "diesel",
      descripcion: t("portable.diesel_description"),
      imagen: Diesel,
      modelos: [
        "GHD2000E",
        "GHD3000E",
        "GHD6000E",
        "GHD8000E",
        "GHD10000E",
        "GHD12000E",
        "GHD13000E",
        "GHD13500E",
        "GHD14000E",
        "GH15000DE",
      ],
      bgColor: "#e8e8e8",
      invertido: false,
    },
    {
      id: 2,
      categoria: t("portable.gasoline_category"),
      tipo: "gasolina",
      descripcion: t("portable.gasoline_description"),
      imagen: Gasolina,
      modelos: [
        "GHG2500E",
        "GHG3000E",
        "GHG3500E",
        "GHG3800E",
        "GHG6000E",
        "GHG7000E",
        "GHG7500E",
        "GHG9000E",
        "GHG10000E",
      ],
      bgColor: "#ffffff",
      invertido: true,
    },
    {
      id: 3,
      categoria: t("portable.4x1_category"),
      tipo: "4x1",
      descripcion: t("portable.4x1_description"),
      imagen: QuatroPorUno,
      modelos: ["4X1"],
      bgColor: "#e8e8e8",
      invertido: false,
    },
  ];

  const getModeloLink = (producto, modelo) => {
    if (producto.tipo === "diesel") {
      return `/productos/generadores-portatiles/diesel/${modelo}`;
    }
    if (producto.tipo === "gasolina") {
      return `/productos/generadores-portatiles/gasolina/${modelo}`;
    }
    if (producto.tipo === "4x1") {
      return `/productos/generador4x1`;
    }
    return "#";
  };

  return (
    <div className="generadores-portatiles-container">
      {productos.map((producto) => (
        <section
          key={producto.id}
          className={`portatiles-seccion ${producto.invertido ? "invertido" : ""}`}
          style={{ backgroundColor: producto.bgColor }}
        >
          <div
            className="portatiles-imagen"
            style={{ backgroundImage: `url(${producto.imagen})` }}
          />

          <div className="portatiles-info">
            <h2 className="portatiles-categoria">{producto.categoria}</h2>
            <p className="portatiles-descripcion">{producto.descripcion}</p>

            {producto.modelos.length > 0 && (
              <div className="portatiles-modelos-grid">
                {producto.modelos.map((modelo, index) => (
                  <Link
                    key={index}
                    to={getModeloLink(producto, modelo)}
                    className="portatiles-modelo-btn"
                  >
                    {modelo}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GeneradoresPortatiles;
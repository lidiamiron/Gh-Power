import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../components/Sectors.css";

import Aguas from "../assets/tratamientoaguas.jpg";
import CentroDatos from "../assets/centrodedatos.png";
import SectorSanitario from "../assets/sectordesalud.jpg";
import IndustriaPetrolera from "../assets/industriapetrolera.png";
import SectorConstruccion from "../assets/sectordelaconstrucion.png";

const Sectors = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const apps = [
    {
      id: 1,
      title: t("accordion.water_treatment"),
      descripcion: t("accordion.water_treatment_content"),
      imagen: Aguas,
    },
    {
      id: 2,
      title: t("accordion.data_center"),
      descripcion: t("accordion.data_center_content"),
      imagen: CentroDatos,
    },
    {
      id: 3,
      title: t("accordion.health_sector"),
      descripcion: t("accordion.health_sector_content"),
      imagen: SectorSanitario,
    },
    {
      id: 4,
      title: t("accordion.oil_industry"),
      descripcion: t("accordion.oil_industry_content"),
      imagen: IndustriaPetrolera,
    },
    {
      id: 5,
      title: t("accordion.construction_sector"),
      descripcion: t("accordion.construction_sector_content"),
      imagen: SectorConstruccion,
    },
  ];

  // Funciones del carrusel (igual que antes)
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % apps.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + apps.length) % apps.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  return (
    <div className="apps-container">
      {/* ¿Por qué elegir GH-POWER? */}
      <div className="apps-title">
        <h2>{t("accordion.why_choose")}</h2>
        <p className="apps-subtitle">{t("accordion.why_choose_content")}</p>
      </div>

      {/* EFICIENCIA ENERGÉTICA */}
      <div className="eficiencia-title">
        <h2>{t("accordion.energy_efficiency")}</h2>
        <p className="eficiencia-subtitle">
          {t("accordion.energy_efficiency_content")}
        </p>
      </div>

      {/* Carrusel */}
      <div className="carousel-with-arrows">
        {/* Flecha izquierda */}
        <button
          className="nav-button external prev"
          onClick={prevSlide}
          aria-label={t("previous", { defaultValue: "Précédent" })}
        />

        <div className="sectors-carousel-wrapper">
          <div
            className="sectors-carousel-container"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {apps.map((app) => (
              <div key={app.id} className="motor-card">
                <div className="image-container">
                  <h3 className="card-title">{app.title}</h3>
                  <img
                    src={app.imagen}
                    alt={app.title}
                    className="apps-image"
                  />
                </div>
                <div className="card-body">
                  <p className="card-description">{app.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        <button
          className="nav-button external next"
          onClick={nextSlide}
          aria-label={t("next", { defaultValue: "Suivant" })}
        />
      </div>

      {/* Dots / Indicadores */}
      <div className="dots-container">
        {apps.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`${t("go_to_slide", { defaultValue: "Aller à la diapositive" })} ${
              index + 1
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Sectors;
import React from "react";
import { useTranslation } from "react-i18next";
import "./QuienesSomos.css";
import QuienesSomosimg from "../assets/quienes-somos.png";

const QuienesSomos = () => {
  const { t } = useTranslation();
  const values = t("quienesSomos.values.items", { returnObjects: true });
  const descriptions = t("quienesSomos.hero.description", { returnObjects: true });

  return (
    <section className="quienes-somos">
      <div className="hero-section">
        <div className="container-about">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="main-title">
                
                {t("quienesSomos.hero.title")}
              </h1>

              <h2 className="subtitle-about">
                {t("quienesSomos.hero.subtitle")}
              </h2>

              {descriptions.map((text, i) => (
                <p key={i} className="hero-description">{text}</p>
              ))}
            </div>

            <div className="hero-image">
              <div className="image-wrapper">
                <img src={QuienesSomosimg} alt="Equipo" />
                <div className="image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="values-section">
        <div className="container-about">
          <h2 className="section-title">
            {t("quienesSomos.values.section_title")}
          </h2>

          <div className="values-grid">
            {values.map((item, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{item.icon}</div>
                <h3 className="value-title">{item.title}</h3>
                <p className="value-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="container-about">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">32</div>
              <div className="stat-label">
                {t("quienesSomos.stats.countries")}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">900</div>
              <div className="stat-label">
                {t("quienesSomos.stats.references")}
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-number">12</div>
              <div className="stat-label">
                {t("quienesSomos.stats.engine_options")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuienesSomos;

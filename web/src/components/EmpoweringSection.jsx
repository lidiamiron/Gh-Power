import React from "react";
import { useTranslation, Trans } from "react-i18next";
import "./EmpoweringSection.css";
import worldMap from "../assets/mapamundi.jpg";

const EmpoweringSection = () => {
  const { t } = useTranslation();

  return (
    <section className="empowering-section">
      <div className="left-side">
        <img src={worldMap} alt="World Map" className="background-map" />
        
      </div>

      <div className="right-side">
        <h2>{t("empowering.heading")}</h2>
        
        <p>
          <Trans i18nKey="empowering.description">
            Estamos presentes en más de <strong>32 países</strong> ofreciendo
            soluciones energéticas para todas las necesidades.
          </Trans>
        </p>

        <ul>
          <li>{t("empowering.points.one")}</li>
          <li>{t("empowering.points.two")}</li>
          <li>{t("empowering.points.three")}</li>
        </ul>
      </div>
    </section>
  );
};

export default EmpoweringSection;

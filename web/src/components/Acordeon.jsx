import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../components/Acordeon.css";

export default function Acordeon() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = [
    {
      title: t("accordion.why_choose"),
      content: t("accordion.why_choose_content"),
    },
    {
      title: t("accordion.energy_efficiency"),
      content: t("accordion.energy_efficiency_content"),
    },
    {
      title: t("accordion.water_treatment"),
      content: t("accordion.water_treatment_content"),
    },
    {
      title: t("accordion.data_center"),
      content: t("accordion.data_center_content"),
    },
    {
      title: t("accordion.health_sector"),
      content: t("accordion.health_sector_content"),
    },
    {
      title: t("accordion.oil_industry"),
      content: t("accordion.oil_industry_content"),
    },
    {
      title: t("accordion.construction_sector"),
      content: t("accordion.construction_sector_content"),
    },
  ];

  return (
    <div className="accordion">
      {data.map((item, index) => (
        <div className="accordion-item" key={index}>
          <button
            className={`accordion-title ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggle(index)}
            aria-expanded={activeIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            {item.title}
            <span aria-hidden="true">{activeIndex === index ? "-" : "+"}</span>
          </button>
          <div 
            id={`accordion-content-${index}`}
            className={`accordion-content ${activeIndex === index ? "open" : ""}`}
          >
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
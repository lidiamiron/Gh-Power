// CasosDeExito.jsx
import { useTranslation } from "react-i18next";

import expo from "../assets/gh-power-expo.jpeg";
import progreso from "../assets/mex2.jpeg";
import palacio from "../assets/mex2.jpeg";

import "../Pages/CasosDeExito.css";

export default function CasosDeExito() {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      image: expo,
      data: t("successStories.cards.0", { returnObjects: true })
    },
    {
      id: 2,
      image: progreso,
      data: t("successStories.cards.1", { returnObjects: true })
    },
    {
      id: 3,
      image: palacio,
      data: t("successStories.cards.2", { returnObjects: true })
    }
  ];

  return (
    <section className="casos-exito">
      <h1 className="title-primary">
        {t("successStories.sectionTitle")}
      </h1>

      <div className="success-stories">
        {cards.map(({ id, image, data }) => (
          <article key={id} className="story-card">
            <div className="card-image-container">
              <img
                src={image}
                alt={data.title}
                className="card-img"
              />
            </div>

            <div className="card-body">
              <h3 className="card-title">{data.title}</h3>
              <p className="card-subtitle">{data.subtitle}</p>
              <p className="card-text">{data.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

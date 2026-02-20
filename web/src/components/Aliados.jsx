// Aliados.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Aliados.css';

import Baudouin from "../assets/SVG/Baudouin-logo.svg";
import Cummins from "../assets/SVG/Cummins-logo.png";
import Perkins from "../assets/SVG/Perkins-Logo.svg";
import Doosan from "../assets/SVG/Doosan_Group_and_Corporation_-_Logo.svg";
import Fawde from "../assets/SVG/Fawde-logo.png";
import Yanmar from "../assets/SVG/Yanmar-logo.svg";
import Isuzu from "../assets/SVG/Isuzu.svg";
import Volvo from "../assets/SVG/Volvo-logo.svg";
import LeroySomer from "../assets/SVG/LeroySomer-logo.svg";
import PSI from "../assets/SVG/PSI_Logo.png";
import Comap from "../assets/SVG/comap-logo.png";
import DeepSea from "../assets/SVG/DeepSea-logo.png";
import Stamford from "../assets/SVG/stamford.png";

const aliados = [
  { name: 'Cummins',          logo: Cummins },
  { name: 'Perkins',          logo: Perkins },
  { name: 'Baudouin',         logo: Baudouin },
  { name: 'Doosan',           logo: Doosan },
  { name: 'Yanmar',           logo: Yanmar },
  { name: 'Fawde',            logo: Fawde },
  { name: 'Leroy Somer',      logo: LeroySomer },
  { name: 'Volvo',            logo: Volvo },
  { name: 'PSI Power Solutions', logo: PSI },
  { name: 'Isuzu',            logo: Isuzu },
  { name: 'Comap',            logo: Comap },
  { name: 'Deepsea',          logo: DeepSea },
  { name: 'Stamford',         logo: Stamford },
];

function Aliados() {
  const { t } = useTranslation();

  return (
    <section className="aliados-section">
      <div className="container-alias">
        <h2>{t('aliadoTitle')}</h2>
        <p className="subtitle-aliados">
          {t('aliadoSubtitle')}
        </p>

        <div className="logos-grid">
          {aliados.map((aliado) => (
            <div key={aliado.name} className="logo-item">
              <img
                src={aliado.logo}
                alt={`${aliado.name} logo`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Aliados;
import React from "react";
import { useTranslation } from "react-i18next";
import "./PoliticaCookies.css";

const PoliticaCookies = () => {
  const { t } = useTranslation();

  return (
    <div className="cookies-container">
      <h1>{t("cookies.policyTitle")}</h1>
      <p>{t("cookies.intro")}</p>

      <h2>{t("cookies.whatAre")}</h2>
      <p>{t("cookies.definition")}</p>

      <h2>{t("cookies.typesTitle")}</h2>
      <ul>
        <li>{t("cookies.typeTechnical")}</li>
        <li>{t("cookies.typeAnalytics")}</li>
        <li>{t("cookies.typeAdvertising")}</li>
      </ul>

      <h2>{t("cookies.manageTitle")}</h2>
      <p>{t("cookies.manageText")}</p>

      <h2>{t("cookies.contactTitle")}</h2>
      <p>{t("cookies.contactText")}</p>

      <p className="update">{t("cookies.update")}</p>
    </div>
  );
};

export default PoliticaCookies;

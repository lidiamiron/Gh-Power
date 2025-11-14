import React from "react";
import { useTranslation } from "react-i18next";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const tableData = t("privacy.table", { returnObjects: true });
  const headers = t("privacy.tableHeader", { returnObjects: true });

  return (
    <div className="privacy-container">
      <h1>{t("privacy.title")}</h1>
      <p>{t("privacy.intro")}</p>

      <h2>{t("privacy.responsible")}</h2>
      <p>{t("privacy.responsibleText")}</p>

      <h2>{t("privacy.purposes")}</h2>
<div className="table-container">
  <table>
    <thead>
      <tr>
        {headers.map((header, i) => (
          <th key={i}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tableData.map((row, i) => (
        <tr key={i}>
          {row.map((cell, j) => (
            <td key={j}>{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <h2>{t("privacy.recipients")}</h2>
      <p>{t("privacy.recipientsText")}</p>

      <h2>{t("privacy.rights")}</h2>
      <p>{t("privacy.rightsText")}</p>

      <h2>{t("privacy.security")}</h2>
      <p>{t("privacy.securityText")}</p>

      <p className="update">{t("privacy.update")}</p>
    </div>
  );
};

export default PrivacyPolicy;

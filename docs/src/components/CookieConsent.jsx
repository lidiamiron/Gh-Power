import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./CookieConsent.css";

const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem("cookieConsent", choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-text">
        <p>{t("cookies.message")}</p>
        <a href="/politica-cookies" className="cookie-link">
          {t("cookies.linkText")}
        </a>
      </div>
      <div className="cookie-buttons">
        <button onClick={() => handleConsent("accepted")}>
          {t("cookies.accept")}
        </button>
        <button onClick={() => handleConsent("rejected")}>
          {t("cookies.reject")}
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;

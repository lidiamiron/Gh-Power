import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGlobe, FaTimes } from "react-icons/fa";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    
    // SOLO SE AÑADE ESTO: Actualizar el atributo lang del HTML para SEO
    document.documentElement.lang = lng;
  };

  const getCurrentLanguageName = () => {
    const languages = {
      'es': 'ES',
      'en': 'EN',
      'fr': 'FR',
      'de': 'DE' // ✅ Agregar alemán
    };
    return languages[i18n.language] || 'ES';
  };

  const getFullLanguageName = () => {
    const languages = {
      'es': 'Español',
      'en': 'English',
      'fr': 'Français',
      'de': 'Deutsch' // ✅ Agregar alemán
    };
    return languages[i18n.language] || 'Español';
  };

  // SOLO SE AÑADE ESTO: Schema.org para Language
  const languageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "LK Energy - Generadores Eléctricos",
    "description": "Fabricantes de generadores eléctricos industriales LK Energy",
    "inLanguage": i18n.language,
    "availableLanguage": ["es", "en", "fr", "de"],
    "url": window.location.href
  };

  return (
    <div className="language-switcher-fixed">
      {/* SOLO SE AÑADE ESTE SCRIPT - No afecta diseño */}
      <script type="application/ld+json">
        {JSON.stringify(languageSchema)}
      </script>

      {/* Botón flotante */}
      <button 
        className="language-trigger-fixed"
        onClick={toggleLanguageMenu}
        title={`Idioma actual: ${getFullLanguageName()}`}
        aria-label={`Selector de idioma. Idioma actual: ${getFullLanguageName()}. Presiona para cambiar idioma`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FaGlobe className="globe-icon-fixed" aria-hidden="true" />
        <span className="current-language-fixed">{getCurrentLanguageName()}</span>
      </button>

      {/* Menú desplegable */}
      <div 
        className={`language-dropdown-fixed ${isOpen ? 'open' : ''}`}
        role="menu"
        aria-label="Seleccionar idioma"
      >
        <div className="language-options">
          <button 
            onClick={() => changeLanguage('es')}
            className={`language-option-fixed ${i18n.language === 'es' ? 'active' : ''}`}
            role="menuitem"
            aria-label="Cambiar a Español"
            lang="es"
          >
            <span className="language-code-fixed">ES</span>
            <span className="language-name-fixed">Español</span>
          </button>
          <button 
            onClick={() => changeLanguage('en')}
            className={`language-option-fixed ${i18n.language === 'en' ? 'active' : ''}`}
            role="menuitem"
            aria-label="Change to English"
            lang="en"
          >
            <span className="language-code-fixed">EN</span>
            <span className="language-name-fixed">English</span>
          </button>
          <button 
            onClick={() => changeLanguage('fr')}
            className={`language-option-fixed ${i18n.language === 'fr' ? 'active' : ''}`}
            role="menuitem"
            aria-label="Changer en Français"
            lang="fr"
          >
            <span className="language-code-fixed">FR</span>
            <span className="language-name-fixed">Français</span>
          </button>
          <button 
            onClick={() => changeLanguage('de')}
            className={`language-option-fixed ${i18n.language === 'de' ? 'active' : ''}`}
            role="menuitem"
            aria-label="Zu Deutsch wechseln"
            lang="de"
          >
            <span className="language-code-fixed">DE</span>
            <span className="language-name-fixed">Deutsch</span>
          </button>
        </div>
      </div>

      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div 
          className="language-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
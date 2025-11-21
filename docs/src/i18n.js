import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar las traducciones
import en from './locales/en/translation.json';
import es from './locales/es/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json'; // ✅ Agregar alemán

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  de: {
    translation: de // ✅ Agregar alemán
  }
};

// Función para obtener el idioma preferido
const getPreferredLanguage = () => {
  // 1. Primero verificar si hay un idioma guardado en localStorage
  const savedLanguage = localStorage.getItem('preferred-language');
  if (savedLanguage) return savedLanguage;

  // 2. Si no, detectar el idioma del navegador
  const browserLanguage = navigator.language.split('-')[0];
  if (resources[browserLanguage]) return browserLanguage;

  // 3. Por defecto español
  return 'es';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getPreferredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    debug: process.env.NODE_ENV === 'development'
  });

// Escuchar cambios de idioma para guardarlos
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferred-language', lng);
});

export default i18n;
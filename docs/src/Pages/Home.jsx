import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';
import i18n from "../i18n"; 

import banner from "../assets/banner.png";
import { FaTools, FaHammer, FaShieldAlt } from "react-icons/fa";

import "../Pages/Home.css";
import CertificationCarousel from '../components/CertificationCarousel';
import FeaturedProducts from '../components/FeaturedProducts';
import Contact from './Contacto';
import GeneradoresIndustriales from '../components/GeneradoresIndustriales';
import GeneradoresPortatiles from '../components/GeneradoresPortatiles';
import Sectors from '../components/Sectors';

export default function Home() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [textAnimationStarted, setTextAnimationStarted] = useState(false);
  const aboutSectionRef = useRef(null);
  const aboutLeftRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextAnimationStarted(true);
    }, 500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (aboutSectionRef.current && aboutLeftRef.current) {
        const sectionRect = aboutSectionRef.current.getBoundingClientRect();
        const elementRect = aboutLeftRef.current.getBoundingClientRect();
        setIsVisible(
          elementRect.bottom > sectionRect.top &&
          elementRect.top < sectionRect.bottom
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const offset = Math.min(scrollY * 0.5, 10);

  const cards = [
    { icon: <FaTools className="cardIcon" />, title: t('home.cards.spareParts.title'), text: t('home.cards.spareParts.text') },
    { icon: <FaHammer className="cardIcon" />, title: t('home.cards.technicalService.title'), text: t('home.cards.technicalService.text') },
    { icon: <FaShieldAlt className="cardIcon" />, title: t('home.cards.warranties.title'), text: t('home.cards.warranties.text') },
  ];

  // URL base según idioma
  const currentLang = i18n.language;
  const baseUrl = "https://gh-power.com";
  const canonicalUrl = currentLang === "es" ? baseUrl : `${baseUrl}/${currentLang}`;

  return (
    <main>
      {/* SEO + META TAGS 10/10 */}
      <Helmet>
  {/* Título y meta descripción dinámicos */}
  <title>{t("seo.home.title")}</title>
  <meta name="description" content={t("seo.home.description")} />
  <meta name="keywords" content={t("seo.home.keywords")} />

  {/* Open Graph */}
  <meta property="og:title" content={t("seo.home.title")} />
  <meta property="og:description" content={t("seo.home.description")} />
  <meta property="og:image" content="https://gh-power.com/og-image.jpg" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content={
    currentLang === "es" ? "es_ES" :
    currentLang === "en" ? "en_US" :
    currentLang === "fr" ? "fr_FR" : "de_DE"
  } />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={t("seo.home.title")} />
  <meta name="twitter:description" content={t("seo.home.description")} />
  <meta name="twitter:image" content="https://gh-power.com/og-image.jpg" />

  {/* Canonical + Hreflang */}
  <link rel="canonical" href={canonicalUrl} />
  <link rel="alternate" href="https://gh-power.com/" hreflang="es" />
  <link rel="alternate" href="https://gh-power.com/en" hreflang="en" />
  <link rel="alternate" href="https://gh-power.com/fr" hreflang="fr" />
  <link rel="alternate" href="https://gh-power.com/de" hreflang="de" />
  <link rel="alternate" href="https://gh-power.com/" hreflang="x-default" />

  <meta name="robots" content="index, follow" />

  {/* SCHEMA.ORG - Organization (JSON-LD) */}
  <script type="application/ld+json">
    {JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "GH Power",
        alternateName: "GH-Power Generadores Eléctricos",
        url: "https://gh-power.com",
        logo: "https://gh-power.com/logo.png",
        description: t("seo.home.description"),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Carrer del Ponent, 10",
          addressLocality: "La Palma de Cervelló",
          addressRegion: "Barcelona",
          postalCode: "08756",
          addressCountry: "ES"
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+34-934-185-173",
          contactType: "Customer Service",
          email: "info@gh-power.com",
          availableLanguage: ["Spanish", "English", "French", "German"]
        },
        sameAs: [
          "https://www.facebook.com/ghpower",
          "https://www.linkedin.com/company/gh-power",
          "https://www.instagram.com/ghpower"
        ]
      },
      null,
      2
    )}
  </script>
</Helmet>

      {/* HEADER */}
      <section className="header">
        <div className="home-banner">
          <img 
            className="banner" 
            src={banner} 
            alt={t("home.banner_alt", { defaultValue: "Generadores eléctricos industriales y portátiles GH Power" })} 
            loading="eager"
          />
          <div className="title-container">
            <div className="title-content">
              <h1 className="title">
                <span className={`title-line title-line-1 ${textAnimationStarted ? 'animate' : ''}`}>
                  {t('home.titleLine1')}
                </span>
                <br />
                <span className={`title-line title-line-2 ${textAnimationStarted ? 'animate' : ''}`}>
                  {t('home.titleLine2')}
                </span>
              </h1>
              <h2 className={`subtitle ${textAnimationStarted ? 'animate' : ''}`}>
                {t('home.subtitle')}
              </h2>
              <a href="/contacto">
                <button className={`presupuesto presupuesto1 ${textAnimationStarted ? 'animate' : ''}`}>
                  {t('home.budgetButton')}
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <GeneradoresIndustriales />
      <CertificationCarousel />
      <GeneradoresPortatiles />

      {/* CARDS SECTION */}
      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card.icon}
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>

      <Sectors />

      <section className='featureProducts'>
        <FeaturedProducts />
      </section>

      <section className='contact'>
        <Contact />
      </section>
    </main>
  );
}
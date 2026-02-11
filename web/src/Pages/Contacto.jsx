import React, { useRef, useState } from "react";
import { FaFacebookSquare, FaLinkedin, FaInstagram } from "react-icons/fa"; 
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async'; // Added for SEO
import emailjs from "@emailjs/browser";
import "../pages/Contacto.css";

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    user_name: "",
    user_lastname: "",
    user_email: "",
    user_phone: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setStatus(t('contact.form.requiredFields'));
      return;
    }

    setIsSending(true);
    setStatus(t('contact.form.sendingMessage'));

    try {
      await emailjs.sendForm(
        "service_0kk7i59",
        "template_ol12m5r", 
        form.current,
        "PCIrH42CmhrTcQhLc"
      );

      setStatus(t('contact.form.success'));
      setFormData({
        user_name: "",
        user_lastname: "",
        user_email: "",
        user_phone: "",
        message: ""
      });
      
    } catch (error) {
      if (error.text?.includes('template ID not found')) {
        setStatus(t('contact.form.configError'));
      } else {
        setStatus(t('contact.form.error'));
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-section">
      <Helmet>
        <title>Contacto | GH Power - Soluciones Energéticas</title>
        <meta
          name="description"
          content="Contacta con GH Power para soluciones de generadores portátiles e industriales. Estamos en Barcelona, disponibles 24/7."
        />
        <meta
          name="keywords"
          content="contacto GH Power, generadores portátiles, generadores industriales, soluciones energéticas, Barcelona"
        />
        <meta property="og:title" content="Contacto | GH Power" />
        <meta
          property="og:description"
          content="Ponte en contacto con GH Power para generadores y soluciones energéticas en Barcelona. Soporte 24/7."
        />
        <meta property="og:image" content="https://gh-power.com/images/logo.jpg" />
        <meta property="og:url" content="https://gh-power.com/contacto" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="alternate" href="https://gh-power.com/contacto" hreflang="es" />
        <link rel="alternate" href="https://gh-power.com/en/contacto" hreflang="en" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contacto GH Power",
            "description": "Página de contacto de GH Power para consultas sobre generadores y soluciones energéticas.",
            "publisher": {
              "@type": "Organization",
              "name": "GH Power",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+34934185173",
                "contactType": "Customer Service",
                "email": "info@gh-power.com",
                "areaServed": "ES",
                "availableLanguage": ["Spanish", "English", "Deuch", "French"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calle Ponent, 10 – PI Can Mascaró",
                "addressLocality": "La Palma de Cervelló",
                "addressRegion": "Barcelona",
                "postalCode": "08756",
                "addressCountry": "ES"
              },
              "sameAs": [
                "https://www.facebook.com/ghpowergenerators",
                "https://www.linkedin.com/company/gh-power"
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="contact-form">
        <h2 dangerouslySetInnerHTML={{ __html: t('contact.title') }} />
        <p>{t('contact.description')}</p>

        <form ref={form} onSubmit={sendEmail}>
          <div className="input-row">
            <div className="input-field">
              <input 
                type="text" 
                name="user_name" 
                placeholder={t('contact.form.name')} 
                value={formData.user_name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <input 
                type="text" 
                name="user_lastname" 
                placeholder={t('contact.form.lastname')} 
                value={formData.user_lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-field">
              <input 
                type="email" 
                name="user_email" 
                placeholder={t('contact.form.email')} 
                value={formData.user_email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <input 
                type="text" 
                name="user_phone" 
                placeholder={t('contact.form.phone')} 
                value={formData.user_phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="textarea-field">
            <textarea 
              name="message" 
              placeholder={t('contact.form.message')} 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {status && (
            <div className={`status-message ${status.includes(t('contact.form.success')) ? 'success' : 'error'}`}>
              {status}
            </div>
          )}
          
          <button type="submit" disabled={isSending}>
            {isSending ? t('contact.form.sending') : t('contact.form.send')}
          </button>
        </form>
      </div>

      <div className="contact-info">
        <h3 dangerouslySetInnerHTML={{ __html: t('contact.info.title') }} />
        <p dangerouslySetInnerHTML={{ __html: t('contact.info.address') }} />
        <p dangerouslySetInnerHTML={{ __html: t('contact.info.callUs') }} />
        <p dangerouslySetInnerHTML={{ __html: t('contact.info.hours') }} />
        <h4>{t('contact.info.followUs')}</h4>
        
        <div className="social-links">
          <a href="https://www.facebook.com/ghpowergenerators" target="_blank" rel="noopener noreferrer" title={t('contact.social.facebook')}>
            <FaFacebookSquare />
          </a>
          <a href="https://www.linkedin.com/company/gh-power" target="_blank" rel="noopener noreferrer" title={t('contact.social.linkedin')}>
            <FaLinkedin />
          </a>
            <a 
               href="https://www.instagram.com/ghpower_official/" 
               target="_blank"
               rel="noopener noreferrer"
               
             >
               <FaInstagram />
             </a>
        </div>
      </div>
    </section>
  );
}
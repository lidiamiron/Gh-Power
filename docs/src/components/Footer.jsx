import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import logo from "../assets/blanco_logo.png";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../components/Footer.css";
import { Link } from "react-router-dom";


const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="Lk-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/"><img src={logo} alt="Logo Gh-Power" className="logo-footer" /></a>
          <p className="tagline">{t('footer.tagline')}</p>
          <p className="live-session">{t('footer.liveSession')}</p>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">{t('footer.menu')}</h3>
          <ul className="footer-links">
            <a href="/"><li>{t('footer.company')}</li></a>
            <a href="/Productos"><li>{t('footer.products')}</li></a>
            <a href="/Descargas"><li>{t('footer.downloads')}</li></a>
            <a href="/Contacto"><li>{t('footer.contact')}</li></a>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3 className="footer-title">{t('footer.followUs')}</h3>
          <ul className="footer-links">
            <a href="https://www.facebook.com/ghpowergenerators">
              <li><FaFacebookSquare className="redes" />{t('footer.facebook')}</li>
            </a>
            <a href="https://www.linkedin.com/company/gh-power">
              <li><FaLinkedin className="redes" />{t('footer.linkedin')}</li>
            </a>
             <a href="https://www.instagram.com/ghpower_official/">
              <li><FaInstagram className="redes" />{t('footer.instagram')}</li>
            </a>
          </ul>
        </div>

        <div className="footer-column contact-column">
          <h3 className="footer-title">{t('footer.contactTitle')}</h3>
          <div className="contact-dirrection">
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {t('footer.address')}: {t('footer.addressText')}</p>
            <p><FontAwesomeIcon icon={faPhone} /> {t('footer.phone')}: {t('footer.phoneNumber')}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> {t('footer.email')}: {t('footer.emailAddress')}</p>
          </div>
          <div className="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.697121812041!2d1.981724310188269!3d41.40238353290862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4853676ccf07f%3A0xe10f291b1c649cf3!2sC%2F%20Tramuntana%2C%202%2C%2008756%20Barcelona!5e0!3m2!1ses-419!2ses!4v1752828706942!5m2!1ses-419!2ses"
              width="100%" 
              height="150" 
              style={{border: 0}} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('footer.address')}>
            </iframe>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
         <div className="legal-links">
          <Link to="/politica-privacidad" aria-label="Política de privacidad y términos" className="privacy">{t('footer.terms', 'Términos y condiciones de privacidad')}</Link>
        </div>
        <div className="copyright">
          {t('footer.copyright', 'Copyright © {{year}} Gh-Power. Todos los derechos reservados.', { 
            year: new Date().getFullYear() 
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
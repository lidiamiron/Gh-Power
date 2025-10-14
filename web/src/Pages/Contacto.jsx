import React, { useRef, useState } from "react";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTranslation } from "react-i18next";
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
        </div>
      </div>
    </section>
  );
}
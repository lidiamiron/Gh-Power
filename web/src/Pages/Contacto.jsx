import React, { useRef, useState } from "react";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import "../pages/Contacto.css";

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

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
      setStatus("Por favor, completa los campos obligatorios (*)");
      return;
    }

    setIsSending(true);
    setStatus("Enviando mensaje...");

    try {
      await emailjs.sendForm(
        "service_0kk7i59",
        "template_ol12m5r", 
        form.current,
        "PCIrH42CmhrTcQhLc"
      );

      setStatus("¡Mensaje enviado correctamente!");
      setFormData({
        user_name: "",
        user_lastname: "",
        user_email: "",
        user_phone: "",
        message: ""
      });
      
    } catch (error) {
      if (error.text?.includes('template ID not found')) {
        setStatus("Error de configuración. Por favor, contacta al administrador.");
      } else {
        setStatus("Error al enviar el mensaje. Inténtalo de nuevo.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-form">
        <h2>¡HABLEMOS <span>DE ENERGÍA!</span></h2>
        <p>¿Estás buscando un generador eléctrico y no sabes cuál es el ideal para ti? En GH Power estamos para ayudarte. Déjanos tus datos y te contactaremos con asesoría personalizada o un presupuesto a medida!</p>

        <form ref={form} onSubmit={sendEmail}>
          <div className="input-row">
            <div className="input-field">
              <input 
                type="text" 
                name="user_name" 
                placeholder="Nombre *" 
                value={formData.user_name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <input 
                type="text" 
                name="user_lastname" 
                placeholder="Apellido" 
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
                placeholder="Email *" 
                value={formData.user_email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="input-field">
              <input 
                type="text" 
                name="user_phone" 
                placeholder="Teléfono" 
                value={formData.user_phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="textarea-field">
            <textarea 
              name="message" 
              placeholder="Mensaje *" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {status && (
            <div className={`status-message ${status.includes('correctamente') ? 'success' : 'error'}`}>
              {status}
            </div>
          )}
          
          <button type="submit" disabled={isSending}>
            {isSending ? "ENVIANDO..." : "ENVIAR"}
          </button>
        </form>
      </div>

      <div className="contact-info">
        <h3>Información de <span>Contacto</span></h3>
        <p>Carrer del Ponent, 10<br />08756 La Palma de Cervelló,<br /> Barcelona</p>
        <p><strong>Llámanos</strong> +34 934 185 173</p>
        <p>Estamos abiertos de Lunes a Viernes<br />09:00 - 18:30</p>
        <h4>Síguenos</h4>
        
        <div className="social-links">
          <a href="https://www.facebook.com/ghpowergenerators" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare />
          </a>
          <a href="https://www.linkedin.com/company/gh-power" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
}
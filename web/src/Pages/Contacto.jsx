import React from "react";
import { FaFacebookSquare, FaInstagram , FaLinkedin } from "react-icons/fa";
import "../pages/Contacto.css"

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="contact-form">
        <h2>¡HABLEMOS 
  <span> DE ENERGÍA!</span></h2>
        <p> ¿Estás buscando un generador eléctrico y no sabes cuál es el ideal para ti? En GH Power estamos para ayudarte. Déjanos tus datos y te contactaremos con asesoría personalizada o un presupuesto a medida.!</p>

        <form>
          <div className="input-row">
            <input type="text" placeholder="Nombre" />
            <input type="text" placeholder="Apellido" />
          </div>
          <div className="input-row">
            <input type="email" placeholder="email" />
            <input type="text" placeholder="Telefono" />
          </div>
          <textarea placeholder="Mensaje"></textarea>
          <button type="submit">ENVIAR</button>
        </form>
      </div>

      <div className="contact-info">
        <h3>Información de <span>Contacto</span></h3>
        <p> Carrer del Ponent, 10<br />08756 La Palma de Cervelló,<br /> Barcelona</p>
        <p><strong>Llámanos</strong> +34 934 185 173</p>
        <p>Estamos abiertos de Lunes a Viernes<br />09:00 - 18:30</p>
        <h4>Follow Us</h4>
        
<div className="social-links">
  <a href="https://www.facebook.com/ghpowergenerators" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
  <a href="https://www.linkedin.com/company/gh-power" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
</div>
      </div>
    </section>
  );
}

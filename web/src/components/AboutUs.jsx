 import { useState } from "react";
 import workerImage from "../assets/generadores.jpg";


 {/* ABOUT SECTION */}
      <section className="about-section" ref={aboutSectionRef}>
        <div 
          ref={aboutLeftRef}
          className="about-left" 
          style={{ 
            transform: `translateY(${offset}px)`,
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            opacity: isVisible ? 1 : 0,
            visibility: isVisible ? 'visible' : 'hidden'
          }}
        >
          <h2 className="about-title">{t('home.aboutTitle')}</h2>
          <h1 className="about-heading">{t('home.aboutHeading')}</h1>
          <h2 className="about-subtitle">{t('home.aboutSubtitle')}</h2>
          <p className="contact-us">
            <a href="/Contacto">{t('home.contactUs')}</a>
          </p>
          <div className="about-description">
            <p>
              {t('home.aboutDescription')}
            </p>
          </div>
        </div>

        <div className="about-right">
          <div className="about-image">
            <img src={workerImage} alt="Generadores industriales" />
          </div>
        </div>
      </section>

      export default AboutUs;
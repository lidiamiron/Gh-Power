import React from 'react';
// Los imports van AQUÍ arriba, fuera de la función
import CE from '../assets/logos/CEcertified.png';
import EMC from '../assets/logos/EMC.png';
import GS from '../assets/logos/gscertified.png';
import ISO from '../assets/logos/ISO.png';
import STAGE from '../assets/logos/stagecertified.png';
import TCFE from '../assets/logos/TCFElite.png';
import TUVRhein from '../assets/logos/TUVRheinland.png';
import UL from '../assets/logos/ulCertified.png';
import "../components/CertificationCarousel.css"

export default function CertificationCarousel() {
  // Usa las variables importadas, no los strings
  const certifications = [
    { name: 'CE', logo: CE },
    { name: 'EMC', logo: EMC },
    { name: 'GS', logo: GS },
    { name: 'ISO', logo: ISO },
    { name: 'STAGE', logo: STAGE },
    { name: 'TCFE', logo: TCFE },
    { name: 'TUVRhein', logo: TUVRhein },
    { name: 'UL', logo: UL },
  ];

  return (
    <div>
      <div className="w-full max-w-6xl">
        
        <div className="carousel-container">
          <div className="carousel-track">
            {/* Primera copia de los logos */}
            {certifications.map((cert, index) => (
              <div key={`cert-1-${index}`} className="carousel-item">
                <div>
                  <img 
                    src={cert.logo} 
                    alt={cert.name}
                  />
                </div>
              </div>
            ))}
            
            {/* Segunda copia para efecto infinito */}
            {certifications.map((cert, index) => (
              <div key={`cert-2-${index}`} className="carousel-item">
                <div>
                  <img 
                    src={cert.logo} 
                    alt={cert.name}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
}

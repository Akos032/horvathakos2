import React, { useState } from "react";
import './Aboutus.css';

export const AboutSection = () => {
  const [showAbout, setShowAbout] = useState(false);

  const toggleAboutText = () => {
    setShowAbout(!showAbout);
  };

  const closePopup = () => {
    setShowAbout(false);
  };

  return (
    <div className="about-container">
      <div className="about-footer">
        <div className="contact-box">
          <h3 className="contact-title">Elérhetőségeink:</h3>
          <ul className="contact-list">
            <li><strong>Email:</strong> info@fozomester.hu</li>
            <li><strong>Telefon:</strong> +36 30 123 4567</li>
            <li><strong>Facebook:</strong> <a href="https://www.facebook.com/fozomester" target="_blank" rel="noopener noreferrer">Főzőmester</a></li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/fozomester" target="_blank" rel="noopener noreferrer">@fozomester</a></li>
          </ul>
        </div>
        <div className="advertisement-box">
          <h3 className="advertisement-title">Ne hagyd ki!</h3>
          <p className="advertisement-text">
            Különleges akcióink és új receptjeink folyamatosan frissülnek! Iratkozz fel a hírlevelünkre, hogy elsőként értesülj a legújabb ajánlatainkról!
          </p>
          <button className="advertisement-btn" onClick={toggleAboutText}>
            Iratkozz fel most!
          </button>
        </div>
      </div>

      {showAbout && (
        <div className="about-popup show" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Rólunk</h2>
            <p>
              Mi egy szenvedélyes és kreatív csapat vagyunk, akik elkötelezettek amellett, hogy a főzés mindenki számára elérhető és élvezetes legyen. Hiszünk abban, hogy a konyhában töltött idő nem csupán szükségszerűség, hanem lehetőség arra, hogy új ízeket fedezzünk fel, emlékeket teremtsünk és megosszuk az étkezés örömét szeretteinkkel.
            </p>
            <p>
              Célunk, hogy változatos, könnyen követhető és inspiráló recepteket kínáljunk, amelyek segítségével bárki magabiztosan alkothat a konyhában, legyen akár kezdő, akár tapasztalt séf. A világ különböző konyháinak ízeit ötvözve szeretnénk mindenkit arra ösztönözni, hogy próbáljon ki új dolgokat, és fedezze fel a főzés örömét.
            </p>
            <p>
              Emellett közösségépítő szerepünk is fontos számunkra: interaktív tartalmakkal, tippekkel és kihívásokkal ösztönzünk arra, hogy oszd meg velünk saját konyhai élményeidet. Csatlakozz hozzánk, és tapasztald meg, hogy a főzés nem csupán egy napi rutin, hanem egy igazi kreatív kaland!
            </p>
            <button className="close-btn" onClick={closePopup}>Bezárás</button>
          </div>
        </div>
      )}
    </div>
  );
};


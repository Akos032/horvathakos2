import React from "react";
import './Aboutus.css';

export const AboutSection = () => {
  return (
    <div className="container">
      <div className="row about-section">
        <div className="col-md-4 about-box">
          <h2 className="about-title">Rólunk</h2>
          <p>
            Mi egy lelkes csapat vagyunk, akik szenvedélyesen hisznek abban, hogy a főzés nem csak egy szükségszerű tevékenység, hanem egy kreatív, szórakoztató és közösségformáló élmény is. Célunk, hogy segítünk mindenkinek, aki szeretne finom és változatos ételeket készíteni, legyen szó kezdő háziasszonyról vagy tapasztalt séfről.
          </p>
          <p>
            Minden receptünket gondosan válogatjuk, hogy inspiráljunk, új ízeket próbálj ki, és egy könnyed főzési élményt nyújtsunk. A legfontosabb számunkra, hogy mindenki élvezze a főzést és az étkezést, miközben finom és egészséges ételeket készíthet.
          </p>
        </div>
        <div className="col-md-4 about-box">
          <h3 className="contact-title">Elérhetőségeink:</h3>
          <ul className="contact-list">
            <li><strong>Email:</strong> info@fozomester.hu</li>
            <li><strong>Telefon:</strong> +36 30 123 4567</li>
            <li><strong>Facebook:</strong> <a href="https://www.facebook.com/fozomester" target="_blank" rel="noopener noreferrer">Főzőmester</a></li>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/fozomester" target="_blank" rel="noopener noreferrer">@fozomester</a></li>
          </ul>
        </div>
        <div className="col-md-4 about-box">
          <h3 className="advertisement-title">Ne hagyd ki!</h3>
          <p className="advertisement-text">
            Különleges akcióink és új receptjeink folyamatosan frissülnek! Iratkozz fel a hírlevelünkre, hogy elsőként értesülj a legújabb ajánlatainkról!
          </p>
          <button className="advertisement-btn">Iratkozz fel most!</button>
        </div>
      </div>
    </div>
  );
};

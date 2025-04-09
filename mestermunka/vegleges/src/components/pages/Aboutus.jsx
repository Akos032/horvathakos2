import React, { useState } from "react";
import './Aboutus.css';

export const AboutSection = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [likes, setLikes] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const toggleAboutText = () => {
    setShowAbout((prevState) => !prevState);
  };

  const closePopup = () => {
    setShowAbout(false);
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      const newFeedback = {
        text: feedback.trim(),
        rating: selectedRating,
        date: new Date().toLocaleString("hu-HU", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })
      };
      setSubmittedFeedback([...submittedFeedback, newFeedback]);
      setFeedback("");
      setSelectedRating(0);
    }
  };

  return (
    <div className="about-container full-footer">
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
            Különleges akcióink és új receptjeink folyamatosan frissülnek!
          </p>
          <button className="about-btn" onClick={toggleAboutText}>
            Rólunk
          </button>
        </div>
      </div>

      {showAbout && (
        <div className="about-popup show" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Rólunk</h2>
            <img src="public/Média.png" alt="Rólunk" className="about-image" />
            <p>
              Mi egy szenvedélyes és kreatív csapat vagyunk, akik elkötelezettek amellett, hogy a főzés mindenki számára elérhető és élvezetes legyen.
            </p>
            <p>
              Célunk, hogy változatos, könnyen követhető és inspiráló recepteket kínáljunk, amelyek segítségével bárki magabiztosan alkothat a konyhában.
            </p>
            <p>
              Emellett közösségépítő szerepünk is fontos számunkra. Csatlakozz hozzánk, és tapasztald meg, hogy a főzés nem csupán egy napi rutin, hanem egy igazi kreatív kaland!
            </p>

            <div className="about-actions">
              <button className="close-btn" onClick={closePopup}>Kilépés</button>
              <button className="like-btn" onClick={handleLike}>❤️ Like ({likes})</button>
            </div>

            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <label htmlFor="feedback">Oszd meg velünk a véleményed:</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Írd le, mi tetszett vagy min javítanál..."
                required
              ></textarea>

              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= selectedRating ? "star selected" : "star"}
                    onClick={() => setSelectedRating(star)}
                  >
                    ⭐
                  </span>
                ))}
              </div>


              <button type="submit" className="submit-feedback">Vélemény elküldése</button>
            </form>

            {submittedFeedback.length > 0 && (
              <div className="feedback-list">
                <h4>Így látták mások:</h4>
                {submittedFeedback.map((item, index) => (
                  <div key={index} className="feedback-entry fade-in">
                    <p className="feedback-text">💬 <strong>{item.text}</strong></p>
                    <p className="feedback-meta">Értékelés: {item.rating} ⭐ – {item.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
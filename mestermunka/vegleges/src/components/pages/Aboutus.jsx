import React, { useState,useEffect } from "react";
import './Aboutus.css';
import axios from "axios";


export const AboutSection = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [likes, setLikes] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [userLiked, setUserLiked] = useState(false);


  const toggleAboutText = () => {
    setShowAbout((prevState) => !prevState);
  };

  const closePopup = () => {
    setShowAbout(false);
  };

  useEffect(() => {
    if (showAbout) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        axios.get(`http://localhost:3001/api/user-like/${user.felhasznalo_id}`)
          .then((res) => setUserLiked(res.data.like === 1))
          .catch(() => console.error("Nem sikerült lekérni a felhasználó státuszát."));
      }
  
      axios.get("http://localhost:3001/api/total-likes")
        .then((res) => setLikes(res.data.totalLikes))
        .catch(() => console.error("Nem sikerült lekérni a kedvelések számát."));
    }
  }, [showAbout]);
  

  const handleLike = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Jelentkezz be a kedveléshez!");
      return;
    }
  
    axios.post("http://localhost:3001/api/toggle-like", { userId: user.felhasznalo_id })
      .then((response) => {
        const newLikeValue = response.data.newLikeValue;
        setUserLiked(newLikeValue === 1);
        axios.get("http://localhost:3001/api/total-likes")
          .then((res) => setLikes(res.data.totalLikes));
  
        if (newLikeValue === 1) {
          alert("Köszönjük a kedvelést!");
        } else {
          alert("Kedvelés visszavonva!");
        }
      })
      .catch((err) => alert(err.response?.data?.error || "Hiba történt!"));
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
                   Üdvözlünk a Finomságok oldalán! Fedezd fel receptjeinket, és hozd el a konyhába a szenvedélyt!
                      Mondj véleményt!
                      Kíváncsiak vagyunk a visszajelzésedre! Hogyan találtad az oldalunkat? Mi tetszett, min változtatnál? Oszd meg velünk, és segíts, hogy még jobbá váljunk!
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
              <button className="like-btn" onClick={handleLike}>{userLiked ? "💔 Kedvelés visszavonása" : "❤️ Kedvelés"}</button>
              <p id="like-count">Weboldal kedvelések száma: <strong>{likes}</strong></p>
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
import React, { useState, useEffect } from "react";
import "./Aboutus.css";
import axios from "axios";

export const AboutSection = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [likes, setLikes] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [userLiked, setUserLiked] = useState(false);

  const toggleAboutText = () => setShowAbout((prev) => !prev);
  const closePopup = () => setShowAbout(false);

  const fetchData = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      axios.get(`http://localhost:3001/api/user-like/${storedUser.felhasznalo_id}`)
        .then((res) => setUserLiked(res.data.like === 1));
    }

    axios.get("http://localhost:3001/api/total-likes")
      .then((res) => setLikes(res.data.totalLikes));

    axios.get("http://localhost:3001/api/all-comments")
      .then((res) => {
        if (storedUser) {
          const userComments = res.data.filter(c => c.user_id === storedUser.felhasznalo_id);
          const others = res.data.filter(c => c.user_id !== storedUser.felhasznalo_id);
          setComments([...userComments, ...others]);
        } else {
          setComments(res.data);
        }
      });
  };

  useEffect(() => {
    if (showAbout) {
      fetchData();
    }
  }, [showAbout]);

  const handleLike = () => {
    if (!user) return alert("Jelentkezz be a kedveléshez!");
    axios.post("http://localhost:3001/api/toggle-like", { userId: user.felhasznalo_id })
      .then(() => fetchData());
  };

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!user) return alert("Jelentkezz be a kommenteléshez!");
    if (feedback.trim()) {
      axios.post("http://localhost:3001/api/add-comment", {
        userId: user.felhasznalo_id,
        komment: feedback.trim()
      }).then(() => {
        setFeedback("");
        fetchData();
        alert("Vélemény elmentve!");
      });
    }
  };

  const handleDeleteComment = () => {
    axios.delete(`http://localhost:3001/api/delete-comment/${user.felhasznalo_id}`)
      .then(() => {
        fetchData();
        alert("Komment törölve.");
      });
  };

  const hasUserComment = comments.some(c => user && c.user_id === user.felhasznalo_id);

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
            Üdvözlünk a Finomságok oldalán! Fedezd fel receptjeinket, és oszd meg véleményed!
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
            <p>Kreatív csapat, finom receptek, lelkes közösség. Csatlakozz hozzánk!</p>

            <div className="about-actions">
              <button className="close-btn" onClick={closePopup}>Kilépés</button>
              <button className="like-btn" onClick={handleLike}>
                {userLiked ? "💔 Visszavonás" : "❤️ Kedvelés"}
              </button>
            </div>

            <p id="like-count">Kedvelések: <strong>{likes}</strong></p>

            <div className="comment-section">
              <h3>Vélemények</h3>

              {!hasUserComment && user && (
                <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                  <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Írd le a véleményed..."
                    required
                  ></textarea>
                  <button type="submit" className="submit-feedback">Elküld</button>
                </form>
              )}

              {comments.map(c => (
                <div key={c.komment_id} className="feedback-entry fade-in">
                  <p className="feedback-text">💬 <strong>{c.komment}</strong></p>
                  <p className="feedback-meta">– {c.felhasznalonev}</p>
                  {user && c.user_id === user.felhasznalo_id && (
                    <button onClick={() => handleDeleteComment(c.komment_id)} className="delete-btn">🗑️ Törlés</button>
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundBubbles from "./BackgroundBubbles"; // Mivel ugyanabban a mappában található
import logo from "/Mediapng2.png"; // Itt változtathatod a logó elérési útját

const phrases = [
  "Üdvözöl a Receptek4You oldala!",
  "Főzzünk valami jót!",
  "Indulhat az ízutazás!",
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 2000);

    const loadingTimer = setTimeout(() => setLoading(false), 4500);

    // Automatikus navigálás a főoldalra, amikor a betöltés befejeződik
    if (!loading) {
      navigate("/home");
    }

    return () => {
      clearInterval(phraseTimer);
      clearTimeout(loadingTimer);
    };
  }, [loading, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "linear-gradient(to bottom right, #003300, #006600, #00cc66)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <BackgroundBubbles />

      {/* VILLANÓ KÖR A LOGÓ MÖGÖTT */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent)",
          zIndex: 0,
        }}
      />

      {/* LOGÓ ANIMÁCIÓ */}
      <motion.img
        src={logo}
        alt="Média logó"
        initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          width: "220px",
          height: "auto",
          marginBottom: "25px",
          zIndex: 1,
          filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))",
        }}
      />

      {/* SZLOGENEK FELVILLANÁSA */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhrase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: "22px", fontWeight: "bold", zIndex: 1 }}
        >
          {phrases[currentPhrase]}
        </motion.div>
      </AnimatePresence>

      {/* LOADING VAGY GOMB */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            zIndex: 1,
            marginTop: "30px",
            letterSpacing: "2px",
          }}
        >
          Betöltés...
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/home")} // Itt is lehet manuális navigálás
          style={{
            marginTop: "30px",
            padding: "14px 32px",
            borderRadius: "12px",
            backgroundColor: "white",
            color: "#003300",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
            zIndex: 1,
            transition: "0.3s ease",
          }}
        >
          Lépj be a főoldalra
        </motion.button>
      )}
    </div>
  );
};

export default LandingPage;

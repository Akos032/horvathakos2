import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/Profile") // Backend végpont a regisztrációs adatokhoz
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Hiba a profiladatok betöltése során:", error);
      });
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-gray-500 text-lg">🔄 Betöltés...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-6">
      <motion.div 
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-gray-300 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          className="w-32 h-32 rounded-full mx-auto border-4 border-purple-600 shadow-lg"
          src={user.profilePicture || "https://via.placeholder.com/150"} 
          alt="Profilkép"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.h2 
          className="text-3xl font-bold mt-5 text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {user.username}
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-lg mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {user.email}
        </motion.p>
        <motion.p 
          className="mt-3 text-sm text-gray-500 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          Felhasználói azonosító: {user.id}
        </motion.p>
        <motion.p 
          className="mt-3 text-sm text-gray-700 font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Regisztráció dátuma: {user.registrationDate}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Profile;

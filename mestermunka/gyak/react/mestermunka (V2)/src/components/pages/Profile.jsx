import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [TobbId, setTobbId] = useState(null); // to handle recipe detail expansion
  const [showTable, setShowTable] = useState(null); // to toggle information table

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (loggedInUser) {
      setUser(loggedInUser);
      loadSavedRecipes(loggedInUser.Felhasznalo_id);
    } else {
      alert("You are not logged in! Redirecting to login.");
      window.location.href = "/login";  
    }
  }, []);

  const loadSavedRecipes = (userId) => {
    axios.get(`http://localhost:3001/api/saved-recipes/${userId}`)
      .then(response => setSavedRecipes(response.data))
      .catch(error => console.error("Hiba a mentett receptek lekérdezésekor", error));
  };

  if (!user) return <p>Betöltés...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 shadow-lg rounded-2xl bg-gradient-to-r from-black to-gray-900 text-white text-center">
      <h1>{user.Felhasznalonev} profilja</h1>
      <p className="text-gray-400">{user.Email}</p>

      <h2 className="mt-4 text-xl font-semibold">Mentett receptek</h2>
      {savedRecipes.length === 0 ? (
        <p className="text-gray-400">Nincsenek mentett receptek.</p>
      ) : (
        <div id="recipes-container">
          {savedRecipes.map(recipe => (
            <div id="recipe-card" key={recipe.Receptek_id} className="mt-4">
              <img src={recipe.kep} alt={recipe.Receptek_neve} className="w-full h-48 object-cover rounded-md" />
              <div id="recipe-body" className="mt-2">
                <h5 id="recipe-title" className="text-2xl font-bold">{recipe.Receptek_neve}</h5>
                <p id="recipe-text" className="text-gray-300">
                  {TobbId === recipe.Receptek_id ? recipe.Keszites : `${recipe.Keszites.substring(0, 200)}...`}
                </p>
                <button 
                  id="expand-button" 
                  onClick={() => setTobbId(TobbId === recipe.Receptek_id ? null : recipe.Receptek_id)} 
                  className="text-blue-500 mt-2"
                >
                  {TobbId === recipe.Receptek_id ? "Kevesebb" : "Több"}
                </button>
                <button 
                  id="info-button" 
                  onClick={() => setShowTable(showTable === recipe.Receptek_id ? null : recipe.Receptek_id)} 
                  className="text-blue-500 mt-2"
                >
                  {showTable === recipe.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
                </button>
                
                {showTable === recipe.Receptek_id && (
                  <div className="mt-4 text-left">
                    <p><strong>Hozzávalók:</strong> {recipe.hozzavalok}</p>
                    <p><strong>Étkezés típusa:</strong> {recipe.etkezes}</p>
                    <p><strong>Érzékenységek:</strong> {recipe.erzekenyseg}</p>
                    <p><strong>Mennyiség:</strong> {recipe.mennyiseg} {recipe.mértékegység}</p>
                    <p><strong>Napszak:</strong> {recipe.idoszak}</p>
                    <p><strong>Konyha:</strong> {recipe.nemzetiseg}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [TobbId, setTobbId] = useState(null); 
  const [showTable, setShowTable] = useState(null);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      if (loggedInUser) {
        setUser(loggedInUser);
        loadSavedRecipes(loggedInUser.Felhasznalo_id);
        loadDescriptionData();
      } else {
        alert("You are not logged in! Redirecting to login.");
        window.location.href = "/login";  
      }
    } catch (error) {
      console.error("Error reading user data:", error);
      alert("Hiba történt! Kérlek, próbáld újra.");
      window.location.href = "/login";
    }
  }, []);

  const loadSavedRecipes = (userId) => {
    axios.get(`http://localhost:3001/api/saved-recipes/${userId}`)
      .then(response => {
        setSavedRecipes(response.data); 
      })
      .catch(error => console.error("Hiba a mentett receptek lekérdezésekor", error));
  };
  const loadDescriptionData = () => {
    axios.get("http://localhost:3001/leiras")
      .then(response => {
        setDescription(response.data);
      })
      .catch(error => console.error("Hiba a recept leírás lekérdezésekor", error));
  };

  const removeRecipe = (recipeId) => {
    if (!user) {
      alert("Be kell jelentkezned a recept eltávolításához!");
      return;
    }

    axios.post("http://localhost:3001/api/unsave-recipe", {
      Profil: user.Felhasznalo_id,
      Receptek: recipeId
    })
    .then(response => {
      alert("Recept eltávolítva!");
      setSavedRecipes(savedRecipes.filter(recipe => recipe.Receptek_id !== recipeId));
    })
    .catch(error => {
      console.error("Hiba a törléskor:", error);
      alert(error.response?.data?.error || "Hiba történt a törléskor!");
    });
  };

  if (!user) return <p>Betöltés...</p>;

  return (
    <div id="profile-container" className="max-w-lg mx-auto mt-10 p-5 shadow-lg rounded-2xl bg-gradient-to-r from-black to-gray-900 text-white text-center">
      <h1>{user.Felhasznalonev} profilja</h1>
      <p className="text-gray-400">{user.Email}</p>

      <h2 className="mt-4 text-xl font-semibold">Mentett receptek</h2>
      {savedRecipes.length === 0 || savedRecipes.every(recipe => recipe.Receptek_id === null) ? (
      <p className="text-gray-400 text-lg font-semibold">📌 Nincs lementett recepted!</p>
        ) : (
        <div id="profile-recipes-container">
          {savedRecipes.map(recipe => (
            <div id="profile-recipe-card" key={recipe.Receptek_id} className="mt-4">
              <img src={recipe.kep} alt={recipe.Receptek_neve} className="w-full h-48 object-cover rounded-md" />
              <div id="profile-recipe-body" className="mt-2">
                <h5 id="profile-recipe-title" className="text-2xl font-bold">{recipe.Receptek_neve}</h5>
                <p id="profile-recipe-text" className="text-gray-300">
                  {TobbId === recipe.Receptek_id ? recipe.Keszites : `${recipe.Keszites?.substring(0, 200) || ''}...`}
                </p>
                <button 
                  id="profile-expand-button" 
                  onClick={() => setTobbId(TobbId === recipe.Receptek_id ? null : recipe.Receptek_id)} 
                  className="text-blue-500 mt-2"
                >
                  {TobbId === recipe.Receptek_id ? "Kevesebb" : "Több"}
                </button>
                <button 
                  id="profile-info-button" 
                  onClick={() => setShowTable(showTable === recipe.Receptek_id ? null : recipe.Receptek_id)}
                >
                  {showTable === recipe.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
                </button>
                {showTable === recipe.Receptek_id && (
                <div id="profile-info-box">
                  <div id="profile-ingredients-wrapper">
                    {description
                      .filter(leiras => leiras.Receptek_id === recipe.Receptek_id)
                      .map((leiras) => (
                        <div key={leiras.id} className="profile-ingredient-row">
                          <span className="profile-ingredient-name">{leiras.Hozzavalok_neve}</span>
                          <span className="profile-ingredient-amount">{leiras.mennyiseg} {leiras.mértékegység}</span>
                        </div>
                      ))}
                  </div>
                  <p><strong>Étkezés típusa:</strong> {recipe.etkezes}</p>
                  <p><strong>Érzékenységek:</strong> {recipe.erzekenyseg}</p>
                  <p><strong>Napszak:</strong> {recipe.idoszak}</p>
                  <p><strong>Konyha:</strong> {recipe.nemzetiseg}</p>
                </div>
              )}
              <button 
                id="profile-save-button" 
                onClick={() => removeRecipe(recipe.Receptek_id)} 
                className="text-red-500 mt-2"
              >
                ❌ Eltávolítás
              </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

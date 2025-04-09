import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]); 
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const [expandedInfoRecipeId, setExpandedInfoRecipeId] = useState(null);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));

      if (loggedInUser) {
        setUser(loggedInUser);
        loadSavedRecipes(loggedInUser.felhasznalo_id);
        loadCreatedRecipes(loggedInUser.felhasznalo_id);
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
      .catch(error => console.error("Error fetching saved recipes", error));
  };

  const loadCreatedRecipes = (userId) => {
    axios.get(`http://localhost:3001/api/recipes/user/${userId}`)
      .then(response => {
        setCreatedRecipes(response.data); 
      })
      .catch(error => console.error("Error fetching created recipes", error));
  };

  const loadDescriptionData = () => {
    axios.get("http://localhost:3001/leiras")
      .then(response => {
        setDescription(response.data);
      })
      .catch(error => console.error("Error fetching description data", error));
  };

  const removeSavedRecipe = (recipeId) => {
    if (!user) {
      alert("Be kell jelentkezned a recept eltávolításához!");
      return;
    }

    axios.post("http://localhost:3001/api/unsave-recipe", {
      profil: user.felhasznalo_id,
      receptek: recipeId
    })
      .then(response => {
        alert("Recept eltávolítva!");
        setSavedRecipes(savedRecipes.filter(recipe => recipe.Receptek_id !== recipeId));
      })
      .catch(error => {
        console.error("Error removing saved recipe:", error);
        alert(error.response?.data?.error || "Hiba történt a törléskor!");
      });
  };

  const removeCreatedRecipe = (recipeId) => {
    if (!user) {
      alert("Be kell jelentkezned a recept eltávolításához!");
      return;
    }

    axios.delete(`http://localhost:3001/api/delete-recipe/${recipeId}`)
      .then(response => {
        alert("Recept sikeresen törölve!");
        setCreatedRecipes(createdRecipes.filter(recipe => recipe.Receptek_id !== recipeId));
      })
      .catch(error => {
        console.error("Error deleting recipe:", error);
        alert(error.response?.data?.error || "Hiba történt a törléskor!");
      });
  };

  if (!user) return <p>Betöltés...</p>;

  return (
    <div id="profile-container" className="max-w-lg mx-auto mt-10 p-5 shadow-lg rounded-2xl bg-gradient-to-r from-black to-gray-900 text-white text-center">
      <h1>{user.felhasznalonev} profilja</h1>
      <p className="text-gray-400">{user.email}</p>
      <h2 className="mt-4 text-xl font-semibold">Mentett receptek</h2>
      {savedRecipes.length === 0 ? (
        <p className="text-gray-400 text-lg font-semibold">📌 Nincs lementett recepted!</p>
      ) : (
        <div id="profile-recipes-container">
          {savedRecipes.map(recipe => (
            <div id="profile-recipe-card" key={recipe.Receptek_id} className="mt-4">
              <img src={recipe.kep} alt={recipe.receptek_neve} className="w-full h-48 object-cover rounded-md" />
              <div id="profile-recipe-body" className="mt-2">
                <h5 id="profile-recipe-title" className="text-2xl font-bold">{recipe.receptek_neve}</h5>
                <p id="profile-recipe-text" className="text-gray-300">
                  {expandedRecipeId === recipe.Receptek_id ? recipe.keszites : `${recipe.keszites?.substring(0, 200) || ''}...`}
                </p>
                <button 
                  id="profile-expand-button" 
                  onClick={() => setExpandedRecipeId(expandedRecipeId === recipe.Receptek_id ? null : recipe.Receptek_id)} 
                  className="text-blue-500 mt-2"
                >
                  {expandedRecipeId === recipe.Receptek_id ? "Kevesebb" : "Több"}
                </button>
                <button 
                  id="profile-info-button" 
                  onClick={() => setExpandedInfoRecipeId(expandedInfoRecipeId === recipe.Receptek_id ? null : recipe.Receptek_id)}
                >
                  {expandedInfoRecipeId === recipe.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
                </button>
                {expandedInfoRecipeId === recipe.Receptek_id && (
                  <div id="profile-info-box">
                    <div id="profile-ingredients-wrapper">
                      {description
                        .filter(leiras => leiras.Receptek_id === recipe.Receptek_id)
                        .map((leiras) => (
                          <div key={leiras.id} className="profile-ingredient-row">
                            <span className="profile-ingredient-name">{leiras.hozzavalok_neve}</span>
                            <span className="profile-ingredient-amount">{leiras.mennyiseg} {leiras.mertekegyseg}</span>
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
                  id="profile-unsave-button" 
                  onClick={() => removeSavedRecipe(recipe.Receptek_id)} 
                  className="text-red-500 mt-2"
                >
                  ❌ Eltávolítás
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2 className="mt-4 text-xl font-semibold">Saját receptek</h2>
      {createdRecipes.length === 0 ? (
        <p className="text-gray-400 text-lg font-semibold">📌 Még nem készítettél receptet!</p>
      ) : (
        <div id="profile-recipes-container">
          {createdRecipes.map(recipe => (
            <div id="profile-recipe-card" key={recipe.Receptek_id} className="mt-4">
              <img src={recipe.kep} alt={recipe.receptek_neve} className="w-full h-48 object-cover rounded-md" />
              <div id="profile-recipe-body" className="mt-2">
                <h5 id="profile-recipe-title" className="text-2xl font-bold">{recipe.receptek_neve}</h5>
                <p id="profile-recipe-text" className="text-gray-300">
                  {expandedRecipeId === recipe.Receptek_id ? recipe.keszites : `${recipe.keszites?.substring(0, 200) || ''}...`}
                </p>
                <button 
                  id="profile-expand-button" 
                  onClick={() => setExpandedRecipeId(expandedRecipeId === recipe.Receptek_id ? null : recipe.Receptek_id)} 
                  className="text-blue-500 mt-2"
                >
                  {expandedRecipeId === recipe.Receptek_id ? "Kevesebb" : "Több"}
                </button>
                <button 
                  id="profile-info-button" 
                  onClick={() => setExpandedInfoRecipeId(expandedInfoRecipeId === recipe.Receptek_id ? null : recipe.Receptek_id)}
                >
                  {expandedInfoRecipeId === recipe.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
                </button>
                {expandedInfoRecipeId === recipe.Receptek_id && (
                  <div id="profile-info-box">
                    <div id="profile-ingredients-wrapper">
                      {description
                        .filter(leiras => leiras.Receptek_id === recipe.Receptek_id)
                        .map((leiras) => (
                          <div key={leiras.id} className="profile-ingredient-row">
                            <span className="profile-ingredient-name">{leiras.hozzavalok_neve}</span>
                            <span className="profile-ingredient-amount">{leiras.mennyiseg} {leiras.mertekegyseg}</span>
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
                  id="profile-unsave-button" 
                  onClick={() => removeCreatedRecipe(recipe.Receptek_id)} 
                  className="text-red-500 mt-2"
                >
                  ❌ Törlés
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

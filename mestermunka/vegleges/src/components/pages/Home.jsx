import React, { useEffect, useState } from "react";
import axios from "axios";
import './Home.css';
import { AboutSection } from './Aboutus';

export const Home = ({ kereses }) => {
  const [osszes, setOsszes] = useState([]);
  const [TobbId, setTobbId] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [description, setDescription] = useState([]);
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      try {
        const userObj = JSON.parse(loggedInUser);
        setUser(userObj);
        loadSavedRecipes(userObj.felhasznalo_id);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }

    axios.get(`http://localhost:3001/api/valid?keres=${kereses}`)
      .then(response => setOsszes(response.data))
      .catch(error => console.error("API Error:", error));

    axios.get(`http://localhost:3001/leiras`)
      .then(data => setDescription(data.data))
      .catch(err => console.log(err));
  }, [kereses]);

  const loadSavedRecipes = (userId) => {
    axios.get(`http://localhost:3001/api/saved-recipes/${userId}`)
      .then(response => {
        const validRecipes = Array.isArray(response.data) ? response.data : [];
        setSavedRecipes(validRecipes.map(r => r.Receptek_id));
      })
      .catch(error => console.error("Hiba a mentett receptek lekérdezésekor", error));
  };

  const saveRecipe = (recipeId) => {
    if (!user) {
      alert("Be kell jeletkezned mentéshez!");
      return;
    }

    if (!user.felhasznalo_id || !recipeId) {
      alert("Invalid data: No user or recipe ID.");
      return;
    }

    axios.post("http://localhost:3001/api/save-recipe", {
      profil: user.felhasznalo_id,
      receptek: recipeId
    })
      .then(() => {
        alert("Recept elmentve!");
        setSavedRecipes(prevState => [...prevState, recipeId]);
      })
      .catch(error => {
        console.error("Error saving recipe:", error);
        alert("Hiba történt a mentés során.");
      });
  };

  const filteredRecipes = osszes.filter(recipe =>
    recipe.receptek_neve.toLowerCase().includes(kereses.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="home-recipesContainer">
        {filteredRecipes.map((ossze) => (
          <div className="home-recipeCard" key={ossze.Receptek_id}>
            <img src={ossze.kep} alt="Recept kép" className="home-recipeImage" />
            <div className="home-recipeBody">
              <h5 className="home-recipeTitle">{ossze.receptek_neve}</h5>
              <p className="home-recipeText">
                {TobbId === ossze.Receptek_id ? ossze.keszites : `${ossze.keszites.substring(0, 210)}...`}
              </p>
              <button
                className="home-button"
                onClick={() => setTobbId(TobbId === ossze.Receptek_id ? null : ossze.Receptek_id)}
              >
                {TobbId === ossze.Receptek_id ? "Kevesebb" : "Több"}
              </button>
              <button
                className="home-button"
                onClick={() => setShowTable(showTable === ossze.Receptek_id ? null : ossze.Receptek_id)}
              >
                {showTable === ossze.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
              </button>
              {showTable === ossze.Receptek_id && (
                <div className="home-infoBox">
                  <div className="home-ingredientsWrapper">
                    {description
                      .filter(leiras => leiras.Receptek_id === ossze.Receptek_id)
                      .map((leiras) => (
                        <div key={leiras.id} className="home-ingredientRow">
                          <span className="home-ingredientName">{leiras.hozzavalok_neve}</span>
                          <span className="home-ingredientAmount">{leiras.mennyiseg} {leiras.mertekegyseg}</span>
                        </div>
                      ))}
                  </div>
                  <p className="p1"><strong>Étkezés típusa:</strong> {ossze.etkezes}</p>
                  <p className="p2"><strong>Érzékenységek:</strong> {ossze.erzekenyseg}</p>
                  <p className="p3"><strong>Napszak:</strong> {ossze.idoszak}</p>
                  <p className="p4"><strong>Konyha:</strong> {ossze.nemzetiseg}</p>
                </div>
              )}
              {user && (
                <button
                  className="home-button"
                  onClick={() => saveRecipe(ossze?.Receptek_id)}
                  disabled={savedRecipes.includes(ossze?.Receptek_id)}
                >
                  {savedRecipes.includes(ossze?.Receptek_id) ? "✅ Mentve" : "❤️ Mentés"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <AboutSection />
    </div>
  );
};

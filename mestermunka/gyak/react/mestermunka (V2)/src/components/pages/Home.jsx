import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import './Home.css';
import { AboutSection } from './Aboutus';
import Profile from "./Profile";

export const Home = () => {
  const [kereses, setKereses] = useState("");
  const [osszes, setOsszes] = useState([]);
  const [TobbId, setTobbId] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [description, setDescription] = useState([]);
  const [user, setUser] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Get logged-in user from localStorage
    const loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      try {
        // Parse user data only if it's a valid JSON string
        const userObj = JSON.parse(loggedInUser);
        setUser(userObj);
        loadSavedRecipes(userObj.Felhasznalo_id);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }

    axios.get(`http://localhost:3001/api/osszes?keres=${kereses}`)
      .then(response => setOsszes(response.data))
      .catch(error => console.error("API Error:", error));

    axios.get(`http://localhost:3001/leiras`)
      .then(data => setDescription(data.data))
      .catch(err => console.log(err));
  }, [kereses]);

  const loadSavedRecipes = (userId) => {
    axios.get(`http://localhost:3001/api/saved-recipes/${userId}`)
      .then(response => setSavedRecipes(response.data.map(r => r.Receptek)))
      .catch(error => console.error("Hiba a mentett receptek lekérdezésekor", error));
  };

  const saveRecipe = (recipeId) => {
    if (!user) {
      alert("Be kell jelentkezned a mentéshez!");
      return;
    }
  
    if (!user.Felhasznalo_id || !recipeId) {
      alert("Hibás adat: Nincs felhasználó vagy recept ID.");
      return;
    }
  
    axios.post("http://localhost:3001/api/save-recipe", {
      Profil: user.Felhasznalo_id,   // Insert into Profil column
      Receptek: recipeId             // Insert into Receptek column
    })
    .then(() => {
      alert("Recept elmentve!");
      setSavedRecipes([...savedRecipes, recipeId]); // Update saved recipes state
    })

    .catch(error => {
      console.error("Hiba a mentéskor:", error);
      // If there's a response error, log the detailed message
      if (error.response) {
        console.error("Response error data:", error.response.data);
        alert(error.response.data.error || "Hiba történt a mentéskor!");
      } else {
        alert("Hálózati hiba történt.");
      }
    });
  };
  

  return (
    <div id="container">
      <div id="search-container">
        <input 
          type="text" 
          id="search-input" 
          placeholder="Keresés..." 
          value={kereses} 
          onChange={(e) => setKereses(e.target.value)}
        />
      </div>
      <div id="recipes-container">
        {osszes.map((ossze) => (
          <div id="recipe-card" key={ossze.Receptek_id}>
            <img src={ossze.kep} alt="Recept kép" />
            <div id="recipe-body">
              <h5 id="recipe-title">{ossze.Receptek_neve}</h5>
              <p id="recipe-text">
                {TobbId === ossze.Receptek_id ? ossze.Keszites : `${ossze.Keszites.substring(0, 200)}...`}
              </p>
              <button id="expand-button" onClick={() => setTobbId(TobbId === ossze.Receptek_id ? null : ossze.Receptek_id)}>
                {TobbId === ossze.Receptek_id ? "Kevesebb" : "Több"}
              </button>
              <button id="info-button" onClick={() => setShowTable(showTable === ossze.Receptek_id ? null : ossze.Receptek_id)}>
                {showTable === ossze.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
              </button>
              {showTable === ossze.Receptek_id && (
                    <table border="1" style={{ marginTop: '10px', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Hozzávalo neve</th>
                                    <th>Mennyiség</th>
                                    <th>Mértékegység</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr key={ossze.Receptek_id}>
                                        <td>{ossze.Hozzavalok_neve}</td>
                                        <td>{ossze.mennyiseg}</td>
                                        <td>{ossze.mértékegység}</td>
                                    </tr>
                                </tbody>
                        </table>
                    ) 
                }
              {user && (
                <button 
                  id="save-button" 
                  onClick={() => saveRecipe(ossze.Receptek_id)}
                  disabled={savedRecipes.includes(ossze.Receptek_id)}
                >
                  {savedRecipes.includes(ossze.Receptek_id) ? "✅ Mentve" : "❤️ Mentés"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div id="container">
        {/* Already existing content */}
        <AboutSection /> {/* Here we use it */}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';
import './Admin.css';

export const Admin = () => {
  const [kereses, setKereses] = useState("");
  const [osszes, setOsszes] = useState([]);
  const [TobbId, setTobbId] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [description, setDescription] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!showUsers) {
      axios.get(`http://localhost:3001/api/osszes?keres=${kereses}`)
        .then(response => setOsszes(response.data))
        .catch(error => console.error("API Error:", error));

      axios.get(`http://localhost:3001/leiras`)
        .then(data => setDescription(data.data))
        .catch(err => console.log(err));
    } else {
      axios.get("http://localhost:3001/api/user-stats")
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
    }
  }, [kereses, showUsers]);

  const deleteRecipe = (recipeId) => {
    axios.delete(`http://localhost:3001/api/delete-recipe/${recipeId}`)
      .then(() => {
        setOsszes(osszes.filter(recipe => recipe.Receptek_id !== recipeId));
      })
      .catch(error => console.error("Error deleting recipe:", error));
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:3001/api/delete-user/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user.felhasznalo_id !== userId));
      })
      .catch(error => console.error("Error deleting user:", error));
  };

  const toggleAdminStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    axios.post('http://localhost:3001/api/toggle-admin', { userId, newStatus })
      .then(() => {
        setUsers(users.map(user =>
          user.felhasznalo_id === userId ? { ...user, admin: newStatus } : user
        ));
      })
      .catch(error => console.error("Error updating admin status:", error));
  };

  const toggleRecipeStatus = (recipeId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    setOsszes(osszes.map(recipe =>
      recipe.Receptek_id === recipeId ? { ...recipe, ervenyes: newStatus } : recipe
    ));
    axios.post('http://localhost:3001/api/toggle-recipe-status', { recipeId, newStatus })
      .catch(error => {
        console.error("Error toggling recipe status:", error);
        setOsszes(osszes.map(recipe =>
          recipe.Receptek_id === recipeId ? { ...recipe, ervenyes: currentStatus } : recipe
        ));
      });
  };

  return (
    <div id="admin-container">
      {!showUsers && (
        <div id="admin-search-container">
          <input
            type="text"
            id="admin-search-input"
            placeholder="Keresés..."
            value={kereses}
            onChange={(e) => setKereses(e.target.value)}
          />
        </div>
      )}
      {!showUsers ? (
        <div id="admin-recipes-container">
          {osszes.map((ossze) => (
            <div id="admin-recipe-card" key={ossze.Receptek_id}>
              <div id="admin-recipe-toggle">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={ossze.ervenyes === 0}
                    onChange={() => toggleRecipeStatus(ossze.Receptek_id, ossze.ervenyes)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <img src={ossze.kep} alt="Recipe Image" />
              <div id="admin-recipe-body">
                <h5 id="admin-recipe-title">{ossze.receptek_neve}</h5>
                <p id="admin-recipe-text">
                  {TobbId === ossze.Receptek_id ? ossze.keszites : `${ossze.keszites.substring(0, 200)}...`}
                </p>
                <button className="admin-button" onClick={() => setTobbId(TobbId === ossze.Receptek_id ? null : ossze.Receptek_id)}>
                  {TobbId === ossze.Receptek_id ? "Kevesebb" : "Több"}
                </button>
                <button className="admin-button" onClick={() => setShowTable(showTable === ossze.Receptek_id ? null : ossze.Receptek_id)}>
                  {showTable === ossze.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
                </button>

                {showTable === ossze.Receptek_id && (
                  <div id="admin-info-table-wrapper">
                    <table id="admin-info-table">
                      <thead>
                        <tr>
                          <th>Hozzávalók neve</th>
                          <th>Mennyiség</th>
                          <th>Mértékegység</th>
                        </tr>
                      </thead>
                      <tbody>
                        {description
                          .filter(leiras => leiras.Receptek_id === ossze.Receptek_id)
                          .map((leiras) => (
                            <tr key={leiras.id}>
                              <td>{leiras.hozzavalok_neve}</td>
                              <td>{leiras.mennyiseg}</td>
                              <td>{leiras.mertekegyseg}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <p><strong>Étkezés típusa:</strong> {ossze.etkezes}</p>
                    <p><strong>Érzékenységek:</strong> {ossze.erzekenyseg}</p>
                    <p><strong>Napszak:</strong> {ossze.idoszak}</p>
                    <p><strong>Konyha:</strong> {ossze.nemzetiseg}</p>
                  </div>
                )}

                <button className="admin-button" onClick={() => deleteRecipe(ossze.Receptek_id)}>
                  Törlés
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Users view */
        <div id="admin-recipes-container">
          {users.map((user) => (
            <div id="admin-recipe-card" key={user.felhasznalo_id}>
              <div id="admin-recipe-body">
                <h5 id="admin-recipe-title">{user.felhasznalonev}</h5>
                <p id="admin-recipe-text"><strong>Email:</strong> {user.email}</p>
                <p id="admin-recipe-text"><strong>Feltöltött receptek:</strong> {user.receptek_szama}</p>
                <p id="admin-recipe-text"><strong>Jogosultság:</strong> {user.admin === 1 ? 'Admin' : 'Felhasználó'}</p>
                {user.admin !== 1 && (
                  <button className="admin-button" onClick={() => deleteUser(user.felhasznalo_id)}>
                    Felhasználó törlése
                  </button>
                )}
                <button className="admin-button" onClick={() => toggleAdminStatus(user.felhasznalo_id, user.admin)}>
                  {user.admin === 1 ? 'Eltávolít' : 'Adminná tesz'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div id="admin-toggle-button-container">
          <button
            className="admin-button"
            onClick={() => setShowUsers(!showUsers)}
          >
            {showUsers ? 'Receptek kezelése' : 'Felhasználók kezelése'}
          </button>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/profil")
      .then(response => {
        setUser(response.data);
        setUsername(response.data.username);
        setProfileImage(response.data.profileImage);
      })
      .catch(error => console.error("Hiba a felhasználói adatok lekérésekor", error));
  }, []);

  const handleSave = () => {
    axios.put("http://localhost:3001/profil", { username, profileImage })
      .then(response => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch(error => console.error("Hiba a mentéskor", error));
  };

  const handleDelete = () => {
    if (confirm("Biztosan törlöd a fiókodat?")) {
      axios.delete("http://localhost:3001/profil")
        .then(() => {
          alert("Fiók törölve");
          setUser(null);
        })
        .catch(error => console.error("Hiba a törléskor", error));
    }
  };

  if (!user) return <p>Betöltés...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 shadow-lg rounded-2xl bg-gradient-to-r from-black to-gray-900 text-white text-center">
      <div className="flex flex-col items-center">
        <img 
          src={profileImage || "https://via.placeholder.com/100"} 
          alt="Profilkép" 
          className="w-24 h-24 mb-4 rounded-full border-4 border-gray-700"
        />
        {editMode ? (
          <input 
            type="text" 
            value={profileImage} 
            onChange={(e) => setProfileImage(e.target.value)} 
            placeholder="Profilkép URL" 
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        ) : null}

        {editMode ? (
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Felhasználónév" 
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          />
        ) : (
          <h2 className="text-xl font-semibold">{user.username}</h2>
        )}

        <p className="text-gray-400">{user.email}</p>

        <div className="mt-4 flex gap-2">
          {editMode ? (
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded">Mentés</button>
          ) : (
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-gray-700 hover:bg-gray-800 rounded flex items-center">
              <FaEdit className="mr-2" /> Szerkesztés
            </button>
          )}
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center">
            <FaTrash className="mr-2" /> Törlés
          </button>
        </div>
      </div>
    </div>
  );
}
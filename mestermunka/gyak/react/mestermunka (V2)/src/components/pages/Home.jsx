import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import axios from "axios";
import './Home.css';

export const Home = () => {
    const [kereses, setKereses] = useState("");
    const [osszes, setOsszes] = useState([]);
    const [TobbId, setTobbId] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [description, setDescription] = useState([]);

    const handle = (id) => {
        setTobbId(TobbId === id ? null : id);
    };

    const toggleTable = (id) => {
        setShowTable(showTable === id ? null : id);
    };

    useEffect(() => {

    axios.get(`http://localhost:3001/api/osszes?keres=${kereses}`)
        .then(response => {
            setOsszes(response.data);
        })
        .catch(error => console.error("API Error:", error));
        

        axios.get(`http://localhost:3001/leiras`)
            .then(data => setDescription(data.data))
            .catch(err => console.log(err));

    }, [kereses]);

    return (
        <>
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
                            <button id="expand-button" onClick={() => handle(ossze.Receptek_id)}>
                                {TobbId === ossze.Receptek_id ? "Kevesebb" : "Több"}
                            </button>
                            <button id="info-button" onClick={() => toggleTable(ossze.Receptek_id)}>
                                {showTable === ossze.Receptek_id ? 'Kevesebb' : 'Bővebb információ'}
                            </button>
                            {showTable === ossze.Receptek_id && (
                                <table id="info-table">
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
                                                    <td>{leiras.Hozzavalok_neve}</td>
                                                    <td>{leiras.mennyiseg}</td>
                                                    <td>{leiras.mértékegység}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div id="about-section">Rólunk</div>
        </div>
        </>
    );
};

const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: 3306,
    password: "",
    database: "finomsagok"

})

app.get("/", (req, res) => {
    res.send("Fut a backend");
})

app.get("/osszes", (req, res) => {
    const sql = "Select * from `receptek`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.get("/api/osszes", (req, res) => {
    const { keres } = req.query;
    let sql = `
      SELECT receptek.Receptek_id, receptek.Receptek_neve, receptek.Keszites, 
             GROUP_CONCAT(DISTINCT hozzavalok.Hozzavalok_neve SEPARATOR ', ') AS hozzavalok,
             preferencia.etkezes, erzekenysegek.erzekenyseg, hozzavalok.Hozzavalok_neve, mertekegyseg.mennyiseg, mertekegyseg.mértékegység,
             napszak.idoszak, konyha.nemzetiseg, receptek.kep
      FROM osszekoto 
      INNER JOIN receptek ON osszekoto.receptek_id = receptek.Receptek_id
      INNER JOIN mertekegyseg ON osszekoto.mertekegyseg_id = mertekegyseg.id
      INNER JOIN hozzavalok ON osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id
      INNER JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
      INNER JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
      INNER JOIN konyha ON receptek.konyha_oszekoto = konyha.konyha_id
      INNER JOIN napszak ON receptek.napszak_oszekoto = napszak.napszak_id
    `;

    if (keres) {
        sql += ` WHERE receptek.Receptek_neve LIKE ?`;
    }

    sql += ` GROUP BY receptek.Receptek_id desc`;

    db.query(sql, keres ? [`%${keres}%`] : [], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Hiba a lekérdezés során", error: err });
        }
        res.json(results);
    });
});

app.get("/leiras", (req, res) => {
    const sql = "SELECT  receptek.Receptek_id, hozzavalok.Hozzavalok_neve, mertekegyseg.mennyiseg, mertekegyseg.mértékegység FROM `osszekoto` inner join hozzavalok on osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id inner join mertekegyseg on osszekoto.mertekegyseg_id = mertekegyseg.id inner join receptek on osszekoto.receptek_id = receptek.Receptek_id;"
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.post('/api/recipes', (req, res) => {
    const { recipeName, description, nationalityId, dayTimeId, preferences, sensitivity, ingredients } = req.body;

    db.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error', error: err });
        }

        connection.beginTransaction((err) => {
            if (err) {
                connection.release();
                return res.status(500).json({ message: 'Transaction error', error: err });
            }

            // 🔹 Insert recipe with nationality and dayTime into 'receptek'
            const recipeQuery = 'INSERT INTO receptek (Receptek_neve, Keszites, konyha_osszekoto, napszak_oszekoto) VALUES (?, ?, ?, ?)';
            connection.query(recipeQuery, [recipeName, description, nationalityId, dayTimeId], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        connection.release();
                        res.status(500).json({ message: 'Error inserting recipe', error: err });
                    });
                }

                const recipeId = result.insertId; // Get the inserted recipe ID

                // 🔹 Insert preferences and sensitivity into 'osszekoto'
                const detailsQuery = 'INSERT INTO osszekoto (receptek_id, preferencia_id, etrend_id,ervenyes) VALUES (?, ?, ?, 1)';
                connection.query(detailsQuery, [recipeId, preferences, sensitivity], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            connection.release();
                            res.status(500).json({ message: 'Error inserting preferences/sensitivity', error: err });
                        });
                    }

                    // 🔹 Insert ingredients and their amount/unit into 'mertekegyseg' and connect to recipe in 'osszekoto'
                    const ingredientPromises = ingredients.map(ingredient => {
                        return new Promise((resolve, reject) => {
                            // Insert amount and unit into the 'mertekegyseg' table first
                            const mertekegysegQuery = 'INSERT INTO mertekegyseg (mennyiseg, mértékegység) VALUES (?,?)';
                            connection.query(mertekegysegQuery, [ingredient.mennyiseg,ingredient.mértékegység], (err, mertekegysegResult) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    const mertekegysegId = mertekegysegResult.insertId; // Get the inserted unit ID

                                    // Now insert into the 'osszekoto' table
                                    const ingredientQuery = 'INSERT INTO osszekoto (receptek_id, hozzavalok_id,mertekegyseg_id) VALUES (?, ?, ?)';
                                    connection.query(ingredientQuery, [recipeId, ingredient.hozzavalok_id, mertekegysegId], (err) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve();
                                        }
                                    });
                                }
                            });
                        });
                    });

                    Promise.all(ingredientPromises)
                        .then(() => {
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        res.status(500).json({ message: 'Transaction commit error', error: err });
                                    });
                                }
                                connection.release();
                                res.status(200).json({ message: 'Recipe added successfully!' });
                            });
                        })
                        .catch((err) => {
                            connection.rollback(() => {
                                connection.release();
                                res.status(500).json({ message: 'Error inserting ingredients and units', error: err });
                            });
                        });
                });
            });
        });
    });
});





app.get('/api/nationalities', (req, res) => {
    db.query('SELECT * FROM konyha', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching nationalities', error: err });
        res.json(results);
    });
});

app.get('/api/units', (req, res) => {
    db.query('SELECT * FROM mertekegyseg', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching nationalities', error: err });
        res.json(results);
    });
});

app.get('/api/dayTimes', (req, res) => {
    db.query('SELECT * FROM napszak', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching day times', error: err });
        res.json(results);
    });
});

app.get('/api/sensitivities', (req, res) => {
    db.query('SELECT * FROM erzekenysegek', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching sensitivities', error: err });
        res.json(results);
    });
});

app.get('/api/ingredients', (req, res) => {
    db.query('SELECT * FROM hozzavalok', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching ingredients', error: err });
        res.json(results);
    });
});

app.get('/api/preferences', (req, res) => {
    db.query('SELECT * FROM preferencia', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching preferences', error: err });
        res.json(results);
    });
});


app.get("/egy", (req, res) => {
    const sql = "SELECT * FROM `receptek` WHERE Receptek_id = 1";
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})
app.get("/Keszities", (req, res) => {
    const sql = "Select Keszites from `receptek`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.post('/login', (req, res) => {
    const sql = "Select * from regisztracio WHERE Felhasznalonev = ? and Email = ? and Jelszo = ?"
    db.query(sql, [req.body.username, req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("Hiba")
        if (data.length > 0) {
            return res.json("A bejeletkezés sikeres volt");
        } else {
            return res.json("Hibás bejeletkezés")
        }

    })
})

app.get("/api/hozzavalok", (req, res) => {
    const { keres } = req.query;
    let sql = "SELECT * FROM hozzavalok";

    if (keres) {
        sql += ` WHERE Hozzavalok_neve LIKE ?`;
    }

    db.query(sql, keres ? [`%${keres}%`, `%${keres}%`] : [], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

function toggleFilters() {
    var filterPanel = document.getElementById('filterPanel');
    filterPanel.classList.toggle('open');
}
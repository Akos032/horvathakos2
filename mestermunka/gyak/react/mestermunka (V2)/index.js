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
    port: 3307,
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
    const { recipeName, description, nationality, dayTime, preferences, sensitivity, ingredients } = req.body;

    // Insert the recipe into the database
    const recipeQuery = 'INSERT INTO receptek (Receptek_neve, Keszites) VALUES (?, ?)';
    db.query(recipeQuery, [recipeName, description], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error inserting recipe', error: err });
        }

        const recipeId = result.insertId; // Get the ID of the inserted recipe

        // Insert the nationality, dayTime, preferences, sensitivity into their respective tables
        const recipeDetails = [
            { query: 'INSERT INTO konyha (nemzetiseg) VALUES (?)', value: nationality },
            { query: 'INSERT INTO napszak (idoszak) VALUES (?)', value: dayTime },
            { query: 'INSERT INTO preferencia (etkezes) VALUES (?)', value: preferences },
            { query: 'INSERT INTO erzekenysegek (erzekenyseg) VALUES (?)', value: sensitivity },
        ];

        // Run all insertions for recipe details (nationality, dayTime, etc.)
        const detailsPromises = recipeDetails.map(detail => {
            return new Promise((resolve, reject) => {
                db.query(detail.query, [detail.value], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });


        Promise.all(detailsPromises)
            .then(() => {
                // Insert ingredients into the recipe_ingredients and mennyiseg tables
                const insertIngredients = ingredients.map((ingredient) => [
                    recipeId, ingredient.Hozzavalok_id
                ]);
                const insertAmounts = ingredients.map((ingredient) => [
                    recipeId, ingredient.mennyiseg, ingredient.mértékegység
                ]);

                const ingredientQuery = 'INSERT INTO hozzavalok (Hozzavalok_id) VALUES ?';
                const amountQuery = 'INSERT INTO mennyiseg (mennyiseg, mértékegység) VALUES ?';

                // Run both ingredient insertions in parallel
                const ingredientPromises = [
                    new Promise((resolve, reject) => {
                        db.query(ingredientQuery, [insertIngredients], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    }),
                    new Promise((resolve, reject) => {
                        db.query(amountQuery, [insertAmounts], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                    })
                ];

                return Promise.all(ingredientPromises);
            })
            .then(() => {
                // Everything is done, send a success response
                res.status(200).json({ message: 'Recipe added successfully!' });
            })
            .catch((err) => {
                // Catch any error that occurred during any query
                res.status(500).json({ message: 'Error inserting recipe details or ingredients', error: err });
            });
    });
});


app.get('/api/nationalities', (req, res) => {
    db.query('SELECT * FROM konyha', (err, results) => {
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
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

const db = mysql.createPool({
    user: "root",
    host: "127.0.0.1",
    port: 3307,
    password: "",
    database: "finomsagok"

})

const jwt = require('jsonwebtoken');


const checkAdmin = (req, res, next) => {
    const user = req.user;
  
    if (!user || user.Admin !== 1) {
      return res.status(403).json({ error: 'You do not have admin rights!' });
    }
  
    next();
  };

  app.get('/api/admin', checkAdmin, (req, res) => {
    res.json({ message: 'Welcome to the Admin page!' });
});

const uploadDir = path.join(__dirname, 'public');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

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
             napszak.idoszak, konyha.nemzetiseg, receptek.kep, osszekoto.ervenyes
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

app.get("/api/valid", (req, res) => {
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

    sql += `and osszekoto.ervenyes = 0`

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

app.post('/api/recipes', upload.single('image'), (req, res) => {
    const { recipeName, description, nationalityId, dayTimeId, preferences, sensitivity, ingredients } = req.body;
    const imageName = req.file ? req.file.filename : null;
    
    db.getConnection((err, db) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error', error: err });
        }

        db.beginTransaction((err) => {
            if (err) {
                db.release();
                return res.status(500).json({ message: 'Transaction error', error: err });
            }

            // Step 1: Insert the recipe into 'receptek'
            insertRecipe(db, recipeName, description, nationalityId, dayTimeId,imageName)
                .then((recipeId) => {
                    // Step 2: Insert preferences, sensitivity, and ingredients into 'osszekoto' with ingredients
                    return insertPreferencesSensitivityIngredients(db, recipeId, preferences, sensitivity, ingredients);
                })
                .then(() => {
                    // Commit transaction after all queries are successful
                    db.commit((err) => {
                        if (err) {
                            return db.rollback(() => {
                                db.release();
                                res.status(500).json({ message: 'Transaction commit error', error: err });
                            });
                        }
                        db.release();
                        res.status(200).json({ message: 'Recipe added successfully!' });
                    });
                })
                .catch((err) => {
                    // Rollback transaction if any step fails
                    db.rollback(() => {
                        db.release();
                        res.status(500).json({ message: 'Error processing recipe', error: err });
                    });
                });
        });
    });
});

// Insert the recipe into the 'receptek' table
function insertRecipe(db, recipeName, description, nationalityId, dayTimeId,imageName) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO receptek (Receptek_neve, Keszites, konyha_oszekoto, napszak_oszekoto, kep) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [recipeName, description, nationalityId, dayTimeId,imageName], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId); // Return the inserted recipe ID
        });
    });
}

// Insert preferences, sensitivity, and ingredients into the 'osszekoto' table
function insertPreferencesSensitivityIngredients(db, recipeId, preferences, sensitivity, ingredients) {
    return new Promise((resolve, reject) => {
        if (!ingredients || ingredients.length === 0) {
            return resolve(); // No ingredients to insert, just insert the preferences and sensitivity
        }

        // First insert into 'mertekegyseg' for all ingredients
        const mertekegysegPromises = ingredients.map(async (ingredient) => {
            console.log("Inserting mertekegyseg for:", ingredient);
            try {
                return await insertMertekegyseg(db, ingredient.mennyiseg, ingredient.mertekegyseg);
            } catch (error) {
                console.error("Error inserting mertekegyseg:", error);
                throw error; // Re-throw the error to stop execution
            }
        });

        Promise.all(mertekegysegPromises)
            .then((mertekegysegResults) => {
                console.log("Mertekegyseg Insertion Results:", mertekegysegResults);

                // Prepare the bulk insert data for 'osszekoto'
                const osszekotoValues = ingredients.map((ingredient, index) => {
                    console.log("Inserting ingredient into osszekoto:", ingredient, mertekegysegResults[index]);
                    return [
                        recipeId,  // recipeId
                        ingredient.hozzavalok_id,  // Hozzavalok_id
                        mertekegysegResults[index].insertId,  // mertekegyseg_id
                        1,  // ervenyes (assuming always 1)
                        sensitivity || null,  // sensitivity
                        preferences || null  // preferences
                    ];
                });

                console.log("Inserting into osszekoto:", osszekotoValues);

                // Insert into 'osszekoto' table in bulk
                const insertQuery = 'INSERT INTO osszekoto (receptek_id, hozzavalok_id, mertekegyseg_id, ervenyes, etrend_id, preferencia_id) VALUES ?';
                db.query(insertQuery, [osszekotoValues], (err, result) => {
                    if (err) {
                        console.error("Error inserting into osszekoto:", err);
                        return reject(err);
                    }
                    console.log("Successfully inserted into osszekoto:", result);
                    resolve();
                });
            })
            .catch((err) => {
                console.error("Error in inserting ingredients:", err);
                reject(err); // If any promise fails, reject the entire operation
            });
    });
}

// Insert into 'mertekegyseg' table (handles the quantity and unit)
function insertMertekegyseg(db, amount, unit) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO mertekegyseg (mennyiseg, mértékegység) VALUES (?, ?) ON DUPLICATE KEY UPDATE mennyiseg = VALUES(mennyiseg), mértékegység = VALUES(mértékegység)';
        db.query(query, [amount, unit], (err, result) => {
            if (err) {
                console.error("Error in inserting mertekegyseg:", err);
                return reject(err);
            }
            console.log("Mertekegyseg inserted successfully:", result);
            resolve(result);  // Return the result to get the insertId of 'mertekegyseg'
        });
    });
}

app.post('/login', (req, res) => {
    console.log("📥 Beérkező adatok:", req.body);

    const { Email, password } = req.body;

    if (!Email || !password) {
        console.log("❌ Hiányzó email vagy jelszó!");
        return res.status(400).json({ error: "❌ Hiányzó email vagy jelszó!" });
    }

    const sql = "SELECT * FROM regisztracio WHERE Email = ?";

    db.query(sql, [Email], (err, result) => {
        if (err) {
            console.error("❌ SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }

        console.log("🔍 SQL lekérdezés eredménye:", result);

        if (result.length === 0) {
            console.log("❌ Hibás email!");
            return res.status(401).json({ error: "❌ Hibás email vagy nem létezik a felhasználó!" });
        }

        const hashedPassword = result[0].Jelszo;
        console.log("🔐 Adatbázisból kapott hash:", hashedPassword);
        console.log("📥 Beírt jelszó:", password);

        const beirtJelszo = password.trim();

        bcrypt.compare(beirtJelszo, hashedPassword.trim(), (err, isMatch) => {
            if (err) {
                console.error("❌ Bcrypt hiba:", err);
                return res.status(500).json({ error: "Hiba történt a jelszó ellenőrzésekor!" });
            }

            console.log("✅ Jelszó egyezés?", isMatch);

            if (!isMatch) {
                console.log("❌ Hibás jelszó!");
                return res.status(401).json({ error: "❌ Hibás jelszó!" });
            }

            // Create the JWT token without modifying the user object
            const user = result[0];
            const token = jwt.sign({
                id: user.Felhasznalo_id,
                username: user.Felhasznalonev,
                email: user.Email, // Email in the token for identification
            }, 'your-secret-key', { expiresIn: '1h' });

            console.log("✅ Sikeres bejelentkezés:", user.Felhasznalonev);

            // Send the token and user data back to the frontend without modifying user object
            return res.json({
                success: "Sikeres bejelentkezés!",
                token: token, // Send the token back to the frontend
                user: user,  // Send the user object without modification
                admin: user.Admin // Send the admin status separately without changing the user object
            });
        });
    });
});





app.post('/register', (req, res) => {
    console.log("📥 Beérkező adatok:", req.body);

    const { Felhasznalonev, Email, password } = req.body;

    if (!Felhasznalonev || !Email || !password) {
        return res.status(400).json({ error: "❌ Hiányzó adatok!", details: req.body });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("❌ Jelszó hash hiba:", err);
            return res.status(500).json({ error: "Hiba a jelszó hashelésekor.", details: err.message });
        }

        console.log("🔑 Hash-elt jelszó:", hash);

        const sql = "INSERT INTO regisztracio (Felhasznalonev, Email, Jelszo) VALUES (?, ?, ?)";
        const values = [Felhasznalonev, Email, hash];

        console.log("📝 SQL lekérdezés:", sql);
        console.log("📊 Értékek:", values);

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error("❌ SQL Hiba:", err);
                return res.status(500).json({ error: "Hiba az adatbázis művelet végrehajtásakor.", details: err.sqlMessage });
            }

            console.log("✅ Sikeres regisztráció:", result);
            return res.json({ success: "Sikeres regisztráció", result: result });
        });
    });
});

const hash = "$2a$10$V1Q6uMb3g.lTQGp9u0z2FeH1y0Q3OYsQHmtE.ZM9bfzZpFhvw6K/m"; // Cseréld ki a saját hash-edre
const password = "tesztjelszo"; // Cseréld ki arra a jelszóra, amit regisztráltál

bcrypt.compare(password, hash, (err, isMatch) => console.log(isMatch));

app.get('/api/admin/check-admin/:username', (req, res) => {
    const { username } = req.params;
    const query = 'SELECT Admin FROM regisztracio WHERE Felhasznalonev = ?';
  
    db.query(query, [username], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (result.length > 0 && result[0].Admin === 1) {
        res.json({ isAdmin: true });
      } else {
        res.json({ isAdmin: false });
      }
    });
  });


app.get('/profil', (req,res)=>{
    const sql = "Select * from regisztracio";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err)
        return res.json(result)
    })
})


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

app.get("/Keszities", (req, res) => {
    const sql = "Select Keszites from `receptek`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
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

app.post('/api/save-recipe', (req, res) => {
    const { Profil, Receptek } = req.body;

    if (!Profil || !Receptek) {
        return res.status(400).json({ error: "Hiányzó adatok!" });
    }

    // Check if the recipe is already saved
    const checkSql = "SELECT * FROM sajat_receptek WHERE Profil = ? AND Recept = ?";
    db.query(checkSql, [Profil, Receptek], (err, results) => {
        if (err) {
            console.error("❌ Hiba a kereséskor:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: "Ezt a receptet már elmentetted!" });
        }

        // Insert new saved recipe
        const insertSql = "INSERT INTO sajat_receptek (Profil, Recept) VALUES (?, ?)";
        db.query(insertSql, [Profil, Receptek], (err) => {
            if (err) {
                console.error("❌ Hiba a mentéskor:", err);
                return res.status(500).json({ error: "Adatbázis hiba!" });
            }
            res.json({ success: "Recept elmentve!" });
        });
    });
});

app.post('/api/unsave-recipe', (req, res) => {
    const { Profil, Receptek } = req.body;

    if (!Profil || !Receptek) {
        return res.status(400).json({ error: "Hiányzó adatok!" });
    }

    // Delete the saved recipe from the database
    const deleteSql = "DELETE FROM sajat_receptek WHERE Profil = ? AND Recept = ?";
    db.query(deleteSql, [Profil, Receptek], (err) => {
        if (err) {
            console.error("❌ Hiba a törléskor:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }
        res.json({ success: "Recept eltávolítva!" });
    });
});


// Get saved recipes for a user
app.get('/api/saved-recipes/:userId', (req, res) => {
    const { userId } = req.params;

    const sql = `
    SELECT receptek.Receptek_id, receptek.Receptek_neve, receptek.Keszites, 
    GROUP_CONCAT(DISTINCT hozzavalok.Hozzavalok_neve SEPARATOR ', ') AS hozzavalok,
    preferencia.etkezes, 
    GROUP_CONCAT(DISTINCT erzekenysegek.erzekenyseg SEPARATOR ', ') AS erzekenyseg, 
    GROUP_CONCAT(DISTINCT mertekegyseg.mennyiseg, ' ', mertekegyseg.mértékegység SEPARATOR ', ') AS mennyiseg,
    napszak.idoszak, konyha.nemzetiseg, receptek.kep
    FROM osszekoto 
    INNER JOIN receptek ON osszekoto.receptek_id = receptek.Receptek_id
    INNER JOIN mertekegyseg ON osszekoto.mertekegyseg_id = mertekegyseg.id
    INNER JOIN hozzavalok ON osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id
    INNER JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
    INNER JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
    INNER JOIN konyha ON receptek.konyha_oszekoto = konyha.konyha_id
    INNER JOIN napszak ON receptek.napszak_oszekoto = napszak.napszak_id
    INNER JOIN sajat_receptek ON receptek.Receptek_id = sajat_receptek.Recept
    INNER JOIN regisztracio ON sajat_receptek.Profil = regisztracio.Felhasznalo_id
    WHERE sajat_receptek.Profil = ?
    GROUP BY receptek.Receptek_id;

    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Hiba a mentett receptek lekérdezésekor:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }
        res.json(results);
    });
});


app.post('/api/toggle-recipe-status', (req, res) => {
    const { recipeId, newStatus } = req.body;
  
    db.query('UPDATE osszekoto SET ervenyes = ? WHERE receptek_id = ?', [newStatus, recipeId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to update status' });
      }
      res.json({ message: 'Status updated successfully' });
    });
  });
  

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

function toggleFilters() {
    var filterPanel = document.getElementById('filterPanel');
    filterPanel.classList.toggle('open');
}
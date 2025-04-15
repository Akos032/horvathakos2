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
  
    if (!user || user.admin !== 1) {
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

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, or GIF are allowed.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});


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
      SELECT receptek.Receptek_id, receptek.receptek_neve, receptek.keszites, 
             GROUP_CONCAT(DISTINCT hozzavalok.hozzavalok_neve SEPARATOR ', ') AS hozzavalok,
             preferencia.etkezes, erzekenysegek.erzekenyseg, hozzavalok.hozzavalok_neve, mertekegyseg.mennyiseg, mertekegyseg.mertekegyseg,
             napszak.idoszak, konyha.nemzetiseg, receptek.kep, osszekoto.ervenyes, osszekoto.receptek_id, regisztracio.felhasznalonev AS feltolto_nev
      FROM osszekoto 
      INNER JOIN receptek ON osszekoto.receptek_id = receptek.Receptek_id
      INNER JOIN mertekegyseg ON osszekoto.mertekegyseg_id = mertekegyseg.Mertekegyseg_id
      INNER JOIN hozzavalok ON osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id
      INNER JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
      INNER JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
      INNER JOIN konyha ON receptek.konyha_osszekoto = konyha.konyha_id
      INNER JOIN napszak ON receptek.napszak_osszekoto = napszak.napszak_id
      LEFT JOIN feltoltot_recept ON receptek.Receptek_id = feltoltot_recept.feltoltot_recept_id
      LEFT JOIN regisztracio ON feltoltot_recept.profil_id = regisztracio.felhasznalo_id
    `;

    if (keres) {
        sql += ` WHERE receptek.receptek_neve LIKE ?`;
    }

    sql += ` GROUP BY receptek.receptek_id desc`;

    db.query(sql, keres ? [`%${keres}%`] : [], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Hiba a lekérdezés során", error: err });
        }
        res.json(results);
    });
});

app.get('/api/user-stats', (req, res) => {
    const sql = `
      SELECT 
        regisztracio.admin,
        regisztracio.felhasznalo_id, 
        regisztracio.felhasznalonev, 
        regisztracio.email, 
        COUNT(feltoltot_recept.feltoltot_recept_id) AS receptek_szama,
        receptek.Receptek_id, 
        receptek.receptek_neve, 
        receptek.keszites, 
        GROUP_CONCAT(DISTINCT hozzavalok.hozzavalok_neve SEPARATOR ', ') AS hozzavalok,
        preferencia.etkezes, 
        erzekenysegek.erzekenyseg, 
        hozzavalok.hozzavalok_neve, 
        mertekegyseg.mennyiseg, 
        mertekegyseg.mertekegyseg,
        napszak.idoszak, 
        konyha.nemzetiseg, 
        receptek.kep, 
        osszekoto.ervenyes, 
        osszekoto.receptek_id, 
        regisztracio.felhasznalonev AS feltolto_nev
        FROM regisztracio
        LEFT JOIN feltoltot_recept ON regisztracio.felhasznalo_id = feltoltot_recept.profil_id
        LEFT JOIN receptek ON feltoltot_recept.feltoltot_recept_id = receptek.Receptek_id
        LEFT JOIN osszekoto ON receptek.Receptek_id = osszekoto.receptek_id
        LEFT JOIN mertekegyseg ON osszekoto.mertekegyseg_id = mertekegyseg.Mertekegyseg_id
        LEFT JOIN hozzavalok ON osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id
        LEFT JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
        LEFT JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
        LEFT JOIN konyha ON receptek.konyha_osszekoto = konyha.konyha_id
        LEFT JOIN napszak ON receptek.napszak_osszekoto = napszak.napszak_id
      GROUP BY regisztracio.felhasznalo_id
    `;
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: "Adatbázis hiba", err });
      res.json(results);
    });
});

app.post('/api/toggle-admin', (req, res) => {
    const { userId, newStatus } = req.body;
    const sql = "UPDATE regisztracio SET admin = ? WHERE felhasznalo_id = ?";
    db.query(sql, [newStatus, userId], (err) => {
      if (err) {
        console.error("Hiba az admin státusz frissítésekor:", err);
        return res.status(500).json({ error: "Nem sikerült frissíteni az admin státuszt." });
      }
      res.json({ message: "Admin státusz frissítve." });
    });
});
  
app.delete('/api/delete-user/:userId/:recipeId', (req, res) => {
    const userId = req.params.userId;
    const recipeId = req.params.recipeId;
    db.getConnection((err, connection) => {
        if (err) {
            console.error("Error establishing a database connection:", err);
            return res.status(500).json({ error: "Failed to connect to database" });
        }

        connection.beginTransaction((transactionErr) => {
            if (transactionErr) {
                connection.release();
                console.error("Error starting transaction:", transactionErr);
                return res.status(500).json({ error: "Failed to start transaction" });
            }
            const getImageQuery = `SELECT kep FROM receptek WHERE Receptek_id = ?`;
            connection.query(getImageQuery, [recipeId], (err, result) => {
                if (err) {
                    connection.rollback(() => connection.release());
                    console.error("Error fetching image filename:", err);
                    return res.status(500).json({ error: "Failed to fetch image filename" });
                }

                if (result.length === 0) {
                    connection.rollback(() => connection.release());
                    return res.status(404).json({ error: "Recipe not found" });
                }

                const imageFilename = result[0].kep;
                const imagePath = path.join(__dirname, 'public', imageFilename);
                fs.unlink(imagePath, (fsErr) => {
                    if (fsErr) {
                        connection.rollback(() => connection.release());
                        console.error("Error deleting image file:", fsErr);
                        return res.status(500).json({ error: "Failed to delete image file" });
                    }
                    const deleteMeasurementsQuery = `
                        DELETE FROM mertekegyseg 
                        WHERE Mertekegyseg_id IN (
                            SELECT mertekegyseg_id FROM osszekoto WHERE receptek_id = ?
                        );
                    `;
                    connection.query(deleteMeasurementsQuery, [recipeId], (err) => {
                        if (err) {
                            connection.rollback(() => connection.release());
                            console.error("Error deleting measurements:", err);
                            return res.status(500).json({ error: "Failed to delete measurement data" });
                        }
                        const deleteRecipeQuery = `DELETE FROM receptek WHERE Receptek_id = ?`;
                        connection.query(deleteRecipeQuery, [recipeId], (err) => {
                            if (err) {
                                connection.rollback(() => connection.release());
                                console.error("Error deleting recipe:", err);
                                return res.status(500).json({ error: "Failed to delete recipe" });
                            }
                            deleteUser(userId, connection, res);
                        });
                    });
                });
            });
        });
    });
});

function deleteUser(userId, connection, res) {
    const deleteUserQuery = `DELETE FROM regisztracio WHERE felhasznalo_id = ?`;

    connection.query(deleteUserQuery, [userId], (err) => {
        if (err) {
            connection.rollback(() => connection.release());
            console.error("Error deleting user:", err);
            return res.status(500).json({ error: "Failed to delete user" });
        }
        connection.commit((commitErr) => {
            if (commitErr) {
                connection.rollback(() => connection.release());
                console.error("Error committing transaction:", commitErr);
                return res.status(500).json({ error: "Failed to commit transaction" });
            }

            connection.release();
            res.status(200).json({ message: `User ${userId} and all associated data were successfully deleted.` });
        });
    });
}




  

app.get("/api/valid", (req, res) => {
    const { keres } = req.query;
    let sql = `
      SELECT receptek.Receptek_id, receptek.receptek_neve, receptek.keszites, 
             GROUP_CONCAT(DISTINCT hozzavalok.hozzavalok_neve SEPARATOR ', ') AS hozzavalok,
             preferencia.etkezes, erzekenysegek.erzekenyseg, hozzavalok.hozzavalok_neve, mertekegyseg.mennyiseg, mertekegyseg.mertekegyseg,
             napszak.idoszak, konyha.nemzetiseg, receptek.kep
      FROM osszekoto 
      INNER JOIN receptek ON osszekoto.receptek_id = receptek.Receptek_id
      INNER JOIN mertekegyseg ON osszekoto.mertekegyseg_id = mertekegyseg.Mertekegyseg_id
      INNER JOIN hozzavalok ON osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id
      INNER JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
      INNER JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
      INNER JOIN konyha ON receptek.konyha_osszekoto = konyha.konyha_id
      INNER JOIN napszak ON receptek.napszak_osszekoto = napszak.napszak_id
    `;

    if (keres) {
        sql += ` WHERE receptek.receptek_neve LIKE ?`;
    }

    sql += `and osszekoto.ervenyes = 0`

    sql += ` GROUP BY receptek.receptek_id desc`;

    db.query(sql, keres ? [`%${keres}%`] : [], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Hiba a lekérdezés során", error: err });
        }
        res.json(results);
    });
});

app.get("/leiras", (req, res) => {
    const sql = "SELECT  receptek.Receptek_id, hozzavalok.hozzavalok_neve, mertekegyseg.mennyiseg, mertekegyseg.mertekegyseg FROM `osszekoto` inner join hozzavalok on osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id inner join mertekegyseg on osszekoto.mertekegyseg_id = mertekegyseg.Mertekegyseg_id inner join receptek on osszekoto.receptek_id = receptek.Receptek_id;"
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.get('/api/recipes/user/:userId', (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    const sql = `
    SELECT 
        receptek.Receptek_id, 
        receptek.receptek_neve, 
        receptek.keszites, 
        receptek.kep,
        preferencia.etkezes, 
        GROUP_CONCAT(DISTINCT erzekenysegek.erzekenyseg SEPARATOR ', ') AS erzekenyseg, 
        napszak.idoszak, 
        konyha.nemzetiseg
    FROM receptek
    INNER join osszekoto on receptek.Receptek_id = osszekoto.receptek_id
    INNER JOIN feltoltot_recept ON receptek.Receptek_id = feltoltot_recept.feltoltot_recept_id
    INNER JOIN regisztracio ON feltoltot_recept.profil_id = regisztracio.felhasznalo_id
    INNER JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
    INNER JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
    INNER JOIN napszak ON receptek.napszak_osszekoto = napszak.napszak_id
    INNER JOIN konyha ON receptek.konyha_osszekoto = konyha.konyha_id
    WHERE regisztracio.felhasznalo_id = ?
    GROUP BY receptek.Receptek_id;
    `;

    db.getConnection((err, db) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error', error: err });
        }

        db.query(sql, [userId], (err, results) => {
            db.release();
            if (err) {
                return res.status(500).json({ message: 'Error fetching created recipes', error: err });
            }
            res.status(200).json(results);
        });
    });
});
app.post('/api/recipes', upload.single('image'), (req, res) => {
    const { recipeName, description, nationalityId, dayTimeId, preferences, sensitivity, ingredients, userId } = req.body;
    const imageName = req.file ? req.file.filename : null;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    db.getConnection((err, db) => {
        if (err) {
            return res.status(500).json({ message: 'Database connection error', error: err });
        }

        db.beginTransaction((err) => {
            if (err) {
                db.release();
                return res.status(500).json({ message: 'Transaction error', error: err });
            }

            insertRecipe(db, recipeName, description, nationalityId, dayTimeId, imageName)
                .then((recipeId) => {
                    if (!recipeId) {
                        throw new Error('Recipe ID is not defined');
                    }

                    return insertPreferencesSensitivityIngredients(db, recipeId, preferences, sensitivity, ingredients)
                        .then(() => {
                            return insertUserRecipeRelation(db, userId, recipeId);
                        });
                })
                .then(() => {
                    db.commit((err) => {
                        if (err) {
                            db.rollback(() => {
                                db.release();
                                res.status(500).json({ message: 'Transaction commit error', error: err });
                            });
                        }
                        db.release();
                        res.status(200).json({ message: 'Recipe added successfully!' });
                    });
                })
                .catch((err) => {
                    db.rollback(() => {
                        db.release();
                        res.status(500).json({ message: 'Error processing recipe', error: err.message || err });
                    });
                });

            });
    });
});

function insertRecipe(db, recipeName, description, nationalityId, dayTimeId, imageName) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO receptek (receptek_neve, keszites, konyha_osszekoto, napszak_osszekoto, kep) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [recipeName, description, nationalityId, dayTimeId, imageName], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
}

function insertPreferencesSensitivityIngredients(db, recipeId, preferences, sensitivity, ingredients) {
    return new Promise((resolve, reject) => {
        try {
            if (!ingredients || ingredients.length === 0) {
                return resolve();
            }

            const mertekegysegPromises = ingredients.map(async (ingredient) => {
                try {
                    return await insertMertekegyseg(db, ingredient.mennyiseg, ingredient.mertekegyseg);
                } catch (error) {
                    console.error("Error inserting mertekegyseg:", error);
                    throw error;
                }
            });

            Promise.all(mertekegysegPromises)
                .then((mertekegysegResults) => {
                    const osszekotoValues = ingredients.map((ingredient, index) => {
                        return [
                            recipeId,
                            ingredient.hozzavalok_id,
                            mertekegysegResults[index].insertId,
                            1,
                            sensitivity || null,
                            preferences || null 
                        ];
                    });

                    const insertQuery = 'INSERT INTO osszekoto (receptek_id, hozzavalok_id, mertekegyseg_id, ervenyes, etrend_id, preferencia_id) VALUES ?';
                    db.query(insertQuery, [osszekotoValues], (err, result) => {
                        if (err) {
                            console.error("Error inserting into osszekoto:", err);
                            return reject(err);
                        }
                        resolve();
                    });
                })
                .catch((err) => {
                    console.error("Error in inserting ingredients:", err);
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
}


function insertUserRecipeRelation(db, userId, recipeId) {
    return new Promise((resolve, reject) => {
        const checkUserQuery = 'SELECT * FROM `regisztracio` WHERE felhasznalo_id = ?';
        db.query(checkUserQuery, [userId], (err, results) => {
            if (err) {
                console.error("Error checking user:", err);
                return reject(err);
            }
            if (results.length === 0) {
                return reject(new Error(`User with ID ${userId} does not exist in regisztracio table`));
            }

            const query = 'INSERT INTO feltoltot_recept (profil_id, feltoltot_recept_id) VALUES (?, ?)';
            db.query(query, [userId, recipeId], (err, result) => {
                if (err) {
                    console.error("Error inserting into feltoltot_recept:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}
function insertMertekegyseg(db, amount, unit) {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO mertekegyseg (mennyiseg, mertekegyseg) VALUES (?, ?) ON DUPLICATE KEY UPDATE mennyiseg = VALUES(mennyiseg), mertekegyseg = VALUES(mertekegyseg)';
        db.query(query, [amount, unit], (err, result) => {
            if (err) {
                console.error("Error in inserting mertekegyseg:", err);
                return reject(err);
            }
            console.log("Mertekegyseg inserted successfully:", result);
            resolve(result);
        });
    });
}

app.post('/login', (req, res) => {
    console.log("📥 Beérkező adatok:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("❌ Hiányzó email vagy jelszó!");
        return res.status(400).json({ error: "❌ Hiányzó email vagy jelszó!" });
    }

    const sql = "SELECT * FROM regisztracio WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error("❌ SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }

        console.log("🔍 SQL lekérdezés eredménye:", result);

        if (result.length === 0) {
            console.log("❌ Hibás email!");
            return res.status(401).json({ error: "❌ Hibás email vagy nem létezik a felhasználó!" });
        }

        const hashedPassword = result[0].jelszo;
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
            const user = result[0];
            const token = jwt.sign({
                id: user.felhasznalo_id,
                username: user.felhasznalonev,
                email: user.email,
            }, 'your-secret-key', { expiresIn: '1h' });

            console.log("✅ Sikeres bejelentkezés:", user.felhasznalonev);

            return res.json({
                success: "Sikeres bejelentkezés!",
                token: token,
                user: user,
                admin: user.admin
            });
        });
    });
});

app.post('/api/accept-rules', (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      return res.status(400).json({ error: "Hiányzó felhasználói azonosító!" });
    }
  
    const sql = "UPDATE regisztracio SET szabalyzat = 1 WHERE felhasznalo_id = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Hiba a szabályzat elfogadásakor:", err);
        return res.status(500).json({ error: "Nem sikerült frissíteni a szabályzat állapotát." });
      }
      res.json({ success: "Szabályzat elfogadva." });
    });
});
  
app.post('/register', (req, res) => {
    console.log("📥 Beérkező adatok:", req.body);
  
    const { felhasznalonev, email, password } = req.body;
  
    if (!felhasznalonev || !email || !password) {
      return res.status(400).json({ error: "❌ Hiányzó adatok!", details: req.body });
    }
  
    // Ellenőrzés: van-e már ilyen felhasználónév vagy email
    const checkSql = "SELECT * FROM regisztracio WHERE felhasznalonev = ? OR email = ?";
    db.query(checkSql, [felhasznalonev, email], (err, result) => {
      if (err) {
        console.error("❌ SQL Hiba:", err);
        return res.status(500).json({ error: "Adatbázis hiba az ellenőrzéskor!" });
      }
  
      let usernameTaken = false;
      let emailTaken = false;
  
      result.forEach(user => {
        if (user.felhasznalonev === felhasznalonev) usernameTaken = true;
        if (user.email === email) emailTaken = true;
      });
  
      if (usernameTaken && emailTaken) {
        return res.status(400).json({ error: "❌ A felhasználónév és az email cím is foglalt!" });
      } else if (usernameTaken) {
        return res.status(400).json({ error: "❌ A felhasználónév már foglalt!" });
      } else if (emailTaken) {
        return res.status(400).json({ error: "❌ Az email cím már foglalt!" });
      }
  
      // Ha minden oké, jöhet a jelszó hashelése
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.error("❌ Jelszó hash hiba:", err);
          return res.status(500).json({ error: "Hiba a jelszó hashelésekor.", details: err.message });
        }
  
        console.log("🔑 Hash-elt jelszó:", hash);
  
        const sql = "INSERT INTO regisztracio (felhasznalonev, email, jelszo) VALUES (?, ?, ?)";
        const values = [felhasznalonev, email, hash];
  
        console.log("📝 SQL lekérdezés:", sql);
        console.log("📊 Értékek:", values);
  
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error("❌ SQL Hiba:", err);
            return res.status(500).json({ error: "Hiba az adatbázis művelet végrehajtásakor.", details: err.sqlMessage });
          }
  
          console.log("✅ Sikeres regisztráció:", result);
  
          const fetchUserQuery = "SELECT felhasznalonev, email, admin FROM regisztracio WHERE email = ?";
          db.query(fetchUserQuery, [email], (err, userResult) => {
            if (err) {
              console.error("❌ Hiba a felhasználó lekérdezésekor:", err);
              return res.status(500).json({ error: "Hiba a felhasználó lekérdezésekor." });
            }
  
            if (userResult.length > 0) {
              const user = {
                felhasznalonev: userResult[0].felhasznalonev,
                email: userResult[0].email,
                admin: userResult[0].admin === 1
              };
              return res.json({ user });
            } else {
              return res.status(500).json({ error: "Nem sikerült lekérdezni a felhasználót." });
            }
          });
        });
      });
    });
});
  
  

app.delete('/api/delete-recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    const getImageQuery = `SELECT kep FROM receptek WHERE Receptek_id = ?`;

    db.query(getImageQuery, [recipeId], (err, result) => {
        if (err) {
            console.error("Error fetching image filename:", err);
            return res.status(500).json({ error: "Failed to fetch image filename" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        const imageFilename = result[0].kep;
        const imagePath = path.join(__dirname, 'public', imageFilename);

        fs.unlink(imagePath, (fsErr) => {
            if (fsErr) {
                console.error("Error deleting image file:", fsErr);
                return res.status(500).json({ error: "Failed to delete image file" });
            }

            const deleteMeasurementsQuery = `
                DELETE FROM mertekegyseg 
                WHERE Mertekegyseg_id IN (
                    SELECT mertekegyseg_id FROM osszekoto WHERE receptek_id = ?
                );
            `;

            const deleteRecipeQuery = `
                DELETE FROM receptek WHERE Receptek_id = ?;
            `;

            db.query(deleteMeasurementsQuery, [recipeId], (err, result) => {
                if (err) {
                    console.error("Error deleting measurements:", err);
                    return res.status(500).json({ error: "Failed to delete measurement data" });
                }

                db.query(deleteRecipeQuery, [recipeId], (err, result) => {
                    if (err) {
                        console.error("Error deleting recipe:", err);
                        return res.status(500).json({ error: "Failed to delete recipe" });
                    }
                    res.status(200).json({ message: `Recipe with ID: ${recipeId} and its related measurements and image deleted successfully` });
                });
            });
        });
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
    const sql = "Select keszites from `receptek`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})

app.get("/api/hozzavalok", (req, res) => {
    const { keres } = req.query;
    let sql = "SELECT * FROM hozzavalok";

    if (keres) {
        sql += ` WHERE hozzavalok_neve LIKE ?`;
    }

    db.query(sql, keres ? [`%${keres}%`, `%${keres}%`] : [], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/save-recipe', (req, res) => {
    const { profil, receptek } = req.body;

    if (!profil || !receptek) {
        return res.status(400).json({ error: "Hiányzó adatok!" });
    }

    const checkSql = "SELECT * FROM sajat_receptek WHERE profil = ? AND recept = ?";
    db.query(checkSql, [profil, receptek], (err, results) => {
        if (err) {
            console.error("❌ Hiba a kereséskor:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: "Ezt a receptet már elmentetted!" });
        }
        const insertSql = "INSERT INTO sajat_receptek (profil, recept) VALUES (?, ?)";
        db.query(insertSql, [profil, receptek], (err) => {
            if (err) {
                console.error("❌ Hiba a mentéskor:", err);
                return res.status(500).json({ error: "Adatbázis hiba!" });
            }
            res.json({ success: "Recept elmentve!" });
        });
    });
});

app.post('/api/unsave-recipe', (req, res) => {
    const { profil, receptek } = req.body;

    if (!profil || !receptek) {
        return res.status(400).json({ error: "Hiányzó adatok!" });
    }
    const deleteSql = "DELETE FROM sajat_receptek WHERE profil = ? AND recept = ?";
    db.query(deleteSql, [profil, receptek], (err) => {
        if (err) {
            console.error("❌ Hiba a törléskor:", err);
            return res.status(500).json({ error: "Adatbázis hiba!" });
        }
        res.json({ success: "Recept eltávolítva!" });
    });
});

app.get('/api/saved-recipes/:userId', (req, res) => {
    const { userId } = req.params;

    const sql = `
    SELECT receptek.Receptek_id, receptek.receptek_neve, receptek.keszites, 
    GROUP_CONCAT(DISTINCT hozzavalok.hozzavalok_neve SEPARATOR ', ') AS hozzavalok,
    preferencia.etkezes, 
    GROUP_CONCAT(DISTINCT erzekenysegek.erzekenyseg SEPARATOR ', ') AS erzekenyseg, 
    GROUP_CONCAT(DISTINCT mertekegyseg.mennyiseg, ' ', mertekegyseg.mertekegyseg SEPARATOR ', ') AS mennyiseg,
    napszak.idoszak, konyha.nemzetiseg, receptek.kep
    FROM osszekoto 
    INNER JOIN receptek ON osszekoto.receptek_id = receptek.Receptek_id
    INNER JOIN mertekegyseg ON osszekoto.mertekegyseg_id = mertekegyseg.Mertekegyseg_id
    INNER JOIN hozzavalok ON osszekoto.hozzavalok_id = hozzavalok.Hozzavalok_id
    INNER JOIN erzekenysegek ON osszekoto.etrend_id = erzekenysegek.erzekenyseg_id
    INNER JOIN preferencia ON osszekoto.preferencia_id = preferencia.etkezes_id
    INNER JOIN konyha ON receptek.konyha_osszekoto = konyha.konyha_id
    INNER JOIN napszak ON receptek.napszak_osszekoto = napszak.napszak_id
    INNER JOIN sajat_receptek ON receptek.Receptek_id = sajat_receptek.recept
    INNER JOIN regisztracio ON sajat_receptek.profil = regisztracio.felhasznalo_id
    WHERE sajat_receptek.profil = ?
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
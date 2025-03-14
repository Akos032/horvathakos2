const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host:"127.0.0.1",
    port: 3306,
    password: "",
    database: "finomsagok"

})

app.get("/", (req,res) => {
    res.send("Fut a backend");
})

app.get("/osszes" , (req,res) => {
    const sql = "Select * from `receptek`";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err)
        return res.json(result)
    })
})

app.get("/api/osszes", (req, res) => {
    const { keres } = req.query;
    let sql = "SELECT * FROM receptek";
    
    if (keres) {
      sql += ` WHERE Receptek_neve LIKE ?`;
    }
  
    db.query(sql, keres ? [`%${keres}%`, `%${keres}%`] : [], (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    });
});

app.get("/egy" , (req,res) => {
    const sql = "SELECT * FROM `receptek` WHERE Receptek_id = 1";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err)
        return res.json(result)
    })
}) 
app.get("/Keszities" , (req,res) => {
    const sql = "Select Keszites from `receptek`";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err)
        return res.json(result)
    })
}) 

const bcrypt = require('bcryptjs'); // A bcrypt használata

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

            console.log("✅ Sikeres bejelentkezés:", result[0].Felhasznalonev);
            return res.json({ success: "Sikeres bejelentkezés!", user: result[0] });
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




app.get('/profil', (req,res)=>{
    const sql = "Select * from regisztracio";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err)
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

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})

function toggleFilters() {
    var filterPanel = document.getElementById('filterPanel');
    filterPanel.classList.toggle('open');
}
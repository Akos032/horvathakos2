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

const bcrypt = require('bcrypt'); // A bcrypt használata

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM regisztracio WHERE Felhasznalonev = ? AND Email = ?";
    
    db.query(sql, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Hiba az adatbázis lekérdezésénél." });

        if (data.length > 0) {
            // Itt összehasonlítjuk a hashelt jelszót a megadott jelszóval
            bcrypt.compare(req.body.password, data[0].Jelszo, (err, response) => {
                if (err) return res.json({ Error: "Hiba a jelszó ellenőrzésekor." });

                if (response) {
                    return res.json({ Status: "Sikeres bejelentkezés" });
                } else {
                    return res.json({ Error: "Hibás jelszó" });
                }
            });
        } else {
            return res.json({ Error: "Nem létezik ilyen felhasználó vagy email" });
        }
    });
});


app.post('/register', (req, res) => {
    const sql = "INSERT INTO regisztracio (`Felhasznalonev`, `Email`, `Jelszo`) VALUES (?, ?, ?)";

    // A jelszó hashelése
    bcrypt.hash(req.body.password, 10, (err, hash) => { // 10 az a saltRounds értéke
        if (err) return res.json({ error: "Hiba a jelszó hashelésekor." });

        // Az insert értékek, amik a requestből jönnek
        const values = [
            req.body.Felhasznalonev, // Felhasználónév
            req.body.Email, // Email
            hash // A hashelt jelszó
        ];

        // SQL query végrehajtása
        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return res.json({ error: "Hiba az adatbázis művelet végrehajtásakor." });
            }
            return res.json({ success: "Sikeres regisztráció", result: result });
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
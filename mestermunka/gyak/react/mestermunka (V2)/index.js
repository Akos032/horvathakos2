const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
    user: "root",
    host:"127.0.0.1",
    port: 3307,
    password: "",
    database: "finomsagok"

})
app.use((err, req, res, next) => {
    console.error(err.stack); // Kiírja a konzolra a hibát
    res.status(500).json({ error: err.message || "Szerverhiba történt" });
  });

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

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM regisztracio WHERE Felhasznalonev = ? AND Email = ? AND Jelszo = ?";
    
    db.query(sql, [req.body.username, req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("SQL hiba:", err);  // Hibakereséshez
            return res.json({Error: "Hiba a lekérdezés során"});
        }
        console.log(req.body.password)
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].Jelszo, (err, response) => {
                if (err) {
                    console.error("Bcrypt hiba:", err);  // Hibakereséshez
                    return res.json({Error: "Hiba a jelszó ellenőrzésekor"});
                }
                if (response) {
                    return res.json({Status: "Sikeres"});
                } else {
                    return res.json({Error: "Hibás jelszó"});
                }
            });
        } else {
            return res.json({Error: "Nem létezik ilyen felhasználó"});
        }
    });
});


app.post('/register', (req,res)=>{
    const sql = "Insert into regisztracio (`Felhasznalonev`, `Email`, `Jelszo`) Values (?,?,?)";
    bcrypt.hash(req.body.password.toString(), 10,(err,hash)=>{
        if(err) return res.json({Error:"Hiba a jelszó hashelésénél"})
            const values = [req.body.username, req.body.email, hash]
        db.query(sql,values,(err,result)=>{
            if(err){ console.log(err);
            return res.status(500).json({Error: "Adatbázis hiba"});
            }
            else {
                return res.json({Status: "Sikeres"})
            }
           
        })
    })
})
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
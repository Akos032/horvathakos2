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
    port: 3307,
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

app.post('/login', (req,res) =>{
    const sql = "Select * from regisztracio WHERE Felhasznalonev = ? and Email = ? and Jelszo = ?"
    db.query(sql, [req.body.username,req.body.email,req.body.password], (err, data) => {
        if(err) return res.json("Hiba")
        if(data.length > 0){
            bycrypt.compare(req.body.password.toString(),result[0].password,(err,response)=>{
                if(err) return res.json({Error:"Hiba"})
                    if(response) return res.json({Status: "Sikeres"})
                        else return res.json({Error:"Hibás jelszó"})
            
            }
               
            )
        } else{
            return res.json({Error:"Nem létezik az email"})
        }
        
    })
})
app.post('/register', (req,res)=>{
    const sql = "Insert into regisztracio (`Felhasznalonev`, `Email`, `Jelszo`) Values (?,?,?)";
    bycrypt.hash(req.body.password.toString(),(err,hash)=>{
        if(err) return res.json("Hiba")
            const values = values.map((values) => [
                values.Felhasznalonev,
                values.Email,
                values.bycrypt
            ]);
        db.query(sql,[values],(err,result)=>{
            if(err) console.log(err);
            else return res.json(result)
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
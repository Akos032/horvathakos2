const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

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

app.listen(3000, () => {
    console.log("Server is running ob port 3000");
})

function toggleFilters() {
    var filterPanel = document.getElementById('filterPanel');
    filterPanel.classList.toggle('open');
}


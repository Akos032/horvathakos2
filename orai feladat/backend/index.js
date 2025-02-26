const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())

const db = mysql.createConnection({
    user:"root",
    host: "127.0.0.1",
    port: 3307,
    password: "",
    database: "fogado",
})

app.get("/" , (req,res) => {
    res.send("Fut a backend");
})

app.get("/szobak", (req,res) =>{
    const sql = "SELECT szobak.sznev, szobak.agy FROM `szobak`";
    db.query(sql, (err,result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})

app.get("/vendegek", (req,res) =>{
    const sql = "SELECT szobak.sznev, Sum(foglalasok.fo), Sum((foglalasok.tav-foglalasok.erk)*foglalasok.fo) FROM `szobak` inner join foglalasok on szobak.szazon = foglalasok.szoba GROUP by szobak.sznev;";
    db.query(sql, (err,result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})

app.get("/vendegek/:id", (req,res) =>{
    const sql = "SELECT vendegek.vnev, foglalasok.erk, foglalasok.tav FROM szobak inner join foglalasok on szobak.szazon = foglalasok.szoba inner join vendegek on foglalasok.vendeg = vendegek.vsorsz WHERE szobak.szazon = ?;";
    db.query(sql, [req.params.id], (err,result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})

app.listen(3001, () =>{
    console.log("Server is running on port 3001");
})

const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.dislpaySujets = (req, res) => {
  db.query("SELECT * FROM sujets", function (err, result, fields) {
    if (err) throw err;
    res.render("sujets", {
        sujets: result,
        success:"",
        error:""
    });
  });
};

exports.add = (req, res) => {
    db.query("INSERT INTO sujets (intitule) VALUES('"+ req.body.intitule + "')",function (err, result, fields) {
        if(err) throw err;
        db.query("SELECT * FROM sujets", function (err, result, fields) {
            if (err){ 
                res.render("sujets", {
                sujets: result,
                success:"",
                error:"somthing wrong"
                });
            }else{
                res.render("sujets", {
                sujets: result,
                success:"sujet ajoute avec succes",
                error:""
                });
            }
        });
    });
};
exports.update = (req, res) => {
    db.query("UPDATE sujets SET intitule = '"+ req.body.intitule + "' WHERE id = '"+req.body.sujet_id+"'",function (err, result, fields) {
        if(err) throw err;
        db.query("SELECT * FROM sujets", function (err, result, fields) {
            if (err){ 
                res.render("sujets", {
                sujets: result,
                success:"",
                error:"somthing wrong"
                });
            }else{
                res.render("sujets", {
                sujets: result,
                success:"sujet modifie avec succes",
                error:""
                });
            }
        });
    });
}
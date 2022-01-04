const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.dislpayNiveaux = (req, res) => {
  db.query("SELECT * FROM niveaux", function (err, result, fields) {
    if (err) throw err;
    res.render("niveaux", {
      niveaux: result,
      success:"",
      error:""
    });
  });
};

exports.update = (req, res) => {
    let sql = "UPDATE niveaux SET min_points = '" + req.body.min_points + "', max_points = '" + req.body.max_points + "' WHERE id ='" + req.body.niveau_id + "'";
    db.query(sql,function(err, result, fields) {
        if (err){
            db.query("SELECT * FROM niveaux", function (err, result, fields) {
                if (err) throw err;
                res.render("niveaux", {
                  niveaux: result,
                  success:"",
                  error:"somthing wrong"
                });
            });
        } else{
            db.query("SELECT * FROM niveaux", function (err, result, fields) {
                if (err) throw err;
                res.render("niveaux", {
                  niveaux: result,
                  success:"Niveau modifier avec succes",
                  error:""
                });
            });
        }
    })
};
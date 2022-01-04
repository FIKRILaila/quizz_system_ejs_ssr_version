const mysql = require("mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = Number(process.env.SALT_ROUNDS);

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.dislpayFormateurs = (req, res) => {
  db.query("SELECT * FROM user WHERE role = 'formateur'", function (err, result, fields) {
    if (err) throw err;
    res.render("formateurs", {
      formateurs: result,
      success:"",
      error:""
    });
  });
};

exports.dislpayApprenants = (req, res) => {
  db.query("SELECT * FROM user WHERE role = 'apprenant'", function (err, result, fields) {
    if (err) throw err;
    res.render("apprenants", {
      apprenants: result,
      success:"",
      error:""
    });
  });
};

// function selectAll(role){
//   db.query("SELECT * FROM user WHERE role = '" + role + "'", function (err, result, fields){
//     return result;
//   })
// }

exports.addUser = async (req, res) => {
    db.query("SELECT email FROM user WHERE email ='" + req.body.email + "'",function (err, result, fields) {
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          if (req.body.role == "formateur") {
            db.query("SELECT * FROM user WHERE role = 'formateur'", function (err, result, fields){
              return res.render("formateurs", {
                error:"cet email est déjà utilisé",
                success:"",
                formateurs: result
              });
            });
          } else {
              db.query("SELECT * FROM user WHERE role = 'apprenant'", function (err, result, fields){
                return res.render("apprenants", {
                  error:"cet email est déjà utilisé",
                  success:"",
                  apprenants: result
                });
              });
          }
        } 
      });

      if (req.body.password !== req.body.confirmPassword) {
        if (req.body.role == "formateur") {
          db.query("SELECT * FROM user WHERE role = 'formateur'", function (err, result, fields){
            return res.render("formateurs", {
              error:"Les mots de passe ne correspondent pas",
              success:"",
              formateurs: result
            });
          });
        } else {
            db.query("SELECT * FROM user WHERE role = 'apprenant'", function (err, result, fields){
              return res.render("apprenants", {
                error:"Les mots de passe ne correspondent pas",
                success:"",
                apprenants: result
              });
            })
        }
      }

      const encryptedPassword = await bcrypt.hash(req.body.password,saltRounds);

      sql = "INSERT INTO user (first_name, last_name, email, password,role) VALUES ('" + req.body.first_name + "', '" + req.body.last_name + "','" + req.body.email + "','" + encryptedPassword + "','" + req.body.role +"')";

      db.query(sql, function  (err, result, fields) {
        if (err) throw err;
        if (req.body.role == "formateur") {
          db.query("SELECT * FROM user WHERE role = 'formateur'", function (err, result, fields){
            return res.render("formateurs", {
              success:"votre formateur a été ajouté avec succès ",
              error: "",
              formateurs: result
            });
          })
        } else {
          db.query("SELECT * FROM user WHERE role = 'apprenant'", function (err, result, fields){
            return res.render("apprenants", {
              success: "votre apprenant a été ajouté avec succès " ,
              error: "",
              apprenants: result
            });
          })
        }
      });
};


exports.loginUser = (req, res) => {
  var sql = "SELECT * FROM user WHERE email ='" + req.body.email + "'";
  db.query(sql, async function (err, result, fields) {
    if (result.length) {
      const comparison = await bcrypt.compare(
        req.body.password,
        result[0].password
      );
      if (comparison) {
          
        if (req.session.username) {
          delete req.session.username;
        }
        req.session.username = result[0].first_name + " " + result[0].last_name;
        if (result[0].role == "admin") {
          res.redirect("admin_dashboard");
        }
        if (result[0].role == "formateur") {
          res.redirect("formateur_dashboard");
        }
        if (result[0].role == "apprenant") {
          res.redirect("/index_apprenant");
        }
      } else {
        res.render("login", {
          error: { message: "email or password incorrect" },
        });
      }
    } else {
      res.render("login", {
        error: { message: "email or password incorrect" },
      });
    }
  });
};

exports.logout = (req, res) => {
  if (req.session.username) {
    delete req.session.username;
    return res.redirect("/login");
  }
};

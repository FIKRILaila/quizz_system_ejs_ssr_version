const mysql = require("mysql");
const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS;

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

exports.dislpayUsers = (req, res) => {
  db.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    res.render("welcome", {
      data: result,
    });
  });
};

exports.addUser = (req, res) => {
  db.query(
    "SELECT email FROM users WHERE email ='" + req.body.email + "'",
    async function (err, result, fields) {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        if (req.body.render_page == "formateurs") {
          return res.render("formateurs", {
            error: { message: "cet email est déjà utilisé" },
          });
        } else {
          return res.render("apprenants", {
            error: { message: "cet email est déjà utilisé" },
          });
        }
      } else if (req.body.password !== req.body.confirmPassword) {
        if (req.body.render_page == "formateurs") {
          return res.render("formateurs", {
            sucess: {},
            error: { message: "Les mots de passe ne correspondent pas" },
          });
        } else {
          return res.render("apprenants", {
            sucess: {},
            error: { message: "Les mots de passe ne correspondent pas" },
          });
        }
      }
      const encryptedPassword = await bcrypt.hash(
        req.body.password,
        saltRounds
      );
      sql =
        "INSERT INTO user (first_name, last_name, email, password,role) VALUES ('" +
        req.body.first_name +
        "', '" +
        req.body.last_name +
        "','" +
        req.body.email +
        "','" +
        encryptedPassword +
        "','" +
        req.body.role +
        "')";
      db.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (req.body.render_page == "formateurs") {
          return res.render("formateurs", {
            sucess: { message: "votre formateur a été ajouté avec succès " },
            error: {},
          });
        } else {
          return res.render("apprenants", {
            sucess: { message: "votre apprenant a été ajouté avec succès " },
            error: {},
          });
        }
      });
    }
  );
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
            console.log('din dimaak');
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
    // return result.length ? res.redirect('admin_dashboard'):res.render('login',{error:{message:'email or password incorrect'}});
  });
};

exports.logout = (req, res) => {
  if (req.session.username) {
    delete req.session.username;
    return res.redirect("/login");
  }
};

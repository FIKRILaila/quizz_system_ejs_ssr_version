const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'quiz_system'
});

exports.dislpayUsers = (req,res) => {
    db.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        res.render('welcome',{
            data: result
        })
    });
}

exports.addUser = (req,res) => {
    db.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        res.render('welcome',{
            data: result
        })
    });
}

exports.loginUser = (req,res, next) => {
    console.log(req.body.email);
    var sql = "SELECT * FROM user WHERE email ='" + req.body.email + "'";
    db.query(sql, function (err, result, fields) {
        return result.length ? res.redirect('dashboard'):res.render('login',{error:{message:'email or password incorrect'}});
    });
};
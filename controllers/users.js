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
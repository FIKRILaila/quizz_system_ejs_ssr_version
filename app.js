const mysql = require('mysql');
const express = require('express');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public/'))
app.use(express.urlencoded({ extended : true }))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'quiz_system'
});



db.connect((err)=> {
    if(err) console.log(err);
    else{
        console.log('connected successfully');
    }
});

app.use('/',require('./routes/route'))

app.listen(8000,()=>{
    console.log('server stareted successfully');
});


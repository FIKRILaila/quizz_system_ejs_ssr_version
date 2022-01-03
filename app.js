const mysql = require('mysql');
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs')
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))
app.use(express.urlencoded({ extended : true }))

//.env 
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(cookieParser());

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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


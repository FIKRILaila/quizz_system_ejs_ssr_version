const express = require('express');
const userController = require('../controllers/users'); 
const router = express.Router();

router.get('/', userController.dislpayUsers)
router.post('/add-apprenant', userController.addUser)
router.post('/login', userController.loginUser)
router.get('/login',(req, res) => {
    res.render("login",{error:{}});
})
router.get('/register',(req, res) => {
    res.render("register");
})
router.get('/dashboard',(req, res) => {
    res.render("dashboard");
})

module.exports = router;
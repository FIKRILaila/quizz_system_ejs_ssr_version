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
router.get('/admin_dashboard',(req, res) => {
    res.render("admin_dashboard");
})
router.get('/formateur_dashboard',(req, res) => {
    res.render("formateur_dashboard");
})
router.get('/formateurs',(req, res) => {
    res.render("formateurs");
})

module.exports = router;
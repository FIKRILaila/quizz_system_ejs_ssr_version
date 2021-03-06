const express = require('express');
const userController = require('../controllers/users'); 
const niveauController = require('../controllers/niveaux'); 
const sujetController = require('../controllers/sujets'); 
const router = express.Router();

const auth = require('../middleware/auth');
// router.get('/', userController.dislpayUsers)
router.get('/',(req, res) => {
    res.render("welcome");
})
router.post('/register', userController.addUser)
router.post('/login', userController.loginUser)
router.post('/update_niveau', niveauController.update)

router.get('/login',(req, res) => {
    res.render("login",{error:{}});
})
router.get("/logout",auth, userController.logout)
router.get("/niveaux",auth, niveauController.dislpayNiveaux)
router.get("/sujets",auth, sujetController.dislpaySujets)
router.post("/nouveau_sujet",auth, sujetController.add)
router.post("/update_sujet",auth, sujetController.update)
router.get('/admin_dashboard',auth,(req, res) => {
    res.render("admin_dashboard");
})
router.get('/formateur_dashboard',auth,(req, res) => {
    res.render("formateur_dashboard");
})
router.get('/formateurs',auth,userController.dislpayFormateurs)
// })
// router.get('/formateurs',auth,(req, res) => {
//     res.render("formateurs",{sucess:{},error:{}});
// })
router.get('/apprenants',auth,userController.dislpayApprenants)
// router.get('/apprenants',auth,(req, res) => {
//     res.render("apprenants",{sucess:{},error:{}});
// })
router.get('/index_apprenant',auth,(req, res) => {
    res.render("index_apprenant");
})
router.get('/questions',auth,(req, res) => {
    res.render("questions");
})
router.get('/404',auth,(req, res) => {
    res.render("404");
})
module.exports = router;
const express = require('express');
const userController = require('../controllers/users'); 
const router = express.Router();

router.get('/', userController.dislpayUsers)
router.get('/login',(req, res) => {
    res.render("login");
})
module.exports = router;
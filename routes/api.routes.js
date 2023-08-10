const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/auth.controller');
const auth = require("../middelware/auth");



router.post('/register', usercontroller.register);

router.post('/login', usercontroller.login);

router.post('/userAuthentication', auth.verifyToken, usercontroller.tokenVerification);

router.post('/userList', usercontroller.userList);



module.exports = router;
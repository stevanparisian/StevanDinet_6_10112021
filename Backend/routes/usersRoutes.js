const express = require('express');
const router = express.Router();

const emailControl = require('../middleware/emailControl');
const passwordControl = require('../middleware/passwordControl');
const usersController = require('../controllers/usersControl');

router.post("/signup", emailControl, passwordControl, usersController.signup);
router.post("/login", usersController.login);


module.exports = router;
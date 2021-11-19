const express = require('express');
const router = express.Router();

const emailControl = require('../middleware/check-email');
const passwordControl = require('../middleware/check-password');
const usersController = require('../controllers/user');

router.post("/signup", emailControl, passwordControl, usersController.signup);
router.post("/login", usersController.login);


module.exports = router;
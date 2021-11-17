const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const checkSauceInput = require("../middleware/check-sauce-input")

router.post('/', auth, multer, checkSauceInput, sauceCtrl.createSauce);
router.put('/:id', auth, multer, checkSauceInput, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce)

  module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('../database/multerConfig');
const auth = require('../middleware/authControl');
const saucesController = require('../controllers/saucesControl');


router.get("/", auth, saucesController.getAllSauces);
router.get("/:id", auth, saucesController.getSauce);
router.post("/", auth, multer, saucesController.createSauce);
router.put("/:id", auth, multer, saucesController.updateSauce);
router.delete("/:id", auth, saucesController.deleteSauce);
router.post("/:id/like", auth, saucesController.likesSauces);

module.exports = router;
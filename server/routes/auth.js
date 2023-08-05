const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(`/register`, authController.createUser);
router.post(`/login`, authController.userLogin);
router.get(`/protected/:username`, authController.userAuth, authController.verifyUser);
router.get(`/logout`, authController.userLogout);

module.exports = router;
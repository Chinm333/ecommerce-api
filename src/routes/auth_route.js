const express = require('express');
const authController = require('../controllers/auth_controller.js');
const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);


module.exports = router;
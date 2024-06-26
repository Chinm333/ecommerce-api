const express = require('express');
const userController = require('../controllers/user_controller.js');
const router = express.Router();
const authenticate = require('../middlewires/authenticate.js');

// postman test
// router.post('/createUser',  userController.createUser);
// router.get('/getUser',  userController.getUser);
// router.put('/updateUser/:userId',  userController.updateUser);
// router.delete('/deleteUser/:userId',  userController.deleteUser);

router.post('/createUser', authenticate, userController.createUser);
router.get('/getUser', authenticate, userController.getUser);
router.put('/updateUser/:userId', authenticate, userController.updateUser);
router.delete('/deleteUser/:userId', authenticate, userController.deleteUser);
module.exports = router;
const express = require('express');
const paymentController = require('../controllers/payment_controller.js');
const router = express.Router();
const authenticate = require('../middlewires/authenticate.js');

// postman test
// router.post('/createPayment',  paymentController.createPayment);
// router.get('/getPayment',  paymentController.getPayment);
// router.put('/updatePayment/:paymentId',  paymentController.updatePayment);
// router.delete('/deletePayment/:paymentId',  paymentController.deletePayment);

router.post('/createPayment', authenticate, paymentController.createPayment);
router.get('/getPayment', authenticate, paymentController.getPayment);
router.put('/updatePayment/:paymentId', authenticate, paymentController.updatePayment);
router.delete('/deletePayment/:paymentId', authenticate, paymentController.deletePayment);


module.exports = router;
const express = require('express');
const orderController = require('../controllers/order_controller.js');
const router = express.Router();
const authenticate = require('../middlewires/authenticate.js');

// postman testing
// router.post('/createOrder',  orderController.createOrder);
// router.get('/getOrder',  orderController.getOrder);
// router.put('/updateOrder/:orderId',  orderController.updateOrder);
// router.delete('/deleteOrder/:orderId',  orderController.deleteOrder);

router.post('/createOrder',  orderController.createOrder);
router.get('/getOrder',  orderController.getOrder);
router.put('/updateOrder/:orderId',  orderController.updateOrder);
router.delete('/deleteOrder/:orderId',  orderController.deleteOrder);

module.exports = router;
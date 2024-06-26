const express = require('express');
const trackingController = require('../controllers/tracking_order_controller.js');
const router = express.Router();
const authenticate = require('../middlewires/authenticate.js');

// postman test
// router.post('/createTracking', trackingController.createTracking);
// router.get('/getTracking', trackingController.getTracking);
// router.put('/updateTracking/:orderId', trackingController.updateTracking);
// router.delete('/deleteTracking/:orderId', trackingController.deleteTracking);

router.post('/createTracking', authenticate, trackingController.createTracking);
router.get('/getTracking', authenticate, trackingController.getTracking);
router.put('/updateTracking/:orderId', authenticate, trackingController.updateTracking);
router.delete('/deleteTracking/:orderId', authenticate, trackingController.deleteTracking);

module.exports = router;
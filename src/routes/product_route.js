const express = require('express');
const productController = require('../controllers/product_controller.js');
const router = express.Router();
const authenticate = require('../middlewires/authenticate.js');

// postman test
// router.post('/createProduct',  productController.createProduct);
// router.get('/getProduct',  productController.getProduct);
// router.put('/updateProduct/:productId',  productController.updateProduct);
// router.delete('/deleteProduct/:productId',  productController.deleteProduct);

router.post('/createProduct', authenticate, productController.createProduct);
router.get('/getProduct', authenticate, productController.getProduct);
router.put('/updateProduct/:productId', authenticate, productController.updateProduct);
router.delete('/deleteProduct/:productId', authenticate, productController.deleteProduct);

module.exports = router;
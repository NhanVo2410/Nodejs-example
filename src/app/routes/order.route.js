const express = require('express');

const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const orderController = require('../controllers/order.controller');
// a simple test url to check that all of our files are communicating correctly.
router.post('/createorder', orderController.order_create);
router.get('/', orderController.findAll);
router.get('/populateorders', orderController.populateOrders);
router.get('/populateusers', orderController.populateUsers);
router.get('/populatecomment', orderController.populateComments);

module.exports = router;

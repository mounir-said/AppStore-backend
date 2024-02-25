const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route to get all orders
router.get('/orders', orderController.getAllOrders);

// Route to get a single order by ID
router.get('/orders/:id', orderController.getOrderById);

// Route to create a new order
router.post('/orders', orderController.createOrder);

// Route to update an order by ID
router.put('/orders/:id', orderController.updateOrder);

// Route to delete an order by ID
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;

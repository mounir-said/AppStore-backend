const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Route to get cart items for a user
router.get('/users/:userId/cart', cartController.getCartByUser);

// Route to add an item to the cart
router.post('/users/:userId/cart', cartController.addItemToCart);

// Route to remove an item from the cart
router.delete('/users/:userId/cart/:itemId', cartController.removeItemFromCart);

// Route to clear the cart
router.delete('/users/:userId/cart', cartController.clearCart);

module.exports = router;

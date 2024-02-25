const Cart = require('../models/cartModel');

// GET cart items for a user
exports.getCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ADD an item to the cart
exports.addItemToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            cart = new Cart({ user: req.params.userId, items: [] });
        }

        const newItem = {
            product: req.body.productId,
            quantity: req.body.quantity || 1,
        };

        cart.items.push(newItem);
        await cart.save();
        
        res.status(201).json(cart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// REMOVE an item from the cart
exports.removeItemFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemId = req.params.itemId;

        cart.items = cart.items.filter(item => item._id != itemId);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CLEAR the cart
exports.clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.params.userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const Order = require('../models/orderModel');

// GET all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST a new order
exports.createOrder = async (req, res) => {
    const order = new Order({
        user: req.body.user,
        products: req.body.products,
        total: req.body.total,
        orderStatus: req.body.orderStatus,
        shipmentDetails: req.body.shipmentDetails,
        noteAboutOrder: req.body.noteAboutOrder,
        paymentMethod: req.body.paymentMethod,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// PUT/UPDATE an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.user = req.body.user;
        order.products = req.body.products;
        order.total = req.body.total;
        order.orderStatus = req.body.orderStatus;
        order.shipmentDetails = req.body.shipmentDetails;
        order.noteAboutOrder = req.body.noteAboutOrder;
        order.paymentMethod = req.body.paymentMethod;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ _id: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


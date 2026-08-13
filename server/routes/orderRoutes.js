const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const getStore = () => global.freshBasketStore;

router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain items' });
    }

    const store = getStore();
    const order = {
      id: `ORD-${Date.now()}`,
      placedAt: new Date().toLocaleString(),
      userId: req.user.id,
      total: totalPrice,
      customer: shippingAddress,
      items
    };

    store.orders.unshift(order);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-orders', protect, async (req, res) => {
  try {
    const store = getStore();
    const orders = store.orders.filter((order) => order.userId === req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const getStore = () => global.freshBasketStore;

router.get('/', async (req, res) => {
  try {
    const store = getStore();
    const { category, search } = req.query;

    let products = [...store.products];

    if (category && category !== 'All') {
      products = products.filter((product) => product.category === category);
    }

    if (search) {
      const term = search.toString().toLowerCase();
      products = products.filter((product) =>
        product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term)
      );
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const store = getStore();
    const product = store.products.find((entry) => entry.id === req.params.id || entry._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const store = getStore();
    const user = store.users.find((entry) => entry.id === req.user.id || entry._id === req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const product = {
      id: `prod-${Date.now()}`,
      ...req.body
    };

    store.products.unshift(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const bcrypt = require('bcryptjs');

const seedProducts = [
  {
    id: 'prod-1',
    name: 'Tomatoes',
    description: 'Farm-picked tomatoes for sauces and salads.',
    price: 40,
    category: 'Vegetables',
    stock: 30,
    image: 'https://shopping-cart-amrutha18.vercel.app/products/tomatoes.jpg',
    rating: 4.8,
    isFeatured: true,
    isOrganic: true
  },
  {
    id: 'prod-2',
    name: 'Bananas',
    description: 'Sweet bananas packed with natural energy.',
    price: 62,
    category: 'Fruits',
    stock: 45,
    image: 'https://shopping-cart-amrutha18.vercel.app/products/bananas.jpg',
    rating: 4.9,
    isFeatured: true,
    isOrganic: true
  },
  {
    id: 'prod-3',
    name: 'Brown Rice',
    description: 'Healthy whole-grain rice for everyday meals.',
    price: 48,
    category: 'Staples',
    stock: 20,
    image: 'https://shopping-cart-amrutha18.vercel.app/products/brown-rice.jpg',
    rating: 4.7,
    isFeatured: false,
    isOrganic: false
  },
  {
    id: 'prod-4',
    name: 'Milk',
    description: 'Fresh milk with a rich, creamy taste.',
    price: 52,
    category: 'Dairy',
    stock: 18,
    image: 'https://shopping-cart-amrutha18.vercel.app/products/milk.jpg',
    rating: 4.6,
    isFeatured: false,
    isOrganic: false
  },
  {
    id: 'prod-5',
    name: 'Spinach',
    description: 'Leafy greens for salads, smoothies, and sautés.',
    price: 18,
    category: 'Vegetables',
    stock: 25,
    image: 'https://shopping-cart-amrutha18.vercel.app/products/spinach.jpg',
    rating: 4.8,
    isFeatured: true,
    isOrganic: true
  },
  {
    id: 'prod-6',
    name: 'Apples',
    description: 'Crisp apples with a naturally sweet finish.',
    price: 130,
    category: 'Fruits',
    stock: 15,
    image: 'https://shopping-cart-amrutha18.vercel.app/products/apples.jpg',
    rating: 4.8,
    isFeatured: true,
    isOrganic: false
  }
];

async function createMemoryStore() {
  return {
    users: [],
    products: [...seedProducts],
    orders: [],

    async findUserByEmail(email) {
      return this.users.find(u => u.email === email);
    },

    async createUser(userData) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = {
        id: Date.now().toString(),
        ...userData,
        password: hashedPassword
      };
      this.users.push(user);
      return user;
    },

    async verifyPassword(password, hashedPassword) {
      return bcrypt.compare(password, hashedPassword);
    },

    getAllProducts() {
      return this.products;
    },

    getProductsByCategory(category) {
      if (category === 'All') return this.products;
      return this.products.filter(p => p.category === category);
    },

    createOrder(orderData) {
      const order = {
        id: Date.now().toString(),
        ...orderData,
        createdAt: new Date().toISOString()
      };
      this.orders.push(order);
      return order;
    },

    getOrdersByUserId(userId) {
      return this.orders.filter(o => o.userId === userId);
    }
  };
}

module.exports = { createMemoryStore };
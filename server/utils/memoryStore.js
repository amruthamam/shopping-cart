const bcrypt = require('bcryptjs');

const seedProducts = [
  {
    id: 'prod-1',
    name: 'Tomatoes',
    description: 'Farm-picked tomatoes for sauces and salads.',
    price: 40,
    category: 'Vegetables',
    stock: 30,
    image: '/products/tomatoes.jpg',
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
    image: '/products/bananas.jpg',
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
    image: '/products/brown-rice.jpg',
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
    image: '/products/milk.jpg',
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
    image: '/products/spinach.jpg',
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
    image: '/products/apples.jpg',
    rating: 4.8,
    isFeatured: true,
    isOrganic: false
  }
];
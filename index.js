const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./database');
const app = express();

const productsRouter = require('./routes/products');
const userRouter = require('./routes/users');
const cartRoutes = require('./routes/cart');

// Middleware
app.use(express.json());
app.use(cors());

//test routes
app.get('/', async (req, res) => {
  const [products] = await pool.query("SELECT * FROM products");

  res.json({
    message: "welcome to API",
    products
  })
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/users',userRouter);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

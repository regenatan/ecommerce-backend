const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET all products
router.get('/', (req, res) => {
  res.json({ message: "Get all products" });
});

// GET a single product
router.get('/:id', (req, res) => {
  res.json({ message: `Get product with id ${req.params.id}` });
});

module.exports = router;
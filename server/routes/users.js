// /routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST a new user
router.post('/users', async (req, res) => {
  const { id, username, email, password } = req.body;
  try {
    const newUser = new User({ id, username, email, password });
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

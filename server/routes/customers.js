const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post('/customers', async (req, res) => {
  const { id, name, email, phone, status } = req.body;
  try {
      const existingCustomer = await Customer.findOne({ id });
      if (existingCustomer) {
          return res.status(409).json({ message: 'ID already in use' });
      }

      const newCustomer = new Customer({ id, name, email, phone, status });
      await newCustomer.save();
      res.status(201).json(newCustomer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


router.get('/customers/:id', async (req, res) => {
  try {
      const customer = await Customer.findOne({ id: req.params.id });
      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(customer);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});
  
module.exports = router;

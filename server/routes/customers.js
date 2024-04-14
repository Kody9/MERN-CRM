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


// server/routes/customers.js
router.get('/customers/:id', async (req, res) => {
    try {
        // Assuming `id` is a custom field and not MongoDB's default `_id`
        const customer = await Customer.findOne({ id: req.params.id });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/customers/:id', async (req, res) => {
    try {
        const result = await Customer.findOneAndDelete({ id: req.params.id });
        if (!result) {
            return res.status(404).json({ message: 'No customer found with that ID' });
        }
        res.status(200).json({ message: 'Customer deleted' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


  
module.exports = router;

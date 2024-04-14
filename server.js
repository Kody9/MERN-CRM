const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./server/routes/customers');  // Ensure the path is correct
require('dotenv').config();


const app = express();

app.use(cors());  // Enable CORS
app.use(express.json());  // Parsing middleware

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api', customerRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

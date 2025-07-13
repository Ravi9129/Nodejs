const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/employees', employeeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server chal gaya bhai ${PORT} pe. Kamaal kar diya!`);
});

//http://localhost:3000/api/employees
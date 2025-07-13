const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Data file ka path
const dataPath = path.join(__dirname, '../data/employees.json');

// GET all employees
router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Bhai error aa gaya, data nahi padh paaye');
    }
    res.json(JSON.parse(data).employees);
  });
});

// GET single employee by ID
router.get('/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Bhai error aa gaya');
    }
    
    const employees = JSON.parse(data).employees;
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    
    if (!employee) {
      return res.status(404).send('Arey bhai, aisa koi employee nahi mila');
    }
    
    res.json(employee);
  });
});

// POST - Add new employee
router.post('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Bhai error aa gaya');
    }
    
    const jsonData = JSON.parse(data);
    const newEmployee = {
      id: jsonData.employees.length + 1,
      name: req.body.name,
      age: req.body.age,
      salary: req.body.salary,
      city: req.body.city
    };
    
    jsonData.employees.push(newEmployee);
    
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Bhai data save nahi hua');
      }
      
      res.status(201).json(newEmployee);
    });
  });
});

// PUT - Update employee
router.put('/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Bhai error aa gaya');
    }
    
    const jsonData = JSON.parse(data);
    const employeeIndex = jsonData.employees.findIndex(emp => emp.id === parseInt(req.params.id));
    
    if (employeeIndex === -1) {
      return res.status(404).send('Arey bhai, aisa koi employee nahi mila');
    }
    
    // Update employee data
    jsonData.employees[employeeIndex] = {
      ...jsonData.employees[employeeIndex],
      ...req.body,
      id: jsonData.employees[employeeIndex].id // ID change na ho isliye
    };
    
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Bhai update nahi hua');
      }
      
      res.json(jsonData.employees[employeeIndex]);
    });
  });
});

// DELETE - Remove employee
router.delete('/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Bhai error aa gaya');
    }
    
    const jsonData = JSON.parse(data);
    const employeeIndex = jsonData.employees.findIndex(emp => emp.id === parseInt(req.params.id));
    
    if (employeeIndex === -1) {
      return res.status(404).send('Arey bhai, aisa koi employee nahi mila');
    }
    
    // Remove employee
    const deletedEmployee = jsonData.employees.splice(employeeIndex, 1);
    
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Bhai delete nahi hua');
      }
      
      res.json(deletedEmployee[0]);
    });
  });
});

module.exports = router;
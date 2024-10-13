const express = require('express');
const { signup, login } = require('../controllers/userController');
const { getAllEmployees, createEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById } = require('../controllers/employeeController');
const router = express.Router();




// Signup route
router.post('/api/v1/user/signup', signup);

// Login route
router.post('/api/v1/user/login', login);

// Route to get all employees
router.get('/api/v1/emp/employees', getAllEmployees);

// Route to create employee
router.post('/api/v1/emp/employees', createEmployee);

// Route to get employee by ID
router.get('/api/v1/emp/employees/:eid', getEmployeeById);

// Route to update employee by ID
router.put('/api/v1/emp/employees/:eid', updateEmployeeById);

// Route to delete employee by ID
router.delete('/api/v1/emp/employees/:eid', deleteEmployeeById);


// Validation middleware for employee creation
// router.post(
//     '/api/v1/emp/employees',
//     [
//       body('first_name').notEmpty().withMessage('First name is required'),
//       body('last_name').notEmpty().withMessage('Last name is required'),
//       body('email').isEmail().withMessage('Invalid email format'),
//       body('salary').isNumeric().withMessage('Salary must be a number'),
//     ],
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       next();  // If validation passes, continue to create the employee
//     },
//     createEmployee  // Controller function to handle employee creation
//   );





module.exports = router;

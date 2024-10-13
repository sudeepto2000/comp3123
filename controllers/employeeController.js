const Employee = require('../models/Employee');

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create Employee
const createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res.status(409).json({ message: 'Employee already exists' });
    }

    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });
        await newEmployee.save();
        res.status(201).json({
            message: 'Employee created successfully',
            employee_id: newEmployee._id,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Get employee by ID
const getEmployeeById = async (req, res) => {
    const { eid } = req.params;
    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update employee by ID
const updateEmployeeById = async (req, res) => {
    const { eid } = req.params;
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const employee = await Employee.findByIdAndUpdate(eid,
            {
                first_name,
                last_name,
                email,
                position,
                salary,
                date_of_joining,
                department,
                updated_at: Date.now()
            }, { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// const deleteEmployeeById = async (req, res) => {
//     const { eid } = req.query;
//     try {
//         const employee = await Employee.findByIdAndDelete(eid);

//         if (!employee) {
//             return res.status(404).json({ 
//                 message: 'Employee not found' 
//             });
//         }
//         res.status(204).json({ message: 'Employee deleted successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
const deleteEmployeeById = async (req, res) => {
    const { eid } = req.params;
    console.log('Employee ID received for deletion:', eid); // Debugging

    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllEmployees, createEmployee, getEmployeeById, updateEmployeeById, deleteEmployeeById };

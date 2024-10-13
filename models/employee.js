const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name      : { type: String, required: true },
    last_name       : { type: String, required: true },
    email           : { type: String, required: true },
    position        : { type: String, required: true },
    salary          : { type: String, required: true },
    date_of_joining : { type: String, required: true },
    department      : { type: String, required: true },
    created_at      : { type: Date, default: Date.now },
    updated_at      : { type: Date }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;

const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  Department: { type: String, required: true },
  Salary: { type: String, required: true },
});

const EmployeeModel = mongoose.model("signup", employeeSchema);
module.exports = { EmployeeModel };

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: "",
    unique: true,
  },

  name: {
    type: String,
    required: true,
    unique: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: "",
  },
  type: {
    type: String,
    required: true,
    default: "",
    enum: [
        "Full Time",
        "Part Time"
    ],
  },
  projectname:{
    type: String,
    required: true,
    default: "",
  },
  location:{
    type: String,
    required: true,
    default: "",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: ["Software Engineer", "Product Manager"],
    default: "Software Engineer",
  },
  role: {
    type: String,
    required: true,
    enum: [
      "Developer",
      "Manager"
    ],
  },
});

employeeSchema.set("toJSON", {
  transform: function (doc, dateFormatChange) {
    dateFormatChange.startDate = dateFormatChange.startDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    dateFormatChange.endDate = dateFormatChange.endDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );
    return dateFormatChange;
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;

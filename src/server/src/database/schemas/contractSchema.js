const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["In-Progress", "Completed", "InComplete"],
    default: "In-Progress",
  },
});

contractSchema.set("toJSON", {
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

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
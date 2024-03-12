const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  id:{
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
  // members: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  client: {
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
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['In-Progress','Completed', 'InComplete'],
    default:'In-Progress'
  },
  progress: {
    type: String,
    required: true,
    enum: ['0% - Req & Design Phase','25% - Development Phase', '50% - Testing Phase', '75% - Support Phase', '100% - Completed'],
  }
});

projectSchema.set('toJSON', {
  transform: function (doc, dateFormatChange) {
    dateFormatChange.startDate = dateFormatChange.startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    dateFormatChange.endDate = dateFormatChange.endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    dateFormatChange.deadline = dateFormatChange.deadline.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return dateFormatChange;
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
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
  members: {
    type: String,
    required: true,
    unique: true,
  },
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
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
const Project = require("../database/schemas/projectSchema");
const Employee = require("../database/schemas/employeeSchema");

const addProject = async (projectData) => {
  try {
    const addProjectData = new Project(projectData);
    await addProjectData.save();
    return { status: 201, data: "Added project data successfully" };
  } catch (error) {
    console.error("Error adding project info:", error);
    return { status: 500, data: "Error adding project info" };
  }
};

const getProjectData = async() =>{
  try {
    const projects = await Project.find({}, { _id: 0, __v: 0});
    
    const employees = await Employee.find({}, { _id: 0, __v: 0});
    
    const projectsWithData = projects.map(project => {

      const projectEmployees = employees.filter(employee => employee.projectname === project.name);

      project.members = projectEmployees.length;
      return project;
    });
    
    return { status: 200, data: projectsWithData };
  } catch (error) {
    console.error("Error retrieving project info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
}



const deleteProject = async (id) => {
  try {
    const projectData = await Project.deleteOne({ "id": id });
    return { status: 200, data: "Project deleted successfully" };
  } catch (error) {
    console.error("Error retrieving project info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
};

const updateProject = async (id, data) => {
  try {
    const existingItem = await Project.findOne({ id: id });
    if (!existingItem) {
      return { status: 404, data: "project not found" };
    }
    const updatedDoc = await Project.updateOne({ id: id }, { $set: data }, { new: true });
    return { status: 200, data: "Project updated successfully" };
  } catch (error) {
    console.error("Error updating project:", error);
    return { status: 500, data: "Error updating project!" };
  }
};

module.exports = {
  addProject,
  getProjectData,
  deleteProject,
  updateProject
};

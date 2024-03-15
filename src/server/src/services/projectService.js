const Project = require("../database/schemas/projectSchema");

const addProject = async (projectData) => {
  try {
    
    const addProjectData = new Project(projectData);
    await addProjectData.save();

    
    return { status: 201, data: "Added project data successfully" };
  } catch (error) {
    console.error("Error adding project info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
};

const getProjectData = async() =>{
  try {
    const projectData = await Project.find({}, { _id: 0, __v: 0});
    
    return { status: 200, data: projectData };
  } catch (error) {
    console.error("Error retrieving project info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
}

const deleteProject = async(id) =>{
  try {
    // console.log(id);
    const projectData = await Project.deleteOne({"id": id});
    
    return { status: 200, data: "Project deleted successfully" };
  } catch (error) {
    console.error("Error retrieving project info:", error);
    return { status: 500, data: "Internal Server Error" };
  }
}

module.exports = {
    addProject,
    getProjectData,
    deleteProject
};
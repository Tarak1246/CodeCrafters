const addProjectService = require('../../services/projectService');

//Projects
const addProject = async (req, res) => {
  const projectData = req?.body;
  const projectResponse = await addProjectService.addProject(projectData);
  res.json(projectResponse);
};

const getProjectData = async(req, res) =>{
  const projectResponse = await addProjectService.getProjectData();
  res.json(projectResponse);

}

module.exports = {
    addProject,
    getProjectData
};
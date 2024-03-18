const addProjectService = require("../../services/projectService");

//Projects
const addProject = async (req, res) => {
  const projectData = req?.body;
  const projectResponse = await addProjectService.addProject(projectData);
  res.json(projectResponse);
};

const getProjectData = async (req, res) => {
  const projectResponse = await addProjectService.getProjectData();
  res.json(projectResponse);
};

const deleteProject = async (req, res) => {
  const { id } = req?.params;
  const projectResponse = await addProjectService.deleteProject(id);
  res.json(projectResponse);
};

const updateProject = async (req, res) => {
  try {
    const projectData = req?.body;
    const { id } = req?.params;

    const updateProjectResponse = await addProjectService.updateProject(
      id,
      projectData
    );

    res.json(updateProjectResponse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};

module.exports = {
  addProject,
  getProjectData,
  deleteProject,
  updateProject,
};

const NotFoundError = require("../errors/not-found");
const Task = require("../model/Task");

const getAllTask = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userID });
  // console.log(req.user.userID, "wwww");
  res.status(200).json({ tasks });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userID;
  // console.log(req.body);
  const task = await Task.create(req.body);
  res.status(200).json({ task });
};

const getTask = async (req, res) => {
  const {
    params: { id: taskID },
    user: { userID },
  } = req;

  const task = await Task.findOne({ _id: taskID, createdBy: userID });
  console.log(taskID, "tasksk");
  console.log(task);
  if (!task) {
    throw new NotFoundError(`No task with ID ${taskID}`);
  }

  res.status(200).json({ task });
};
const updateTask = async (req, res) => {
  const {
    params: { id: taskID },
    user: { userID },
  } = req;

  const task = await Task.findByIdAndUpdate(
    { _id: taskID, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new NotFoundError(`No task with ID ${taskID}`);
  }

  res.status(200).json({ task });
};
const deleteTask = async (req, res) => {
  const {
    params: { id: taskID },
    user: { userID },
  } = req;

  const task = await Task.findOneAndDelete({ _id: taskID, createdBy: userID });
  if (!task) {
    throw new NotFoundError(`No task with ID ${taskID}`);
  }

  res.status(200).json({ task });
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
